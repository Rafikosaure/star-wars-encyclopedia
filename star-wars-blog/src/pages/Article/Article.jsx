import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveArticlesArray } from '../../redux/slices/articlesArraySlice'
import '../../sharedStyles/index.scss'
import './Article.scss'
import data from '../../data/localApiCategories.json'
import ReturnArrow from '../../assets/images/return-arrow.webp'
import { Link } from 'react-router-dom'
import config from '../../config'



export default function Article() {

    const [item, setItem] = useState()
    const dispatch = useDispatch()
    const [translatedName, setTranslatedName] = useState()
    const [translatedDescription, setTranslatedDescription] = useState()
    const navigate = useNavigate()
    const { paramsIds } = useParams()
    const currentIds = paramsIds.split('.')
    const categoryId = currentIds[0]
    const articleId = currentIds[1]

    // Récupération de la catégorie de l'article
    const currentDatas = data.find((item) => item._id === categoryId)

    // Réinitialisation de l'affichage dans la page Catégorie
    useEffect(() => {
        dispatch(saveArticlesArray([]))
    })


    useEffect(() => {
        if (currentDatas) {

            // Récupération de l'article depuis l'API
            fetch(`${config.starWarsAPI}/${currentDatas.keyword}/${articleId}`)
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


    // Appels automatiques à l'API de traduction des textes
    useEffect(() => {
        if (item && !translatedName && !translatedDescription) {
            const object = {
                sourceLang: "en",
                targetLang: "fr",
                array: [{
                    id: item._id,
                    name: item.name,
                    image: item.image,
                    description: item.description
                }]
            }

            fetch(`${config.serverEndpoint}/translate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            })
            .then(response => response.json())
            .then(data => {
                const translatedArray = data.translatedArray
                setTranslatedName(translatedArray[0].name.replace(/^"|"$/g, ""))
                setTranslatedDescription(translatedArray[0].description.replace(/^"|"$/g, ""))
                
            })
            .catch(error => {
                console.log(error)
            })
        }
    })


    return (
        <>
            <div className='app article-page'>
                <div className='div-return'>
                    <Link to={`/category/${categoryId}`} title='Retour vers les articles' className='arrow-link'>
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
