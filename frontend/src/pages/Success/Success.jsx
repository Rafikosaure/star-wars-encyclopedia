import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import '../../theme/index.scss'
import './Success.scss'
import { useDispatch } from 'react-redux'
import { emptyBasket } from '../../redux/slices/shoppingBasket'
import config from '../../config'


export default function Error404() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const shoppingStringSession = sessionStorage.getItem('shoppingStringSession');

  
  // Prise en charge de l'affichage de la page
  useEffect(() => {

    // Chargement non-autorisé : redirection vers la page du marché
    if (shoppingStringSession !== config.shoppingStringSession) {
      navigate('/shopping/market');

    // Chargement autorisé :
    } else {      
      dispatch(emptyBasket()) // 1) Vider le panier
      sessionStorage.removeItem('shoppingStringSession') // 2) Supprimer le jeton
    }
  });


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
