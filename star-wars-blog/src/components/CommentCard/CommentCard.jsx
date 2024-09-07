import React from 'react'
import './CommentCard.scss'
import DefaultAvatar from '../../assets/images/EmojiBlitzBobaFett1.webp'
import Like from '../Like/Like'

export default function CommentCard() {
  return (
    <div className='comment-card-wrapper'>
        <p className='comment-card-wrapper-arrow'>➤</p>
        <div className='comment-card-body'>
            <div className='comment-card-main'>
                <div className='comment-card-delete-cross'>✖</div>
                <div className='comment-card-author'>
                    <div className='comment-card-author-profile-image'><img src={DefaultAvatar} alt="Avatar par défaut" /></div>
                    <p className='comment-card-author-name'>Guillaume de Glandville</p>
                </div>
                <div className='comment-card-content'>
                    <p className='comment-card-content-front'><span># 1</span><span>date du message</span></p>
                    
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam dolor fugit minus id voluptatibus distinctio ab fugiat hic repudiandae sint laudantium necessitatibus autem deserunt dolorum neque tenetur recusandae consequatur culpa quae officiis numquam, qui consectetur, magnam rerum! Commodi animi numquam in cupiditate minima quasi velit eaque dolore quisquam, temporibus repellat!</div>
                </div>
            <div className='comment-card-footer'>
                <p className='comment-card-footer-link' title='Modifier ce commentaire'>🖉 Modifier</p><p className='comment-card-footer-link' title='Citer ce commentaire'>➥ Citer</p><Like post={undefined} comment={'abc'}/>    
            </div>
        </div>
    </div>
  )
}
