import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/index.css'
import '../styles/Topics.css'
import { useParams } from 'react-router-dom'
import TopicCard from '../components/TopicCard'
import { useSelector } from 'react-redux'
import { selectForumData } from '../redux/slices/forumSlice'
import { Link } from 'react-router-dom'
import ReturnArrow from '../assets/images/return-arrow.webp'


export default function Topics() {

  const forumData = useSelector(selectForumData)
  const { topicsCategoryId } = useParams()
  const navigate = useNavigate()
  const [currentData, setCurrentData] = useState()

  
  useEffect(() => {
    // Attendre que les data soient chargées
    if (forumData) {
      // Vérifier la validité de l'id de la catégorie
      const verifyId = forumData.find((category) => category._id === topicsCategoryId)
      if (verifyId) {
        // Si l'id est valide : trouver les articles correspondant à la catégorie
        setCurrentData(forumData.find((category) => category._id === topicsCategoryId))
      } else {
        // Sinon, redirection vers l'entrée du forum
        navigate("*")
      }
    }
    

  }, [currentData, navigate, forumData, topicsCategoryId])

  return (
    <div className='app topics'>
      <div className='topics-div-return' title='Retour vers le forum'>
          <Link to='/forum' className='arrow-link'>
              <img src={ReturnArrow} alt="Return to the topics page" />
          </Link>
      </div>
      <div className='topics-overlay' />
      {currentData ? (
        <div className='topics-main'>
        {currentData.title && (
          <h1 className='topics-page-title'>{currentData.title.toLowerCase()}</h1>
        )}
        <div className='topics-list'>
          {currentData.topics && 
            (currentData.topics.map((topic, index) => 
              <TopicCard key={index} topic={topic} />
            ))
          }
        </div>
      </div>
      ) : null}
      
    </div>
  )
}
