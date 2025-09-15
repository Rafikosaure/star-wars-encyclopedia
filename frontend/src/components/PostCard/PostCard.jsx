import React, { useEffect, useState } from 'react'
import './PostCard.scss'
import DefaultAvatar from '../../assets/images/EmojiBlitzBobaFett1.webp'
import Like from '../Like/Like'
import { useDispatch, useSelector } from 'react-redux'
import { saveACitation } from '../../redux/slices/citationSlice'
import { reloadUsersArrayFunction } from '../../redux/slices/reloadUsersArray'
import { reloadPosts } from '../../redux/slices/postsReload'
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice'
import { selectLoggedUser } from '../../redux/slices/loggedUserSlice'
import CommentCard from '../CommentCard/CommentCard'
import CommentForm from '../CommentForm/CommentForm'
import mentionsManager from '../../utils/mentionsManager'
import { ServerServices } from '../../api/api-server'



export default function PostCard({ index, post, topicId, usersList, currentPage }) {

    const [postUser, setPostUser] = useState()
    const [datetime, updateDateTime] = useState()
    const isLogged = useSelector(selectIsLoggedState)
    const loggedUser = useSelector(selectLoggedUser)
    const [postContentDisplay, setPostContentDisplay] = useState('block')
    const [modifyContentDisplay, setModifyContentDisplay] = useState('none')
    const dispatch = useDispatch()
    const { 
        getPostAuthor, 
        deletePostById, 
        updatePostContent 
    } = ServerServices


    // Récupérer l'auteur du post courant
    useEffect(() => {
        if (post) {
            getPostAuthor(post.author.id)
                .then(data => {
                    if (data) setPostUser(data);
                });
    
            const myDate = new Date(post.createdAt);
            updateDateTime(myDate);
        }
    }, [post, getPostAuthor]);


    // Gestion des citations du post
    const saveCurrentCitation = () => {
        let citationObject = {
            authorId: undefined,
            text: undefined
        }
        citationObject.authorId = postUser._id
        if (post.content.includes("\n\n")) {
            const textCitation = post.content.split("\n\n").at(-1)
            const completeCitation = `${postUser.name} a dit :\n"${textCitation}"`
            citationObject.text = completeCitation
        } else {
            const completeCitation = `${postUser.name} a dit :\n"${post.content}"`
            citationObject.text = completeCitation
        }        
        dispatch(saveACitation(citationObject))
    }


    // Gestion des retours à la ligne
    const textWithBreaks = post.content.split('\n').map((text, index) => (
        <React.Fragment key={index}>
            {text}
            <br />
        </React.Fragment>
    ))


    // Supprimer le post courant
    const deletePostFunction = async (e) => {
        e.preventDefault();
        const data = await deletePostById(post._id);
        if (data) {
            dispatch(reloadPosts());
        }
    };


    // Modifier le message du post
    const modifyContent = async (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();

            const modifiedWord = '--modifié--\n';
            let newContent;
            const originalContent = post.content.split("\n\n");
            if (originalContent.length === 2 && e.target.value.includes(modifiedWord)) {
                newContent = `${originalContent.at(-2)}\n\n${e.target.value}`
            } else if(originalContent.length === 2 && !e.target.value.includes(modifiedWord)) {
                newContent = `${originalContent.at(-2)}\n\n${modifiedWord}${e.target.value}`
            } else if(originalContent.length !== 2 && !e.target.value.includes(modifiedWord)) {
                newContent = `${modifiedWord}${e.target.value}`
            } else {
                newContent = `${e.target.value}`
            }

            // Appel au serveur pour modifier le message du post
            try {
                const data = await updatePostContent(post._id, newContent);
    
                // Gestion des mentions dans le texte modifié
                dispatch(reloadUsersArrayFunction(false));
                mentionsManager(newContent, data._id, usersList, topicId, currentPage);
    
                // Rafraîchissement des posts affichés
                dispatch(reloadPosts());
            } catch (error) {
                console.error(error);
            }
            setModifyContentDisplay('none')
            setPostContentDisplay('block')
        }
    }


    // Gestion de l'affichage pour la modification
    const modifyDisplayManager = (e) => {
        e.preventDefault()
        if (postContentDisplay === "block") {
            setPostContentDisplay("none")
            setModifyContentDisplay("block")
        }
    }


    return (
        <div className='post-card-main-wrapper' id={post._id}>
            <div className='post-card-main'>
                <div className='post-card-overlay' />
                <div className='post-card-content'>
                    {datetime && (
                        <div className='post-card-infos'>
                            {isLogged && loggedUser.isAdmin && index !== 1 && (
                                
                                <div tabIndex="0" 
                                className='delete-post-cross' 
                                title='Supprimer le post' 
                                onClick={(e) => deletePostFunction(e)}
                                onKeyDown={(e) => e.key === 'Enter' && deletePostFunction(e)}
                                >✖</div>
                            )}
                            <p className='info-index'>{`# ${index}`}</p><p className='infos-datetime'>{`${datetime.toLocaleDateString("fr-FR", {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' }).replace(':', 'h')}`}</p>
                        </div>
                    )}
                    
                    <div className='post-card-author'>
                        {postUser ? (
                            <div className='post-card-author-wrapper'>
                                {postUser.picture !== "" ? (
                                    <div className='post-card-author-div'><img src={postUser.picture} alt="profil de l'utilisateur" /></div>
                                ) : (
                                    <div className='post-card-author-div'><img src={DefaultAvatar} alt="profil de l'utilisateur" /></div>
                                )}
                                <h2>{postUser.name}</h2>
                            </div>
                        ) : (
                            <div className='post-card-author-wrapper'>
                                <div className='post-card-author-div'><img src={DefaultAvatar} alt="profil de l'utilisateur" /></div>
                                <h2>{'Inconnu'}</h2>
                            </div>
                        )}
                        <div className='post-card-message'>
                            {post && (
                                <>
                                    <p style={{display: `${postContentDisplay}`}}>{textWithBreaks}</p>
                                    <form 
                                    style={{display: `${modifyContentDisplay}`}} 
                                    className='post-card-modify-message' 
                                    onKeyDown={(e) => modifyContent(e)}
                                    >
                                        <textarea defaultValue={post.content.split("\n\n").at(-1)} maxLength={500} className='textarea-scroll' />
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='post-card-bottom-bar'>
                        {isLogged && postUser && (
                            <>
                                {postContentDisplay === 'block' && modifyContentDisplay === "none" && (loggedUser._id === postUser._id || loggedUser.isAdmin) ? (
                                    <p 
                                    tabIndex="0" 
                                    className='post-card-link loggedColor' 
                                    title='Modifier ce post' 
                                    onClick={(e) => modifyDisplayManager(e)}
                                    onKeyDown={(e) => e.key === 'Enter' && modifyDisplayManager(e)}
                                    >🖉 Modifier</p>
                                ) : (
                                    null
                                )}
                                <a 
                                className='post-card-link loggedColor' 
                                href={`/topic/${topicId}/page/${currentPage}#citation-post`} 
                                title='Citer ce post' 
                                onClick={() => saveCurrentCitation()}
                                onKeyDown={(e) => e.key === 'Enter' && saveCurrentCitation()}
                                >➥ Citer</a>
                                <Like post={post} comment={undefined} />
                            </>
                        )}
                        {isLogged && !postUser && (
                            <p className='post-card-link unLoggedColor'>Post d'un utilisateur inconnu</p>
                        )}
                        {!isLogged && postUser && (
                            <>
                                <p className='post-card-link unLoggedColor' title='Connectez-vous pour citer ce post'>➥ Citer</p>
                                <Like post={post} comment={undefined} />
                            </>
                        )}
                        {!isLogged && !postUser && (
                            <p className='post-card-link unLoggedColor'>Post d'un utilisateur inconnu</p>
                        )}
                    </div>
                </div>
            </div>
            <div className='post-card-comments-section'>
                {post && (
                    post.comments.map((commentId, index) => (
                        <CommentCard key={index} index={index} commentId={commentId} topicId={topicId} postId={post._id} usersList={usersList} currentPage={currentPage} />
                    ))
                )}
                
            </div>
            <div className='new-comment-form-section'>
                {isLogged && postUser && (
                    <CommentForm post={post} usersList={usersList} topicId={topicId} currentPage={currentPage} />
                )}
            </div>
        </div>
    )
}
