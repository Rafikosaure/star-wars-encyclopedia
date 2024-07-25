import React from 'react'
import { useEffect } from 'react'
import '../styles/TopicCard.css'
import { Link } from 'react-router-dom'
import StarsSky from '../assets/images/ciel_nuit_banniere.webp'
import { useDispatch } from 'react-redux'
import { saveTopicData } from '../redux/slices/topicSlice'



export default function TopicCard({ topic }) {

    const dispatch = useDispatch()

    useEffect(() => {
        fetch(`http://localhost:8000/post/getPostsByTopicId/${topic._id}`)
        .then(response => response.json())
        .then((data) => {
          // console.log(data)
          dispatch(saveTopicData(data))
        })
        .catch(error => console.log(error))
    
    }, [dispatch, topic])


    return (
        <div className='topic-card-main'>
            <img className='topic-card-banner' src={StarsSky} alt="Ciel étoilé" />
            <Link className='topic-card-link' to={`/topic/${topic._id}`}>
                <div className='topic-card-content'>
                    <h1>{topic.title}</h1>
                    <p>{topic.description}</p>
                </div>
            </Link>
            
        </div>
    )
}
