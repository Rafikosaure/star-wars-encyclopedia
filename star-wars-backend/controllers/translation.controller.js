const deepl = require('deepl-node');
require('dotenv').config({path: '../.env'})
const ENV = require('../config/config.js')


// Traduction des textes du wiki
exports.translateText = async (req, res) => {
    try {
        console.log("Requête :", req.body)
        const authKey = ENV.API_KEY;
        const translator = new deepl.Translator(authKey)

        // Définition des données et des options pour la traduction
        const dataToTranslate = req.body.array
        const sourceLang = req.body.sourceLang
        const targetLang = req.body.targetLang

        // Itérer avec l'outil de traduction sur le tableau
        const newArray = await Promise.all(dataToTranslate.map(async (element) => {

            // Traduire les noms de chaque élément du tableau
            const newName = await translator.translateText(element.name, sourceLang, targetLang)
            let newObject = {
                id: element.id,
                image: element.image,
                name: newName.text
            }

            // Si l'élément comporte une description, la traduire également
            if (element.description) {
                const newDescription = await translator.translateText(element.description, sourceLang, targetLang)
                newObject.description = newDescription.text
            }
            console.log('Objet traduit :', newObject)
            return newObject
        }))
        
        // Renvoi du tableau traduit
        res.status(200).json({
            message: "Translation is success!",
            translatedArray: newArray
        })
        
    } catch(error) {
        res.status(500).json(error)
    }
}