const express = require("express");
const router = express.Router();

const champions = require("../controllers/champions.controller");
const users = require("../controllers/users.controller");
const secure = require("../middleware/secure.middleware");

// champions CRUD
router.get("/champions/list", champions.list);
router.get("/champions/new", champions.create);
router.post("/champions", champions.doCreate);
router.get("/champions/random", champions.randomChamp);
router.get("/champions/:id", champions.detail);

// users CRUD
router.get("/users/new", users.create);
router.post("/users", users.doCreate);
router.get("/login", users.login);
router.post("/login", users.doLogin);
router.post("/logout", secure.check, users.logout);

router.get("/",(req, res) => res.render("home") );
module.exports = router;