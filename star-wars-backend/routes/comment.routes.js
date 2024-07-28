const express = require('express')
const commentCtrl = require('../controllers/comment.controller.js')
const auth = require('../middlewares/auth.js')
const router = express.Router()


/** Routes de création et de gestion globale des messages des posts */

router.post('/createComment', commentCtrl.createComment)
// router.post('/login', userCtrl.login)
// router.post('/logout', auth.verifyToken, userCtrl.logout)
// router.get('/logged', auth.verifyToken, userCtrl.logged)
// router.get('/getAll', auth.verifyToken, userCtrl.getAllUsers)
// router.put('/update', auth.verifyToken, multer, userCtrl.modifyUser)
// router.delete('/authDeleteById/:id', auth.verifyToken, userCtrl.authDeleteById)
// router.delete('/deleteById', auth.verifyToken, userCtrl.deleteById)

module.exports = router