import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice'
import { selectLoggedUser } from '../../redux/slices/loggedUserSlice'
import { reloadTopics } from '../../redux/slices/topicsReload.js'
import './TopicForm.scss'
import config from '../../config.js'


export default function TopicForm({ topicsCategoryId }) {

    const { register, handleSubmit, reset } = useForm()
    const [formDisplay, setFormDisplay] = useState('none')
    const isLogged = useSelector(selectIsLoggedState)
    const loggedUser = useSelector(selectLoggedUser)
    const dispatch = useDispatch()


    const displayManager = (e) => {
        e.preventDefault()
        if (formDisplay === 'none') {
            setFormDisplay("flex")
        } else {
            reset()
            setFormDisplay('none')
        }
    }

    const createNewTopic = (data) => {
        // Conception de l'objet Topic
        const newTopic = {
            title: data.title,
            description: data.question,
            posts: []
        }
        // Conception de l'objet Post
        const newPost = {
            title: "",
            content: data.description,
            author: {
                id: loggedUser._id
            },
            comments: [],
            likes: []
        }
        // Construction de l'objet complet de la requête
        const fetchData = {
            topic: newTopic,
            post: newPost
        }
        // Envoi de la requête
        fetch(`${config.serverEndpoint}/topic/createTopic/${topicsCategoryId}`, {
            method: "POST",
            credentials: "include",
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify(fetchData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            dispatch(reloadTopics())
        })
        .catch(error => console.log(error))
        reset()
        setFormDisplay('none')
    }

    return (
        <div className='creation-topic-main'>
            {isLogged && (
                <>
                <div className='creation-topic-display-button' onClick={(e) => displayManager(e)}>Créez une discussion</div>
                <form className='creation-topic-form' style={{display:`${formDisplay}`}} onSubmit={handleSubmit(createNewTopic)}>
                    <input className='creation-topic-input-title' name='title' type="text" placeholder='Titre du topic' {...register("title")} required />
                    <textarea className='creation-topic-textarea-question' name='question' type="text" placeholder='Question du topic' {...register("question")} maxLength={220} required />
                    <textarea className='creation-topic-textarea-description' name='description' type="text" placeholder='Tapez votre premier post' {...register("description")} maxLength={500} required />
                    <button type="submit">Créer Topic</button>
                </form>
                </>
            )}
        </div>
    )
}
