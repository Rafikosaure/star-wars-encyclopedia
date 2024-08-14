import React, { useEffect, useState } from 'react'
import './Topic.scss'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PostCard from '../../components/PostCard/PostCard'
import { Link } from 'react-router-dom'
import ReturnArrow from '../../assets/images/return-arrow.webp'
import config from '../../config'


export default function Topic() {
    
    
    const { topicId } = useParams()
    const [currentTopicData, setCurrentTopicData] = useState()
    const [currentCategory, setCurrentCategory] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`${config.serverEndpoint}/post/getPostsByTopicId/${topicId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                navigate("*")
            } else {
                setCurrentTopicData(data)
            }
        })
        .catch(error => console.log(error))
    }, [navigate, topicId])


    useEffect(() => {
        fetch(`${config.serverEndpoint}/category/findCategoryFromTopic/${topicId}`)
        .then(response => response.json())
        .then(data => {
            setCurrentCategory(data.category[0])
        })
        .catch(error => console.log(error))

    }, [topicId])



    return (
        <div className='app topic'>
            <div className='topic-overlay' />
            {currentCategory && (
                <div className='topic-div-return' title='Retour vers les topics'>
                    <Link to={`/topics/${currentCategory._id}`} className='topic-arrow-link'>
                        <img src={ReturnArrow} alt="Return to the topics page" />
                    </Link>
                </div>
            )}
            
            {currentTopicData && (
                <div className='topic-content'>
                    <h1 className='topic-title'>{currentTopicData.title}</h1>
                    {currentTopicData && (
                    <div className='topic-list'>
                        {currentTopicData.posts.map((post, index) => (
                            <PostCard key={index} index={index} post={post}/>
                        ))}
                    </div>
                    )}
                </div>
            )}
        </div>
    )
}
