import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './TopicForm.scss'


export default function TopicForm() {


    const { register, handleSubmit, reset } = useForm()
    const [formDisplay, setFormDisplay] = useState('none')

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
        console.log(data)
        reset()
        setFormDisplay('none')
    }

    return (
        <div className='creation-topic-main'>
            <div className='creation-topic-display-button' onClick={(e) => displayManager(e)}>Créez une discussion</div>
            <form className='creation-topic-form' style={{display:`${formDisplay}`}} onSubmit={handleSubmit(createNewTopic)}>
                <input className='creation-topic-input-title' name='title' type="text" placeholder='Titre du topic' {...register("title")} required />
                <textarea className='creation-topic-textarea-question' name='question' type="text" placeholder='Question du topic' {...register("question")} maxLength={220} required />
                <textarea className='creation-topic-textarea-description' name='description' type="text" placeholder='Texte du premier post' {...register("description")} maxLength={450} required />
                <button type="submit">Créer Topic</button>
            </form>
        </div>
    )
}
