const Post = require('../models/post.model.js')
const Topic = require('../models/topic.model.js')
const Comment = require('../models/comment.model.js')
const Like = require('../models/like.model.js')
const User = require('../models/user.model.js')


// Créer un post dans une discussion
exports.createPost = async (req, res) => {
    try {
        // Récupérer l'id du topic courant
        const topicId = req.params.id

        // Trouver le topic courant par son id
        const currentTopic = await Topic.findById(topicId)
        if (!currentTopic) res.status(404).json({
            message: "Topic not found!"
        })

        // Attribution du titre du topic courant au post
        let reqPost = req.body
        reqPost.title = currentTopic.title

        // Construction du texte du post comportant la citation
        if (reqPost.citation) {
            const { citationAuthorId, citationText } = reqPost.citation
            const citationAuthor = await User.findById(citationAuthorId)
            if (!citationAuthor) res.status(404).json({
                message: "Author not found!"
            })
            let newCitation = `"${citationText}"\n\n${reqPost.content}`

            // Gestion des éventuelles citations précédentes
            const completeCitation = newCitation.split('\n\n')
            const lastCitation = completeCitation.at(-2).replace(/^"|"$/g, "")
            const lastContent = completeCitation.at(-1)
            const finalContent = `${citationAuthor.name} a dit :\n"${lastCitation}"\n\n${lastContent}`
            
            reqPost.content = finalContent
        }

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
            message: "Post creation failed!"
        }))
    } catch(error) {
        res.status(500).json(error)
    }
}


// Récupérer les posts contenus dans une discussion
exports.getPostsByTopicId = async (req, res) => {
    try {
        // Récupérer l'id du topic courant
        const topicId = req.params.id

        // Trouver les posts liés à ce topic
        const currentTopicWithPosts = await Topic.findById(topicId).populate("posts")

        // Vérifier que les données ne sont pas undefined
        if (!currentTopicWithPosts) res.status(404).json({
            message: "Topic not found!"
        })

        // Récupérer le numéro de page depuis les paramètres de la requête, sinon la page 1 par défaut
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;  // Nombre de posts par page

        // Calculer l'index des posts à ignorer (pour la pagination)
        const skip = (page - 1) * pageSize;

        // Récupérer le nombre total de posts pour ce topic
        const totalPosts = currentTopicWithPosts.posts.length;

        // Calculer le nombre total de pages
        const totalPages = Math.ceil(totalPosts / pageSize);

        // Extraire les posts à afficher pour la page actuelle
        const postsOnPage = currentTopicWithPosts.posts.slice(skip, skip + pageSize);
        
        // Envoyer le topic ainsi que le tableau des posts
        res.status(200).json({
            title: currentTopicWithPosts.title,
            id: currentTopicWithPosts._id,
            posts: postsOnPage,
            totalPages: totalPages,
            currentPage: page
        })
    } catch(error) {
        res.status(500).json(error)
    }
}


// Récupérer l'utillisateur d'un post
exports.getPostAuthor = async (req, res) => {
    try {
        // Récupérer l'id de l'utilisateur du post
        const userId = req.params.id
        
        // Récupérer l'utilisateur du post avec son id
        const currentUser = await User.findById(userId)
        
        // Renvoyer en réponse l'utilisateur courant
        res.status(200).json(currentUser)
    } catch(error) {
        res.status(404).json({
            message: "User not found!"
        })
    }
}


// Supprimer un post trouvé via son identifiant
exports.deletePostById = async (req, res) => {
    try {
        // Vérifier si l'utilisateur est l'admin du site
        const currentUser = await User.findById(req.user.id)
        if (!currentUser.isAdmin) 
            res.status(404).json({
                message: "Access forbidden!"
            })

        // Récupérer l'id du post
        const postId = req.params.id

        // Trouver le topic contenant le post et y supprimer sa référence
        const currentTopic = await Topic.find({ 'posts': { $in: { '_id': postId }}})
        currentTopic[0].posts.pull({ _id: postId })
        currentTopic[0].save()

        // Supprimer les likes du post
        await Like.deleteMany({ likeType: postId })
        
        // Commentaires du post : d'abord, supprimer leurs likes
        const commentsToDelete = await Comment.find({ post: postId })
        commentsToDelete.map(async (comment) => {
            await Like.deleteMany({ likeType: comment._id })
        });

        // Ensuite supprimer les commentaires eux-mêmes
        await Comment.deleteMany({ post: postId })

        // Enfin, supprimer le post
        await Post.findByIdAndDelete({ _id: postId })
        res.status(200).json({
            message: "Post deleted!"
        })

    } catch(error) {
        res.status(500).json(error)
    }
}


// Modifier le contenu d'un post
exports.modifyPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) res.status(404).json({
            message: "Post not found!"
        })

        // Construction de l'objet post
        // avec le message modifié
        const postObject = {
            title: post.title,
            content: req.body.content,
            author: post.author,
            comments: post.comments,
            likes: post.likes
        }

        const newPost = await Post.findByIdAndUpdate(
            { _id: req.params.id },
            postObject,
            { new: true }
        ); 
        
        if (!newPost) {
            res.status(500).json({
                message: "Data update failed!"
            })
        }
        res.status(200).json(newPost)

    } catch {
        res.status(500).json({
            message: "Post update failed!",
        })
    }
}