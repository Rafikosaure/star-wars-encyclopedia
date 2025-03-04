import './SearchBar.scss'
import data from '../../data/localApiCategories.json'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveAnArticle } from '../../redux/slices/articleSlice'
import { StarWarsApiServices } from '../../api/api-sw'
import { ServerServices } from '../../api/api-server'



export default function SearchBar({ category }) {

  const [articlesList, setArticlesList] = useState([])
  const [search, setSearch] = useState("")
  const [article, setArticle] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { getArticlesByCategory } = StarWarsApiServices
  const { translateText } = ServerServices


  // Récupération du tableau des articles de la catégorie concernée
  useEffect(() => {
    getArticlesByCategory(category)
      .then(articles => {
        setArticlesList(articles);
      })
      .catch(error => {
        console.log(error);
      });
  }, [category, getArticlesByCategory]);


  // Recherche dans les articles récupérés depuis l'API
  useEffect(() => {
    if (search !== "" && articlesList.length > 0) {
      const filteredArticles = articlesList.filter((article) =>

        // On compare la recherche avec les noms d'articles récupérés, 
        // en mettant tout en minuscules et sans les caractères spéciaux
        article.name.toLowerCase().replace(new RegExp("[^(a-z0-9)]", "g"), '')
        .includes(search.toLowerCase().replace(new RegExp("[^(a-z0-9)]", "g"), ''))
      );
      if (filteredArticles.length === 1) {
        setArticle(filteredArticles[0])
        dispatch(saveAnArticle(article))
      } else {
        setArticle()
        dispatch(saveAnArticle())
      }
    } else {
      setArticle()
      dispatch(saveAnArticle())
    }
  }, [search, dispatch, article, articlesList])


  // Traductions
  const translateSearch = async (text) => {
    const translation = await translateText("FR", "EN-US", text);
    if (translation) {
      setSearch(translation);
    }
  };

  
  // Validation du formulaire (redirection vers la page article concernée)
  const onFormSubmit = (e) => {
    e.preventDefault()
    if (article) {
      const currentData = data.find((item) => item.keyword === category)
      const categoryId = currentData._id
      navigate(`/article/${categoryId}.${article._id}`)
    }
  }


  return (
    <div className='search-bar'>
      <form className='search-form' onSubmit={(e) => onFormSubmit(e)}>
        <input type="text" name="search-input" id="search-input" className='search-input' placeholder='Débutez une recherche...' onChange={e => translateSearch(e.target.value)} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Débutez une recherche..."} />
      </form>
    </div>
  )
}
