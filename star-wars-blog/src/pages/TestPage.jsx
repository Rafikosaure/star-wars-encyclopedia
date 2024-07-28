import '../styles/TestPage.css'
import { useState } from 'react'


export default function TestPage() {

  const [likeColor, updateLikeColor] = useState("#000000")

  const likeOrDislike = (e) => {
    e.preventDefault()
    if (likeColor === "#000000") {
      updateLikeColor("#0000FF")
    } else {
      updateLikeColor("#000000")
    }
  }
    
  return (
    <div className='test-app'>
      <svg className={`like-svg`} onClick={(e) => likeOrDislike(e)}
        fill={likeColor} 
        // height="80px" 
        // width="80px"
        version="1.1" 
        id="Layer_1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 512 512" 
        enable-background="new 0 0 512 512" 
        xmlSpace="preserve">
        <path d="M2.5,209.1C1,221.1,0,233.3,0,245.7c0,109,59.7,203.9,148.1,254.2l16.5-34.8V227.4l-18.3-18.3H2.5z M512,227.4
          c0-18.3-18.3-36.6-36.6-36.6H329.1c9.1-36.6,18.3-73.1,18.3-91.4c0-36.6-18.3-73.1-27.4-82.3c-0.2-0.2-9.1-9.1-27.4-9.1
          c-27.4,0-27.4,27.4-27.4,27.4c0,0.5-9.1,45.7-9.1,64s-36.6,91.4-54.9,109.7l-18.3,9.1v256l18.3,9.1h201.1
          c36.6,0,54.9-18.3,54.9-36.6s-18.3-36.6-36.6-36.6c36.6,0,54.9-18.3,54.9-36.6c0-18.3-18.3-36.6-36.6-36.6
          c36.6,0,54.9-18.3,54.9-36.6c0-18.3-18.3-36.6-36.6-36.6C493.7,264,512,245.7,512,227.4z"/>
      </svg>      
    </div>
  )
}
