import React from 'react'
import { useState, useEffect } from 'react'
import './Card.scss'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reinitializeDozen } from '../../redux/slices/dozenSlice'
import { ServerServices } from '../../api/api-server'



export default function Card({ item, categoryId }) {
  
  const dispatch = useDispatch()
  const location = useLocation()
  const itemId = item._id
  const paramsIds = `${categoryId}.${itemId}`
  const [translatedName, setTranslatedName] = useState()

  
  // Traduction linguistique automatique du sujet traité
  useEffect(() => {
    if (location.pathname !== "/") {
      const fetchTranslation = async () => {
        const translation = await ServerServices.translateText("EN", "FR", item.name);
        if (translation) {
          setTranslatedName(translation);
        }
      };
      fetchTranslation();
    }
    }, [item.name, location])
    

  return (
    <>
      {location.pathname !== "/" ? (
        <div className='card card-home'>
          <Link className='card-link' to={`/article/${paramsIds}`}>
            <div className='card-image'>
              <img src={item.image} alt={`Carte de l'article "${item.name}"`} />
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
              <img src={item.image} alt={`Carte de la catégorie des ${item.title}`} />
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
