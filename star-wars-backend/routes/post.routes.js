const express = require('express')
const postCtrl = require('../controllers/post.controller.js')
const auth = require('../middlewares/auth.js')
const router = express.Router()


/** Routes de création et de gestion des posts dans le forum */

router.post('/createPost/:id', auth.verifyToken, postCtrl.createPost)
// router.post('/login', userCtrl.login)
// router.post('/logout', auth.verifyToken, userCtrl.logout)
router.get('/getPostsByTopicId/:id', postCtrl.getPostsByTopicId)
router.get('/getPostAuthor/:id', postCtrl.getPostAuthor)
// router.put('/update', auth.verifyToken, multer, userCtrl.modifyUser)
// router.delete('/authDeleteById/:id', auth.verifyToken, userCtrl.authDeleteById)
// router.delete('/deleteById', auth.verifyToken, userCtrl.deleteById)

module.exports = router