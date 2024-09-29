import './TestPage.scss'
// import { useState } from 'react'

export default function TestPage() {
  // const [artists, setArtists] = useState([])

  const detectString = () => {
    const textareaValue = "@Rafik est particulièrement fatigué de coder, @Jean ! Il faut qu'il se repose. N'est-ce pas, @Jean ?"
    const users = ["rafik", "Jean", "andré"]
    let includeUsersArray = []
    users.forEach((user) => {
      const isIncludeValue = textareaValue.toLowerCase().search(`@${user.toLowerCase()}`)
      if (isIncludeValue !== -1) {
        // console.log(`"${user}" est présent dans le texte.`)
        includeUsersArray.push(user)
      } else {
        // console.log(`"${user}" est absent du texte.`)
      }
    })
    console.log(includeUsersArray)
  }

  detectString()

  return (
    <div className='test-app'>
      <form>
        <textarea />
        <button type='submit'>Submit</button>
      </form>
      
    </div>
  )
}