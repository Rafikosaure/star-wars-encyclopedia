const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: { type: String, required: true }
    }
});

module.exports = mongoose.model("Comment", commentSchema);