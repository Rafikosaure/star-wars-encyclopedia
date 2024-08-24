import React, { useEffect, useState } from 'react'
import './PostCard.scss'
import DefaultAvatar from '../../assets/images/EmojiBlitzBobaFett1.webp'
import Like from '../Like/Like'
import config from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import { saveACitation } from '../../redux/slices/citationSlice'
import { reloadPosts } from '../../redux/slices/postsReload'
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice'
import { selectLoggedUser } from '../../redux/slices/loggedUserSlice'



export default function PostCard({ index, post, topicId }) {

    const [postUser, setPostUser] = useState()
    const [datetime, updateDateTime] = useState()
    const isLogged = useSelector(selectIsLoggedState)
    const loggedUser = useSelector(selectLoggedUser)
    const dispatch = useDispatch()


    useEffect(() => {
        if (post) {
            fetch(`${config.serverEndpoint}/post/getPostAuthor/${post.author.id}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                if (!data.message) {
                    setPostUser(data)
                    const myDate = new Date(post.createdAt)
                    updateDateTime(myDate)
                }
            })
            .catch(error => console.log(error))
        }
        
    }, [post])


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


    const textWithBreaks = post.content.split('\n').map((text, index) => (
        <React.Fragment key={index}>
            {text}
            <br />
        </React.Fragment>
    ))


    const deletePostFunction = (e) => {
        e.preventDefault()
        console.log('Suppression du post')
        fetch(`${config.serverEndpoint}/post/deletePostById/${post._id}`, {
            method: "DELETE",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
            dispatch(reloadPosts())
        })
        .catch(error => console.log(error))
    }


    return (
        <div className='post-card-main'>
            <div className='post-card-overlay' />
            <div className='post-card-content'>
                {datetime && (
                    <div className='post-card-infos'>
                        {isLogged && loggedUser.isAdmin ? (
                            <div className='delete-post-cross' title='Supprimer le post' onClick={(e) => deletePostFunction(e)}>✖</div>
                        ) : null}
                        <p>{`# ${index + 1}`}</p><p className='infos-datetime'>{`Le ${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()} à ${datetime.getHours() + 1}h${datetime.getUTCMinutes()}`}</p>
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
                            <p>{textWithBreaks}</p>
                        )}
                    </div>
                </div>
                <div className='post-card-bottom-bar'>
                    <Like post={post} />
                    {isLogged ? (
                        <a className='post-card-citation-link loggedColor' href={`/topic/${topicId}#citation-post`} title='Citer ce post' onClick={() => saveCurrentCitation()}>➥ Citer</a>
                    ) : (
                        <p className='post-card-citation-link unLoggedColor' title='Connectez-vous pour citer ce post'>➥ Citer</p>
                    )}
                    
                </div>
            </div>
            
        </div>
    )
}
