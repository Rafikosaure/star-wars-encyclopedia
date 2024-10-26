import React from 'react'
import './CommentForm.scss'
import { useForm } from 'react-hook-form'
import { reinitializeCommentCitation, selectCommentCitation } from '../../redux/slices/commentCitationSlice'
import { useSelector, useDispatch } from 'react-redux'
import config from '../../config'
import { reloadUsersArrayFunction } from '../../redux/slices/reloadUsersArray'
import { reloadPosts } from '../../redux/slices/postsReload'
import { selectLoggedUser } from '../../redux/slices/loggedUserSlice'
import mentionsManager from '../../sharedFunctions/mentionsManager'



export default function CommentForm({ post, usersList, topicId }) {

    const currentCommentCitation = useSelector(selectCommentCitation)
    const commentCitationText = currentCommentCitation.text
    const commentCitationAuthorId = currentCommentCitation.authorId
    const commentCitationPostId = currentCommentCitation.postId
    const loggedUser = useSelector(selectLoggedUser)
    const { register, reset } = useForm()
    const dispatch = useDispatch()



    const createNewComment = (data) => {
        if (data.keyCode === 13 && data.shiftKey === false) {
            data.preventDefault();
            if (data.target.value.length === 0) {
                dispatch(reinitializeCommentCitation())
                console.log("Données non-renseignées !")
                return
            }
            // Construction du corps de la requète
            const fetchContent = data.target.value.replace(/\s+/g, ' ').trim()
            let fetchData = {
                post: post._id,
                content: fetchContent,
                author: {
                    id: loggedUser._id
                },
                likes: []
            }
            if (commentCitationText && commentCitationAuthorId && commentCitationPostId === post._id) {
                const fetchCitationText = commentCitationText.split("a dit :").at(-1).trim().replace(/^"|"$/g, "")
                fetchData.citation = {
                    citationAuthorId: commentCitationAuthorId, 
                    citationText: fetchCitationText
                }
            }
            // Envoi de la requète
            fetch(`${config.serverEndpoint}/comment/createComment/${post._id}`, {
                method: "POST",
                credentials: "include",
                headers: {"Accept": "application/json", "Content-Type": "application/json"},
                body: JSON.stringify(fetchData)
            })
            .then(response => response.json())
            .then(result => {

                // Gestion des mentions
                dispatch(reloadUsersArrayFunction(false))
                mentionsManager(fetchContent, result.newComment._id, usersList, topicId)

                // Rafraichissement des commentaires affichés
                dispatch(reloadPosts())
            })
            .catch(error => console.log(error))
            reset()
            dispatch(reinitializeCommentCitation())
        }
    }




  return (
    <>
        <form className='new-comment-form' onKeyDown={(e) => createNewComment(e)}>
            {commentCitationText && commentCitationPostId === post._id && (
                <div className='comment-citation-div'>
                    <span className='comment-citation-cancel' title='Annuler la citation' onClick={() => dispatch(reinitializeCommentCitation())}>✖</span>
                    <p className='comment-citation-content'>{commentCitationText}</p>
                </div>
            )}
            <textarea className='new-comment-form-textarea' name='newComment' type="text" maxLength={500} placeholder='Tapez un commentaire' {...register("newComment")} required></textarea>
        </form>
    </>
  )
}
