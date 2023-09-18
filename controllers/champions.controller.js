const Champion = require("../models/champions.model");
const Build = require("../models/build");
const Item = require("../models/items.model");
const Rune = require("../models/runes.model");
const Comment = require("../models/comment.model");
const Utils = require("../utils/utils");


module.exports.list = (req,res,next) => {
    Champion.find()
    .then((champions) => {
        res.render("champions/list", { champions });
    })
    .catch(() => {});
};


module.exports.detail = (req, res, next) => {
    const championDetail = {};

    Build.find({ champion: { $eq: req.params.id }})
        .populate("champion")
        .populate("rune")
        .populate("boots")
        .populate("mythic")
        .populate("item1")
        .populate("item2")
        .populate("item3")
        .populate("item4")
        .populate("item5")
    .then((buildList) => {
        if (buildList.length > 0) {
            championDetail.build = buildList;
        }
    })

    Champion.findById(req.params.id)
    .then((champ) => {
        championDetail.champion = champ;
        setTimeout(() => {res.render("champions/detail", { championDetail })}, 750)
    })
    .catch(next);
}

module.exports.create = (req,res,next) => {
    res.render("champions/new")
}

module.exports.doCreate = (req,res,next) => {
    Champion.create({
        name: req.body.name,
        title: req.body.title,
        key: parseInt(req.body.key),
        splashart: req.body.splashart,
        icon: req.body.icon,
        frame: req.body.frame,
    })
    .then(() => {
        res.redirect("/champions/list");
    })
    .catch(next);
}
