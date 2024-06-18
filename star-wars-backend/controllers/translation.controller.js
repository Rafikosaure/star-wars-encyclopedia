const deepl = require('deepl-node');
require('dotenv').config({path: '../.env'})


exports.translateTexts = async (req, res) => {
    try {
        const authKey = process.env.API_KEY;
        const translator = new deepl.Translator(authKey)

        // Récupérer la langue cible & les données à traduire
        const sourceLang = req.body.sourceLang
        const targetLang = req.body.targetLang
        const name = req.body.name
        const description = req.body.description

        // Traduction des données dans la langue cible
        const newName = await translator.translateText(name, sourceLang, targetLang)
        const newDescription = await translator.translateText(description, sourceLang, targetLang)

        res.status(200).json({
            name: newName,
            description: newDescription
        })
    } catch(error) {
        res.status(500).json(error)
    }
}

exports.translateName = async (req, res) => {
    try {
        const authKey = process.env.API_KEY;
        const translator = new deepl.Translator(authKey)

        // Récupérer la langue cible & les données à traduire
        const sourceLang = req.body.sourceLang
        const targetLang = req.body.targetLang
        const name = req.body.name

        // Traduction des données dans la langue cible
        const newName = await translator.translateText(name, sourceLang, targetLang)

        res.status(200).json({
            name: newName,
        })
    } catch(error) {
        res.status(500).json(error)
    }
}

