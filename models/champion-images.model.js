const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        Splash: {type: String},
        Icon: {type: String},
        Frame: {type: String}
    },
    {
        timestamps: true,
    }
);

const CampionImage = mongoose.model("CampionImage", schema);

module.exports = CampionImage;