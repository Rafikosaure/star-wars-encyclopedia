import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/index.css'

export default function Error404() {
  return (
    <div className='app'>
      <h1>Oups... Cette page est inexistante !</h1>
      <Link to='/' >Retour à la page d'Accueil</Link>
    </div>
  )
}
