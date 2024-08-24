const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            require: true
    },
    content: { type: String, required: true },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);