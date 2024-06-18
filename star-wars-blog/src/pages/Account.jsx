import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedState } from '../redux/slices/loggedUserSlice'
import { useDispatch } from 'react-redux'
import { updateLoggedUser } from '../redux/slices/loggedUserSlice'
import { useNavigate } from 'react-router-dom'
import '../styles/index.css'
import '../styles/Account.css'
import DefaultAvatar from '../assets/images/EmojiBlitzBobaFett1.webp'


export default function Account() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const isLogged = useSelector(selectLoggedState)

  useEffect(() => {
    fetch('http://localhost:8080/auth/logged', {
      credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      dispatch(updateLoggedUser(true))
      setUserData(data)
    })
    .catch(error => {
      console.log(error)
      dispatch(updateLoggedUser(false))
      navigate("/")
    })
  }, [isLogged, dispatch, navigate])


  return (
    <div className='app account-page'>
        <div className='account-overlay' />
        <div className='account-content'>
        {userData ? (
          <>
            <h1 className='account-title'>{`Bienvenue, ${userData.name} !`}</h1>
            <div className='account-data'>
              {userData.picture !== "" ? (
                <div className='account-user-picture'><img src={userData.picture} alt='avatar' /></div>
              ) : (
                <div className='account-user-picture'><img src={DefaultAvatar} alt='avatar' /></div>
              )}
              
              <div className='account-user-detail'><p className='account-user-key'>Pseudonyme :</p><p className='account-user-value'>{userData.name}</p></div>
              <div className='account-user-detail'><p className='account-user-key'>Email :</p><p className='account-user-value'>{userData.email}</p></div>
            </div>
            </>
        ) : (
          null
        )}
        </div>
    </div>
  )
}
