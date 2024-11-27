import React from 'react'
import { useEffect, useState } from 'react'
import '../../sharedStyles/index.scss'
import './Forum.scss'
import Code from '../../components/Code/Code'
import { useNavigate } from 'react-router-dom'
import config from '../../config'
import { useDispatch } from 'react-redux'



export default function Forum() {

  const navigate = useNavigate()
  const forumTitle1 = "Bienvenue dans le forum !"
  const forumTitle2 = "Thématiques"
  const [forumCategories, setForumCategories] = useState()
  const dispatch = useDispatch()


  useEffect(() => {

    // Récupérer les catégories du forum
    fetch(`${config.serverEndpoint}/category/getCategories`)
    .then(response => response.json())
    .then(data => {
      setForumCategories(data)
    })
    .catch(error => console.log(error))
    
  }, [dispatch])



  return (
    <div className='app forum'>
      <div className='forum-overlay'/>
      <div className='forum-content'>
        <h1 className='forum-title'>{forumTitle1.toLowerCase()}</h1>
        <div className='chart-section'>
          <p className='chart-text'><strong>Vénérable Jedi, afin que votre visite soit guidée par la Force, voici quelques règles à respecter :</strong></p>
          <Code />
        </div>
        {forumCategories && (
        <div className='forum-div-categories'>
        <h2>{forumTitle2.toLowerCase()}</h2>
        {forumCategories.map((category) => 
          <div className='div-category' key={category._id} onClick={() => navigate(`/topics/${category._id}`)}>
            <h3>{category.title}</h3>
          </div>
        )}
        </div>  
        )}
      </div>
    </div>
  )
}
