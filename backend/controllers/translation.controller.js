const deepl = require('deepl-node');
require('dotenv').config({path: '../.env'})
const ENV = require('../config/config.js')


// Traduction des textes du wiki
exports.translateText = async (req, res) => {
    try {
        const authKey = ENV.API_KEY;
        const translator = new deepl.Translator(authKey)

        // Récupérer la langue cible & les données à traduire
        const sourceLang = req.body.sourceLang
        const targetLang = req.body.targetLang
        const name = req.body.name
        let description;
        if (req.body.description) {
            description = req.body.description
        }
        
        // Traduction des données dans la langue cible
        const newName = await translator.translateText(name, sourceLang, targetLang)
        let newDescription;
        if (req.body.description) {
            newDescription = await translator.translateText(description, sourceLang, targetLang)
        }
        
        if (req.body.description) {
            res.status(200).json({
            name: newName,
            description: newDescription
            })
        } else {
            res.status(200).json({
                name: newName
            })
        }
        
    } catch(error) {
        res.status(500).json(error)
    }
}