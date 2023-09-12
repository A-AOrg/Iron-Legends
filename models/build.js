const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        champion: {type: mongoose.Schema.Types.ObjectId, ref: "Champion"},
        boots: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
        mythic: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
        item1: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
        item2: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
        item3: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
        item4: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
        item5: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
    },
    {
        timestamps: true,
    }
);

const Build = mongoose.model("Build", schema);

module.exports = Build;
