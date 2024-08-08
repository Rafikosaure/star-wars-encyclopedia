import React, { useEffect, useState } from 'react'
import './Topic.scss'
import { useSelector } from 'react-redux'
import { selectTopicsData } from '../../redux/slices/topicSlice'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PostCard from '../../components/PostCard/PostCard'
import { Link } from 'react-router-dom'
import ReturnArrow from '../../assets/images/return-arrow.webp'


export default function Topic() {

    const topicsData = useSelector(selectTopicsData)
    const { topicId } = useParams()
    const [currentTopicData, setCurrentTopicData] = useState()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (topicsData) {
            const verifyId = topicsData.find((item) => item._id === topicId)
            if (!verifyId) {
                navigate("*")
            }
            setCurrentTopicData(topicsData.find((topicData) => topicData._id === topicId))
        }
    }, [topicId, topicsData, navigate])



    return (
        <div className='app topic'>
            <div className='topic-overlay' />
            <div className='topic-div-return' title='Retour vers les topics'>
                <Link to={-1} className='topic-arrow-link'>
                    <img src={ReturnArrow} alt="Return to the topics page" />
                </Link>
            </div>
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
