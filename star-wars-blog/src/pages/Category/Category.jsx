import { useEffect, useRef, useState } from 'react'
import './Category.scss'
import Card from '../../components/Card/Card'
import CardObserverWrapper from '../../components/CardObserverWrapper/CardObserverWrapper'
import SearchBar from '../../components/SearchBar/SearchBar'
import data from '../../data/localApiCategories.json'
import NextArrow from '../../assets/images/next-arrow.webp'
import BackArrow from '../../assets/images/back-arrow.webp'
import Spinner from '../../assets/images/spinner.svg'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reinitializeDozen, maxDozen, nextDozen, prevDozen, selectDozen } from '../../redux/slices/dozenSlice'
import { selectArticle } from '../../redux/slices/articleSlice'
import { memorizeLastCategoryId } from '../../redux/slices/lastCategory'
import { StarWarsApiServices } from '../../api/api-sw'
import WikiNavbar from '../../components/WikiNavbar/WikiNavbar'



export default function Category() {

  const dispatch = useDispatch()
  const storedDozen = useSelector(selectDozen)
  const article = useSelector(selectArticle)
  const { categoryId } = useParams()
  const [items, setItems] = useState([])
  const [info, setInfo] = useState([])
  const [rightPage, updateRightPage] = useState(false)
  const [spinnerDisplay, setSpinnerDisplay] = useState('none')
  const nbDozen = useRef()
  const navigate = useNavigate()
  const { fetchStarWarsCategoryData } = StarWarsApiServices
  

  // Trouver les articles correspondant à la catégorie choisie
  const currentDatas = data.find((item) => item._id === categoryId)


  // Récupérer les informations depuis l'API
  useEffect(() => {

    // Gestion des mauvaises URLs
    if (!categoryId || !currentDatas) {
      navigate("*")
    } else {
      updateRightPage(true)
      dispatch(memorizeLastCategoryId(categoryId))

      // Appel à l'API StarWars Databank
      setSpinnerDisplay('block')
      fetchStarWarsCategoryData(currentDatas.keyword, storedDozen)
      .then(data => {
        if (data) {
          setInfo(data.info);
          setItems(data.data);
        }
        setSpinnerDisplay("none");
      });
      nbDozen.current = Math.ceil(info.total / 10);
    }
  }, [categoryId, currentDatas, navigate, storedDozen, info.total, fetchStarWarsCategoryData, dispatch])
  

  // Gestion du clic sur le bouton 
  // pour voir les articles suivants
  const nextPage = () => {
    if (storedDozen >= nbDozen.current) {
      dispatch(maxDozen(nbDozen.current))
    } else {
      dispatch(nextDozen(storedDozen))
    }
  }


  // Gestion du clic sur le bouton 
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
          <WikiNavbar />
          <div className='page-content'>
            <h1>{currentDatas.title}</h1>
            <SearchBar category={currentDatas.keyword} />
            <div className='card-list'>
              <img className='card-list-spinner spinner-1' style={{display: `${spinnerDisplay}`}} src={Spinner} alt="Premier spinner de chargement" />
              <img className='card-list-spinner spinner-2' style={{display: `${spinnerDisplay}`}} src={Spinner} alt="Second spinner de chargement" />
              <img className='card-list-spinner spinner-3' style={{display: `${spinnerDisplay}`}} src={Spinner} alt="Troisième spinner de chargement" />
              {article.value === undefined ? 
                (
                  items.map((item) =>
                    <CardObserverWrapper key={item._id} item={item} categoryId={categoryId} />
                  )
                ) : (
                    <Card key={article._id} item={article.value} categoryId={categoryId} />
                )
              }
            </div>
            <div className='arrow-section'>
              <div className='prev-arrow-section'
                tabIndex='0'
                style={{display: storedDozen <= 1 || article.value ? 'none' : 'flex'}} 
                onClick={prevPage}
                onKeyDown={(e) => e.key === 'Enter' && prevPage()}
                title='Retourner à la page précédente'
              >
                <img className='arrows' src={BackArrow} alt="back arrow" />
              </div>
              <div className='next-arrow-section'
                tabIndex='0'
                style={{display: storedDozen >= nbDozen.current || article.value ? 'none' : 'flex'}} 
                onClick={nextPage}
                onKeyDown={(e) => e.key === 'Enter' && nextPage()}
                title='Aller à la page suivante'
              >
                <img className='arrows' src={NextArrow} alt="next arrow" />
              </div>
            </div>
            {spinnerDisplay === 'none' && (
              <div className='dozen-indicator' style={{display: article.value ? 'none' : 'block'}}>
                {!isNaN(nbDozen.current) && !isNaN(storedDozen) ? (
                  `${storedDozen} / ${nbDozen.current}`
                ) : null }
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}