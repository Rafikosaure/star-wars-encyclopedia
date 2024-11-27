const express = require('express')
const translate = require('../controllers/translation.controller.js')
const router = express.Router()


// Route pour la traduction des textes
router.post('/', translate.translateText)

module.exports = router

