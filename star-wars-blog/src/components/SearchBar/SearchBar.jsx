import './SearchBar.scss'
import data from '../../data/localApiCategories.json'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveArticlesArray } from '../../redux/slices/articlesArraySlice'
import config from '../../config'


export default function SearchBar({ category }) {

  const [search, setSearch] = useState("")
  const [translatedName, setTranslatedName] = useState("")
  const [articlesList, setArticlesList] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()



  // Récupération du tableau des articles de la catégorie concernée
  useEffect(() => {
    fetch(`${config.starWarsAPI}/${category}?page=1&limit=all`)
    .then(response => response.json())
    .then(data => {
      const articlesData = data.data.map((article) => {
        let item = {}
        item._id = article._id
        item.name = article.name
        item.image = article.image
        return item
      })
      setArticlesList(articlesData);
    })
    .catch(error => {
      console.log(error)
    })
  }, [category])


  // Traduction vers l'anglais du texte entré dans l'input
  useEffect(() => {
    if (search !== "") {
      const object = {
        sourceLang: "fr",
        targetLang: "EN-US",
        array: [{
          id: "",
          name: search,
          image: ""
        }]
      }
      fetch(`${config.serverEndpoint}/translate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
      })
      .then(response => response.json())
      .then(data => {
        setTranslatedName(data.translatedArray[0].name)
      })
      .catch(error => console.log(error))
    }
  }, [search])


  // Récupération des articles pour l'autocomplétion
  useEffect(() => {
    if (articlesList.length > 0 && translatedName !== "") {
      const filteredArticles = articlesList.filter((article) =>
        article.name.toLowerCase().includes(translatedName.toLowerCase())
      );
      setFilteredArticles(filteredArticles);
    } else {
      setFilteredArticles([])
    }    
  }, [articlesList, translatedName])


  // Enregistrement des articles filtrés dans le store Redux
  useEffect(() => {
    if (filteredArticles.length > 0 && search !== "") {
      dispatch(saveArticlesArray(filteredArticles))
    } else {
      dispatch(saveArticlesArray([]))
    }
  }, [filteredArticles, search, dispatch])

  
  // Validation du formulaire (redirection vers la page article concernée)
  const onFormSubmit = (e) => {
    e.preventDefault()
    if (filteredArticles.length === 1) {
      const currentData = data.find((item) => item.keyword === category)
      const categoryId = currentData._id

      // Récupération de l'article unique correspondant à la recherche
      const currentArticle = filteredArticles[0]

      // Navigation vers la page Article correspondant l'article recherché
      navigate(`/article/${categoryId}.${currentArticle._id}`)
    }
  }


  return (
    <div className='search-bar'>
      <form className='search-form' onSubmit={(e) => onFormSubmit(e)}>
        <input type="text" name="search-input" id="search-input" className='search-input' placeholder='Débutez une recherche...' onChange={e => setSearch(e.target.value)} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Débutez une recherche..."} />
      </form>
    </div>
  )
}
