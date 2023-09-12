const Build = require("../models/build");
const Champion = require("../models/champions.model");
const Item = require("../models/items.model");
const Utils = require("../utils/utils");


module.exports.RandomAll = (req,res,next) => {
    const build = {};

    Champion.distinct('name').then((names) => {
        const pickedNames = Utils.pickAmountOfRandomaElements(names, 1);
        Champion.find({ name: { $in: pickedNames } }).then((champions) => {
            const champ = Utils.pickAmountOfRandomaElements(champions, 1)[0];
            build.champion = champ
            setTimeout(() => {res.render("random", { build })}, 250)
        })
    });

    Item.find({ boots: { $eq: true } })
    .then((boots) => {
        build.boots = Utils.pickAmountOfRandomaElements(boots, 1)[0]
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
    })
    .catch(() => {});
}


/*
module.exports.doCreate = (req,res,next) => {
    Build.create({
        champion: req.body.champion,
        boots: req.body.boots,
        mythic: req.body.mythic,
        item1: req.body.item1,
        item2: req.body.item2,
        item3: req.body.item3,
        item4: req.body.item4,
        item5: req.body.item5,
    })
    .then(() => {
        res.redirect("");
    })
    .catch(next);
}
*/
