import { useEffect, useRef, useState, useCallback } from 'react'
import './Category.scss'
import Card from '../../components/Card/Card'
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
import { ServerServices } from '../../api/api-server'
import WikiNavbar from '../../components/WikiNavbar/WikiNavbar'
import ReturnToTop from '../../components/ReturnToTop/ReturnToTop'



export default function Category() {

  const dispatch = useDispatch()
  const storedDozen = useSelector(selectDozen)
  const article = useSelector(selectArticle)
  const { categoryId } = useParams()
  const [translatedItems, setTranslatedItems] = useState([])
  const [info, setInfo] = useState([])
  const [rightPage, updateRightPage] = useState(false)
  const [spinnerDisplay, setSpinnerDisplay] = useState('none')
  const nbDozen = useRef()
  const navigate = useNavigate()
  const { fetchStarWarsCategoryData } = StarWarsApiServices
  const { translateText } = ServerServices
  

  // Trouver les articles correspondant à la catégorie choisie
  const currentDatas = data.find((item) => item._id === categoryId)
    

  // Traduire les noms des articles de manière groupée
  // pour éviter de faire une requête par article
  const translateTextCallback = useCallback(async (data) => {
    try {
      const frenchNames = await translateText("EN", "FR", data.map(item => item.name).join(','));
      setTranslatedItems(data.map((item, index) => ({
        ...item,
        name: frenchNames.split(',')[index] || item.name
      })));
    } catch (error) {
      console.error("Error translating article names:", error);
    }
  }, [translateText]);


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
          translateTextCallback(data.data);
        }
        setSpinnerDisplay("none");
      });
      nbDozen.current = Math.ceil(info.total / 10);
    }
  }, [categoryId, currentDatas, navigate, storedDozen, info.total, fetchStarWarsCategoryData, dispatch, translateTextCallback]);


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
          <ReturnToTop />
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
                  translatedItems.map((item) =>
                    <Card key={item._id} item={item} categoryId={categoryId} />
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
                <span className='dozen-indicator-text'>
                  {`${storedDozen} / ${nbDozen.current}`}
                </span>
              ) : null }
            </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}