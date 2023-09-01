const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {type: String},
        img: {type: String},
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.model("Item", schema);

module.exports = Item;