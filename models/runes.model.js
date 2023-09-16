const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        key: {type: Number},
        group: {type: Number},
        level: {type: Number},
        image: {type: String},
    },
    {
        timestamps: true,
    }
);

const Rune = mongoose.model("Rune", schema);

module.exports = Rune;