import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice'
import { useDispatch } from 'react-redux'
import { selectReloadUsersState } from '../../redux/slices/reloadUsersArray'
import { reloadUsersArrayFunction } from '../../redux/slices/reloadUsersArray'
import { selectLoggedUser } from '../../redux/slices/loggedUserSlice'
import { useNavigate, Link } from 'react-router-dom'
import '../../sharedStyles/index.scss'
import '../../sharedStyles/Account.scss'
import UserData from '../../components/UserData/UserData'
import ReturnArrow from '../../assets/images/return-arrow.webp'
import { ServerServices } from '../../api/api-server'



export default function Admin() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [allUsers, setAllUsers] = useState()
  const reloadUsers = useSelector(selectReloadUsersState)
  const isLogged = useSelector(selectIsLoggedState)
  const loggedUser = useSelector(selectLoggedUser)
  const { getAllUsers } = ServerServices


  // Redirection automatique en cas d'accès non-autorisé
  useEffect(() => {
    if (!isLogged || loggedUser.isAdmin !== true) {
      navigate("/")
    }
  }, [isLogged, loggedUser, navigate])


  // Récupération des utilisateurs non-admins du site
  useEffect(() => {
    if (!reloadUsers || !allUsers) {
      getAllUsers()
      .then(data => {
        dispatch(reloadUsersArrayFunction(true))
        setAllUsers(data.filter((user) => user.isAdmin !== true))
        dispatch(reloadUsersArrayFunction(true))
      })
      .catch(error => {
        console.log(error)
        dispatch(reloadUsersArrayFunction(true))
        navigate('/')
      })
    }
  }, [reloadUsers, allUsers, dispatch, navigate, getAllUsers])
  
  
  return (
    <div className='app account-page'>
      <div className='account-overlay' />
      <div className='account-content'>
        <div className='account-div-return' title='Retour vers le compte utilisateur'>
          <Link to='/account' className='admin-arrow-link'>
            <img src={ReturnArrow} alt="Return to the account page" />
          </Link>
        </div>
        <h1 className='account-title'>Administration</h1>
        <div className='account-data'>
          <h2 className='account-profile-title'>Gestion des utilisateurs</h2>
          {allUsers && (
            allUsers.map((user) => 
              <UserData key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}
