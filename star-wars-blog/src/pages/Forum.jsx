import React from 'react'
import '../styles/index.css'
import '../styles/Forum.css'
import Collapse from '../components/Collapse'


export default function Forum() {
  return (
    <div className='app forum'>
      <div className='forum-overlay'/>
      <div className='forum-content'>
        <h1 className='forum-title'>Bienvenue dans le forum !</h1>
        <div className='chart-section'>
          <p className='chart-text'><strong>Vénérable Jedi, afin que votre visite soit guidée par la Force, voici quelques règles à respecter :</strong></p>
          <Collapse />
        </div>        
      </div>
    </div>
  )
}
