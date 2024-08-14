import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../sharedStyles/index.scss'
import './Topics.scss'
import { useParams } from 'react-router-dom'
import TopicCard from '../../components/TopicCard/TopicCard'
import { Link } from 'react-router-dom'
import ReturnArrow from '../../assets/images/return-arrow.webp'
import TopicForm from '../../components/TopicForm/TopicForm'
import config from '../../config'


export default function Topics() {

  const { topicsCategoryId } = useParams()
  const navigate = useNavigate()
  const [topicsData, setTopicsData] = useState()
  const [categoryTitle, setCategoryTitle] = useState()



  // Récupérer les topics de la catégorie
  useEffect(() => {
    fetch(`${config.serverEndpoint}/topic/getTopicsByCategory/${topicsCategoryId}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      if (data.error) {
        navigate('*')
      } else {
        setCategoryTitle(data.title)
        setTopicsData(data.topics)
      }
    })
    .catch(error => {
      console.log(error)
    })
    
  }, [topicsCategoryId, navigate])



  return (
    <div className='app topics'>
      <div className='topics-div-return' title='Retour vers le forum'>
          <Link to='/forum' className='arrow-link'>
              <img src={ReturnArrow} alt="Return to the topics page" />
          </Link>
      </div>
      <div className='topics-overlay' />
      {categoryTitle ? (
        <div className='topics-main'>
        {categoryTitle && (
          <h1 className='topics-page-title'>{categoryTitle.toLowerCase()}</h1>
        )}
        <div className='topics-list'>
          {topicsData && 
            (topicsData.map((topic, index) => 
              <TopicCard key={index} topic={topic} />
            ))
          }
          <div className='topic-creation-form'>
            <TopicForm topicsCategoryId={topicsCategoryId} />
          </div>
        </div>
      </div>
      ) : null}
    </div>
  )
}
