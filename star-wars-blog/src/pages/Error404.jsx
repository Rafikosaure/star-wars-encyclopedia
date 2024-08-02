import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/index.scss'
import '../styles/Error404.scss'

export default function Error404() {
  return (
    <div className='app error-page'>
      <div className='error-overlay' />
      <div className='error404-div'>        
        <h1>Ce ne sont pas ces droïdes-là que vous recherchez...</h1>
        <Link to='/' >Retour à la page d'Accueil</Link>
      </div>
      
    </div>
  )
}
