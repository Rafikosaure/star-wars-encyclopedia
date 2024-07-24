import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/index.css'
import '../styles/Topics.css'
import { useParams } from 'react-router-dom'
import TopicCard from '../components/TopicCard'


export default function Topics() {

  const { topicsCategoryId } = useParams()
  const [currentCategory, setCurrentCategory] = useState()
  const [topics, setTopics] = useState()
  

  useEffect(() => {
    fetch('http://localhost:8000/category/getCategories')
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      setCurrentCategory(data.find((category) => category._id === topicsCategoryId))
    })
    .catch(error => console.log(error))

  }, [topicsCategoryId])


  useEffect(() => {
    fetch(`http://localhost:8000/topic/getTopics/${topicsCategoryId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setTopics(data)
      })
      .catch(error => console.log(error))

  }, [topicsCategoryId])
  

  return (
    <div className='app topics'>
      <div className='topics-overlay' />
      <div className='topics-main'>
        {currentCategory && (
          <h1 className='topics-page-title'>{currentCategory.title.toLowerCase()}</h1>
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
