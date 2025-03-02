import React, { useEffect } from 'react'
import '../../sharedStyles/Auth.scss'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import isValid from '../../assets/images/is_valid.webp'
import { useDispatch } from 'react-redux'
import { updateRegisterState } from '../../redux/slices/registerSlice'
import { ServerServices } from '../../api/api-server'



export default function RegisterForm() {

    const [fileIsLoad, updateFileIsLoad] = useState('display-none')
    const [unvalidPassword, setUnvalidPassword] = useState('none')
    const [inputPictureValue, setInputPictureValue] = useState()
    const { register, handleSubmit, setValue, reset } = useForm()
    const dispatch = useDispatch()
    const title = 'Inscription'


    // Gestion de l'affichage (picture chargée ou non)
    useEffect(() => {
        if (inputPictureValue) {
            updateFileIsLoad('display-flex')
        } else {
            updateFileIsLoad('display-none')
        }
    }, [inputPictureValue, fileIsLoad])


    // Mot de passe fort obligatoire
    function validatePassword(password) {
        var Reg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
        return Reg.test(password);
    }


    // Décharger l'input file
    function resetProfilePicture(e) {
        e.preventDefault()
        if (inputPictureValue) {
            setValue('picture', [])
            setInputPictureValue()
        }
    }


    const onSubmit = async (data) => {
        try {
            await ServerServices.registerUser(data, dispatch, updateRegisterState, setUnvalidPassword, reset, validatePassword);
        } catch (error) {
            console.error("Échec de l'inscription :", error);
        }
    };

  
    return (
    <div className={`login-page-content`}>
        <h1>{title.toLowerCase()}</h1>
        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
            <input type="text" className='login-form-input' name='name' placeholder='Entrez votre nom...' {...register("name")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre nom...'} required/>
            <input type="email" className='login-form-input' name='email' placeholder='Entrez votre email...' {...register("email")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre email...'} required/>
            <input type="password" className='login-form-input' name='password' placeholder='Entrez votre mot de passe...' {...register("password")} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = 'Entrez votre mot de passe...'} required/>
            <p className='unvalid-password-text' style={{display: unvalidPassword}}>Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caracère spécial.</p>
            <div className='div-register-input-file-wrapper'>
                <div id='div-register-input-file'>
                    <div className='div-imput-file-content'>Avatar (facultatif)
                        <img src={isValid} alt="Upload is valid" className={`input-valid-img ${fileIsLoad}`} />
                    </div>
                    <input className='register-input-file' type="file" id="file" name="picture" accept=".png, .jpg, .jpeg" {...register("picture")} 
                    onChange={(e) => setInputPictureValue(e.target.value)}
                    />
                </div>
                <div className={`register-input-file-undo-upload ${fileIsLoad}`} title="Décharger l'avatar de profil" onClick={(e) => resetProfilePicture(e)} />
            </div>
            <button type='submit'>S'inscrire</button>
        </form>
        <p className='link-switch' onClick={(e) => {dispatch(updateRegisterState(false))}}>Déjà inscrit ? Connectez-vous ici !</p>
    </div>
  )
}
