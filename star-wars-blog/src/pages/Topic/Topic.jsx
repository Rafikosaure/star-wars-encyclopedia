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
import { selectTopicDozen, setCurrentTopicDozen } from '../../redux/slices/topicDozenSlice'
import mentionsManager from '../../sharedFunctions/mentionsManager'
import subscribersManager from '../../sharedFunctions/subscribersManager'
import PostCard from '../../components/PostCard/PostCard'
import PostForm from '../../components/PostForm/PostForm'
import { Link } from 'react-router-dom'
import ReturnArrow from '../../assets/images/return-arrow.webp'
import config from '../../config'
import ArrowNext from '../../assets/images/next-arrow.webp'
import ArrowPrev from '../../assets/images/back-arrow.webp'




export default function Topic() {
    
    const { topicId, page } = useParams()
    const [currentTopicData, setCurrentTopicData] = useState()
    const [currentCategory, setCurrentCategory] = useState()
    const [usersList, setUsersList] = useState()
    const [description, setDescription] = useState('')
    const [toReset, setToReset] = useState(false)
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
    const navigate = useNavigate()
    const { handleSubmit } = useForm()
    const currentCitation = useSelector(selectCitation)
    const reloadPostsBool = useSelector(selectReloadPostsState)
    const loggedUser = useSelector(selectLoggedUser)
    const isLogged = useSelector(selectIsLoggedState)
    const reloadUsers = useSelector(selectReloadUsersState)
    const currentTopicDozen = useSelector(selectTopicDozen)
    const citationText = currentCitation.text
    const citationAuthorId = currentCitation.authorId
    const dispatch = useDispatch()


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentTopicDozen.value.currentPage])


    // Récupérer les posts de la discussion courante
    useEffect(() => {
        const currentTopicData = {
            currentPage: page,
            topicId: topicId
        }
        dispatch(setCurrentTopicDozen(currentTopicData))
        fetch(`${config.serverEndpoint}/post/getPostsByTopicId/${topicId}/posts?page=${currentTopicDozen.value.currentPage}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                navigate("*")
            } else {
                setCurrentTopicData(data)
                setTotalPages(data.totalPages)
                setCurrentPage(data.currentPage)
            }
        })
        .catch(error => {
            console.log(error)
            navigate("*")
        })
    }, [navigate, dispatch, topicId, page, currentPage, reloadPostsBool, currentTopicDozen])


    // Vérifier si la page est valide
    const isPageValid = (page, totalPages) => {
        return page >= 1 && page <= totalPages;
    };


    useEffect(() => {

        // Si la page est undefined ou invalide, on met pageNum à 1
        const pageNum = parseInt(page) || 1; 
        if (currentTopicData && totalPages && currentPage) {

            // Vérification de la validité de la page
            if (totalPages && !isPageValid(pageNum, totalPages)) {

                // Rediriger vers la page 1 si la page est invalide
                navigate(`/topic/${topicId}/page/1`);
            }
        }
    }, [page, totalPages, currentTopicData, currentPage, navigate, topicId]);


    // Récupérer la catégorie de la discussion courante et ses données
    useEffect(() => {
        fetch(`${config.serverEndpoint}/category/findCategoryFromTopic/${topicId}`)
        .then(response => response.json())
        .then(data => {
            setCurrentCategory(data.category[0])
        })
        .catch(error => {
            console.log(error)
            navigate("*")
        })

    }, [topicId, navigate])


    useEffect(() => {

        // Récupération des utilisateurs
        if (!reloadUsers || !usersList) {
            fetch(`${config.serverEndpoint}/user/getAll`, {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                setUsersList(data)
            })
            .catch(error => {
                console.log(error)
                navigate("*")
            })
            dispatch(reloadUsersArrayFunction(true))
        }
        
    }, [dispatch, navigate, reloadUsers, usersList])


    // Fonction pour passer à la page suivante
    const nextPage = (e) => {
        e.preventDefault()
        if (currentPage < totalPages) {
            dispatch(reloadPosts())
            const nextPage = currentPage + 1
            setCurrentPage(nextPage);  // Incrémenter la page
            const currentTopicData = {
                currentPage: nextPage,
                topicId: topicId
            }
            dispatch(setCurrentTopicDozen(currentTopicData)); // Mise à jour dans Redux
            navigate(`/topic/${topicId}/page/${nextPage}`);  // Met à jour l'URL
        }
    };


    // Fonction pour revenir à la page précédente
    const prevPage = (e) => {
        e.preventDefault()
        if (currentPage > 1) {
            dispatch(reloadPosts())
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            const currentTopicData = {
                currentPage: prevPage,
                topicId: topicId
            }
            dispatch(setCurrentTopicDozen(currentTopicData)); // Mise à jour dans Redux
            navigate(`/topic/${topicId}/page/${prevPage}`);  // Met à jour l'URL     
        }
    };


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
            mentionsManager(data.description, result.newPost._id, usersList, topicId, currentTopicDozen.value.currentPage)
            
            // Gestion des abonnements à la discussion
            subscribersManager(topicId, result.newPost._id, loggedUser, "post", currentTopicDozen.value.currentPage)

            // Rafraichissement des posts affichés
            dispatch(reloadPosts())
        })
        .catch(error => {
            console.log(error)
        })
        setToReset(true)
        dispatch(reinitializeCitation())
    }
    
    
    return (
        <div className='app topic'>
            <div className='topic-overlay' />
            {currentCategory && (
                <div className='topic-div-return'>
                    <Link to={`/topics/${currentCategory._id}`}  className='topic-arrow-link' 
                    title='Retour vers la liste des discussions'
                    >
                        <img src={ReturnArrow} alt="Return to the topics page" />
                    </Link>
                </div>
            )}
            
            {currentTopicData && (
                <div className='topic-content'>
                    <h1 className='topic-title'>{currentTopicData.title}</h1>
                    {currentTopicData && (
                    <>
                    <div className='topic-list'>
                        {currentTopicData.posts.map((post, index) => {
                            // Calcul de l'index global
                            const globalIndex = (currentPage - 1) * 10 + index + 1;
                        return (
                            <PostCard key={index} index={globalIndex} post={post} topicId={topicId} usersList={usersList} currentPage={currentTopicDozen.value.currentPage} />
                        )})}
                    </div>
                    {totalPages > 1 && (
                        <div className='topic-page-buttons'>
                            {currentPage !== 1 && (
                                <div className='topic-prev-button' onClick={(e) => prevPage(e)} 
                                title='Page précédente'
                                ><img src={ArrowPrev} className='topic-button-prev-page' alt="Bouton de retour à la page précédente" />
                                </div>
                            )}
                            
                            <span className='topic-page-counter'>Page {currentPage} sur {totalPages}</span>

                            {currentPage !== totalPages && (
                                <div className='topic-next-button' onClick={(e) => nextPage(e)} 
                                title='Page suivante'
                                ><img src={ArrowNext} className='topic-button-next-page' alt="Bouton de passage à la page suivante" />
                                </div>
                            )}
                        </div>
                    )}
                    
                    </>
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