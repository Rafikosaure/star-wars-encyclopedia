import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/index.css'
import '../styles/Error404.css'

export default function Error404() {
  return (
    <div className='app'>
      <div className='error404-div'>
        <div />
        <h1>Ce ne sont pas ces droïdes-là que vous recherchez...</h1>
        <Link to='/' >Retour à la page d'Accueil</Link>
      </div>
      
    </div>
  )
}
