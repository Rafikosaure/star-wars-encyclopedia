import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/index.css'
import '../styles/Topics.css'
import { useParams } from 'react-router-dom'


export default function Topics() {

  const { topicsCategoryId } = useParams()
  const [topics, setTopics] = useState()

  



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
        {/* <h1 className='topics-page-title'>{currentTopicCategory.title.toLowerCase()}</h1> */}
        <div className='topics-list'>
            appel à la bdd
        </div>
      </div>
    </div>
  )
}
