import React from 'react'
import { useDispatch } from 'react-redux'
import { reloadUsersArrayFunction } from '../redux/slices/reloadUsersArray'
import DefaultAvatar from '../assets/images/EmojiBlitzBobaFett1.webp'
import Delete from '../assets/images/delete.webp'
import '../styles/UserData.css'
import { toast } from 'sonner'
import config from '../config'
import { useNavigate } from 'react-router-dom'


export default function UserData({ user }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const deleteUser = (e) => {
        e.preventDefault()
        fetch(`${config.serverEndpoint}/user/authDeleteById/${user._id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            if (data.badAccessMessage) {
                toast("Vous n'êtes pas authentifié !")
                navigate('/')
            } else {
                dispatch(reloadUsersArrayFunction(false))
                toast('Compte utilisateur supprimé !')
            }
        })
        .catch(error => {
            console.log(error)
            toast("Echec de la suppression !")
        })
    }


  return (
    <div className={`user-data-table`}>
        <div className='user-data-picture'>
            {user.picture !== "" ? (
                <img src={user.picture} alt={user.name} />
            ) : (
                <img src={DefaultAvatar} alt='avatar par défaut' />
            )}
        </div>
        <div className='user-data-name'>{user.name}</div>
        <div className='user-data-name'>{user.email}</div>
        <div className='user-data-delete-button' onClick={(e) => deleteUser(e)}><img src={Delete} alt='croix de suppression' className='user-data-delete-image' /></div>
    </div>
    )
}
