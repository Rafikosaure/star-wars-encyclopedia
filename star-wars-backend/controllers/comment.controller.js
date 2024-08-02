const Comment = require('../models/comment.model.js')


exports.createComment = (req, res) => {
    const comment = new Comment(req.body)
    comment.save()
        .then(() => res.status(201).json({ message: 'Message créé !' }))
        .catch(() => res.status(400).json({ message: 'Echec de la création du message !' }))
}