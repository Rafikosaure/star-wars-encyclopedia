import React from 'react'
import '../../sharedStyles/index.scss'
import '../../sharedStyles/Auth.scss'
import RegisterForm from '../../components/Auth/RegisterForm.jsx'
import LoginForm from '../../components/Auth/LoginForm.jsx'
import { useSelector } from 'react-redux'
import { selectRegisterState } from '../../redux/slices/registerSlice.js'


export default function Auth() {
  
  // Gestion des formulaire pour l'authentification
  const rightForm = useSelector(selectRegisterState)

  return (
    <div className='app auth-page'>
        {rightForm ? (
            <RegisterForm />            
        ) : (
            <LoginForm />
        )}
    </div>
  )
}
