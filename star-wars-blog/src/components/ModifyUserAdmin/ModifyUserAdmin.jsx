import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import PictureIsValid from '../../assets/images/is_valid.webp'
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reloadUsersArrayFunction } from '../../redux/slices/reloadUsersArray';
import './ModifyUserAdmin.scss'
import config from '../../config';



export default function ModifyUserAdmin({ user }) {

    const [unvalidPassword, setUnvalidPassword] = useState('none')
    const [fileIsLoad, setFileIsLoad] = useState('display-none')
    const [inputPictureValue, setInputPictureValue] = useState()
    const { register, handleSubmit, setValue, reset } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // Gestion de l'affichage (picture chargée ou non)
    useEffect(() => {
        if (inputPictureValue) {
            setFileIsLoad('display-flex')
        } else {
            setFileIsLoad('display-none')
        }
    }, [inputPictureValue, fileIsLoad])


    // Décharger l'input file
    function resetProfilePicture(e) {
        e.preventDefault()
        if (inputPictureValue) {
            setValue('picture', [])
            setInputPictureValue()
        }
    }


    // Mot de passe fort
    function validatePassword(password) {
        var Reg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
        return Reg.test(password);
    }
    
    
    // Fonction de modification des données d'un utilisateur
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
        
        fetch(`${config.serverEndpoint}/user/update/${user._id}`, {
        method: "PUT",
        body: formData,
        credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            reset()
            setUnvalidPassword('none')
            setInputPictureValue()
            dispatch(reloadUsersArrayFunction())
            toast("Mise à jour effectuée !")
        })
        .catch(error => {
            console.error(error)
            navigate('/')
        });
    }


    return (
        <div>
            <form className='other-user-form-update' autoComplete='off' onSubmit={handleSubmit(modifyData)}>
                <input className='other-user-input' type="text" name='name' placeholder={user.name} {...register("name", {required: false})} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = `${user.name}`} />
                <input className='other-user-input' type="email" name='email' placeholder={user.email} {...register("email", {required: false})} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = `${user.email}`} />
                <input className='other-user-input' type="password" name='password' placeholder='[mot de passe]' {...register("password", {required: false})} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = '[mot de passe]'} />
                <p className='unvalid-password-text' style={{display: unvalidPassword}}>Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caracère spécial.</p>
                <div className='div-input-file-wrapper'>
                    <div id='div-input-file'>
                        <div className='div-imput-file-content'>
                            Avatar (facultatif)
                            <img src={PictureIsValid} alt="Upload is valid" className={`input-other-user-valid-img ${fileIsLoad}`} />
                        </div>
                        <input type="file" id="file" name="picture" accept=".png, .jpg, .jpeg" {...register("picture")} onChange={(e) => setInputPictureValue(e.target.value)} />
                    </div>
                    <div className={`input-file-undo-upload ${fileIsLoad}`} title="Décharger l'avatar de profil" onClick={(e) => resetProfilePicture(e)} />
                </div>
                <button className='other-user-submit-button' type='submit'>Mettre à jour</button>
            </form>
        </div>
    )
}
