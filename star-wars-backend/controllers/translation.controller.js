const deepl = require('deepl-node');
require('dotenv').config({path: '../.env'})


exports.translate = async (req, res) => {
    try {
        const authKey = process.env.API_KEY;
        const translator = new deepl.Translator(authKey);

        // Définir la langue d'origine & la langue cible
        const targetLang = req.body.targetLang

        const textToTranslate = req.body.text
        const result = await translator.translateText(textToTranslate, null, targetLang);
        // console.log(result.text);
        res.status(200).json(result.text)
    } catch(error) {
        res.status(500).json(error)
    }
}