const Item = require("../models/items.model");
const Utils = require("../utils/utils")

module.exports.list = (req,res,next) => {
    Item.find()
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
  