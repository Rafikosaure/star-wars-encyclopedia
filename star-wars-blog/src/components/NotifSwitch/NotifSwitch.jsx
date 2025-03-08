import React from 'react'
import { useState, useEffect } from 'react'
import './NotifSwitch.scss'
import { ServerServices } from '../../api/api-server' 



export default function NotifSwitch({ loggedUser }) {

    const [allowNotifs, setAllowNotifs] = useState()
    const { getUserMentionOption, updateMentionOption } = ServerServices


    // Récupérer le choix initial de l'utilisateur
    useEffect(() => {
        const connect = sessionStorage.getItem("connect");
        if (loggedUser && connect) {
            getUserMentionOption(loggedUser._id).then((allowMentions) => {
                if (allowMentions !== null) {
                    setAllowNotifs(allowMentions);
                }
            });
        }
    }, [loggedUser, getUserMentionOption]);


    // Fonction pour autoriser / interdire les notifications en cas de mention
    const changeOption = async (newOption) => {
        const updatedOption = await updateMentionOption(loggedUser._id, newOption);
        if (updatedOption !== null) {
            setAllowNotifs(updatedOption);
        }
    };


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
