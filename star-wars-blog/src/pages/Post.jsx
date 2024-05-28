import React from 'react'
import '../styles/index.css'
import '../styles/Post.css'

export default function Post() {

  const postTitle = "Post"

  return (
    <div className='app post-page'>
        <div className='post-overlay' />
        <div className='post-content'>
            <h1 className='post-title'>{postTitle.toLowerCase()}</h1>
            
        </div>
    </div>
  )
}
