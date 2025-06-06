import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectReloadTopicsState } from '../../redux/slices/topicsReload.js'
import { useSelector } from 'react-redux'
import '../../theme/index.scss'
import './Topics.scss'
import { useParams } from 'react-router-dom'
import TopicCard from '../../components/TopicCard/TopicCard'
import { Link } from 'react-router-dom'
import ReturnArrow from '../../assets/images/return-arrow.webp'
import TopicForm from '../../components/TopicForm/TopicForm'
import { ServerServices } from '../../api/api-server.js'



export default function Topics() {

  const { topicsCategoryId } = useParams()
  const navigate = useNavigate()
  const [topicsData, setTopicsData] = useState()
  const [categoryTitle, setCategoryTitle] = useState()
  const topicsBool = useSelector(selectReloadTopicsState)
  const { getTopicsByCategoryId } = ServerServices


  // Récupérer les topics de la catégorie
  useEffect(() => {
    getTopicsByCategoryId(topicsCategoryId)
    .then(data => {
      setCategoryTitle(data.title)
      setTopicsData(data.topics)
    })
    .catch(error => {
      console.log(error)
      navigate("*")
    })
  }, [topicsCategoryId, topicsBool, navigate, getTopicsByCategoryId])


  return (
    <div className='app topics'>
      <div className='topics-div-return' title='Retour vers le forum'>
          <Link to='/forum' className='arrow-link'>
              <img src={ReturnArrow} alt="Return to the topics page" />
          </Link>
      </div>
      <div className='topics-overlay' />
      {categoryTitle ? (
        <div className='topics-main'>
        {categoryTitle && (
          <h1 className='topics-page-title'>{categoryTitle.toLowerCase()}</h1>
        )}
        <div className='topics-list'>
          {topicsData.length > 0 ? (
            topicsData.map((topic, index) => 
              <TopicCard key={index} topic={topic} />
            )
          ) : (
            <p className='topics-list-empty-message'>Pas de discussion pour le moment...</p>
          )}
          <div className='topic-creation-form'>
            <TopicForm topicsCategoryId={topicsCategoryId} />
          </div>
        </div>
      </div>
      ) : null}
    </div>
  )
}
