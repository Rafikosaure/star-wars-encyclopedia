const deepl = require('deepl-node');
require('dotenv').config({path: '../.env'})

const authKey = process.env.API_KEY;
const translator = new deepl.Translator(authKey);

(async () => {
    const result = await translator.translateText(req.body.text, null, 'fr');
    console.log(result.text); // Bonjour, le monde !
    res.status(200).json(result.text)
})();

    