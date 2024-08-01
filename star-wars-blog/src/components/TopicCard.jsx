import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/TopicCard.css'
import { Link } from 'react-router-dom'
import StarsSky from '../assets/images/ciel_nuit_banniere.webp'



export default function TopicCard({ topic }) {

    const [datetime, updateDateTime] = useState()

    useEffect(() => {
        const topicDate = new Date(topic.createdAt)
        updateDateTime(topicDate)
    }, [topic])


    return (
        <div className='topic-card-main'>
            <img className='topic-card-banner' src={StarsSky} alt="Ciel étoilé" />
            <Link className='topic-card-link' to={`/topic/${topic._id}`}>
                <div className='topic-card-content'>
                    {topic && datetime && (
                        <>
                            <div className='topic-infos'><h1>{topic.title}</h1><p>{`Créé le ${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()} à ${datetime.getHours() + 1}h${datetime.getUTCMinutes()}`}</p></div>
                            <p>{topic.description}</p>
                        </>
                    )}
                </div>
            </Link>
        </div>
    )
}
