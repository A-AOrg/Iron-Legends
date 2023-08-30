const Champion = require("../models/champions.model")

module.exports.list = (req,res,next) => {
    Champion.find({id: true})
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
        class: req.body.class,
    })
    .then(() => {
        res.redirect("/champions/list");
    })
    .catch(next);
}