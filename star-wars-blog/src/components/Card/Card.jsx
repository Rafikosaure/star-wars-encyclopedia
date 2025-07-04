import '../../theme/index.scss'
import './Card.scss'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reinitializeDozen } from '../../redux/slices/dozenSlice'



export default function Card({ item, categoryId }) {
  
  const dispatch = useDispatch()
  const location = useLocation()
  const itemId = item._id
  const paramsIds = `${categoryId}.${itemId}`
  

  return (
    <>
      {location.pathname !== "/" ? (

        // Carte différente que dans la page "Home"
        <Link className='card card-appears-animation' to={`/article/${paramsIds}`}>
          <div className='card-content'>
            <div className='card-image'>
              <img src={item.image} loading='lazy' alt={`Carte de l'article "${item.name}"`} />
            </div>
            <div className='card-name-div'>
              {item && (
                <p className="card-name">{item.name}</p>
              )}
            </div>
          </div>
        </Link>
        
      ) : (

        // Carte en page "Home"
        <div className='card'>  
          <Link className='card-content' 
            to={`/category/${itemId}`}
            onClick={(e) => {dispatch(reinitializeDozen())}}
            onKeyDown={(e) => e.key === 'Enter' && dispatch(reinitializeDozen())}
            >
            <div className='card-image'>
              <img src={item.image} alt={`Carte de la catégorie des ${item.title}`} />
            </div>
            <div className='card-name-div'>
              <p className="card-name">{item.title}</p>
            </div>
          </Link>
        </div>  
      )}
    </>
  )
}
