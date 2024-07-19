import React from 'react'
// import { useState } from 'react'
import DefaultAvatar from '../assets/images/EmojiBlitzBobaFett1.webp'
import Delete from '../assets/images/delete.webp'
import '../styles/UserData.css'
import { toast } from 'sonner'



export default function UserData({ user }) {

    // const [fadeOut, setFadeOut] = useState('')

    const deleteUser = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8000/user/authDeleteById/${user._id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.message === "User has been deleted") {
                toast('Compte utilisateur supprimé !')
            } else {
                toast('Echec de la suppression !')
            }
            
        })
    }

    // const actionToDeleteUser = (e) => {
    //     e.preventDefault()
    //     setFadeOut('fade-out')
    //     setTimeout(deleteUser, 1000)
    //     setFadeOut('')
    // }


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
