const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/IronLeague"

mongoose
    .connect(MONGO_URI)
    .then(()=> console.log(`Connected to database.`))
    .catch((err) => console.error("error connecting", err));
    
