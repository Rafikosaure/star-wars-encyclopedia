const deepl = require('deepl-node');
require('dotenv').config({path: '../.env'})


exports.translate = async (req, res) => {
    try {
        const authKey = process.env.API_KEY;
        const translator = new deepl.Translator(authKey);

        // Définir la langue d'origine & la langue cible
        const targetLang = req.body.targetLang
        const text = req.body.text
        const translatedText = await translator.translateText(text, null, targetLang);
        // console.log(translatedText)
        res.status(200).json(translatedText.text)
    } catch(error) {
        res.status(500).json(error)
    }
}