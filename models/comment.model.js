const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        text: {type: String},
        author: { type: String},
        build: { type: mongoose.Schema.Types.ObjectId, ref:"Build"}
    },
    {
        timestamp: true
    }
);

const Comment = mongoose.model("Comment", schema);

module.exports = Comment;