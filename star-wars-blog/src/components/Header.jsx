import '../styles/Header.css'
import Logo from '../assets/images/logo.webp'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateIsLoggedUser } from '../redux/slices/isLoggedUserSlice.js'
import { updateLoadedUser } from '../redux/slices/loadedUserSlice.js'
import { reinitializeDozen } from '../redux/slices/dozenSlice'
import DefaultAvatar from '../assets/images/EmojiBlitzBobaFett1.webp'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedState } from '../redux/slices/isLoggedUserSlice.js'
import { selectLoadedState } from '../redux/slices/loadedUserSlice.js'
import { saveForumData } from '../redux/slices/forumSlice.js'
import { saveTopicsData } from '../redux/slices/topicSlice.js'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import BurgerMenu from './BurgerMenu.jsx'
import { updateUserLog } from '../redux/slices/loggedUserSlice.js'
import config from '../config.js'


export default function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loggedUser, setLoggedUser] = useState()
  const isLogged = useSelector(selectIsLoggedState)
  const isLoaded = useSelector(selectLoadedState)
  

  useEffect(() => {
    // Vérifier la connexion d'un utilisateur
    if (!isLoaded || isLogged) {
      fetch(`${config.serverEndpoint}/auth/logged`, {
        credentials: "include"
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        if (!data.badAccessMessage) {
          setLoggedUser(data)
          dispatch(updateUserLog(data))
          dispatch(updateIsLoggedUser(true))
          dispatch(updateLoadedUser(true))
        } else {
          dispatch(updateIsLoggedUser(false))
          setLoggedUser()
        }
      })
      .catch(() => {
        dispatch(updateIsLoggedUser(false))
        setLoggedUser()
      })
    }
    
  }, [isLogged, dispatch, isLoaded])
    

  useEffect(() => {
    // Récupérer les catégories du forum avec leurs topics
    fetch(`${config.serverEndpoint}/category/getAllCategoriesWithTopics`)
    .then(response => response.json())
    .then(data => dispatch(saveForumData(data)))
    .catch(error => console.log(error))
  }, [dispatch])


  // Récupérer les topics du forum avec leurs posts
  useEffect(() => {
    fetch(`${config.serverEndpoint}/topic/getTopicsAndPosts`)
    .then(response => response.json())
    .then(data => dispatch(saveTopicsData(data)))
    .catch(error => console.log(error))

  }, [dispatch])
  

  // Fonction de déconnexion d'un utilisateur
  const logout = (e) => {
    e.preventDefault()
    fetch(`${config.serverEndpoint}/auth/logout`, {
      method: "POST",
      headers: {"Accept": "application/json", "Content-Type": "application/json"},
      credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
      if (!data.badAccessMessage) {
        dispatch(updateIsLoggedUser(false))
        setLoggedUser()
        dispatch(updateLoadedUser(false))
        toast("Vous êtes déconnecté !")
      } else {
        console.log('Echec de la déconnexion !')
      }
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
              <img src={Logo} alt="logo" title="Page d'accueil" />
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
                  <div className='header-div-logged-image' title='Compte utilisateur' onClick={() => navigate(`/account`)}>
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
        <BurgerMenu />
      </div>
    </div>
  )
}
