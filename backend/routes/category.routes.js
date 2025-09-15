const express = require('express')
const auth = require('../middlewares/auth.js')
const categoryCtrl = require('../controllers/category.controller.js')
const router = express.Router()


// Routes de gestion des catégories de sujets du forum
router.post('/createCategory', auth.verifyToken, categoryCtrl.createCategory)
router.get('/getCategories', categoryCtrl.getCategories)
router.get('/getAllCategoriesWithTopics', categoryCtrl.getAllCategoriesWithTopics)
router.get('/findCategoryFromTopic/:id', categoryCtrl.findCategoryFromTopic)

module.exports = router