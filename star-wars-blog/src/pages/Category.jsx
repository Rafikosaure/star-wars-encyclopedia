import React, { useEffect, useRef, useState } from 'react'
import '../styles/Category.css'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import Datas from '../datas/LocalApi.json'
import NextArrow from '../assets/images/next-arrow.webp'
import BackArrow from '../assets/images/back-arrow.webp'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reinitializeDozen, maxDozen, nextDozen, prevDozen, selectDozen } from '../redux/slices/dozenSlice'
import { selectArticle } from '../redux/slices/articleSlice'

export default function Category() {

  const dispatch = useDispatch()
  const storedDozen = useSelector(selectDozen)
  const article = useSelector(selectArticle)
  const { categoryId } = useParams()
  const [items, setItems] = useState([])
  const [info, setInfo] = useState([])
  const nbDozen = useRef()

  // Trouver les articles correspondant à la catégorie choisie
  const currentDatas = Datas.find((item) => item._id === categoryId)
  
  useEffect(() => {
    // Récupérer les informations depuis l'API
    fetch(`https://starwars-databank-server.vercel.app/api/v1/${currentDatas.keyword}?page=${storedDozen}`)
    .then(response => response.json())
    .then(data => {setInfo(data.info); setItems(data.data)})
    .catch((error) => console.log(error))

    // Calculer le nombre de dizaines d'articles (arrondi à l'excès)
    nbDozen.current = Math.ceil(info.total / 10)

  }, [currentDatas.keyword, storedDozen, info.total, article])





  // Fonction pour gérer le clic sur le bouton 
  // pour voir les articles suivants
  const nextPage = () => {
    if (storedDozen >= nbDozen.current) {
      dispatch(maxDozen(nbDozen.current))
    } else {
      dispatch(nextDozen(storedDozen))
    }
  }


  // Fonction pour gérer le clic sur le bouton 
  // pour voir les articles précédents
  const prevPage = () => {
    if (storedDozen <= 1) {
      dispatch(reinitializeDozen(storedDozen))
    } else {
      dispatch(prevDozen(storedDozen))
    }
  }


  return (
    <div className='app-category'>
      <div className='prev-arrow-section' 
        style={{display: storedDozen <= 1 || article.value !== undefined ? 'none' : 'flex'}} 
        onClick={prevPage}
      >
        <img className='arrows' src={BackArrow} alt="back arrow" />
      </div>
      <div className='page-content'>
        <h1>{currentDatas.title}</h1>
        <SearchBar category={currentDatas.keyword} />
        <div className='card-list'>
          {article.value === undefined ? 
            (items.map((item) => 
              <Card key={item._id} item={item} categoryId={categoryId} />
            )
            ) : (
              <Card key={article._id} item={article.value} categoryId={categoryId} />
            )
          }
        </div>
      </div>
      <div className='next-arrow-section' 
        style={{display: storedDozen >= nbDozen.current || article.value !== undefined ? 'none' : 'flex'}} 
        onClick={nextPage}
      >
        <img className='arrows' src={NextArrow} alt="next arrow" />
      </div>
    </div>
  )
}