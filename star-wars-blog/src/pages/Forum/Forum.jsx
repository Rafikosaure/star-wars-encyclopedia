import React from 'react'
import { useEffect, useState } from 'react'
import '../../sharedStyles/index.scss'
import './Forum.scss'
import Code from '../../components/Code/Code'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Spinner from '../../assets/images/spinner.svg'
import { ServerServices } from '../../api/api-server'



export default function Forum() {

  const navigate = useNavigate()
  const forumTitle1 = "Bienvenue dans le forum !"
  const forumTitle2 = "Thématiques"
  const [forumCategories, setForumCategories] = useState()
  const [spinnerDisplay, setSpinnerDisplay] = useState('none')
  const dispatch = useDispatch()
  const { fetchForumCategories } = ServerServices


  // Récupérer les catégories du forum
  useEffect(() => {
    setSpinnerDisplay('flex');
    fetchForumCategories().then(data => {
      if (data) {
        setForumCategories(data);
      }
      setSpinnerDisplay('none');
    });
  }, [dispatch, navigate, fetchForumCategories]);


  return (
    <div className='app forum'>
      <div className='forum-overlay'/>
      <div className='forum-content'>
        <h1 className='forum-title'>{forumTitle1.toLowerCase()}</h1>
        <div className='chart-section'>
          <p className='chart-text'><strong>Vénérable Jedi, afin que votre visite soit guidée par la Force, voici quelques règles à respecter :</strong></p>
          <Code />
        </div>
        <div className='forum-div-theme-spinner'>
          <img className='theme-spinner' style={{display: `${spinnerDisplay}`}} src={Spinner} alt="Spinner de chargement des thèmes" />
        </div>
        {forumCategories && (
        <div className='forum-div-categories'>
        <h2>{forumTitle2.toLowerCase()}</h2>
        {forumCategories.map((category) => 
          <div 
          className='div-category' 
          key={category._id} 
          tabIndex='0'
          onClick={() => navigate(`/topics/${category._id}`)}
          onKeyDown={(e) => e.key === 'Enter' && navigate(`/topics/${category._id}`)}
          title={`Accéder à la page de la catégorie "${category.title}"`}
          >
            <h3>{category.title}</h3>
          </div>
        )}
        </div>  
        )}
      </div>
    </div>
  )
}
