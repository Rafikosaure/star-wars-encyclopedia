import React from 'react'
import '../styles/Auth.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import isValid from '../assets/images/is_valid.webp'
import { useDispatch } from 'react-redux'
import { updateRegisterState } from '../redux/slices/registerSlice'
import { toast } from 'sonner';


export default function RegisterForm() {

    const [fileIsLoad, updateFileIsLoad] = useState('display-none')
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const title = 'Inscription'

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
        

        fetch("http://localhost:8080/user/register", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            dispatch(updateRegisterState(false))
            toast("Utilisateur enregistré !")
        })
        .catch(error => console.error(error));
    }

    const isValidIcon = (value) => {
        if (value.length > 0) {
            updateFileIsLoad('display-flex')
        } else {
            updateFileIsLoad('display-none')
        }
    }
  
    return (
    <div className={`login-page-content`}>
        <h1>{title.toLowerCase()}</h1>
        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
            <input type="text" className='login-form-input' name='name' placeholder='Entrez votre nom...' {...register("name")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre nom...'} required/>
            <input type="email" className='login-form-input' name='email' placeholder='Entrez votre email...' {...register("email")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre email...'} required/>
            <input type="password" className='login-form-input' name='password' placeholder='Entrez votre mot de passe...' {...register("password")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre mot de passe...'} required/>
            <input type="file" id="file" name="picture" accept=".png, .jpg, .jpeg" {...register("picture")} onChange={(e) => isValidIcon(e.target.value)}/>
            <label htmlFor="file">Choisissez une image de profil<img src={isValid} alt="Upload is valid" className={`input-valid-img ${fileIsLoad}`} /></label>
            <button type='submit'>S'inscrire</button>
        </form>
        <p className='link-switch' onClick={(e) => {dispatch(updateRegisterState(false))}}>Déjà inscrit ? Connectez-vous ici !</p>
    </div>
  )
}
