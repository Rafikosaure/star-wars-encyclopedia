import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice'
import { useDispatch } from 'react-redux'
import { updateIsLoggedUser } from '../../redux/slices/isLoggedUserSlice'
import { updateLoadedUser } from '../../redux/slices/loadedUserSlice'
import { selectReloadUsersState } from '../../redux/slices/reloadUsersArray'
import { reloadUsersArrayFunction } from '../../redux/slices/reloadUsersArray'
import { selectLoggedUser } from '../../redux/slices/loggedUserSlice'
import { updateUserLog } from '../../redux/slices/loggedUserSlice'
import { useNavigate, Link } from 'react-router-dom'
import '../../sharedStyles/index.scss'
import './Account.scss'
import DefaultAvatar from '../../assets/images/EmojiBlitzBobaFett1.webp'
import { useForm } from 'react-hook-form'
import PictureIsValid from '../../assets/images/is_valid.webp'
// import UserData from '../../components/UserData/UserData'
import { toast } from 'sonner'
import config from '../../config'


export default function Account() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [userData, setUserData] = useState()
  const [allUsers, setAllUsers] = useState()
  const isLogged = useSelector(selectIsLoggedState)
  const [fileIsLoad, updateFileIsLoad] = useState('display-none')
  const [allowDeletion, setAllowDeletion] = useState(false)
  const [unvalidPassword, setUnvalidPassword] = useState('none')
  const { register, handleSubmit, reset } = useForm()
  const reloadUsers = useSelector(selectReloadUsersState)
  const userData = useSelector(selectLoggedUser)


  useEffect(() => {
    if (!isLogged) {
      navigate("/")
    }
  }, [isLogged, navigate])


  const isValidIcon = (value) => {
    if (value.length > 0) {
      updateFileIsLoad('display-flex')
    } else {
      updateFileIsLoad('display-none')
    }
  }

  useEffect(() => {
    if (!reloadUsers || !allUsers) {
      fetch(`${config.serverEndpoint}/user/getAll`, {
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        if (data.badAccessMessage) {
          dispatch(reloadUsersArrayFunction(true))
          navigate('/')
        } else {
          setAllUsers(data.filter((user) => user.isAdmin !== true))
          dispatch(reloadUsersArrayFunction(true))
        }
      })
      .catch(error => {
        console.log(error)
        dispatch(reloadUsersArrayFunction(true))
      })
    }
  }, [reloadUsers, allUsers, dispatch, navigate])


  function validatePassword(password){
    var Reg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
    return Reg.test(password);
  }


  const modifyData = (data) => {
    if (data.name.length <= 0 && data.email.length <= 0 && data.password.length <= 0 && data.picture.length <= 0) {
      return
    }
    const formData = new FormData();
    if (data.picture.length > 0) {
      formData.append('picture', data.picture[0])
      delete data.picture
    } else {
      delete data.picture
    }
    if (data.password.length > 0) {
      const isValid = validatePassword(data.password)
      if (!isValid) {
        toast('Mot de passe trop faible !')
        setUnvalidPassword('block')
        reset()
        return
      }
    }
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)

    fetch(`${config.serverEndpoint}/user/update/noId`, {
      method: "PUT",
      body: formData,
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (!data.badAccessMessage) {
        dispatch(updateUserLog(data))
        reset()
        setUnvalidPassword('none')
        updateFileIsLoad("display-none")
        dispatch(updateLoadedUser(false))
        dispatch(reloadUsersArrayFunction())
        toast("Mise à jour effectuée !")
      } else {
        navigate('/')
      }
    })
    .catch(error => console.error(error));
  }

  const validateEmail = (email) => {
    if (email === userData.email) {
      setAllowDeletion(true)
    } else {
      setAllowDeletion(false)
    }
  }

  const deleteCurrentUser = (e) => {
    e.preventDefault()
    fetch(`${config.serverEndpoint}/user/deleteById`, {
      method: "DELETE",
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (data.badAccessMessage) {
        navigate('/')
      } else {
        dispatch(updateIsLoggedUser(false))
        dispatch(updateUserLog({}))
        dispatch(updateLoadedUser(false))
        dispatch(reloadUsersArrayFunction())
        toast('Compte utilisateur supprimé !')
        navigate('/')
      }
    })
    .catch(error => console.log(error))
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
                  <form className='account-form-update' autoComplete='off' onSubmit={handleSubmit(modifyData)} >
                    <input type="text" name='name' placeholder='Modifiez votre nom...' {...register("name", {required: false})} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Modifiez votre nom...'} />
                    <input type="email" name='email' placeholder='Modifiez votre email...' {...register("email", {required: false})} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Modifiez votre email...'} />
                    <input type="password" name='password' placeholder='Modifiez votre mot de passe...' {...register("password", {required: false})} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Modifiez votre mot de passe...'} />
                    <p className='unvalid-password-text' style={{display: unvalidPassword}}>Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caracère spécial.</p>
                    {/* <div id='div-input-file'>
                      <div className='div-input-file-image'>Image de profil
                        <img src={PictureIsValid} alt="Upload is valid" className={`input-valid-img ${fileIsLoad}`} />
                      </div>
                      <input className='account-file-input' type="file" id="file" name="picture" accept=".png, .jpg, .jpeg" {...register("picture")} onChange={(e) => isValidIcon(e.target.value)} />
                    </div> */}
                    <input className='account-file-input' type="file" id="file" name="picture" accept=".png, .jpg, .jpeg" {...register("picture", {required: false})} onChange={(e) => isValidIcon(e.target.value)} />
                    <label className='account-label' htmlFor="file">Mettre à jour votre image de profil<img src={PictureIsValid} alt="Upload is valid" className={`input-valid-img ${fileIsLoad}`} /></label>
                    <button className='account-submit-button' type='submit'>Mettre à jour</button>
                  </form>
                </div>
              </div>
              <div className='account-section-separator'/>
              <div>             
                {!userData.isAdmin ? (
                <>
                  <h2 className='account-profile-title'>Suppression du compte</h2>
                  <div className='account-delete-section'>
                    <form className='account-form-delete-section' onSubmit={(e) => e.preventDefault()}>
                      <input type="text" onChange={(e) => validateEmail(e.target.value)} placeholder='Entrez votre email...' onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre email...'} />
                    </form>
                    {allowDeletion ? (
                      <button className='delete-user' onClick={(e) => deleteCurrentUser(e)}>Supprimer mon compte</button>
                    ) : null}
                  </div>
                </>
                ) : (
                  <Link className={"link-to-admin"} to={'/admin'}>Administrer le site</Link>
                )}
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
