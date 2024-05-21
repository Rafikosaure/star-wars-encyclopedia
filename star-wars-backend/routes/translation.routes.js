const express = require('express')
const translate = require('../controllers/translation.controller')
const router = express.Router()


// Routes pour les traductions de texte
router.post('/', translate.translate)



module.exports = router

