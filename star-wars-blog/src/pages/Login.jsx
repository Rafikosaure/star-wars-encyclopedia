import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import '../styles/index.css'
import '../styles/Login.css'
import isValid from '../assets/images/is_valid.webp'


export default function Login() {

    const [registerPage, setRegisterPage] = useState('hide-register-page')
    const [loginPage, setLoginPage] = useState('show-login-page')
    const [fileIsLoad, updateFileIsLoad] = useState('display-none')
    const { register, handleSubmit } = useForm()
    const titleTwo = 'Inscription'
    const titleOne = 'Connexion'

    const onSubmit = (data) => {
        console.log(data)
    }

    const isValidIcon = (value) => {
        if (value.length > 0) {
            updateFileIsLoad('display-flex')
        } else {
            updateFileIsLoad('display-none')
        }
    }

    const authShowManager = () => {
        if (registerPage === 'hide-registrer-page') {
            setRegisterPage('show-register-page')
            setLoginPage('hide-login-page')
        } else {
            setRegisterPage('hide-register-page')
            setLoginPage('show-login-page')
        }
    }

  return (
    <div className='app'>
        <div className={`login-page-content ${loginPage}`}>
            <h1>{titleOne.toLowerCase()}</h1>
            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                <input type="email" className='login-form-input' name='email' placeholder='Entrez votre email...' {...register("email")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre email...'} required/>
                <input type="password" className='login-form-input' name='password' placeholder='Entrez votre mot de passe...' {...register("password")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre mot de passe...'} required/>
                <button type='submit'>Se connecter</button>
                <p className='link-switch' onClick={authShowManager}>Pas encore inscrit ? Cliquez ici !</p>
            </form>
        </div>
        <div className={`login-page-content ${registerPage}`}>
            <h1>{titleTwo.toLowerCase()}</h1>
            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                <input type="text" className='login-form-input' name='name' placeholder='Entrez votre nom...' {...register("name")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre nom...'} required/>
                <input type="email" className='login-form-input' name='email' placeholder='Entrez votre email...' {...register("email")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre email...'} required/>
                <input type="password" className='login-form-input' name='password' placeholder='Entrez votre mot de passe...' {...register("password")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre mot de passe...'} required/>
                <input type="file" id="file" name="file" accept=".png, .jpg, .jpeg" {...register("picture")} onChange={(e) => isValidIcon(e.target.value)} required/>
                <label htmlFor="file">Choisissez une image de profil<img src={isValid} alt="Upload is valid" className={`input-valid-img ${fileIsLoad}`} /></label>
                <button type='submit'>Se connecter</button>
                <p className='link-switch' onClick={authShowManager}>Déjà inscrit ? Cliquez ici !</p>
            </form>
        </div>
    </div>
  )
}
