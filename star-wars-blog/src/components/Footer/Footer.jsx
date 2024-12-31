import React from 'react'
import './Footer.scss'

export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <ul>
          <h2>Mentions légales</h2>
          <li><a href="/legal">Politique de confidentialité</a></li>
          <li><a href='/legal#CGU'>Conditions Générales d'Utilisation</a></li>
          <li><a href='/legal#RGPD'>Gestion des données personnelles</a></li>
          <li><a href='/legal#cookies'>Politique des cookies</a></li>
        </ul>
        <ul>
          <h2>Réseaux sociaux</h2>
          <li><a href='https://www.linkedin.com/in/rafikbensadi' target='_blank' rel="noreferrer">LinkedIn</a></li>
          <li><a href="https://x.com/BenSadiRaf27412" target='_blank' rel="noreferrer">{`X (ex-Twitter)`}</a></li>
          <li><a href="https://www.facebook.com/rafik.bensadi.9/" target='_blank' rel="noreferrer">Facebook</a></li>
          <li><a href="https://www.instagram.com/rafikosaure/" target='_blank' rel="noreferrer">Instagram</a></li>
        </ul>
        <ul>
          <h2>Contact</h2>
          <li><a href="mailto:rafikbensadi@live.fr?subject=Contact%20depuis%20rafikbensadi.com">Contact par email</a></li>
          {/* <li><a href="tel:+33649363839">Contact par téléphone</a></li> */}
        </ul>
      </div>
    </div>
  )
}
