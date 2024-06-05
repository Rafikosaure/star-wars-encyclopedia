import React from 'react'
import '../styles/index.css'
import '../styles/Forum.css'
import Code from '../components/Code'
import topicCategories from '../data/localTopicCategories.json'
import { useNavigate } from 'react-router-dom'


export default function Forum() {

  const navigate = useNavigate()
  const forumTitle1 = "Bienvenue dans le forum !"
  const forumTitle2 = "Thématiques"

  return (
    <div className='app forum'>
      <div className='forum-overlay'/>
      <div className='forum-content'>
        <h1 className='forum-title'>{forumTitle1.toLowerCase()}</h1>
        <div className='chart-section'>
          <p className='chart-text'><strong>Vénérable Jedi, afin que votre visite soit guidée par la Force, voici quelques règles à respecter :</strong></p>
          <Code />
        </div>
        <div className='forum-div-topics'>
          <h2>{forumTitle2.toLowerCase()}</h2>
          {topicCategories.map((topic) => 
            <div className='div-topic' key={topic._id} onClick={() => navigate(`/topics/${topic._id}`)}>
              <h3>{topic.title}</h3>
            </div>
          )}
        </div>    
      </div>
    </div>
  )
}
