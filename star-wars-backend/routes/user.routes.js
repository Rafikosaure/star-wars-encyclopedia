const express = require('express')
const userCtrl = require('../controllers/user.controller.js')
const multer = require('../middlewares/multer-config.js')
const auth = require('../middlewares/auth.js')
const router = express.Router()

/** Routes d'inscription & de connexion pour un utilisateur */
router.post('/register', multer, userCtrl.register)
router.post('/login', userCtrl.login)
router.post('/logout', auth.verifyToken, userCtrl.logout)
router.get('/logged', auth.verifyToken, userCtrl.logged)
router.put('/update/:id', auth.verifyToken, multer, userCtrl.modifyUser)

module.exports = router