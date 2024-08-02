const Post = require('../models/post.model.js')
const Topic = require('../models/topic.model.js')
const User = require('../models/user.model.js')



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


// Récupérer l'utillisateur d'un post
exports.getPostUser = async (req, res) => {
    
    // Récupérer l'id de l'utilisateur du post
    const userId = req.params.id

    // Vérifier si l'id est valide
    if (!userId) res.status(404).json({
        message: "Identifiant incorrect !"
    })

    // Récupérer l'utilisateur du post avec son id
    const currentUser = await User.findById(userId)

    // Vérifier que l'on a bien reçu un résultat valide
    if (!currentUser) res.status(404).json({
        message: "User not found!"
    })
    
    // Renvoyer en réponse l'utilisateur courant
    res.status(200).json(currentUser)
}