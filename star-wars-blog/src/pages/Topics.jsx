import React from 'react'
import '../styles/index.css'
import '../styles/Topics.css'
import { useParams } from 'react-router-dom'
import topicData from '../data/localTopics.json'


export default function Topics() {

    const { topicsId } = useParams()
    const currentTopics = topicData.find((topic) => topic._id === topicsId)

  return (
    <div className='app topics'>
      <div className='topics-overlay' />
      <div className='topics-main'>
        <h1 className='topics-page-title'>{currentTopics.title.toLowerCase()}</h1>
        <div className='topics-list'>
            appel à la bdd
        </div>
      </div>
    </div>
  )
}
