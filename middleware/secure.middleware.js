const User = require("../models/users.model");

module.exports.check = (req, res, next) => {
    if (req.session.userId) {
        User.findById(req.session.userId).then((user) => {
            if (user) {
                req.user = user;
                res.locals.currentUser = user;
                next();
            } else {
                res.redirect("/login");
            }
        })
    } else {
        res.redirect("/login");
    }
};