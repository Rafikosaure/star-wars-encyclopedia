const express = require('express')
const auth = require('../middlewares/auth.js')
const categoryCtrl = require('../controllers/category.controller.js')
const router = express.Router()


/** Routes de gestion des catégories de sujets du forum */

router.post('/createCategory', auth.verifyToken, categoryCtrl.createCategory)
// router.post('/login', userCtrl.login)
// router.post('/logout', auth.verifyToken, userCtrl.logout)
router.get('/getAllCategoriesWithTopics', categoryCtrl.getAllCategoriesWithTopics)
// router.get('/getAll', auth.verifyToken, userCtrl.getAllUsers)
// router.put('/update', auth.verifyToken, multer, userCtrl.modifyUser)
// router.delete('/authDeleteById/:id', auth.verifyToken, userCtrl.authDeleteById)
// router.delete('/deleteById', auth.verifyToken, userCtrl.deleteById)

module.exports = router