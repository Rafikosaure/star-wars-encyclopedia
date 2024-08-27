const Comment = require('../models/comment.model.js')


exports.createComment = (req, res) => {
    const comment = new Comment(req.body)
    comment.save()
        .then(() => res.status(201).json({ message: 'Comment created!' }))
        .catch(() => res.status(400).json({ message: 'Comment creation failed!' }))
}