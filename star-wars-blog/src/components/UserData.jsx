import React from 'react'
import DefaultAvatar from '../assets/images/EmojiBlitzBobaFett1.webp'
import Delete from '../assets/images/delete.webp'
import '../styles/UserData.css'

export default function UserData({ user }) {

  return (
    <div className='user-data-table'>
        <div className='user-data-picture'>
            {user.picture !== "" ? (
                <img src={user.picture} alt={user.name} />
            ) : (
                <img src={DefaultAvatar} alt='avatar par défaut' />
            )}
        </div>
        <div className='user-data-name'>{user.name}</div>
        <div className='user-data-delete-button'><img src={Delete} alt='croix de suppression' className='user-data-delete-image' /></div>
    </div>
    )
}
