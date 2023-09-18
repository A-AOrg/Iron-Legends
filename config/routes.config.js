const express = require("express");
const router = express.Router();

const champions = require("../controllers/champions.controller");
const users = require("../controllers/users.controller");
const secure = require("../middleware/secure.middleware");
const builds = require("../controllers/builds.controller");
const teams = require("../controllers/teams.controller");
const comments = require("../controllers/comments.controller");


//teams
router.get("/random/team", teams.randomComp);

// builds
router.get("/champions/:id/builds/new", secure.isLogged, builds.create);
router.post("/random/new", builds.doCreate);
router.get("/random/build", builds.randomBuild);
router.post("/builds/:id", comments.doCreate);
router.get("/builds/:id", builds.detail);

// champions CRUD
router.get("/champions/list", champions.list);
router.get("/champions/new", secure.isAdmin, champions.create);
router.post("/champions", champions.doCreate);
router.get("/champions/:id", champions.detail);

// users CRUD
router.get("/users/profile", secure.isLogged, users.detail);
router.get("/users/new", users.create);
router.post("/users", users.doCreate);
router.get("/login", users.login);
router.post("/login", users.doLogin);
router.post("/logout", secure.isLogged, users.logout);

router.get("/",(req, res) => res.render("home") );
module.exports = router;
