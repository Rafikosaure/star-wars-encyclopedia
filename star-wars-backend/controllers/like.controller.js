const Post = require('../models/post.model.js')
const User = require('../models/user.model.js')
const Like = require('../models/like.model.js')


// Liker un post
exports.attributeLike = async (req, res) => {
    try {
        const userId = req.user.id
        const currentUser = await User.findById(userId)
        if (!currentUser) res.status(404).json({
            message: "Unknown user!"
        })

        const postId = req.params.id
        if (!postId) {
            res.status(404).json({
                message: "Post undefined!"
            })
        }

        const currentPost = await Post.findById(postId)
        if (!currentPost) res.status(404).json({
            message: "Unknown post!"
        })

        const likeObject = {
            post: currentPost,
            user: currentUser
        }

        const newLike = await Like.create(likeObject)
        newLike.save()

        currentPost.likes.push(newLike)
        currentPost.save()

        res.status(201).json({
            message: "Like created with success!",
            thumb: true,
            likeId: newLike._id
        })
    } catch(error) {
        if (!newLike) res.status(500).json({
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

        const currentPost = await Post.findById(currentLike.post)
        if (!currentPost) res.status(404).json({
            message: "Post not found!"
        })
        
        // Suppression du like
        await Like.deleteOne({ _id: likeId })

        // Supprimer la référence du like dans le post courant
        currentPost.likes.pull({ _id: likeId })
        currentPost.save()

        res.status(200).json({
            message: "Like deleted!",
            thumb: false
        })
    
    } catch(error) {
        res.status(500).json({
            message: "Like deletion failed!"
        })
    }
}