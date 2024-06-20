import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedState } from '../redux/slices/loggedUserSlice'
import { useDispatch } from 'react-redux'
import { updateLoggedUser } from '../redux/slices/loggedUserSlice'
import { updateLoadedUser } from '../redux/slices/loadedUserSlice'
import { useNavigate } from 'react-router-dom'
import '../styles/index.css'
import '../styles/Account.css'
import DefaultAvatar from '../assets/images/EmojiBlitzBobaFett1.webp'
import { useForm } from 'react-hook-form'
import isValid from '../assets/images/is_valid.webp'



export default function Account() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const isLogged = useSelector(selectLoggedState)
  const [fileIsLoad, updateFileIsLoad] = useState('display-none')
  const [disabled, setDisabled] = useState(true)
  const { register, handleSubmit } = useForm()


  useEffect(() => {
    fetch('http://localhost:8080/user/logged', {
      credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
      dispatch(updateLoggedUser(true))
      setUserData(data)
    })
    .catch(error => {
      console.log(error)
      dispatch(updateLoggedUser(false))
      navigate("/")
    })
  }, [isLogged, dispatch, navigate])


  const isValidIcon = (value) => {
    if (value.length > 0) {
      updateFileIsLoad('display-flex')
    } else {
      updateFileIsLoad('display-none')
    }
  }


  const enableOrDisableButton = (data) => {
    if (data.length === 0) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }


  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.picture.length > 0) {
      formData.append('picture', data.picture[0])
      delete data.picture
    } else {
      delete data.picture
    }
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    // console.log(formData)

    fetch(`http://localhost:8080/user/update/${userData._id}`, {
      method: "PUT",
      body: formData,
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      setUserData(data)
      dispatch(updateLoadedUser(false))
    })
    .catch(error => console.error(error));
  }



  return (
    <div className='app account-page'>
      <div className='account-overlay' />
      <div className='account-content'>
        {userData ? (
          <>
            <h1 className='account-title'>{`Bienvenue, ${userData.name} !`}</h1>
            <div className='account-data'>
              <h2 className='account-profile-title'>Votre profil</h2>
              {userData.picture !== "" ? (
                <div className='account-user-picture'><img src={userData.picture} alt='avatar' /></div>
              ) : (
                <div className='account-user-picture'><img src={DefaultAvatar} alt='avatar' /></div>
              )}
              
              <div className='account-user-detail'><p className='account-user-key'>Nom :</p><p className='account-user-value'>{userData.name}</p></div>
              <div className='account-user-detail'><p className='account-user-key'>Email :</p><p className='account-user-value'>{userData.email}</p></div>
              <div className='account-section-separator'/>
              <div className='account-form-update-section'>
                <h2>Mettre à jour vos infos ?</h2>
                <div>
                  <form className='account-form-update' onSubmit={handleSubmit(onSubmit)} onChange={(e) => enableOrDisableButton(e.target.value)}>
                    <input type="text" name='name' placeholder='Modifiez votre nom...' {...register("name")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Modifiez votre nom...'}/>
                    <input type="email" name='email' placeholder='Modifiez votre email...' {...register("email")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Modifiez votre email...'}/>
                    <input type="password" name='password' placeholder='Modifiez votre mot de passe...' {...register("password")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Modifiez votre mot de passe...'}/>
                    <input className='account-file-input' type="file" id="file" name="picture" accept=".png, .jpg, .jpeg" {...register("picture")} onChange={(e) => isValidIcon(e.target.value)}/>
                    <label className='account-label' htmlFor="file">Mettre à jour votre image de profil<img src={isValid} alt="Upload is valid" className={`input-valid-img ${fileIsLoad}`} /></label>
                    <button className='account-submit-button' disabled={disabled} type='submit'>Mettre à jour</button>
                  </form>
                </div>
              </div>
            </div>
            </>
        ) : (
          null
        )}
      </div>
    </div>
  )
}
