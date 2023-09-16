const Item = require("../models/items.model");
const Utils = require("../utils/utils")
const Rune = require("../models/runes.model");

module.exports.list = (req,res,next) => {
    Rune.find()
    .then((items) => {
        res.render("items/list", { items });
    })
    .catch(() => {});
};

module.exports.delete = (req, res, next) => {
    Item.findByIdAndDelete(req.params.id)
    .then(() => {
    })
    .catch(next);
};


