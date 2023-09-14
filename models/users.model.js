const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        username: {type: String},
        password: {type: String},
        admin: {type: Boolean},
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", schema);

module.exports = User;