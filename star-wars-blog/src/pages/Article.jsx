import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/index.css'
import '../styles/Article.css'
import data from '../data/localApi.json'
import ReturnArrow from '../assets/images/return-arrow.webp'
import { Link } from 'react-router-dom'


export default function Article() {

    const [item, setItem] = useState()
    const [rightPage, updateRightPage] = useState(false)
    const navigate = useNavigate()
    const { paramsIds } = useParams()
    const currentIds = paramsIds.split('.')
    const categoryId = currentIds[0]
    const articleId = currentIds[1]

    // Récupération de la catégorie de l'article
    const currentDatas = data.find((item) => item._id === categoryId)

    
    useEffect(() => {
        if (currentDatas !== undefined) {
            // Récupération de l'article depuis l'API
            fetch(`https://starwars-databank-server.vercel.app/api/v1/${currentDatas.keyword}/${articleId}`)
            .then(response => response.json())
            .then(data => {
                updateRightPage(true)
                setItem(data)
            })
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


    return (
        <>
            {rightPage ? (
                <div className='app'>
                    <div className='div-return'>
                        <Link to={`/category/${categoryId}`} className='arrow-link'>
                            <img src={ReturnArrow} alt="Return to the last page" />
                        </Link>
                    </div>
                    <div className='presentation'>
                        {item && (
                            <>
                                <div className='main-div'>
                                    <h1>{item.name.toLowerCase()}</h1>
                                    <div className='content'>
                                        <div className='img-presentation'>
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className='description-div'>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : null}
        </>
    )
}
