import React from 'react'
import '../styles/index.css'
import '../styles/Forum.css'
import Code from '../components/Code'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectForumData } from '../redux/slices/forumSlice'



export default function Forum() {

  const navigate = useNavigate()
  const forumTitle1 = "Bienvenue dans le forum !"
  const forumTitle2 = "Thématiques"
  const categoriesAndTopics = useSelector(selectForumData)


  return (
    <div className='app forum'>
      <div className='forum-overlay'/>
      <div className='forum-content'>
        <h1 className='forum-title'>{forumTitle1.toLowerCase()}</h1>
        <div className='chart-section'>
          <p className='chart-text'><strong>Vénérable Jedi, afin que votre visite soit guidée par la Force, voici quelques règles à respecter :</strong></p>
          <Code />
        </div>
        {categoriesAndTopics && (
          <div className='forum-div-categories'>
          <h2>{forumTitle2.toLowerCase()}</h2>
          {categoriesAndTopics.map((category) => 
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
