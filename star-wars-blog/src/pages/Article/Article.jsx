import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveAnArticle } from '../../redux/slices/articleSlice'
import '../../sharedStyles/index.scss'
import './Article.scss'
import data from '../../data/localApiCategories.json'
import ReturnArrow from '../../assets/images/return-arrow.webp'
import { Link } from 'react-router-dom'
import { StarWarsApiServices } from '../../api/api-sw'
import { ServerServices } from '../../api/api-server'



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
    const { fetchStarWarsArticle } = StarWarsApiServices
    const { translateText } = ServerServices


    // Récupération de la catégorie de l'article
    const currentDatas = data.find((item) => item._id === categoryId)


    // Réinitialisation de l'affichage dans la page Catégorie
    useEffect(() => {
        dispatch(saveAnArticle())
    })


    // Récupération de l'article depuis l'API
    useEffect(() => {
        if (currentDatas) {
            fetchStarWarsArticle(currentDatas.keyword, articleId)
            .then(data => setItem(data))
            .catch(() => navigate("*"));
        } else {
            navigate("*");
        }
    }, [articleId, currentDatas, navigate, fetchStarWarsArticle]);


    // Appels automatiques à l'API de traduction des textes
    useEffect(() => {
        if (item && !translatedName && !translatedDescription) {
            const translateData = async () => {
                const translation = await translateText("EN", "FR", item.name, item.description);
                if (translation) {
                    setTranslatedName(translation.name)
                    setTranslatedDescription(translation.description)
                }
            }
            translateData()
        };
    }, [item, translateText, translatedDescription, translatedName])


    return (
        <>
            <div className='app article-page'>
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
