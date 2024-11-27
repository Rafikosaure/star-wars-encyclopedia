import React, { useEffect, useState } from 'react'
import './Topic.scss'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { selectReloadUsersState } from '../../redux/slices/reloadUsersArray'
import { reloadUsersArrayFunction } from '../../redux/slices/reloadUsersArray'
import { selectCitation } from '../../redux/slices/citationSlice'
import { reinitializeCitation } from '../../redux/slices/citationSlice'
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice'
import { selectLoggedUser } from '../../redux/slices/loggedUserSlice'
import { reloadPosts } from '../../redux/slices/postsReload'
import { selectReloadPostsState } from '../../redux/slices/postsReload'
import mentionsManager from '../../sharedFunctions/mentionsManager'
import subscribersManager from '../../sharedFunctions/subscribersManager'
import PostCard from '../../components/PostCard/PostCard'
import PostForm from '../../components/PostForm/PostForm'
import { Link } from 'react-router-dom'
import ReturnArrow from '../../assets/images/return-arrow.webp'
import config from '../../config'




export default function Topic() {
    
    const { topicId } = useParams()
    const [currentTopicData, setCurrentTopicData] = useState()
    const [currentCategory, setCurrentCategory] = useState()
    const [usersList, setUsersList] = useState()
    const [description, setDescription] = useState('')
    const [toReset, setToReset] = useState(false)
    const navigate = useNavigate()
    const { handleSubmit } = useForm()
    const currentCitation = useSelector(selectCitation)
    const reloadPostsBool = useSelector(selectReloadPostsState)
    const loggedUser = useSelector(selectLoggedUser)
    const isLogged = useSelector(selectIsLoggedState)
    const reloadUsers = useSelector(selectReloadUsersState)
    const citationText = currentCitation.text
    const citationAuthorId = currentCitation.authorId
    const dispatch = useDispatch()


    // Récupérer les posts de la discussion courante
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



    // Récupérer la catégorie de la discussion courante et ses données
    useEffect(() => {
        fetch(`${config.serverEndpoint}/category/findCategoryFromTopic/${topicId}`)
        .then(response => response.json())
        .then(data => {
            setCurrentCategory(data.category[0])
        })
        .catch(error => console.log(error))

    }, [topicId])



    useEffect(() => {

        // Récupération des utilisateurs
        if (!reloadUsers || !usersList) {
            fetch(`${config.serverEndpoint}/user/getAll`, {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                if (!data.badAccessMessage) {
                    setUsersList(data)
                }
            })
            .catch(error => {
                console.log(error)
            })
            dispatch(reloadUsersArrayFunction(true))
        }
        
    }, [dispatch, reloadUsers, usersList])



    const createNewPost = (data) => {

        // Récupération du texte du post
        data.description = description

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
        .then(result => {

            // Gestion des mentions
            dispatch(reloadUsersArrayFunction(false))
            mentionsManager(data.description, result.newPost._id, usersList, topicId)
            
            // Gestion des abonnements à la discussion
            subscribersManager(topicId, result.newPost._id, loggedUser, "post")

            // Rafraichissement des posts affichés
            dispatch(reloadPosts())
        })
        .catch(error => console.log(error))
        setToReset(true)
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
                            <PostCard key={index} index={index} post={post} topicId={topicId} usersList={usersList} />
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
                            
                            <PostForm setDescription={setDescription} toReset={toReset} setToReset={setToReset} />
                            <button type='submit' className='creation-post-form-submit'>Publier</button>
                        </form>
                    )}
                    
                </div>
            )}
        </div>
    )
}