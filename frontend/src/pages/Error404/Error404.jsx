import { Link } from 'react-router-dom'
import '../../theme/index.scss'
import './Error404.scss'


// Page d'erreur 404
// Affiche un message d'erreur et un lien pour revenir à la page d'accueil
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
