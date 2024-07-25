const Post = require('../models/post.model.js')
const Topic = require('../models/topic.model.js')
require('dotenv').config()


exports.createPost = async (req, res) => {

    // Récupérer l'id du topic courant
    const topicId = req.params.id

    // Tenter de trouver le topic courant par son id
    const currentTopic = await Topic.findById(topicId)
    if (!currentTopic) res.status(404).json({
        message: "Topic not found!"
    })

    // Attribution du titre du topic courant au post
    let reqPost = req.body
    reqPost.title = currentTopic.title

    // Création du post et enregistrement dans le topic courant
    Post.create(reqPost)
    .then(newPost => {
        newPost.save()
        currentTopic.posts.push(newPost)
        currentTopic.save()
        res.status(201).json({
            newPost
        })})
    // Gestion de l'échec potentielle de la procédure
    .catch(() => res.status(400).json({
        message: "Echec de la création du post !"
    }))
}


exports.getPostsByTopicId = async (req, res) => {
    
    // Récupérer l'id du topic courant
    const topicId = req.params.id

    // Vérifier que l'id n'est pas undefind
    if (!topicId) res.status(404).json({
        message: "Identifiant incorrect !"
    })

    // Trouver les posts liés à ce topic
    const currentTopicWithPosts = await Topic.findById(topicId).populate("posts")

    // Vérifier que les données ne sont pas undefined
    if (!currentTopicWithPosts) res.status(404).json({
        message: "Topic not found!"
    })
    
    // Envoyer le topic ainsi que le tableau des posts
    res.status(200).json(
        currentTopicWithPosts
    )
}