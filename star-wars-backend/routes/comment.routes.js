const express = require('express')
const commentCtrl = require('../controllers/comment.controller.js')
const auth = require('../middlewares/auth.js')
const router = express.Router()


/** Routes de création et de gestion globale des commentaires des posts */
router.post('/createComment/:id', auth.verifyToken, commentCtrl.createComment)
router.get('/getOneComment/:id', commentCtrl.getOneCommentById)
router.get('/getCommentsByPost/:id', commentCtrl.getCommentsByPostId)
router.get('/getCommentAuthor/:id', commentCtrl.getCommentAuthorById)
router.put('/updateAComment/:id', auth.verifyToken, commentCtrl.updateACommentById)
router.delete('/deleteAComment/:id', auth.verifyToken, commentCtrl.deleteACommentById)

module.exports = router