const express = require('express')
const likeCtrl = require('../controllers/like.controller.js')
const auth = require('../middlewares/auth.js')
const router = express.Router()


// Routes de gestion des likes des utilisateurs sur les posts / les commentaires
router.get('/getLikes/:id', likeCtrl.getLikes)
router.post('/attributeLike/:id', auth.verifyToken, likeCtrl.attributeLike)
router.delete('/dislike/:id', auth.verifyToken, likeCtrl.dislike)


module.exports = router