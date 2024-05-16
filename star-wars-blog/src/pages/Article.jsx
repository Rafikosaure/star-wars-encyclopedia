import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/index.css'
import '../styles/Article.css'
import Datas from '../datas/LocalApi.json'
import ReturnArrow from '../assets/images/return-arrow.webp'
import { Link } from 'react-router-dom'


export default function Article() {

    const [item, setItem] = useState()
    const { paramsIds } = useParams()
    const currentIds = paramsIds.split('.')
    const categoryId = currentIds[0]
    const articleId = currentIds[1]

    const currentCategory = Datas.find((item) => item._id === categoryId)
    const currentKeyword = currentCategory.keyword

    useEffect(() => {
        fetch(`https://starwars-databank-server.vercel.app/api/v1/${currentKeyword}/${articleId}`)
        .then(response => response.json())
        .then(data => setItem(data))
        .catch((error) => console.log(error))
    }, [currentKeyword, articleId])

    return (
        <div className='app'>
            <div className='div-return'>
                <Link to={`/category/${categoryId}`} className='arrow-link'><img src={ReturnArrow} alt="Return to the last page" /></Link>
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
    )
}
