import React from 'react'
import '../styles/index.css'
import '../styles/Forum.css'

export default function Forum() {
  return (
    <div className='app forum'>
      <div className='forum-overlay'/>
      <div className='forum-content'>
        <h1>Bienvenue dans le forum !</h1>
        <div className='chart-section'>
          <p><strong>Important :</strong> afin que votre visite soit guidée par la Force, voici les quelques règles à respecter</p>
          <div>
            CHARTE DU FORUM
          </div>
        </div>
        
      </div>
    </div>
  )
}
