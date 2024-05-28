import React from 'react'
import '../styles/index.css'
import '../styles/Auth.css'
import RegisterForm from '../components/RegisterForm.jsx'
import LoginForm from '../components/LoginForm.jsx'
import { useSelector } from 'react-redux'
import { selectRegisterState } from '../redux/slices/registerSlice.js'


export default function Auth() {
    
    const rightForm = useSelector(selectRegisterState)

  return (
    <div className='app'>
        {rightForm ? (
            <RegisterForm />            
        ) : (
            <LoginForm />
        )}
    </div>
  )
}
