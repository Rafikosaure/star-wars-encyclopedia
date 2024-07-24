const Category = require('../models/category.model.js')
const User = require('../models/user.model.js')
require('dotenv').config()


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


// Récupérer le tableau des catégories de la bdd
exports.getCategories = (req, res) => {
    Category.find()
        .then((categories) => res.status(200).json(categories))
        .catch((error) => res.status(500).json({
            message: "Categories not found"
        }))
}