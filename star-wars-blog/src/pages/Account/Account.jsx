import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice'
import { useDispatch } from 'react-redux'
import { updateIsLoggedUser } from '../../redux/slices/isLoggedUserSlice'
import { updateLoadedUser } from '../../redux/slices/loadedUserSlice'
import { selectReloadUsersState } from '../../redux/slices/reloadUsersArray'
import { reloadUsersArrayFunction } from '../../redux/slices/reloadUsersArray'
import { selectReloadFollowedTopicsState } from '../../redux/slices/followedTopicsReload'
import { selectLoggedUser } from '../../redux/slices/loggedUserSlice'
import { updateUserLog } from '../../redux/slices/loggedUserSlice'
import { useNavigate, Link } from 'react-router-dom'
import '../../theme/index.scss'
import '../../theme/Account.scss'
import DefaultAvatar from '../../assets/images/EmojiBlitzBobaFett1.webp'
import { useForm } from 'react-hook-form'
import PictureIsValid from '../../assets/images/is_valid.webp'
import { toast } from 'sonner'
import NotifSwitch from '../../components/NotifSwitch/NotifSwitch'
import FollowedTopicCard from '../../components/FollowedTopicCard/FollowedTopicCard'
import { ServerServices } from '../../api/api-server'
import PasswordValidatorBar from '../../components/PasswordValidatorBar/PasswordValidatorBar'
import { passwordTypeManagment } from '../../utils/passwordValidationFunctions'



export default function Account() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [allUsers, setAllUsers] = useState()
  const isLogged = useSelector(selectIsLoggedState)
  const [fileIsLoad, updateFileIsLoad] = useState('display-none')
  const [inputPictureValue, setInputPictureValue] = useState()
  const [allowDeletion, setAllowDeletion] = useState(false)
  const [unvalidPassword, setUnvalidPassword] = useState('none')
  const { register, handleSubmit, setValue, reset, watch } = useForm()
  const initialPasswordValue = watch('password')
  const reloadUsers = useSelector(selectReloadUsersState)
  const userData = useSelector(selectLoggedUser)
  const [followedTopics, setFollowedTopics] = useState()
  const reloadFollowedTopics = useSelector(selectReloadFollowedTopicsState)
  const { 
    getAllUsers, 
    getFollowedTopics, 
    updateUserData, 
    deleteHisOwnUserAccount 
  } = ServerServices


  // Redirection en cas d'utilisateur non-authentifié
  useEffect(() => {
    if (!isLogged) {
      navigate("/auth")
    }
  }, [isLogged, navigate])


  // Gestion de l'affichage (picture chargée ou non)
  useEffect(() => {
    if (inputPictureValue) {
        updateFileIsLoad('display-flex')
    } else {
        updateFileIsLoad('display-none')
    }
  }, [inputPictureValue, updateFileIsLoad])


  // Récupération des utilisateurs non-admins du site
  useEffect(() => {
    if (!reloadUsers || !allUsers) {
      getAllUsers()
      .then(data => {
        setAllUsers(data.filter((user) => user.isAdmin !== true))
        dispatch(reloadUsersArrayFunction(true))
      })
      .catch(error => {
          console.log(error)
          dispatch(reloadUsersArrayFunction(true))
          navigate('/auth')
      })
    }
  }, [reloadUsers, allUsers, dispatch, navigate, getAllUsers])


  // Récupérer les discussions suivies par l'utilisateur
  useEffect(() => {
    const connect = sessionStorage.getItem("connect");
    if (userData && isLogged && connect) {
      getFollowedTopics(userData._id)
      .then(data => {
        setFollowedTopics(data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, [isLogged, userData, reloadFollowedTopics, getFollowedTopics])


  // Décharger l'input file
  function resetProfilePicture(e) {
    e.preventDefault()
    if (inputPictureValue) {
        setValue('picture', [])
        setInputPictureValue()
    }
  }


  // Modification des informations des utilisateurs
  const modifyData = async (data) => {
    if (data.name.length <= 0 && data.email.length <= 0 && data.password.length <= 0 && data.picture.length <= 0) {
      return
    }
    try {
      const result = await updateUserData("noId", data);
      if (result === 'Mot de passe trop faible !') {
        toast(result)
        setUnvalidPassword('block')
        setValue('password', undefined)
      } else {
        dispatch(updateUserLog(result))
        reset()
        setUnvalidPassword('none')
        updateFileIsLoad("display-none")
        dispatch(updateLoadedUser(false))
        dispatch(reloadUsersArrayFunction())
        toast("Mise à jour effectuée !")
      }
    } catch (error) {
      console.log(error)
      navigate('/auth')
    }
  }


  // Validation de l'email avant suppression du compte
  const validateEmail = (email) => {
    if (email === userData.email) {
      setAllowDeletion(true)
    } else {
      setAllowDeletion(false)
    }
  }


  // Suppression de son propre compte par l'utilisateur
  const deleteCurrentUser = (e) => {
    e.preventDefault()
    deleteHisOwnUserAccount()
    .then(data => {
      sessionStorage.removeItem("connect");
      dispatch(updateIsLoggedUser(false))
      dispatch(updateUserLog({}))
      dispatch(updateLoadedUser(false))
      dispatch(reloadUsersArrayFunction())
      toast('Compte utilisateur supprimé !')
      navigate('/auth')
    })
    .catch(error => {
      sessionStorage.removeItem("connect");
      navigate('/auth')
    })
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
              <div className='notifs-section'>
                <h2 className='account-profile-title'>Notifications</h2>
                <span className='allow-mentions-notifs'><span>Autoriser en cas de mention :</span><NotifSwitch loggedUser={userData} /></span>
              </div>
              <div className='account-section-separator'/>
                <div className='notifs-section'>
                  <h2 className='account-profile-title'>Discussions suivies</h2>
                  {followedTopics && followedTopics.length > 0 ? (
                  <>
                    {followedTopics.map((topic, index) => (
                      <FollowedTopicCard key={topic._id} index={index} topicData={topic} />
                    ))}
                  </>
                  ) : (
                    <p className='any-followed-topic-text'>Aucune discussion suivie</p>
                  )}
              </div>
              <div className='account-section-separator'></div>
              <div className='account-form-update-section'>
                <h2>Mettre à jour vos infos ?</h2>
                <div>
                  <form className='account-form-update' autoComplete='off' onSubmit={handleSubmit(modifyData)} >
                    <input type="text" className='account-input-text-data' name='name' placeholder='Modifiez votre nom...' {...register("name", {required: false})} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Modifiez votre nom...'} />
                    <input type="email" className='account-input-text-data' name='email' placeholder='Modifiez votre email...' {...register("email", {required: false})} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Modifiez votre email...'} />
                    
                    <div className='account-input-password-div'>
                      <input type="password" className='account-input-text-data' name='password' placeholder='Modifiez votre mot de passe...' {...register ("password", {required: false})} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Modifiez votre mot de passe...'} />
                      <PasswordValidatorBar password={passwordTypeManagment(initialPasswordValue)} />
                    </div>
                    
                    <p className='unvalid-password-text' style={{display: unvalidPassword}}>Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caracère spécial.</p>

                    <div className='div-input-file-wrapper'>
                      <div id='div-input-file'>
                        <div className='div-input-file-image'>Avatar (facultatif)
                          <img src={PictureIsValid} alt="Upload is valid" className={`input-valid-img ${fileIsLoad}`} />
                        </div>
                        <input className='account-file-input' type="file" id="file" name="picture" accept=".png, .jpg, .jpeg" {...register("picture")} onChange={(e) => setInputPictureValue(e.target.value)} />
                      </div>
                      <div className={`input-file-undo-upload ${fileIsLoad}`} title="Décharger l'avatar de profil" onClick={(e) => resetProfilePicture(e)} />
                    </div>

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
                      <input className='account-form-delete-input' type="text" onChange={(e) => validateEmail(e.target.value)} placeholder='Entrez votre email...' onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre email...'} />
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
