const Category = require('../models/category.model.js')
const User = require('../models/user.model.js')


// Créer une catégorie de topics
exports.createCategory = (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            if (!user.isAdmin) res.status(500).json({ message: "Vous n'avez pas les droits pour créer une catégorie !" })
        })
    const category = new Category(req.body)
    category.save()
        .then(() => res.status(201).json({ message: 'Catégorie créée !' }))
        .catch(() => res.status(400).json({ message: 'Echec de la création de la catégorie !' }))
}


// Trouver la catégorie parente d'un topic
exports.findCategoryFromTopic = (req, res) => {
    
    const topicId = req.params.id
    if (!topicId) res.status(404).json({
        message: 'Wrong parameter'
    })

    Category.find({ "topics": { _id: topicId }})
    .then(category => {
        res.status(200).json({
            category: category
        })
    })
    .catch(error => {
        res.status(404).json(error)
    })
}


// Récupérer le tableau des catégories de la bdd
exports.getCategories = (req, res) => {
    Category.find()
        .then((categories) => res.status(200).json(categories))
        .catch((error) => res.status(404).json({
            message: "Categories not found!"
        }))
}

// Récupérer toutes les catégories avec leurs topics
exports.getAllCategoriesWithTopics = (req, res) => {
    Category.find().populate('topics')
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({
            message: "Data not found!"
        }))
}