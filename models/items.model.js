const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        key: {type: String},
        name: {type: String},
        image: {type: String},
        boots: {type: Boolean},
        mythic: {type: Boolean},
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.model("Item", schema);

module.exports = Item;