const Post = require('../models/post.model.js')
const Topic = require('../models/topic.model.js')
require('dotenv').config()


exports.createPost = (req, res) => {

    const topicId = req.params.id

    const currentTopic = Topic.findById(topicId)
    if (!currentTopic) res.status(404).json({
        message: "Topic not found!"
    })

    Post.create(req.body)
    .then(post => {
        post.save()
        currentTopic.posts.push(post)
        currentTopic.save()
        res.status(201).json({
            post
        })})
    .catch(() => res.status(400).json({
        message: "Echec de la création du post !"
    }))
}