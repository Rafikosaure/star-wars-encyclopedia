import React from 'react'
import '../styles/index.css'
import '../styles/Topics.css'
import { useParams } from 'react-router-dom'
import topicCategoriesData from '../data/localTopicCategories.json'


export default function Topics() {

    const { topicCategoryId } = useParams()
    const currentTopicCategory = topicCategoriesData.find((topicCategory) => topicCategory._id === topicCategoryId)

  return (
    <div className='app topics'>
      <div className='topics-overlay' />
      <div className='topics-main'>
        <h1 className='topics-page-title'>{currentTopicCategory.title.toLowerCase()}</h1>
        <div className='topics-list'>
            appel à la bdd
        </div>
      </div>
    </div>
  )
}
