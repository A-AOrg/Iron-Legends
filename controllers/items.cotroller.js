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

module.exports.randomBuild = (req,res,next) => {
    const build = {};
    Item.find({ boots: { $eq: true } })
    .then((boots) => {
        build.boot = Utils.pickAmountOfRandomaElements(boots, 1)[0] 
    })
    .catch(() => {});
    Item.find({ mythic: { $eq: true } })
    .then((mythics) => {
        build.mythic = Utils.pickAmountOfRandomaElements(mythics, 1)[0]
    })
    .catch(() => {});
    Item.find({$and: [{ boots: { $in: [ false ] }},{ mythic: { $in: [ false ] }}]})
    .then((legendaries) => {
        build.legendaries = Utils.pickAmountOfRandomaElements(legendaries, 5)
        res.render("items/build", { build });
    })
    .catch(() => {});
    
}


