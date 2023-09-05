const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {type: String},
        title: {type: String},
        key: {type: Number},
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
