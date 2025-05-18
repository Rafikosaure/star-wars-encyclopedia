import React from 'react'
import { Link } from 'react-router-dom'
import '../../sharedStyles/index.scss'
import './Success.scss'

export default function Error404() {
  return (
    <div className='app sell-page'>
      <div className='sell-overlay' />
      <div className='sell-div'>        
        <h1>Les dataries ont fait l'affaire ! Merci pour vos achats !</h1>
        <Link to='/shopping/market' >Retourner à la boutique</Link>
      </div>
      
    </div>
  )
}
