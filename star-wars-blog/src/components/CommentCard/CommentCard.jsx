import React, { useEffect } from 'react'
import { useState } from 'react'
import './CommentCard.scss'
import DefaultAvatar from '../../assets/images/EmojiBlitzBobaFett1.webp'
import Like from '../Like/Like'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice'
import { selectLoggedUser } from '../../redux/slices/loggedUserSlice'
import { reloadPosts } from '../../redux/slices/postsReload'
import config from '../../config'
import { saveACommentCitation } from '../../redux/slices/commentCitationSlice'



export default function CommentCard({ index, commentId, topicId, postId }) {
    
    const [currentComment, setCurrentComment] = useState()
    const [commentUser, setCommentUser] = useState()
    const [datetime, setDatetime] = useState()
    const [commentContentDisplay, setCommentContentDisplay] = useState('block')
    const [modifyContentDisplay, setModifyContentDisplay] = useState('none')
    const [commentUpdater, setCommentUpdater] = useState(false)
    const isLogged = useSelector(selectIsLoggedState)
    const loggedUser = useSelector(selectLoggedUser)
    const dispatch = useDispatch()


    useEffect(() => {
        if (commentId) {
            fetch(`${config.serverEndpoint}/comment/getOneComment/${commentId}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                if (!data.message) {
                    setCurrentComment(data)
                    const myDate = new Date(data.createdAt)
                    setDatetime(myDate)
                }
            })
            .catch(error => console.log(error))
        }
    }, [commentId, commentUpdater])



    useEffect(() => {
        if (currentComment) {
            fetch(`${config.serverEndpoint}/comment/getCommentAuthor/${currentComment.author.id}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                if (!data.message) {
                    setCommentUser(data)
                }
            })
            .catch(error => console.log(error))
        }
    }, [currentComment])


    const shapingTextWithBreaks = () => {
        if (currentComment) {
            const textWithBreaks = currentComment.content.split('\n').map((text, index) => (
            <React.Fragment key={index}>
                {text}
                <br />
            </React.Fragment>
            ))
            return textWithBreaks
        }
    }
    
    
    const deleteCommentFunction = (e) => {
        e.preventDefault()
        fetch(`${config.serverEndpoint}/comment/deleteAComment/${currentComment._id}`, {
            method: "DELETE",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data.message)
            // console.log('Commentaire supprimé !')
            dispatch(reloadPosts())
        })
        .catch(error => console.log(error))
    }


    const modifyContent = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();

            const modifiedWord = '--modifié--\n';
            let newContent;
            const originalContent = currentComment.content.split("\n\n");
            if (originalContent.length === 2 && e.target.value.includes(modifiedWord)) {
                newContent = `${originalContent.at(-2)}\n\n${e.target.value}`
            } else if(originalContent.length === 2 && !e.target.value.includes(modifiedWord)) {
                newContent = `${originalContent.at(-2)}\n\n${modifiedWord}${e.target.value}`
            } else if(originalContent.length !== 2 && !e.target.value.includes(modifiedWord)) {
                newContent = `${modifiedWord}${e.target.value}`
            } else {
                newContent = `${e.target.value}`
            }

            // Appel au serveur pour modifier le contenu du commentaire
            fetch(`${config.serverEndpoint}/comment/updateAComment/${currentComment._id}`, {
                method: "PUT",
                headers: {"Accept": "application/json", "Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    content: newContent
                })
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data.content)
                if (commentUpdater) {
                    setCommentUpdater(false)
                } else {
                    setCommentUpdater(true)
                }
            })
            setModifyContentDisplay('none')
            setCommentContentDisplay('block')
        }
    }


    const modifyDisplayManager = (e) => {
        e.preventDefault()
        if (commentContentDisplay === "block") {
            setCommentContentDisplay("none")
            setModifyContentDisplay("block")
        }
    }


    const saveCurrentCitation = (e) => {
        e.preventDefault()
        let citationObject = {
            authorId: undefined,
            text: undefined
        }
        citationObject.authorId = commentUser._id
        if (currentComment.content.includes("\n\n")) {
            const textCitation = currentComment.content.split("\n\n").at(-1)
            const completeCitation = `${commentUser.name} a dit :\n"${textCitation}"`
            citationObject.text = completeCitation
        } else {
            const completeCitation = `${commentUser.name} a dit :\n"${currentComment.content}"`
            citationObject.text = completeCitation
        }
        dispatch(saveACommentCitation(citationObject))
    }


  return (
    <div className='comment-card-wrapper'>
        <p className='comment-card-wrapper-arrow'>➤</p>
        <div className='comment-card-body'>
            <div className='comment-card-main'>
                {isLogged && loggedUser.isAdmin && (
                    <div className='comment-card-delete-cross' 
                        title='Supprimer le commentaire' 
                        onClick={(e) => deleteCommentFunction(e)}>
                        ✖
                    </div>          
                )}
                <div className='comment-card-author'>
                    {commentUser ? (
                        <>
                            {commentUser.picture !== "" ? (
                                <div className='comment-card-author-profile-image'>
                                    <img src={commentUser.picture} alt="Profil de l'utilisateur" />
                                </div>
                            ) : (
                                <div className='comment-card-author-profile-image'>
                                    <img src={DefaultAvatar} alt="Profil de l'utilisateur" />
                                </div>
                            )}
                            <p className='comment-card-author-name'>{commentUser.name}</p>
                        </>
                    ) : (
                        <>
                            <div className='comment-card-author-profile-image'>
                                <img src={DefaultAvatar} alt="Avatar par défaut" />
                            </div>
                            <p className='comment-card-author-name'>{'Inconnu'}</p>
                        </>
                    )}
                    
                </div>
                <div className='comment-card-content'>
                    {currentComment && datetime && (
                        <>
                            <p className='comment-card-content-front'>
                                <span>{`# ${index + 1}`}</span>
                                <span>{`${datetime.toLocaleDateString("fr-FR", {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' }).replace(':', 'h')}`}</span>
                            </p>

                            <p className='comment-card-content-text' style={{display: `${commentContentDisplay}`}}>{shapingTextWithBreaks()}</p>

                            <form style={{display: `${modifyContentDisplay}`}} className='comment-card-modify-message' onKeyDown={(e) => modifyContent(e)}>
                                <textarea defaultValue={currentComment.content.split("\n\n").at(-1)} className='textarea-scroll' />
                            </form>
                        </>
                    )}
                    </div>
                </div>
            <div className='comment-card-footer'>
                {isLogged && commentUser ? (
                    <>
                        {commentContentDisplay === 'block' && modifyContentDisplay === "none" && (loggedUser._id === commentUser._id || loggedUser.isAdmin) ? (
                            <p className='comment-card-footer-link loggedColor' title='Modifier ce commentaire' onClick={(e) => modifyDisplayManager(e)}>🖉 Modifier</p>
                        ) : (
                            null
                        )}
                        <a className='comment-card-footer-link loggedColor' href={`/topic/${topicId}`} title='Citer ce commentaire' onClick={(e) => saveCurrentCitation(e)}>➥ Citer</a>
                    </>
                ) : (
                    <>
                        <p className='comment-card-footer-link unloggedColor' title='Connectez-vous pour citer ce commentaire'>➥ Citer</p>
                    </>
                    
                )}
                <Like post={undefined} comment={currentComment}/>
            </div>
        </div>
    </div>
  )
}