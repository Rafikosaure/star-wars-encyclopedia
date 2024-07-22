import React from 'react'
// import { useState, useEffect } from 'react'
import '../styles/index.css'
import '../styles/Topics.css'
// import { useParams } from 'react-router-dom'
// import topicCategoriesData from '../data/localTopicCategories.json'


export default function Topics() {

  // const { topicsCategoryId } = useParams()
  // const [categories, setCategories] = useState()


  // useEffect(() => {
  //   fetch('http://localhost:8000/category/getCategories')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //       setCategories(data)
  //     })
  //     .catch(error => console.log(error))

  // }, [])
  

    // const currentTopicCategory = topicCategoriesData.find((topicCategory) => topicCategory._id === topicCategoryId)

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
