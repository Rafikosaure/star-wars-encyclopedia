import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/index.css'
import '../styles/Topics.css'
import { useParams } from 'react-router-dom'
import TopicCard from '../components/TopicCard'


export default function Topics() {

  const { topicsCategoryId } = useParams()
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState()
  const [topics, setTopics] = useState()



  useEffect(() => {
    fetch(`http://localhost:8000/topic/getTopicsByCategory/${topicsCategoryId}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setCurrentCategoryTitle(data.title)
        setTopics(data.topics)
      })
      .catch(error => console.log(error))

  }, [topicsCategoryId])
  

  return (
    <div className='app topics'>
      <div className='topics-overlay' />
      <div className='topics-main'>
        {currentCategoryTitle && (
          <h1 className='topics-page-title'>{currentCategoryTitle.toLowerCase()}</h1>
        )}
        <div className='topics-list'>
            {topics && 
              (topics.map((topic, index) => 
                <TopicCard key={index} topic={topic} />
              ))
            }
        </div>
      </div>
    </div>
  )
}
