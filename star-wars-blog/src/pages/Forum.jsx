import React from 'react'
import '../styles/index.css'
import '../styles/Forum.css'
import Code from '../components/Code'
import topics from '../data/localTopics.json'


export default function Forum() {
  return (
    <div className='app forum'>
      <div className='forum-overlay'/>
      <div className='forum-content'>
        <h1 className='forum-title'>Bienvenue dans le forum !</h1>
        <div className='chart-section'>
          <p className='chart-text'><strong>Vénérable Jedi, afin que votre visite soit guidée par la Force, voici quelques règles à respecter :</strong></p>
          <Code />
        </div>
        <div className='forum-div-topics'>
          <h2>Discussions</h2>
          {topics.map((topic) => 
            <div className='div-topic'>
              <h3 key={topic._id} >{topic.title}</h3>
            </div>
          )}
        </div>    
      </div>
    </div>
  )
}
