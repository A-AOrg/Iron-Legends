const Comment = require("../models/comment.model");

module.exports.doCreate = (req,res,next) => {
    Comment.create({
        text: req.body.text,
        build: req.params.id,
        author: req.user.username,
    })
    .then(() => {
        res.redirect(`/builds/${req.params.id}`)
    })
}