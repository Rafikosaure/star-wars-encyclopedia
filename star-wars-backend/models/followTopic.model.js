const mongoose = require("mongoose");


const followTopicSchema = new mongoose.Schema({
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic"
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FollowTopic", followTopicSchema);