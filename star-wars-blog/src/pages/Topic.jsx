import React, { useEffect, useState } from 'react'
import '../styles/Topic.css'
import { useSelector } from 'react-redux'
import { selectTopicsData } from '../redux/slices/topicSlice'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { toast } from 'sonner'


export default function Topic() {

    const topicsData = useSelector(selectTopicsData)
    const { topicId } = useParams()
    const [currentTopicData, setCurrentTopicData] = useState()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (topicsData) {
            const verifyId = topicsData.find((item) => item._id === topicId)
            if (!verifyId) {
                navigate("/forum")
                toast("Page inexistante !")
            }
            setCurrentTopicData(topicsData.find((topicData) => topicData._id === topicId))
        }
    }, [topicId, topicsData, navigate])



    return (
        <div className='app topic'>
            <div className='topic-overlay' />
            {topicsData && (
                <div className='topic-content'>
                    <h1 className='topic-title'>Topic-title</h1>
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
