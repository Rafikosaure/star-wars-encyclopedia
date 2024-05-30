import '../styles/Header.css'
import { useEffect } from 'react'
import Logo from '../assets/images/logo.webp'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reinitializeDozen } from '../redux/slices/dozenSlice'
import Emoji from '../assets/images/EmojiBlitzBobaFett1.webp'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectloggedUserState } from '../redux/slices/loggedUserSlice'
// import { updateLoggedUser } from '../redux/slices/loggedUserSlice'


export default function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedUser = useSelector(selectloggedUserState)
  
  useEffect(() => {
    console.log(loggedUser)
  }, [loggedUser])
  
  return (
    <div className='header'>
      <div className='navbar'>
        <NavLink 
          to="/"
          onClick={(e) => dispatch(reinitializeDozen())}
          className={({ isActive }) =>
            isActive
              ? 'link-logo link-logo-disabled'
              : 'link-logo link-logo-enabled'
              }>
              <img src={Logo} alt="logo" />
        </NavLink>
        <div className='title-and-links'>
          <h1>Star Wars Encyclopedia</h1>
          <nav>
            <NavLink to="/category/f6def03b-7818-4951-9d8a-afbe17aa205b" onClick={(e) => dispatch(reinitializeDozen())}>personnages</NavLink>
            <NavLink to="/category/645e063c-af40-4576-b674-d44be61b0773" onClick={(e) => dispatch(reinitializeDozen())}>créatures</NavLink>
            <NavLink to="/category/2857b650-12ec-4671-86a8-0d5c5db0518e" onClick={(e) => dispatch(reinitializeDozen())}>droïds</NavLink>
            <NavLink to="/category/a5ebca47-0ce4-452c-84c2-2d1c23309458" onClick={(e) => dispatch(reinitializeDozen())}>lieux</NavLink>
            <NavLink to="/category/13043736-7457-4a22-9218-4f9134f61b0c" onClick={(e) => dispatch(reinitializeDozen())}>organisations</NavLink>
            <NavLink to="/category/d4ac0725-f089-42c4-a76b-817764c5e0ab" onClick={(e) => dispatch(reinitializeDozen())}>espèces</NavLink>
            <NavLink to="/category/1812c326-e3a3-4a84-9a69-4dd64f5a298d" onClick={(e) => dispatch(reinitializeDozen())}>véhicules</NavLink>
            <NavLink to="/forum" onClick={(e) => dispatch(reinitializeDozen())}>Forum</NavLink>
          </nav>
          <div className='header-div-connection'>
            {loggedUser ? (
              <>
              <img src={Emoji} alt="Profil de l'utilisateur" />
              <p className='connection-link'>Déconnexion</p>
              </>
            ) : (
              <p onClick={() => navigate('/auth')} className='connection-link-unlogged'>Se connecter</p>
            )}
          </div>
        </div>
        
      </div>
    </div>
  )
}
