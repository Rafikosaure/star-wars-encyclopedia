const express = require('express')
const userCtrl = require('../controllers/user.controller.js')
const multer = require('../middlewares/multer-config.js')
const auth = require('../middlewares/auth.js')
const router = express.Router()

/** Routes d'inscription & de connexion pour un utilisateur */
router.post('/register', multer, userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/logged', auth.verifyToken, userCtrl.logged)
router.post('/logout', auth.verifyToken, userCtrl.logout)

module.exports = router