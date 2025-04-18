const express = require('express')
const auth = require('../middlewares/auth.js')
const shoppingCtrl = require('../controllers/shopping.controller.js')
const router = express.Router()


// Routes de gestion de la boutique en ligne
router.get('/getArticles/:apiMode', shoppingCtrl.getArticles)

module.exports = router