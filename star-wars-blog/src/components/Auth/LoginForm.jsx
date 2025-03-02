import React from 'react'
import '../../sharedStyles/Auth.scss'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateRegisterState } from '../../redux/slices/registerSlice'
import { useNavigate } from 'react-router-dom'
import { updateIsLoggedUser } from '../../redux/slices/isLoggedUserSlice'
import { ServerServices } from '../../api/api-server'


export default function LoginForm() {
    
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const title = 'Connexion'


    // Connexion de l'utilisateur
    const onSubmit = async (data) => {
        try {
            await ServerServices.loginUser(data, dispatch, updateIsLoggedUser, navigate);
        } catch (error) {
            console.error("Échec de la connexion :", error);
        }
    };


  return (
    <div className={`login-page-content`}>
        <h1>{title.toLowerCase()}</h1>
        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
            <input type="email" className='login-form-input' name='email' placeholder='Entrez votre email...' {...register("email")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre email...'} required/>
            <input type="password" className='login-form-input' name='password' placeholder='Entrez votre mot de passe...' {...register("password")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre mot de passe...'} required/>
            <button type='submit'>Se connecter</button>
        </form>
        <p className='link-switch' onClick={(e) => {dispatch(updateRegisterState(true))}}>Pas encore inscrit ? Inscrivez-vous ici !</p>
    </div>
  )
}
