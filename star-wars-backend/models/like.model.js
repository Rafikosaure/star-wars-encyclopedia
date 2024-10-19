const mongoose = require("mongoose");


const likeSchema = new mongoose.Schema({
    likeType: { type: mongoose.Schema.Types.ObjectId, enum: ["Post", "Comment"], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Like", likeSchema);