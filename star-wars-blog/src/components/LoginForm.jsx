import React from 'react'
import '../styles/Auth.css'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateRegisterState } from '../redux/slices/registerSlice'

export default function LoginForm() {

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const title = 'Connexion'

    const onSubmit = (data) => {
        console.log(data)
    }

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