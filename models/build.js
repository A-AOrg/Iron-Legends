const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        champion: {type: mongoose.Schema.Types.ObjectId, ref: "Champion"},
        boots: {type: String},
        mythic: {type: String},
        item1: {type: String},
        item2: {type: String},
        item3: {type: String},
        item4: {type: String},
        item5: {type: String},
    },
    {
        timestamps: true,
    }
);

const Build = mongoose.model("Build", schema);

module.exports = Build;

/*
        boots: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
        mythic: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
        item1: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
        item2: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
        item3: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
        item4: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
        item5: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
*/