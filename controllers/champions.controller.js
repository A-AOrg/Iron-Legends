const Champion = require("../models/champions.model");
const Utils = require("../utils/utils");

module.exports.list = (req,res,next) => {
    Champion.find()
    .then((champions) => {
        res.render("champions/list", { champions });
    })
    .catch(() => {});
};

module.exports.detail = (req,res,next) => {
    Champion.findById(req.params.id)
        .then((champion) => {
            res.render("champions/detail", { champion });
        })
        .catch(next);
};

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

module.exports.randomChamp = (req,res,next) => {
    Champion.distinct('name').then((names) => {
        const pickedNames = Utils.pickAmountOfRandomaElements(names, 5);
        Champion.find({ name: { $in: pickedNames } }).then((champions) => {
            const champs = Utils.pickAmountOfRandomaElements(champions, 5);
            res.render("champions/random", {champs});
        })
        .catch(next);
    }
)}

