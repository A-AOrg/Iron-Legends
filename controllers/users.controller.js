const User = require("../models/users.model");
const bcrypt = require("bcrypt")

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
