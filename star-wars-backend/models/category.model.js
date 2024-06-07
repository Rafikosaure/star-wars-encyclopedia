const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    topics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic"
        }
    ]
});

module.exports = mongoose.model("Category", categorySchema);