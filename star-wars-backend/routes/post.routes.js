const express = require('express')
const postCtrl = require('../controllers/post.controller.js')
const auth = require('../middlewares/auth.js')
const router = express.Router()


/** Routes de création et de gestion des posts dans le forum */
router.post('/createPost/:id', auth.verifyToken, postCtrl.createPost)
router.get('/getPostsByTopicId/:id', postCtrl.getPostsByTopicId)
router.get('/getPostAuthor/:id', postCtrl.getPostAuthor)
router.put('/updatePost/:id', auth.verifyToken, postCtrl.modifyPost)
router.delete('/deletePostById/:id', auth.verifyToken, postCtrl.deletePostById)

module.exports = router