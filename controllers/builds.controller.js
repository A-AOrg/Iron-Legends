const Build = require("../models/build");
const Champion = require("../models/champions.model");
const Item = require("../models/items.model");
const Rune = require("../models/runes.model");
const Comment = require("../models/comment.model");
const Utils = require("../utils/utils");


module.exports.randomBuild = (req,res,next) => {
    const build = {};

    Rune.find({level: 1})
    .then((runes) => {
        build.rune = Utils.pickAmountOfRandomaElements(runes, 1)[0]
    })

    Champion.distinct('name').then((names) => {
        const pickedNames = Utils.pickAmountOfRandomaElements(names, 1);
        Champion.find({ name: { $in: pickedNames } }).then((champions) => {
            const champ = Utils.pickAmountOfRandomaElements(champions, 1)[0];
            build.champion = champ
            setTimeout(() => {
                res.render("random/build", { build })
            }, 500)
        })
    });

    Item.find({ boots: { $eq: true } })
    .then((boots) => {
        build.boots = Utils.pickAmountOfRandomaElements(boots, 1)[0]
    })
    .catch();
    Item.find({ mythic: { $eq: true } })
    .then((mythics) => {
        build.mythic = Utils.pickAmountOfRandomaElements(mythics, 1)[0]
    })
    .catch(() => {});
    Item.find({$and: [{ boots: { $in: [ false ] }},{ mythic: { $in: [ false ] }}]})
    .then((legendaries) => {
        const items = Utils.pickAmountOfRandomaElements(legendaries, 5);
        build.item1 = items[0];
        build.item2 = items[1];
        build.item3 = items[2];
        build.item4 = items[3];
        build.item5 = items[4];
    })
    .catch(() => {});
}

module.exports.create = (req,res,next) => {
    const build = {}

    Rune.find({level: 1})
    .then((runes) => {
        build.rune = runes
    })

    Item.find({ boots: { $eq: true } })
    .then((boots) => {
        build.boots = boots
    })
    .catch(next);

    Item.find({ mythic: { $eq: true } })
    .then((mythics) => {
        build.mythics = mythics
    })
    .catch(next);

    Item.find({$and: [{ boots: { $in: [ false ] }},{ mythic: { $in: [ false ] }}]})
    .then((legendaries) => {
        build.legendaries = legendaries
    })
    .catch(next);

    Champion.findById(req.params.id)
    .then((champ) => {
        const champion = champ;
        setTimeout(() => {res.render("champions/builds/new", { build, champion })}, 220)
    })
    .catch(next);
}

module.exports.doCreate = (req,res,next) => {
    Build.create({
        author: req.user.username,
        champion: req.body.champion,
        rune: req.body.rune,
        boots: req.body.boots,
        mythic: req.body.mythic,
        item1: req.body.item1,
        item2: req.body.item2,
        item3: req.body.item3,
        item4: req.body.item4,
        item5: req.body.item5,
    })
    .then(() => {
        setTimeout(() => {res.redirect(`/champions/${req.body.champion}`)}, 250)
    })
    .catch(next);
}

module.exports.detail = (req, res, next) => {
    const buildDetails = {};
    Comment.find({ build: { $eq: req.params.id }})
    .then((commentList) => {
        if (commentList.length > 0) {
            buildDetails.comments = commentList
        }
    })
    Build.findById(req.params.id)
        .populate("champion")
        .populate("rune")
        .populate("boots")
        .populate("mythic")
        .populate("item1")
        .populate("item2")
        .populate("item3")
        .populate("item4")
        .populate("item5")
    .then((build) => {
        buildDetails.build = build
        setTimeout(() => {res.render("builds/detail", { buildDetails })}, 250)
    })
    .catch(next);
}