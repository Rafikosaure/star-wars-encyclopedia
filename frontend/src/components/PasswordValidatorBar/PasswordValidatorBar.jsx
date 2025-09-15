import './PasswordValidatorBar.scss'
import { useState, useEffect } from 'react'
import { passwordConditionsValidator } from '../../utils/passwordValidationFunctions'



function PasswordValidatorBar({ password }) {

    const [conditions, setConditions] = useState('')

    // Gérer les couleurs des segments de la barre de mot de passe
    useEffect(() => {
        const result = passwordConditionsValidator(password)
        setConditions(result)
    }, [password])


    return (
        <span className='passwordValidBar'><span className={`isConditionValid ${conditions.minCharNumberCondition}`} /><span className={`isConditionValid ${conditions.majCondition}`} /><span className={`isConditionValid ${conditions.minCondition}`} /><span className={`isConditionValid ${conditions.numberCondition}`} /><span className={`isConditionValid ${conditions.specialCharCondition}`} /></span>
    )
}

export default PasswordValidatorBar
