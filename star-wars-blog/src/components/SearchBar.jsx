import '../styles/SearchBar.css'
import data from '../data/localApiCategories.json'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveAnArticle } from '../redux/slices/articleSlice'
import config from '../config'


export default function SearchBar({ category }) {

  const [search, setSearch] = useState("")
  const [article, setArticle] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    if (search) {
      fetch(`${config.starWarsAPI}/${category}/name/${search}`)
      .then(response => response.json())
      .then(data => {
        setArticle(data[0])
        dispatch(saveAnArticle(article))
      })
      .catch(error => console.log(error))
    }

  }, [category, search, dispatch, article])
  
  
  const translateSearch = (text) => {
    const object = {
      sourceLang: "FR",
      targetLang: "EN-US",
      name: text
    }
    if (text) {
      fetch(`${config.serverEndpoint}/translate/name`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
      })
      .then(response => response.json())
      .then(data => setSearch(data.name.text.replace(/^"|"$/g, "")))
      .catch(error => console.log(error))
    }
  }


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
