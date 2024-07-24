import React from 'react'
import '../styles/TopicCard.css'
import { Link } from 'react-router-dom'
import StarsSky from '../assets/images/ciel_nuit_banniere.webp'


export default function TopicCard({ topic }) {
    return (
        <div className='topic-card-main'>
            <img className='topic-card-banner' src={StarsSky} alt="Ciel étoilé" />
            <Link className='topic-card-link'>
                <div className='topic-card-content'>
                    <h1>{topic.title}</h1>
                    <p>{topic.description}</p>
                </div>
            </Link>
            
        </div>
    )
}
