
// Mot de passe fort : vérification
export function validatePassword(password) {
    let Reg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
    return Reg.test(password);
}


// Mot de passe fort : renseigner si chaque critère est respecté
export function passwordConditionsValidator(password) {
    
    // Constitution des expressions régulières
    const Reg1 = new RegExp(/^.{8,}$/) // Condition 5 : 8 caractères minimum
    const Reg2 = new RegExp(/(?=.*[A-Z])/) // Condition 1 : au moins une majuscule
    const Reg3 = new RegExp(/(?=.*[a-z])/) // Condition 2 : au moins une minuscule
    const Reg4 = new RegExp(/(?=.*[0-9])/) // Condition 3 : au moins un chiffre
    const Reg5 = new RegExp(/(?=.*[#?!@$%^&*-])/) // Condition 4 : au moins un caractère spécial

    // Constitution de l'objet à retourner
    return {
        "minCharNumberCondition": conditionManager(Reg1, password),
        "majCondition": conditionManager(Reg2, password),
        "minCondition": conditionManager(Reg3, password),
        "numberCondition": conditionManager(Reg4, password),
        "specialCharCondition": conditionManager(Reg5, password)
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