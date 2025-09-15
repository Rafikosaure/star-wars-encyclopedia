const mongoose = require("mongoose");


const topicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Topic", topicSchema);