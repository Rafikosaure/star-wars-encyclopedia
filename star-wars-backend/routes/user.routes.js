const express = require('express')
const userCtrl = require('../controllers/user.controller.js')
const multer = require('../middlewares/multer-config.js')
const auth = require('../middlewares/auth.js')
const router = express.Router()

/** Routes d'inscription/connexion/gestion des utilisateurs du site */
router.post('/register', multer, userCtrl.register)
router.post('/login', userCtrl.login)
router.post('/logout', auth.verifyToken, userCtrl.logout)
router.get('/logged', auth.verifyToken, userCtrl.logged)
router.get('/getAll', auth.verifyToken, userCtrl.getAllUsers)
router.put('/update', auth.verifyToken, multer, userCtrl.modifyUser)
router.delete('/authDeleteById/:id', auth.verifyToken, userCtrl.authDeleteById)
router.delete('/deleteById', auth.verifyToken, userCtrl.deleteById)

module.exports = router