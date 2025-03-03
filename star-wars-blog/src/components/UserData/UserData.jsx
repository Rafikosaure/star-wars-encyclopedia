import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { reloadUsersArrayFunction } from '../../redux/slices/reloadUsersArray'
import DefaultAvatar from '../../assets/images/EmojiBlitzBobaFett1.webp'
import Delete from '../../assets/images/delete.webp'
import './UserData.scss'
import { toast } from 'sonner'
import config from '../../config'
import { useNavigate } from 'react-router-dom'
import ModifyUserAdmin from '../ModifyUserAdmin/ModifyUserAdmin'


export default function UserData({ user }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openOrCloseUserForm, updateOpenOrCloseUserForm] = useState('none')
    const [unvalidPassword, setUnvalidPassword] = useState('none')


    // Supprimer un utilisateur
    const deleteUser = (e) => {
        e.preventDefault()
        fetch(`${config.serverEndpoint}/user/authDeleteById/${user._id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            sessionStorage.removeItem("connect");
            dispatch(reloadUsersArrayFunction(false))
            toast('Compte utilisateur supprimé !')
        })
        .catch(error => {
            console.log(error)
            sessionStorage.removeItem("connect");
            toast("Echec de la suppression !")
            navigate('/')
        })
    }


    // Apparition / disparition du formulaire de gestion
    const openOrCloseModifyUserForm = (e) => {
        e.preventDefault()
        if (openOrCloseUserForm === 'block') {
            updateOpenOrCloseUserForm('none')
            setUnvalidPassword('none')
        } else {
            updateOpenOrCloseUserForm('block')
        }
    }


  return (
    <>
    <div className={`user-data-table`}>
        <div className='user-data-picture' onClick={(e) => openOrCloseModifyUserForm(e)} title='Modifier les données'>
            {user.picture !== "" ? (
                <img src={user.picture} alt={user.name} />
            ) : (
                <img src={DefaultAvatar} alt='avatar par défaut' />
            )}
        </div>
        <div className='user-data-name-div'>
            <div className='user-data-name'>{user.name}</div>
            <div className='user-data-name'>{user.email}</div>
        </div>
        
        <div className='user-data-delete-button' onClick={(e) => deleteUser(e)} title="Supprimer l'utilisateur"><img src={Delete} alt='croix de suppression' className='user-data-delete-image' /></div>
    </div>
    <div className='AdminModifyUserForm' style={{display: `${openOrCloseUserForm}`}}>
        <ModifyUserAdmin user={user} unvalidPassword={unvalidPassword} setUnvalidPassword={setUnvalidPassword} />
    </div>
    </>
    
    )
}
