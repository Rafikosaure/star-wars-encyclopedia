const Post = require('../models/post.model.js')
const Topic = require('../models/topic.model.js')
require('dotenv').config()


exports.createPost = async (req, res) => {

    const topicId = req.params.id

    const currentTopic = await Topic.findById(topicId)
    if (!currentTopic) res.status(404).json({
        message: "Topic not found!"
    })

    let reqPost = req.body
    reqPost.title = currentTopic.title

    Post.create(reqPost)
    .then(newPost => {
        newPost.save()
        currentTopic.posts.push(newPost)
        currentTopic.save()
        res.status(201).json({
            newPost
        })})
    .catch(() => res.status(400).json({
        message: "Echec de la création du post !"
    }))
}