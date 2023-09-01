const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {type: String},
        title: {type: String},
        key: {type: String},
        img: {type: mongoose.Schema.Types.ObjectId, ref: "Image"},
    },
    {
        timestamps: true,
    }
);

const Champion = mongoose.model("Champion", schema);

module.exports = Champion;