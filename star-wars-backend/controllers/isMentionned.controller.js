const IsMentionned = require('../models/isMentionned.model')


// Créer une autorisation/interdiction d'être mentionné
exports.createIsMentionnedOption = (req, res) => {
    const userId = req.params.id
    const newIsMentionned = {
        userId: userId
    }
    const isMentionned = new IsMentionned(newIsMentionned)
    isMentionned.save()
        .then(() => res.status(201).json(isMentionned))
        .catch(() => res.status(400).json({ message: 'isMentionned option creation failed!' }))
}

// Supprimer une autorisation/interdiction d'être mentionné
exports.deleteIsMentionnedOption = async (req, res) => {
    try {
        const userId = req.params.id
        const IsMentionnedObjectToDelete = await IsMentionned.findOneAndDelete({ userId: userId })
        res.status(200).json({
            message: "IsMentionned option deletion is success!",
            deletedObject: IsMentionnedObjectToDelete
        })
    } catch(error) {
        res.status(404).json(error)
    }
}

// Mettre à jour une autorisation/interdiction d'être mentionné
exports.allowOrDisallowMentions = async (req, res) => {
    try {
        const userId = req.params.id
        const newMentionOption = req.body.mentionOption
        const IsMentionnedOptionToUpdate = await IsMentionned.findOneAndUpdate({ userId: userId },
            { $set: { allowMentions: newMentionOption } },
            { new: true }
        )
        res.status(200).json({
            message: "Mention option updated!",
            newOption: IsMentionnedOptionToUpdate.allowMentions,
            newOptionObject: IsMentionnedOptionToUpdate
        })

    } catch(error) {
        res.status(404).json({
            message: "The update of mention option failed!",
            error: error
        })
    }
}

// Récupérer une autorisation/interdiction d'être mentionné
exports.getIsMentionnedOption = async (req, res) => {
    try {
        const userId = req.params.id
        const currentIsMentionnedOption = await IsMentionned.findOne({ userId: userId })
        res.status(200).json(currentIsMentionnedOption)

    } catch(error) {
        res.status(404).json({
            message: "Mention option not found!",
            error: error
        })
    }
}