import React from 'react'
import { useState, useEffect } from 'react'
import './NotifSwitch.scss'
import config from '../../config'



export default function NotifSwitch({ loggedUser }) {

    const [allowNotifs, setAllowNotifs] = useState()

    // Récupérer le choix initial de l'utilisateur
    useEffect(() => {
        if (loggedUser) {
            fetch(`${config.serverEndpoint}/isMentionned/getIsMentionnedOption/${loggedUser._id}`, {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                setAllowNotifs(data.allowMentions)
            })
            .catch(error => console.log(error))
        }
    }, [loggedUser])


    // Fonction pour autoriser / interdire les notifications en cas de mention
    const changeOption = (newOption) => {
        fetch(`${config.serverEndpoint}/isMentionned/updateIsMentionnedOption/${loggedUser._id}`, {
            method: 'PUT',
            body: JSON.stringify({ mentionOption: newOption }),
            credentials: "include",
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            setAllowNotifs(data.newOption)
        })
        .catch(error => console.log(error))
    }

    // Switcher entre les options
    const switchNotificationOption = () => {
        if (allowNotifs) {
            changeOption(false)
        } else {
            changeOption(true)
        }
    }


    return (
        <>
        {allowNotifs !== undefined && (
            <label className="switch">
                <input type="checkbox" className='switch-checkbox' checked={allowNotifs} onChange={() => switchNotificationOption()} />
                <span className='switch-span'></span>
            </label>
        )}
        </>
    )
}
