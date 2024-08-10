import React from 'react'
import './Footer.scss'

export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <ul>
          <h2>Mentions légales</h2>
          <li><a href='/'>Conditions Générales d'Utilisation</a></li>
          <li><a href='/'>RGPD</a></li>
          <li><a href='/'>Politique des cookies</a></li>
        </ul>
        <ul>
          <h2>Réseaux sociaux</h2>
          <li><a href='https://www.linkedin.com/in/rafikbensadi' target='_blank' rel="noreferrer">linkedin</a></li>
          <li><a href="https://www.instagram.com/rafikosaure/" target='_blank' rel="noreferrer">instagram</a></li>
          <li><a href="https://www.facebook.com/rafik.bensadi.9/" target='_blank' rel="noreferrer">facebook</a></li>
        </ul>
        <ul>
          <h2>Contact</h2>
          <li><a href="mailto:rafikbensadi@live.fr?subject=Contact%20depuis%20rafikbensadi.com">par email</a></li>
          <li><a href="tel:+33649363839">par téléphone</a></li>
        </ul>
      </div>
    </div>
  )
}
