const express = require('express')
const translate = require('../controllers/translation.controller.js')
const router = express.Router()


// Routes pour les traductions de texte
router.post('/', translate.translateTexts)
router.post('/name', translate.translateName)



module.exports = router

