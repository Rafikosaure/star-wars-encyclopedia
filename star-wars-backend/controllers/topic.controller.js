const Topic = require('../models/topic.model.js')
const Category = require('../models/category.model.js')
const Post = require('../models/post.model.js')
const Comment = require('../models/comment.model.js')



exports.getTopics = (req, res) => {
    Topic.find()
        .then((topics) => res.status(200).json(topics))
        .catch((error) => res.status(404).json({
            message: "Topics not found!"
        }))
}


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


exports.deleteTopicById = async (req, res) => {
    try {
        const topicId = req.params.id

        // Trouver le topic (et récupérer ses posts)
        const currentTopic = await Topic.findById(topicId).populate('posts')
        if (!currentTopic) res.status(404).json({
            message: "Topic not found!"
        })

        // Trouver la catégorie contenant le topic et y supprimer sa référence
        const currentCategory = await Category.find({ 'topics': { $in: { '_id': topicId }}})
        currentCategory[0].topics.pull({ _id: topicId })
        currentCategory[0].save()

        // Posts du topic : d'abord, supprimer leurs likes
        const postsToDelete = currentTopic.posts;
        postsToDelete.forEach(async (post) => {
            await Like.deleteMany({ likeType: post._id })
        });

        // Trouver les commentaires des posts du topic
        postsToDelete.forEach(async (post) => {
            const comments = getCommentsOfAPost(post)
            if (!comments) res.status(404).json({
                message: "Comments not found!"
            })
            
            // Supprimer les likes des comments
            comments.forEach(async (comment) => {
                const result = deleteLikesOfAComment(comment)
                if (!result) res.status(404).json({
                    message: "Likes deletion failed!"
                })
            })
            // Supprimer les comments du post
            await Comment.deleteMany({ post: post._id })

            // Supprimer les posts
            await Post.findByIdAndDelete(post._id)
        })
        // Supprimer le topic
        await Topic.findByIdAndDelete(topicId)

    } catch(error) {
        res.status(500).json({
            message: 'Topic deletion failed!'
        })
    }
}


const deleteLikesOfAComment = async (comment) => {
    try {
        await Like.deleteMany({ liketype: comment._Id })
        return true

    } catch(error) {
        console.log(error)
        return false
    }
}

const getCommentsOfAPost = async (post) => {
    try {
        const comments = await Comment.find({ post: post._id })
        return comments

    } catch(error) {
        console.log(error)
        return false
    }
}