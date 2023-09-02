const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {type: String},
        title: {type: String},
        key: {type: String},
        img: {type: mongoose.Schema.Types.ObjectId, ref: "Image"},
        splashart: {type: String},
        icon: {type: String},
        frame: {type: String},
    },
    {
        timestamps: true,
    }
);

const Champion = mongoose.model("Champion", schema);

module.exports = Champion;