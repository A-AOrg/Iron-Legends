const expressSession = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const User = require("../models/users.model");

const session = expressSession({
    resave: true,
    secret: process.env.SESSION_SECRET || "super secret",
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: mongoose.connection._connectionString,
        ttl: 60 * 60 * 24 * 7 
 }),
});

const loadSessionUser = (req, res, next) => {
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
        next();
    }
};

module.exports = {
    session,
    loadSessionUser
}