import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.scss'

export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <ul>
          <h3>Mentions légales</h3>
          <li><Link to='/blog'>blog</Link></li>
          <li><a href='https://rafikbensadi.com/' target='_blank' rel="noreferrer">portfolio de développeur</a></li>
          <li><a href="https://github.com/Rafikosaure" target='_blank' rel="noreferrer">compte github</a></li>
        </ul>
        <ul>
          <h3>Réseaux sociaux</h3>
          <li><a href="https://www.facebook.com/rafik.bensadi.9/" target='_blank' rel="noreferrer">facebook</a></li>
          <li><a href="https://www.instagram.com/rafikosaure/" target='_blank' rel="noreferrer">instagram</a></li>
          <li><a href='https://www.linkedin.com/in/rafikbensadi' target='_blank' rel="noreferrer">linkedin</a></li>
        </ul>
        <ul>
          <h3>Contact</h3>
          <li><a href="mailto:rafikbensadi@live.fr?subject=Contact%20depuis%20rafikbensadi.com">email: me contacter</a></li>
          <li><a href="tel:+33649363839">me téléphoner</a></li>
        </ul>
      </div>
    </div>
  )
}
