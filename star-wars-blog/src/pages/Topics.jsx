import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/index.css'
import '../styles/Topics.css'
import { useParams } from 'react-router-dom'
import TopicCard from '../components/TopicCard'
import { useSelector } from 'react-redux'
import { selectForumData } from '../redux/slices/forumSlice'



export default function Topics() {

  const { topicsCategoryId } = useParams()
  const navigate = useNavigate()
  const forumData = useSelector(selectForumData)
  const [currentData, setCurrentData] = useState()


  useEffect(() => {
    // Trouver les articles correspondant à la catégorie choisie 
    // & gestion des urls incorrectes
    if (forumData && topicsCategoryId) {
      setCurrentData(forumData.find((category) => category._id === topicsCategoryId))
    } else {
      navigate("/forum")
    }
  }, [currentData, navigate, topicsCategoryId, forumData])

  return (
    <div className='app topics'>
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
