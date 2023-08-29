const mongoose = require("mongoose");

mongoose
.connect("mongodb://127.0.0.1:27017/mod2project")
.then (()=> {
    console.log("connected")
})
.catch((err) => {
    console.error("error connecting", err)
});