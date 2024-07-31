import React, { useEffect, useState } from 'react'
import '../styles/PostCard.css'
import DefaultAvatar from '../assets/images/EmojiBlitzBobaFett1.webp'
import Like from './Like'
import { config } from '../config'



export default function PostCard({ index, post }) {

    const [postUser, setPostUser] = useState()
    const [datetime, updateDateTime] = useState()

    useEffect(() => {
        if (post) {
            fetch(`${config.serverEndpoint}/post/getPostUser/${post.author.id}`)
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


    return (
        <div className='post-card-main'>
            <div className='post-card-overlay' />
            <div className='post-card-content'>
                {datetime && (
                    <div className='post-card-infos'>
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
                            <p>{post.content}</p>
                        )}
                    </div>
                </div>
                <div className='post-card-bottom-bar'>
                    <Like />
                </div>
            </div>
            
        </div>
    )
}
