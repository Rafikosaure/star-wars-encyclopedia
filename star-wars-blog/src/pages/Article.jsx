import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/index.css'
import '../styles/Article.css'
import data from '../data/localApiCategories.json'
import ReturnArrow from '../assets/images/return-arrow.webp'
import { Link } from 'react-router-dom'


export default function Article() {

    const [item, setItem] = useState()
    // const [translatedData, setTranslatedData] = useState()
    const [translatedName, setTranslatedName] = useState()
    const [translatedDescription, setTranslatedDescription] = useState()
    const navigate = useNavigate()
    const { paramsIds } = useParams()
    const currentIds = paramsIds.split('.')
    const categoryId = currentIds[0]
    const articleId = currentIds[1]

    // Récupération de la catégorie de l'article
    const currentDatas = data.find((item) => item._id === categoryId)

    
    useEffect(() => {
        if (currentDatas) {
            // Récupération de l'article depuis l'API
            fetch(`https://starwars-databank-server.vercel.app/api/v1/${currentDatas.keyword}/${articleId}`)
            .then(response => response.json())
            .then(data => setItem(data))
            // Gestion dans ce catch d'un articleId incorrect
            .catch(error => {
                console.log(error)
                navigate("*")
            })
        // Gestion dans ce else d'une categoryId incorrecte
        } else {
            navigate("*")
        }
    }, [articleId, currentDatas, navigate])

        
    useEffect(() => {
        if (item && !translatedName && !translatedDescription) {
            const object = {
                sourceLang: "EN",
                targetLang: "FR",
                name: item.name,
                description: item.description
            }

            fetch('http://localhost:8000/translate', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            })
            .then(response => response.json())
            .then(data => {
                setTranslatedName(data.name.text.replace(/^"|"$/g, ""))
                setTranslatedDescription(data.description.text.replace(/^"|"$/g, ""))
                
            })
            .catch(error => console.log(error))
        }
    })


    return (
        <>
            <div className='app'>
                <div className='div-return' title='Retour vers les articles'>
                    <Link to={`/category/${categoryId}`} className='arrow-link'>
                        <img src={ReturnArrow} alt="Return to the last page" />
                    </Link>
                </div>
                <div className='presentation'>
                    {item && (
                        <>
                            {translatedName && translatedDescription && (
                            <div className='main-div showing-data'>
                                {translatedName ? (
                                    <h1>{translatedName.toLowerCase()}</h1>
                                ) : (
                                    <h1>{item.name.toLowerCase()}</h1>
                                )}
                                <div className='content'>
                                    <div className='img-presentation'>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className='description-div'>
                                        {translatedDescription ? (
                                            <p>{translatedDescription}</p>
                                        ) : (
                                            <p>{item.description}</p>  
                                        )}
                                    </div>
                                </div>
                            </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
