const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {type: String},
        class: {type: String},
    },
    {
        timestamps: true,
    }
);

const Champion = mongoose.model("Champion", schema);

module.exports = Champion;