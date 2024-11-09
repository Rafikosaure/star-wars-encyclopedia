import React from 'react'
import './FollowedTopicCard.scss'
import { toast } from 'sonner'
import config from '../../config'
import { useDispatch } from 'react-redux'
import { reloadFollowedTopics } from '../../redux/slices/followedTopicsReload'




export default function FollowedTopicCard({ index, topicData }) {

    const dispatch = useDispatch()


    // Fonction pour ne plus suivre la discussion
    const notFollowAnymore = (e) => {
        e.preventDefault()

        fetch(`${config.serverEndpoint}/followTopic/chooseWhetherToFollowOrNot/${topicData._id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ toFollow: false })
        })
        .then(response => response.json())
        .then(data => {
            dispatch(reloadFollowedTopics())
            toast("Vous ne suivez plus cette discussion !")
        })
        .catch(error => {
            console.log(error)
        })
    }


    return (
        <div className='del-follow-topic-main'>
            <p>{topicData.title}</p>
            <div className='topic-action bulle' title="Ne plus suivre cette discussion" onClick={(e) => notFollowAnymore(e)}><svg xmlns="http://www.w3.org/2000/svg" fill='rgb(53, 155, 155)' stroke='gray' viewBox="0 0 50 50"><path d="M 25 4 C 12.316406 4 2 12.972656 2 24 C 2 30.1875 5.335938 36.066406 10.949219 39.839844 C 10.816406 40.890625 10.285156 43.441406 8.183594 46.425781 L 7.078125 47.992188 L 9.054688 48 C 14.484375 48 18.15625 44.671875 19.363281 43.394531 C 21.195313 43.796875 23.089844 44 25 44 C 37.683594 44 48 35.027344 48 24 C 48 12.972656 37.683594 4 25 4 Z"/></svg></div>
        </div>
    )
}
