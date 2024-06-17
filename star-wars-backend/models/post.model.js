const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    likes: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Like" 
        }
    ],
    createdAt: {
        timestamps: { createdAt: true }
    }
});

module.exports = mongoose.model("Post", postSchema);