const express = require('express')
const followTopicCtrl = require('../controllers/followTopic.controller.js')
const auth = require('../middlewares/auth.js')
const router = express.Router()


/** Routes de gestion des discussions suivies par les utilisateurs */
router.post('/createAFollowTopicArray/:id', auth.verifyToken, followTopicCtrl.createAFollowTopicArray)
router.get('/getAllFollowersOfATopic/:id', followTopicCtrl.getAllFollowersOfATopic)
router.get('/getAllFollowedTopics/:id', followTopicCtrl.getAllFollowedTopics)
router.put('/chooseWhetherToFollowOrNot/:id', auth.verifyToken, followTopicCtrl.chooseWhetherToFollowOrNot)

module.exports = router