import React, { useEffect, useState } from 'react'
import './Topic.scss'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { selectCitation } from '../../redux/slices/citationSlice'
import { reinitializeCitation } from '../../redux/slices/citationSlice'
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice'
import { selectLoggedUser } from '../../redux/slices/loggedUserSlice'
import { reloadPosts } from '../../redux/slices/postsReload'
import { selectReloadPostsState } from '../../redux/slices/postsReload'
import PostCard from '../../components/PostCard/PostCard'
import { Link } from 'react-router-dom'
import ReturnArrow from '../../assets/images/return-arrow.webp'
import config from '../../config'


export default function Topic() {
    
    
    const { topicId } = useParams()
    const [currentTopicData, setCurrentTopicData] = useState()
    const [currentCategory, setCurrentCategory] = useState()
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm()
    const currentCitation = useSelector(selectCitation)
    const reloadPostsBool = useSelector(selectReloadPostsState)
    const loggedUser = useSelector(selectLoggedUser)
    const isLogged = useSelector(selectIsLoggedState)
    const citationText = currentCitation.text
    const citationAuthorId = currentCitation.authorId
    const dispatch = useDispatch()



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
    }, [navigate, topicId, reloadPostsBool])


    useEffect(() => {
        fetch(`${config.serverEndpoint}/category/findCategoryFromTopic/${topicId}`)
        .then(response => response.json())
        .then(data => {
            setCurrentCategory(data.category[0])
        })
        .catch(error => console.log(error))

    }, [topicId])


    const createNewPost = (data) => {
        // Construction du corps de la requète
        const fetchContent = data.description.replace(/\s+/g, ' ').trim()
        let fetchData = {
            title: "",
            content: fetchContent,
            author: {
                id: loggedUser._id
            },
            comments: [],
            likes: []
        }
        if (citationText && citationAuthorId) {
            const fetchCitationText = citationText.split("a dit :").at(-1).trim().replace(/^"|"$/g, "")
            fetchData.citation = {
                citationAuthorId: citationAuthorId, 
                citationText: fetchCitationText
            }
        }

        // Envoi de la requète
        fetch(`${config.serverEndpoint}/post/createPost/${topicId}`, {
            method: "POST",
            credentials: "include",
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify(fetchData)
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            dispatch(reloadPosts())
        })
        .catch(error => console.log(error))
        reset()
        dispatch(reinitializeCitation())
    }


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
                            <PostCard key={index} index={index} post={post} topicId={topicId}/>
                        ))}
                    </div>
                    )}
                    {isLogged && (
                        <form id='citation-post' className='creation-post-form' onSubmit={handleSubmit(createNewPost)}>
                            <h2 className='creation-post-form-title'>Créez un post</h2>
                            {citationText && (
                                <div className='citation-div'>
                                    <span className='citation-cancel' title='Annuler la citation' onClick={() => dispatch(reinitializeCitation())}>✖</span>
                                    <p className='citation-content'>{citationText}</p>
                                </div>
                            )}
                            <textarea className='creation-post-textarea-description' name='description' type="text" placeholder='Tapez votre post' {...register("description")} maxLength={500} required />
                            <button type='submit' className='creation-post-form-submit'>Publier</button>
                        </form>
                    )}
                    
                </div>
            )}
        </div>
    )
}
