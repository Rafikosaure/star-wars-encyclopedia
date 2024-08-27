const mongoose = require("mongoose");


const likeSchema = new mongoose.Schema({
    likeType: { type: mongoose.Schema.Types.ObjectId, enum: ["Post", "Comment"], require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Like", likeSchema);