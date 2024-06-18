import React, { useEffect } from 'react'
import { useState } from 'react'
import '../styles/Card.css'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reinitializeDozen } from '../redux/slices/dozenSlice'


export default function Card({ item, categoryId }) {
  
  // Cette objet "dispatch" permet d'appeler la fonction
  // du store redux servant à réinitialiser à 1 la dizaine 
  // d'articles affichés lors d'un clic sur une Carte:
  const dispatch = useDispatch()
  const location = useLocation()
  const itemId = item._id
  const paramsIds = `${categoryId}.${itemId}`
  const [translatedName, setTranslatedName] = useState()


  useEffect(() => {
    if (location.pathname !== "/") {
      const object = {
        sourceLang: "EN",
        targetLang: "FR",
        name: item.name
      }
      fetch('http://localhost:8080/translate/name', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data.name)
        setTranslatedName(data.name.text.replace(/^"|"$/g, ""))
      })
      .catch(error => console.log(error))
    }
      
    }, [item.name, translatedName, location])
    


  return (
    <>
      {location.pathname !== "/" ? (
        <div className='card card-home'>
          <Link className='card-link' to={`/article/${paramsIds}`}>
            <div className='card-image'>
              <img src={item.image} alt={item.name} />
            </div>
            <div className='card-name-div'>
              {translatedName && (
                  <p className="card-name">{translatedName}</p> 
              )}
            </div>
          </Link>
        </div>
      ) : (
        <div className='card'>  
          <Link className='card-link' 
            to={`/category/${itemId}`}
            onClick={(e) => {dispatch(reinitializeDozen())}}
            >
            <div className='card-image'>
              <img src={item.image} alt={item.title} />
            </div>
            <div className='card-name-div'>
              <p className="card-name">{item.title.toLowerCase()}</p>
            </div>
          </Link>
        </div>  
      )}
    </>
  )
}
