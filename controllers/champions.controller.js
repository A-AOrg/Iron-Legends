const Champion = require("../models/champions.model");
const Utils = require("../utils/utils");
const Build = require("../models/build");
const Comment = require("../models/comment.model");


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
    .then((buildList) => {
        if (buildList.length > 0) {
            // fix (utility to pick all elements)
            championDetail.build = Utils.pickAmountOfRandomaElements(buildList, 4);
        }
    })

    Champion.findById(req.params.id)
    .then((champ) => {
        championDetail.champion = champ;
        setTimeout(() => {res.render("champions/detail", { championDetail })}, 750)
    })
    .catch(next);
}

/*
module.exports.detail = (req,res,next) => {
    Champion.findById(req.params.id)
        .then((champion) => {
            res.render("champions/detail", { champion });
        })
        .catch(next);
};
*/

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
