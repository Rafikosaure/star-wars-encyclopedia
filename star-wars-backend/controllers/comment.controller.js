const Comment = require('../models/comment.model.js')
const Post = require('../models/post.model.js')
const User = require('../models/user.model.js')


exports.createComment = (req, res) => {
    const comment = new Comment(req.body)
    comment.save()
        .then(() => res.status(201).json({ message: 'Comment created!' }))
        .catch(() => res.status(400).json({ message: 'Comment creation failed!' }))
}


exports.getCommentsByPostId = async (req, res) => {
    try {
        const postId = req.params.id
        const postWithComments = await Post.findById(postId).populate('comments')
        if (!postWithComments) res.status(404).json({
            message: "Data not found!"
        })
        res.status(200).json({
            comments: postWithComments.comments
        })

    } catch(error) {
        res.status(500).json(error)
    }
}


exports.updateACommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) res.status(404).json({
            message: "Comment not found!"
        })

        const commentObject = {
            post: comment.post,
            content: req.body.content,
            author: comment.author,
            likes: comment.likes
        }

        const newComment = await Comment.findByIdAndUpdate(
            { _id: req.params.id },
            commentObject,
            { new: true }
        ); 
        
        if (!newComment) {
            res.status(500).json({
                message: "Data update failed!"
            })
        }
        res.status(200).json(newComment)

    } catch {
        res.status(500).json({
            message: "Comment update failed!",
        })
    }
}


exports.deleteACommentById = async (req, res) => {
    try {
        // Vérifier si l'utilisateur est l'admin du site
        const currentUser = await User.findById(req.user.id)
        if (!currentUser.isAdmin) 
            res.status(404).json({
                message: "Access forbidden!"
            })
        
        // Récupérer l'id du commentaire
        const commentId = req.params.id

        // Trouver le post contenant le commentaire et y supprimer sa référence
        const currentPost = await Post.find({ 'comments': { $in: { '_id': commentId }}})
        currentPost[0].comments.pull({ _id: commentId })
        currentPost[0].save()

        // Supprimer les likes du commentaire
        await Like.deleteMany({ likeType: commentId })

        // Enfin, supprimer le commentaire
        await Comment.findByIdAndDelete({ _id: commentId })
        res.status(200).json({
            message: "Comment deleted!"
        })

    } catch(error) {
        res.status(500).json({
            message: "Comment Deletion failed!"
        })
    }
}