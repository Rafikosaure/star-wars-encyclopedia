const FollowTopic = require('../models/followTopic.model')
const User = require('../models/user.model')
const Topic = require('../models/topic.model')



// Créer une liste d'utilisateur suivant une discussion
exports.createAFollowTopicArray = async (req, res) => {
    try {
        const userId = req.user.id
        const creatorUser = await User.findById(userId)
        const topicId = req.params.id
        const newFollowTopicObject = {
            topicId: topicId,
            users: [
                creatorUser
            ]
        }
        const newFollowTopicArray = new FollowTopic(newFollowTopicObject)
        newFollowTopicArray.save()
        res.status(201).json(newFollowTopicArray)

    } catch(error) {
        res.status(400).json({
            message: 'followTopic array creation failed!'
        })
    }
}

// Récupérer tous les abonnés à une discussion
exports.getAllFollowersOfATopic = async (req, res) => {
    try {
        const topicId = req.params.id
        const currentFollowTopic = await FollowTopic.findOne({ topicId: topicId }).populate('users')
        res.status(200).json(currentFollowTopic.users)
    } catch(error) {
        res.status(404).json({
            message: "Followers not found!"
        })
    }
}

// Récupérer toutes les discussions suivies par l'utilisateur
exports.getAllFollowedTopics = async (req, res) => {
    try  {
        const userId = req.params.id

        // Récupérer tous les tableaux des discussions suivies
        const currentFollowedTopicsArrays = await FollowTopic.find({
            'users': { $in: { '_id': userId }}
        })

        // Récupérer les identifiants de chaque discussion suivie
        const followedTopicIds = []
        currentFollowedTopicsArrays.map(followedTopicId => {
            followedTopicIds.push(followedTopicId.topicId)
        })

        // Récupérer les discussions suivies via leurs identifiants
        const followedTopics = await Promise.all(followedTopicIds.map(async (topicId) => {
            const topic = await Topic.findById(topicId)
            return topic
        }));
        
        res.status(200).json(followedTopics)
        
    } catch(error) {
        res.status(404).json({
            message: "Recovery of ongoing topics failed!"
        })
    }
}

// Suivre ou ne plus suivre une discussion
exports.chooseWhetherToFollowOrNot = async (req, res) => {
    try  {
        const userId = req.user.id
        const topicId = req.params.id
        const toFollowOption = req.body.toFollow
        let newFollowTopic = {}

        // Option 1 : Retirer l'utilisateur du tableau
        if (!toFollowOption) {
            newFollowTopic = await FollowTopic.findOneAndUpdate(
                { topicId: topicId },
                { $pull: { users: userId } },
                { new: true }
            )

        // Option 2 : Ajouter l'utilisateur au tableau (sans doublon)
        } else {
            newFollowTopic = await FollowTopic.findOneAndUpdate(
                { topicId: topicId }, 
                { $addToSet: { users: userId  } },
                { new: true }
            )
        }

        res.status(200).json({
            message: "Follow array update is successful!",
            topicIsFollowed: toFollowOption,
            newFollowTopic: newFollowTopic
        })

    } catch(error) {
        res.status(404).json({
            message: "Operation failed!"
        })
    }
}