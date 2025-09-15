const Topic = require('../models/topic.model.js')
const Category = require('../models/category.model.js')
const Post = require('../models/post.model.js')
const Comment = require('../models/comment.model.js')
const FollowTopic = require('../models/followTopic.model.js')
const User = require('../models/user.model.js')
const Like = require('../models/like.model.js')



// Récupérer toutes les discussions du forum
exports.getTopics = (req, res) => {
    Topic.find()
        .then((topics) => res.status(200).json(topics))
        .catch((error) => res.status(404).json({
            message: "Topics not found!"
        }))
}

// Récupérer toutes les discussions d'une catégorie
exports.getTopicsByCategoryId = async (req, res) => {
    try {
        // Récupérer l'id de la catégorie courante
        const categoryId = req.params.id

        // Trouver les topics liés à cette catégorie
        const currentCategoryWithTopics = await Category.findById(categoryId).populate("topics")

        // Vérifier que les données ne sont pas undefined
        if (!currentCategoryWithTopics) res.status(404).json({
            message: "Category not found!"
        })
        
        // Envoyer le tableau des topics
        res.status(200).json({
            title: currentCategoryWithTopics.title,
            topics: currentCategoryWithTopics.topics
        })

    } catch(error) {
        res.status(500).json(error)
    }
}

// Créer une discussion
exports.createTopic = async (req, res) => {
    try {
        // Récupérer l'id de la catégorie courante
        const categoryId = req.params.id

        // Avec cet id, récupérer la catégorie courante elle-même
        const currentCategory = await Category.findById(categoryId)
        if (!currentCategory) res.status(404).json({
            message: "Category not found!"
        })

        // Créer le topic et l'insérer dans la catégorie courante
        const newTopic = await Topic.create(req.body.topic)
        if (newTopic) {
            newTopic.save()
            currentCategory.topics.push(newTopic)
            currentCategory.save()
        } else {
            res.status(500).json({
                message: "Topic creation failed!"
            })
        }

        // Créer un tableau de followers pour ce topic
        const userId = req.user.id
        const creatorUser = await User.findById(userId)
        const newFollowTopicObject = {
            topicId: newTopic._id,
            users: [
                creatorUser
            ]
        }
        const newFollowTopicArray = new FollowTopic(newFollowTopicObject)
        newFollowTopicArray.save()

        // Créer un premier post et l'insérer dans le nouveau topic
        let reqPost = req.body.post
        reqPost.title = newTopic.title
        const newPost = await Post.create(reqPost)
        if (newPost) {
            newPost.save()
            newTopic.posts.push(newPost)
            newTopic.save()
            res.status(201).json({
                topic: newTopic,
                post: newPost
            })
        } else {
            res.status(400).json({
                message: "Post creation failed!"
            })
        }
    } catch(error) {
        res.status(500).json(error)
    }
}

// Supprimer une discussion
exports.deleteTopicById = async (req, res) => {
    try {
        const topicId = req.params.id

        // Trouver le topic et récupérer ses posts
        const currentTopic = await Topic.findById(topicId).populate('posts')
        if (!currentTopic) res.status(404).json({
            message: "Topic not found!"
        })

        // Trouver la catégorie contenant le topic et y supprimer sa référence
        const currentCategory = await Category.find({ 'topics': { $in: { '_id': topicId }}})
        currentCategory[0].topics.pull({ _id: topicId })
        currentCategory[0].save()

        // Trouver puis supprimer le tableau des followers du topic
        await FollowTopic.findOneAndDelete({ topicId: topicId })

        // Posts du topic : d'abord, supprimer leurs likes
        const postsToDelete = currentTopic.posts;
        postsToDelete.map(async (post) => {
            await Like.deleteMany({ likeType: post._id })
        })

        // Trouver les commentaires des posts du topic
        await Promise.all(
            postsToDelete.map(async (post) => {
                const postWithComments = await Post.findById(post._id).populate('comments')
                const commentsToDelete = postWithComments.comments
                
                // Itérer sur les commentaires de chaque post
                await Promise.all(
                    commentsToDelete.map(async (comment) => {

                        // Supprimer les likes des commentaires
                        await Like.deleteMany({ likeType: comment._id })
                        
                        // Supprimer le commentaire courant
                        await Comment.deleteOne({ _id: comment._id })
                    })
                )
            
                // Supprimer le post courant
                await Post.findByIdAndDelete(post._id)
            })   
        )

        // Enfin, supprimer le topic
        await Topic.findByIdAndDelete(topicId)

        res.status(200).json({
            message: "Topic deletion is success!"
        })

    } catch(error) {
        res.status(500).json({
            message: 'Topic deletion failed!'
        })
    }
}