const Build = require("../models/build");
const Champion = require("../models/champions.model");
const Item = require("../models/items.model");
const Rune = require("../models/runes.model");
const Comment = require("../models/comment.model");
const Utils = require("../utils/utils");


module.exports.randomBuild = (req,res,next) => {
    const build = {};

    const groups = [1, 2, 3, 4, 5];
    const levels = [0, 1, 2, 3, 4];
    const secondaryLevels = [2, 3, 4];
    
    const group = Utils.pickAmountOfRandomaElements(groups, 2);
    const group1 = group[0], group2 = group[1];

    const pickedSecondaryLevels = Utils.pickAmountOfRandomaElements(secondaryLevels, 2);
    const pickedSecLvls1 = pickedSecondaryLevels[0], pickedSecLvls2 = pickedSecondaryLevels[1];

    build.runes = { "primaryRunes": [], "secondaryRunes": [] }
    
    Rune.find({$and: [{ group: { $in: [ group1 ] }},{ level: { $in: [ 0 ] }}]})
    .then((runes) => {
        build.runes.primaryRunes[0] = Utils.pickAmountOfRandomaElements(runes, 1)[0]
    })
    Rune.find({$and: [{ group: { $in: [ group1 ] }},{ level: { $in: [ 1 ] }}]})
    .then((runes) => {
        build.runes.primaryRunes[1] = Utils.pickAmountOfRandomaElements(runes, 1)[0]
    })
    Rune.find({$and: [{ group: { $in: [ group1 ] }},{ level: { $in: [ 2 ] }}]})
    .then((runes) => {
        build.runes.primaryRunes[2] = Utils.pickAmountOfRandomaElements(runes, 1)[0]
    })
    Rune.find({$and: [{ group: { $in: [ group1 ] }},{ level: { $in: [ 3 ] }}]})
    .then((runes) => {
        build.runes.primaryRunes[3] = Utils.pickAmountOfRandomaElements(runes, 1)[0]
    })
    Rune.find({$and: [{ group: { $in: [ group1 ] }},{ level: { $in: [ 4 ] }}]})
    .then((runes) => {
        build.runes.primaryRunes[4] = Utils.pickAmountOfRandomaElements(runes, 1)[0]
    })

    Rune.find({$and: [{ group: { $in: [ group2 ] }},{ level: { $in: [ 0 ] }}]})
    .then((runes) => {
        build.runes.secondaryRunes[0] = Utils.pickAmountOfRandomaElements(runes, 1)[0]
    })
    Rune.find({$and: [{ group: { $in: [ group2 ] }},{ level: { $in: [ pickedSecLvls1 ] }}]})
    .then((runes) => {
        build.runes.secondaryRunes[1] = Utils.pickAmountOfRandomaElements(runes, 1)[0]
    })
    Rune.find({$and: [{ group: { $in: [ group2 ] }},{ level: { $in: [ pickedSecLvls2 ] }}]})
    .then((runes) => {
        build.runes.secondaryRunes[2] = Utils.pickAmountOfRandomaElements(runes, 1)[0]
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
    const items = {}

    Item.find({ boots: { $eq: true } })
    .then((boots) => {
        items.boots = boots
    })
    .catch(next);

    Item.find({ mythic: { $eq: true } })
    .then((mythics) => {
        items.mythics = mythics
    })
    .catch(next);

    Item.find({$and: [{ boots: { $in: [ false ] }},{ mythic: { $in: [ false ] }}]})
    .then((legendaries) => {
        items.legendaries = legendaries
    })
    .catch(next);

    Champion.findById(req.params.id)
    .then((champ) => {
        const champion = champ;
        setTimeout(() => {res.render("champions/builds/new", { items, champion })}, 500)
    })
    .catch(next);
}

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
    .then()
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
    .then((build) => {
        buildDetails.build = build
        setTimeout(() => {res.render("builds/detail", { buildDetails })}, 250)
    })
    .catch(next);
}