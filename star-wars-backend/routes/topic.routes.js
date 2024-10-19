const express = require('express')
const topicCtrl = require('../controllers/topic.controller.js')
const auth = require('../middlewares/auth.js')
const router = express.Router()


/** Routes de création et de gestion des sujets dans le forum */
router.post('/createTopic/:id', auth.verifyToken, topicCtrl.createTopic)
router.get('/getTopics', topicCtrl.getTopics)
router.get('/getTopicsByCategory/:id', topicCtrl.getTopicsByCategoryId)
router.delete('/deleteTopicById/:id', topicCtrl.deleteTopicById)

module.exports = router