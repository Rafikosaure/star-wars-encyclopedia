const express = require('express')
const topicCtrl = require('../controllers/topic.controller.js')
const auth = require('../middlewares/auth.js')
const router = express.Router()


/** Routes de création et de gestion des sujets dans le forum */

router.post('/createTopic/:id', auth.verifyToken, topicCtrl.createTopic)
// router.post('/login', userCtrl.login)
// router.post('/logout', auth.verifyToken, userCtrl.logout)
// router.get('/logged', auth.verifyToken, userCtrl.logged)
router.get('/getTopicsByCategory/:id', topicCtrl.getTopicsByCategory)
// router.put('/update', auth.verifyToken, multer, userCtrl.modifyUser)
// router.delete('/authDeleteById/:id', auth.verifyToken, userCtrl.authDeleteById)
// router.delete('/deleteById', auth.verifyToken, userCtrl.deleteById)

module.exports = router