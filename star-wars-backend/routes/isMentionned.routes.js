const express = require('express')
const auth = require('../middlewares/auth.js')
const isMentionnedCtrl = require('../controllers/isMentionned.controller.js')
const router = express.Router()


/** Routes de gestion des catégories de sujets du forum */
router.post('/createIsMentionnedOption/:id', auth.verifyToken, isMentionnedCtrl.createIsMentionnedOption)
router.delete('/deleteIsMentionnedOption/:id', auth.verifyToken, isMentionnedCtrl.deleteIsMentionnedOption)
router.put('/updateIsMentionnedOption/:id', auth.verifyToken, isMentionnedCtrl.allowOrDisallowMentions)
router.get('/getIsMentionnedOption/:id', auth.verifyToken, isMentionnedCtrl.getIsMentionnedOption)
// router.get('/getAllCategoriesWithTopics', categoryCtrl.getAllCategoriesWithTopics)
// router.get('/findCategoryFromTopic/:id', categoryCtrl.findCategoryFromTopic)

module.exports = router