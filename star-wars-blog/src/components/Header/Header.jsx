import './Header.scss'
import Logo from '../../assets/images/logo.webp'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateIsLoggedUser } from '../../redux/slices/isLoggedUserSlice.js'
import { updateLoadedUser } from '../../redux/slices/loadedUserSlice.js'
// import { reinitializeDozen } from '../../redux/slices/dozenSlice.js'
import DefaultAvatar from '../../assets/images/EmojiBlitzBobaFett1.webp'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice.js'
import { selectLoadedState } from '../../redux/slices/loadedUserSlice.js'
import { setCurrentTopicDozen } from '../../redux/slices/topicDozenSlice.js'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx'
import { ReactComponent as ArrowToRight } from '../../assets/images/right-arrow-next.svg'
import { updateUserLog } from '../../redux/slices/loggedUserSlice.js'
import { ServerServices } from '../../api/api-server.js'
import { selectLastCategoryId } from '../../redux/slices/lastCategory.js'



export default function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const lastCategoryId = useSelector(selectLastCategoryId)
  const [loggedUser, setLoggedUser] = useState()
  const isLogged = useSelector(selectIsLoggedState)
  const isLoaded = useSelector(selectLoadedState)
  const { checkUserConnection, logoutRequest } = ServerServices


  // Vérifier la connexion d'un utilisateur
  useEffect(() => {
    const connect = sessionStorage.getItem("connect");
    if ((!isLoaded || isLogged) && connect) {
      checkUserConnection()
      .then(data => {
        setLoggedUser(data);
        dispatch(updateUserLog(data));
        dispatch(updateIsLoggedUser(true));
        dispatch(updateLoadedUser(true));
      })
      .catch(() => {
        setLoggedUser(undefined);
        dispatch(updateUserLog(undefined));
        dispatch(updateIsLoggedUser(false));
        dispatch(updateLoadedUser(false));
      });
    }
  }, [isLogged, dispatch, isLoaded, checkUserConnection])
  

  // Fonction de déconnexion d'un utilisateur
  const logout = async (e) => {
    e.preventDefault();
    try {
      await logoutRequest();
      sessionStorage.removeItem("connect");
      dispatch(updateIsLoggedUser(false));
      setLoggedUser(undefined);
      dispatch(updateLoadedUser(false));

      const reinitializedTopicDozenState = {
          currentPage: 1,
          topicId: ''
      };
      dispatch(setCurrentTopicDozen(reinitializedTopicDozenState));

      toast("Vous êtes déconnecté !");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className='header'>
      <div className='navbar'>
        <NavLink 
          to="/"
          // onClick={() => dispatch(reinitializeDozen())}
          className={({ isActive }) =>
            isActive
              ? 'link-logo link-logo-disabled'
              : 'link-logo link-logo-enabled'
              }>
              <img src={Logo} alt="logo" title="Page d'accueil" />
        </NavLink>
        <div className='title-and-links'>
          <h1>
            <NavLink
              to="/"
              // onClick={() => dispatch(reinitializeDozen())}
              className={({ isActive }) =>
                isActive
                  ? 'main-title-navlink-inactive'
                  : 'main-title-navlink-active'
                  }
              >Star Wars Encyclopedia
            </NavLink>
          </h1>
          <nav>
            <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-active'
                        : 'navlink-inactive'
                        } to={`/category/${lastCategoryId}`}
                        // onClick={() => dispatch(reinitializeDozen())}
                        >Documentation</NavLink>
            <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-active'
                        : 'navlink-inactive'
                        } to="/forum" 
                        // onClick={() => dispatch(reinitializeDozen())}
                        >Forum</NavLink>
            <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-active'
                        : 'navlink-inactive'
                        } to="/movies" 
                        // onClick={() => dispatch(reinitializeDozen())}
                        >Vidéothèque</NavLink>
            <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-active'
                        : 'navlink-inactive'
                        } to="/shopping/market" 
                        // onClick={() => dispatch(reinitializeDozen())}
                        >Boutique de Wattoo</NavLink>
          </nav>
          <div className='header-div-connection'>
            {!isLogged ? (
              <p 
              tabIndex="0" 
              onClick={() => navigate('/auth')} 
              onKeyDown={(e) => e.key === 'Enter' && navigate('/auth')}
              className='connection-link'><ArrowToRight className="arrow-to-right-svg" /> Se connecter /<br />créer un compte</p>
            ) : (
              <>
              {loggedUser && (
                  <div tabIndex="0" 
                  className='header-div-logged-image' 
                  title='Compte utilisateur' 
                  onClick={() => navigate(`/account`)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/account`)}
                  >
                    {loggedUser.picture !== "" ? (
                      <img src={loggedUser.picture} alt="Profil de l'utilisateur" />
                    ) : (
                      <img src={DefaultAvatar} alt="Profil de l'utilisateur" />
                    )}
                  </div>
              )}
              <div className='auth-links-div'>
                <p 
                tabIndex="0" 
                onClick={(e) => logout(e)}
                onKeyDown={(e) => e.key === 'Enter' && logout(e)} 
                className='connection-link-logout'
                ><ArrowToRight className="arrow-to-right-svg" /> Déconnexion</p>
                <p 
                tabIndex="0" 
                onClick={() => navigate('/auth')}
                onKeyDown={(e) => e.key === 'Enter' && navigate('/auth')} 
                className='connection-link-logout'
                ><ArrowToRight className="arrow-to-right-svg" /> Créer un compte</p>
              </div>
              
              </>
            )}
          </div>
        </div>
        <BurgerMenu />
      </div>
      <div>
        
      </div>
    </div>
  )
}
