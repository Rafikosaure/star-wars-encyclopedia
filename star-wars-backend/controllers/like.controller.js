const Post = require('../models/post.model.js')
const Comment = require('../models/comment.model.js')
const User = require('../models/user.model.js')
const Like = require('../models/like.model.js')



exports.getLikesByPost = async (req, res) => {
    try {
        const postId = req.params.id
    
        const likesByPost = await Post.findById(postId).populate('likes')
        if (!likesByPost) res.status(404).json({
            message: "Likes not found!"
        })
        
        res.status(200).json(likesByPost.likes)

    } catch(error) {
        res.status(500).json({
            message: "Likes not found!",
            error: error
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

        const mediaId = req.params.id
        if (!mediaId) {
            res.status(404).json({
                message: "Media undefined!"
            })
        }

        // Trouver le post ou le commentaire à liker
        let currentMedia = await Comment.findById(mediaId)
        if (!currentMedia) {
            currentMedia = await Post.findById(mediaId)
            if (!currentMedia) res.status(404).json({
                message: "Media not found!"
            })
        }
        let newLike = createAndPushNewLike(currentMedia, currentUser)
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
        const likeId = req.params.id
        if (!likeId) {
            res.status(404).json({
                message: "LikeId undefined!"
            })
        }

        const currentLike = await Like.findById(likeId)
        if (!currentLike) res.status(404).json({
            message: "Like not found!"
        })
        
        // Supprimer la référence du like
        let currentMedia = await Post.findById(currentLike.likeType)
        if (!currentMedia) {
            currentMedia = await Comment.findById(currentLike.likeType)
            if (!currentMedia) res.status(404).json({
                message: "Reference deletion failed!"
            })
        }
        currentMedia.likes.pull({ _id: likeId })
        currentMedia.save()
        
        // Suppression du like
        await Like.deleteOne({ _id: likeId })
        res.status(200).json({
            message: "Like deleted with success!"
        })
    
    } catch(error) {
        res.status(500).json({
            message: "Like deletion failed!"
        })
    }
}


const createAndPushNewLike = async (currentMedia, currentUser) => {
    try {
        const likeObject = {
            likeType: currentMedia,
            user: currentUser
        }
        const newLike = await Like.create(likeObject)
        newLike.save()
        currentMedia.likes.push(newLike)
        currentMedia.save()
        return newLike

    } catch {
        return undefined
    }
    
}