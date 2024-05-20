import '../styles/TestPage.css'
import { useState } from 'react'


export default function TestPage() {

    const [text, updateText] = useState('')
    // const KEY = process.env.REACT_APP_DEEPL_API_KEY

    const handleChange = (textToTrad) => {
        updateText(textToTrad)
    }



  return (
    <div className='test-app'>
        <form className='test-form'>
            <input type="text" onChange={(e) => handleChange(e.target.value)} />
        </form>
        <div className='test-result'>
            {text}
        </div>
    </div>
  )
}
