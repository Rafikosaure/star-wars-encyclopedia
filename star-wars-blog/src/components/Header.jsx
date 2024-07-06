import '../styles/Header.css'
import Logo from '../assets/images/logo.webp'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateLoggedUser } from '../redux/slices/loggedUserSlice.js'
import { updateLoadedUser } from '../redux/slices/loadedUserSlice.js'
import { reinitializeDozen } from '../redux/slices/dozenSlice'
import DefaultAvatar from '../assets/images/EmojiBlitzBobaFett1.webp'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLoggedState } from '../redux/slices/loggedUserSlice.js'
import { selectLoadedState } from '../redux/slices/loadedUserSlice.js'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'


export default function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loggedUser, setLoggedUser] = useState()
  const isLogged = useSelector(selectLoggedState)
  const isLoaded = useSelector(selectLoadedState)
  

  useEffect(() => {
    if (!isLoaded) {
      fetch('http://localhost:8000/user/logged', {
        credentials: "include"
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setLoggedUser(data)
        dispatch(updateLoggedUser(true))
        dispatch(updateLoadedUser(true))
      })
      .catch(error => {
        // console.log(error)
        dispatch(updateLoggedUser(false))
        setLoggedUser()
      })
    }
    
  }, [isLogged, dispatch, isLoaded])
    

  
  const logout = (e) => {
    e.preventDefault()
    fetch('http://localhost:8000/user/logout', {
      method: "POST",
      headers: {"Accept": "application/json", "Content-Type": "application/json"},
      credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      dispatch(updateLoggedUser(false))
      setLoggedUser()
      dispatch(updateLoadedUser(false))
      toast("Vous êtes déconnecté !")
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
              {loggedUser && (
                <>
                {loggedUser.picture !== "" ? (
                  <div className='header-div-logged-image' onClick={() => navigate(`/account`)}>
                    <img src={loggedUser.picture} alt="Profil de l'utilisateur" />
                  </div>
                ) : (
                  <div className='header-div-logged-image' onClick={() => navigate(`/account`)}>
                    <img src={DefaultAvatar} alt="Profil de l'utilisateur" />
                  </div>
                )}
                </>                
              )}
              <p onClick={(e) => logout(e)} className='connection-link-logout'>Déconnexion</p>
              </>
            )}
          </div>
        </div>
        
      </div>
    </div>
  )
}
