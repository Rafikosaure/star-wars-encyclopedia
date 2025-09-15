import '../../theme/index.scss'
import '../../theme/Auth.scss'
import RegisterForm from '../../components/Auth/RegisterForm.jsx'
import LoginForm from '../../components/Auth/LoginForm.jsx'
import { useSelector } from 'react-redux'
import { selectRegisterState } from '../../redux/slices/registerSlice.js'
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice.js'


export default function Auth() {
  
  // Gestion des formulaire pour l'authentification
  const rightForm = useSelector(selectRegisterState)

  // Affichage en mode connecté / déconnecté
  const isLogged = useSelector(selectIsLoggedState)

  return (
    <div className='app auth-page'>
      {!rightForm && !isLogged ? (
           <LoginForm />
      ) : (
          <RegisterForm />
      )}
    </div>
  )
}
