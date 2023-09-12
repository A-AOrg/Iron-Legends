const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        text: {type: String},
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
        champion: { type: mongoose.Schema.Types.ObjectId, ref:"Champion"}
    },
    {
        timestamp: true
    }
);

const Comment = mongoose.model("Comment", schema);

module.exports = Comment;