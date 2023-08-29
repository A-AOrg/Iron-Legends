const express = require("express");
const router = express.Router()

const teams = require("../controllers/team.controller")
const champions = require("../controllers/champion.controller")
const users = require("../controllers/user.controller")
const secure = require("../middleware/secure.middleware")

router.get("/", homeController.home);

router.get("/users/new", users.create);
router.post("/users", users.doCreate);
router.get("/login", users.login)
router.post("/login", users.doLogin)
router.post("/logout", secure.check, users.logout)

module.exports = router