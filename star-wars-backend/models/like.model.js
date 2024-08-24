const mongoose = require("mongoose");


const likeSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Like", likeSchema);