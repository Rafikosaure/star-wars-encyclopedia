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
    const [postContentDisplay, setPostContentDisplay] = useState('block')
    const [modifyContentDisplay, setModifyContentDisplay] = useState('none')
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
            // console.log(data.message)
            dispatch(reloadPosts())
        })
        .catch(error => console.log(error))
    }


    const modifyContent = (e) => {
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

            // Appel au serveur pour modifier le contenu du post
            fetch(`${config.serverEndpoint}/post/updatePost/${post._id}`, {
                method: "PUT",
                headers: {"Accept": "application/json", "Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    content: newContent
                })
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                dispatch(reloadPosts())
            })
            setModifyContentDisplay('none')
            setPostContentDisplay('block')
        }
    }

    const modifyDisplayManager = (e) => {
        e.preventDefault()
        if (postContentDisplay === "block") {
            setPostContentDisplay("none")
            setModifyContentDisplay("block")
        }
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
                            <>
                                <p style={{display: `${postContentDisplay}`}}>{textWithBreaks}</p>
                                <form style={{display: `${modifyContentDisplay}`}} className='post-card-modify-message' onKeyDown={(e) => modifyContent(e)}>
                                    <textarea defaultValue={post.content.split("\n\n").at(-1)} className='textarea-scroll' />
                                </form>
                            </>
                        )}
                    </div>
                </div>
                <div className='post-card-bottom-bar'>
                    {isLogged && postUser ? (
                        <>
                            {postContentDisplay === 'block' && modifyContentDisplay === "none" && (loggedUser._id === postUser._id || loggedUser.isAdmin) ? (
                                <p className='post-card-link loggedColor' title='Modifier ce post' onClick={(e) => modifyDisplayManager(e)}>🖉 Modifier</p>
                            ) : (
                                // <p className='post-card-link unLoggedColor'>🖉 Modifier</p>
                                null
                            )}
                            <a className='post-card-link loggedColor' href={`/topic/${topicId}#citation-post`} title='Citer ce post' onClick={() => saveCurrentCitation()}>➥ Citer</a>
                        </>
                    ) : (
                        <>
                            {/* <p className='post-card-link unLoggedColor'>🖉 Modifier</p> */}
                            <p className='post-card-link unLoggedColor' title='Connectez-vous pour citer ce post'>➥ Citer</p>
                        </>
                        
                    )}
                    <Like post={post} />
                </div>
            </div>
            
        </div>
    )
}
