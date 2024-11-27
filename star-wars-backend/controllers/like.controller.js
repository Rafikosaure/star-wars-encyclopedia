const Post = require('../models/post.model.js')
const Comment = require('../models/comment.model.js')
const User = require('../models/user.model.js')
const Like = require('../models/like.model.js')


// Récupérer les likes d'un post / d'un commentaire
exports.getLikes = async (req, res) => {
    try {
        // Récupérer l'id du post / du commentaire dans une variable
        let typeId = req.params.id
        
        // Est-ce qu'il s'agit des likes d'un post ou bien d'un commentaire ?
        let likesByType = await Comment.findById(typeId).populate('likes')
        if (!likesByType) {
            likesByType = await Post.findById(typeId).populate('likes')
            if (!likesByType) {
                res.status(404).json({ message: "Likes not found!" })
            }
        }
        
        // Renvoie les likes en réponse
        res.status(200).json(likesByType.likes)

    } catch(error) {
        res.status(500).json({
            message: "Likes not found!"
        })
    }
}

// Liker un post
exports.attributeLike = async (req, res) => {
    try {
        const userId = req.user.id
        const currentUser = await User.findById(userId)
        if (!currentUser) res.status(404).json({
            message: "Unknown user!"
        })

        const typeId = req.params.id

        // Trouver le post ou le commentaire à liker
        let currentType = await Comment.findById(typeId)
        if (!currentType) {
            currentType = await Post.findById(typeId)
            if (!currentType) res.status(404).json({
                message: "Media type not found!"
            })
        }
        let newLike = createAndPushNewLike(currentType, currentUser)
        if (!newLike) res.status(501).json({
            message: "Like creation failed!"
        })

        console.log(newLike)
        res.status(201).json({
            message: "Like created with success!",
            likeId: newLike._id
        })

    } catch(error) {
        res.status(500).json({
            message: "Like creation failed!"
        })
    }
}


// Disliker un post
exports.dislike = async (req, res) => {
    try {
        // Récupérer l'id du like dans une constante
        const likeId = req.params.id

        // Récupérer le like par son id
        const currentLike = await Like.findById(likeId)
        if (!currentLike) res.status(404).json({
            message: "Like not found!"
        })
        
        // Est-ce qu'il s'agit du like d'un post ou bien d'un commentaire ?
        let currentType = await Post.findById(currentLike.likeType)
        if (!currentType) {
            currentType = await Comment.findById(currentLike.likeType)
            if (!currentType) res.status(404).json({
                message: "Reference deletion failed!"
            })
        }
        // Supprimer la référence du like
        currentType.likes.pull({ _id: likeId })
        currentType.save()
        
        // Suppression du like
        await Like.deleteOne({ _id: likeId })
        res.status(200).json({
            message: "Like deleted with success!"
        })
    
    } catch {
        res.status(500).json({
            message: "Like deletion failed!"
        })
    }
}

// Fonction pour la création d'un like et son enregistrement
const createAndPushNewLike = async (currentType, currentUser) => {
    try {
        const likeObject = {
            likeType: currentType,
            user: currentUser
        }
        const newLike = await Like.create(likeObject)
        newLike.save()
        currentType.likes.push(newLike)
        currentType.save()
        return newLike

    } catch {
        return undefined
    }
}