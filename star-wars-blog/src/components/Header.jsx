import '../styles/Header.css'
import Logo from '../assets/images/logo.webp'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateLoggedUser } from '../redux/slices/loggedUserSlice.js'
import { reinitializeDozen } from '../redux/slices/dozenSlice'
import Emoji from '../assets/images/EmojiBlitzBobaFett1.webp'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLoggedState } from '../redux/slices/loggedUserSlice.js'
import { useEffect } from 'react'



export default function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogged = useSelector(selectLoggedState)
  
  useEffect(() => {
    fetch('http://localhost:8080/auth/logged', {
      credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      dispatch(updateLoggedUser(true))
    })
    .catch(error => {
      console.log(error)
      dispatch(updateLoggedUser(false))
    })
  }, [isLogged, dispatch])
    

  
  const logout = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/auth/logout', {
      method: "POST",
      headers: {"Accept": "application/json", "Content-Type": "application/json"},
      credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      dispatch(updateLoggedUser(false))
    })
    .catch(error => console.log(error))
  }
  
  return (
    <div className='header'>
      <div className='navbar'>
        <NavLink 
          to="/"
          onClick={() => dispatch(reinitializeDozen())}
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
            <NavLink to="/category/f6def03b-7818-4951-9d8a-afbe17aa205b" onClick={() => dispatch(reinitializeDozen())}>personnages</NavLink>
            <NavLink to="/category/645e063c-af40-4576-b674-d44be61b0773" onClick={() => dispatch(reinitializeDozen())}>créatures</NavLink>
            <NavLink to="/category/2857b650-12ec-4671-86a8-0d5c5db0518e" onClick={() => dispatch(reinitializeDozen())}>droïds</NavLink>
            <NavLink to="/category/a5ebca47-0ce4-452c-84c2-2d1c23309458" onClick={() => dispatch(reinitializeDozen())}>lieux</NavLink>
            <NavLink to="/category/13043736-7457-4a22-9218-4f9134f61b0c" onClick={() => dispatch(reinitializeDozen())}>organisations</NavLink>
            <NavLink to="/category/d4ac0725-f089-42c4-a76b-817764c5e0ab" onClick={() => dispatch(reinitializeDozen())}>espèces</NavLink>
            <NavLink to="/category/1812c326-e3a3-4a84-9a69-4dd64f5a298d" onClick={() => dispatch(reinitializeDozen())}>véhicules</NavLink>
            <NavLink to="/forum" onClick={() => dispatch(reinitializeDozen())}>Forum</NavLink>
          </nav>
          <div className='header-div-connection'>
            {!isLogged ? (
              <p onClick={() => navigate('/auth')} className='connection-link'>Se connecter</p>
            ) : (
              <>
              <img onClick={() => navigate(`/account`)} src={Emoji} alt="Profil de l'utilisateur" />
              <p onClick={(e) => logout(e)} className='connection-link-logout'>Déconnexion</p>
              </>
            )}
          </div>
        </div>
        
      </div>
    </div>
  )
}
