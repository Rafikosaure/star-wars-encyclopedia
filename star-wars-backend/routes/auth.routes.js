const express = require('express')
const authCtrl = require('../controllers/auth.controller.js')
const multer = require('../middlewares/multer-config.js')
const auth = require('../middlewares/auth.js')
const router = express.Router()


/** Routes d'authentification des utilisateurs du site */
router.post('/register', multer, authCtrl.register)
router.post('/login', authCtrl.login)
router.post('/logout', auth.verifyToken, authCtrl.logout)
router.get('/logged', auth.verifyToken, authCtrl.logged)

module.exports = router