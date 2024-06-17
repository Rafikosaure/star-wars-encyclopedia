const mongoose = require("mongoose");


const followTopicSchema = new mongoose.Schema({
    title: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic"
        }
    },
    users: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        }
    ],
    createdAt: {
        timestamps: { createdAt: true }
    }
});

module.exports = mongoose.model("FollowTopic", followTopicSchema);