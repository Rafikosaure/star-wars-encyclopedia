
// Mot de passe fort : vérification
export function validatePassword(password) {
    let Reg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
    return Reg.test(password);
}


// Mot de passe fort : renseigner si chaque critère est respecté
export function passwordConditionsValidator(password) {

    // Conditions de validation du mot de passe :
    // - minCharNumberCondition : 8 caractères minimum
    // - majCondition : au moins une majuscule
    // - minCondition : au moins une minuscule
    // - numberCondition : au moins un chiffre
    // - specialCharCondition : au moins un caractère spécial
    
    return {
        "minCharNumberCondition": conditionManager(new RegExp(/^.{8,}$/), password),
        "majCondition": conditionManager(new RegExp(/(?=.*[A-Z])/), password),
        "minCondition": conditionManager(new RegExp(/(?=.*[a-z])/), password),
        "numberCondition": conditionManager(new RegExp(/(?=.*[0-9])/), password),
        "specialCharCondition": conditionManager(new RegExp(/(?=.*[#?!@$%^&*-])/), password)
    }
}

// Gérer la validation d'une condition
const conditionManager = (reg, password) => {
    if (reg.test(password)) {
        return "conditionValidated"
    } else {
        return ""
    }
}

// Typage du mot de passe avant sa mise en props (string ou undefined)
export const passwordTypeManagment = (initialPasswordValue) => {
    if (initialPasswordValue) return initialPasswordValue
    return ''
}