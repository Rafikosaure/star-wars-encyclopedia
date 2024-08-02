import React, { useEffect, useRef, useState } from 'react'
import '../styles/Category.scss'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import data from '../data/localApiCategories.json'
import NextArrow from '../assets/images/next-arrow.webp'
import BackArrow from '../assets/images/back-arrow.webp'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reinitializeDozen, maxDozen, nextDozen, prevDozen, selectDozen } from '../redux/slices/dozenSlice'
import { selectArticle } from '../redux/slices/articleSlice'
import config from '../config'



export default function Category() {

  const dispatch = useDispatch()
  const storedDozen = useSelector(selectDozen)
  const article = useSelector(selectArticle)
  const { categoryId } = useParams()
  const [items, setItems] = useState([])
  const [info, setInfo] = useState([])
  const [rightPage, updateRightPage] = useState(false)
  const nbDozen = useRef()
  const navigate = useNavigate()
  

  // Trouver les articles correspondant à la catégorie choisie
  const currentDatas = data.find((item) => item._id === categoryId)


  useEffect(() => {
    // Gestion des mauvaises URLs
    if (!categoryId || !currentDatas) {
      navigate("*")
    } else {
      updateRightPage(true)
      // Récupérer les informations depuis l'API
      fetch(`${config.starWarsAPI}/${currentDatas.keyword}?page=${storedDozen}`)
      .then(response => response.json())
      .then(data => {setInfo(data.info); setItems(data.data)})
      .catch((error) => console.log(error))

      // Calculer le nombre de dizaines d'articles (arrondi à l'excès)
      nbDozen.current = Math.ceil(info.total / 10)
    }
  }, [categoryId, currentDatas, navigate, storedDozen, info.total])
  


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
    <>
      {rightPage ? (
      <div className='app-category'>
        <div className='prev-arrow-section' 
            style={{display: storedDozen <= 1 || article.value ? 'none' : 'flex'}} 
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
            <div className='dozen-indicator' style={{display: article.value ? 'none' : 'block'}}>
              {!isNaN(nbDozen.current) && !isNaN(storedDozen) ? (
                `${storedDozen} / ${nbDozen.current}`
              ) : null }
            </div>
        </div>
        <div className='next-arrow-section' 
          style={{display: storedDozen >= nbDozen.current || article.value ? 'none' : 'flex'}} 
          onClick={nextPage}
        >
          <img className='arrows' src={NextArrow} alt="next arrow" />
        </div>
        
      </div>
      ) : null}
    </>
  )
}