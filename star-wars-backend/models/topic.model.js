const mongoose = require("mongoose");


const topicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

module.exports = mongoose.model("Topic", topicSchema);