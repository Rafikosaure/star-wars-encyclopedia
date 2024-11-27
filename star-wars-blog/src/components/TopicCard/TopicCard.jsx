import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './TopicCard.scss'
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice'
import { selectLoggedUser } from '../../redux/slices/loggedUserSlice'
import { reloadTopics } from '../../redux/slices/topicsReload'
import { reloadFollowedTopics } from '../../redux/slices/followedTopicsReload'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import StarsSky from '../../assets/images/ciel_nuit_banniere.webp'
import config from '../../config'
import { toast } from 'sonner'



export default function TopicCard({ topic }) {

    const isLogged = useSelector(selectIsLoggedState)
    const loggedUser = useSelector(selectLoggedUser)
    const dispatch = useDispatch()
    const [isFollowedColor, setIsFollowedColor] = useState('white')
    const [isFollowedTitle, setIsFollowedTitle] = useState('Suivre cette discussion')
    const [datetime, updateDateTime] = useState()
    const [followersArray, setFollowersArray] = useState()
    const [currentFollower, setCurrentFollower] = useState()
    const [isHovered, setIsHovered] = useState(false); // si le curseur est ou non sur l'élément


    // Récupération de la date de création de la discussion
    useEffect(() => {
        const topicDate = new Date(topic.createdAt)
        updateDateTime(topicDate)
    }, [topic])


    useEffect(() => {

        // Récupération des abonnés à la discussion
        if (!followersArray) {
            fetch(`${config.serverEndpoint}/followTopic/getAllFollowersOfATopic/${topic._id}`)
            .then(response => response.json())
            .then(data => {
                setFollowersArray(data)
            })
            .catch(error => console.log(error))
        }
        
        // Enregistrement de l'utilisateur si il fait partie des abonnés
        if (followersArray !== undefined && followersArray.length > 0 && loggedUser) {
            setCurrentFollower(followersArray.find(follower => loggedUser.email === follower.email))
            if (currentFollower) {
                setIsFollowedColor('rgb(53, 155, 155)')
                setIsFollowedTitle('Ne plus suivre cette discussion')
            }
        } else {
            setCurrentFollower()
        }
    }, [topic, followersArray, loggedUser, currentFollower])


    // Supprimer une discussion
    const deleteTopicFunction = (e) => {
        e.preventDefault()
        fetch(`${config.serverEndpoint}/topic/deleteTopicById/${topic._id}`, {
            method: "DELETE",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                toast("Discussion supprimée !")
            }
            dispatch(reloadTopics())
        })
        .catch(error => console.log(error))
    }


    // Suivre une discussion
    const followThisTopicFunction = (e) => {
        e.preventDefault()
        let toFollow;
        
        if (!currentFollower) {
            toFollow = true
        } else {
            toFollow = false
        }

        // Requête pour suivre ou non la discussion 
        fetch(`${config.serverEndpoint}/followTopic/chooseWhetherToFollowOrNot/${topic._id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ toFollow: toFollow })
        })
        .then(response => response.json())
        .then(data => {

            // Gestion de l'interface si l'utilisateur est ou non un abonné
            if (data.topicIsFollowed === true) {
                toast("Vous suivez cette discussion !")
                setIsFollowedColor('rgb(53, 155, 155)')
                setIsFollowedTitle('Ne plus suivre cette discussion')
            } else {
                toast("Vous ne suivez plus cette discussion !")
                setIsFollowedColor('white')
                setIsFollowedTitle('Suivre cette discussion')
            }
            setFollowersArray()
            dispatch(reloadFollowedTopics())
        })
        .catch(error => {
            console.log(error)
        })
    }

    // Styles du contour du bouton de suivi de la discussion
    const strokeStyle = {
        stroke: isHovered ? 'white' : 'rgb(53, 155, 155)',
        strokeWidth: 4
    }


    return (
        <div className='topic-card-main'>
            <img className='topic-card-banner' src={StarsSky} alt="Ciel étoilé" />
            <Link className='topic-card-link' to={`/topic/${topic._id}`} title='Entrez dans la discussion'>
                <div className='topic-card-content'>
                    {topic && datetime && (
                        <>
                            <div className='topic-infos'><h1>{topic.title}</h1><div className='topic-datetime-and-actions'><p>{`Créé le ${datetime.toLocaleDateString("fr-FR", {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' }).replace(':', 'h')}`}</p>
                            {isLogged && (
                                <div className='topic-action bulle' 
                                title={isFollowedTitle} 
                                onClick={(e) => followThisTopicFunction(e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill={isFollowedColor}
                                    style={strokeStyle}
                                    onMouseEnter={() => setIsHovered(true)}   // Détecte le survol
                                    onMouseLeave={() => setIsHovered(false)}  // Détecte lorsque le curseur quitte 
                                    viewBox="0 0 50 50">
                                        <path d="M 25 4 C 12.316406 4 2 12.972656 2 24 C 2 30.1875 5.335938 36.066406 10.949219 39.839844 C 10.816406 40.890625 10.285156 43.441406 8.183594 46.425781 L 7.078125 47.992188 L 9.054688 48 C 14.484375 48 18.15625 44.671875 19.363281 43.394531 C 21.195313 43.796875 23.089844 44 25 44 C 37.683594 44 48 35.027344 48 24 C 48 12.972656 37.683594 4 25 4 Z"/>
                                    </svg>
                                </div>
                            )}
                            {isLogged && loggedUser.isAdmin && (
                                <div className='topic-action' title='Supprimer cette discussion' onClick={(e) => deleteTopicFunction(e)}>✖</div>
                            )}
                            </div></div>
                            <p className='topic-description'>{topic.description}</p>
                        </>
                    )}
                </div>
            </Link>
        </div>
    )
}
