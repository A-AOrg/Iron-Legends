require("dotenv").config();

const express = require("express");
const morgan = require("morgan")
const app = express()
const hbs = require("hbs")


/** Configs */

require("./config/db.config");

const { session, loadSessionUser} = require("./config/session.config");

require("./config/hbs.config");

/** View Engine */

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

/** logger */

app.use(morgan("dev"));

/** session middleware */
app.use(session);
app.use(loadSessionUser)

/** Support req.body **/

app.use(express.urlencoded({ extended: true }));

/** Congiure static files */

app.use(express.static("public"));

/* Routes */

const router = require("./config/routes.config.js")
app.use(router);


app.listen(3000, () => {
    console.log("Running!");
});
