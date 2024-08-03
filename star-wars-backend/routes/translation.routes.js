const express = require('express')
const translate = require('../controllers/translation.controller.js')
const router = express.Router()


// Route pour les traductions de texte
router.post('/', translate.translateText)



module.exports = router

