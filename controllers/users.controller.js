const User = require("../models/users.model");
const bcrypt = require("bcrypt")

const Build = require("../models/build");
const Champion = require("../models/champions.model");
const Item = require("../models/items.model");
const Rune = require("../models/runes.model");
const Comment = require("../models/comment.model");

module.exports.create = (req, res, next) => {
    res.render("users/new")
}
module.exports.doCreate = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        User.create({
            username: req.body.username,
            password: hash,
            admin: false,
        })
        .then(() => {
            res.redirect("/login");
        })
        .catch(next);
    });
};
module.exports.login = (req, res, next) => {
    res.render("users/login");
}
module.exports.doLogin = (req, res, next) => {
    User.findOne({ username: req.body.username }).then((user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password).then((match) => {
                if (match) {
                    req.session.userId = user.id;
                    res.redirect("/")
                } else {
                    res.redirect("/login")
                }
            });
        } else {
            res.redirect("/login");
        }
    }
    
)}
module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/login");
};

module.exports.detail = (req, res, next) => {
    const userDetails = {}

    User.find({ username: req.params.id })
    .then((users) => {
        userDetails.username = users[0].username;
    })
    
    Comment.find({ author: req.params.id })
    .then((commentList) => {
        userDetails.comments = commentList;
    })

    Build.find({ author: req.params.id })
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
            userDetails.build = buildList;
        }
        setTimeout(() => {
            res.render("users/detail", { userDetails })}, 250)
    })
}
