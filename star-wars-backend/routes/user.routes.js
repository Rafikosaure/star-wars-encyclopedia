const express = require('express')
const userCtrl = require('../controllers/user.controller.js')
const multer = require('../middlewares/multer-config.js')
const router = express.Router()

/** Routes d'inscription & de connexion pour un utilisateur */
router.post('/register', multer, userCtrl.register)
router.post('/login', userCtrl.login)

module.exports = router