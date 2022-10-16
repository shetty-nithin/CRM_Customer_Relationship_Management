const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const dbConfig = require("./configs/db.config");
const serverConfig = require('./configs/server.config');
const User = require("./models/user.model");

// parse the HTTP post request and populate it into the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


mongoose.connect(dbConfig.DB_URL);      
const db = mongoose.connection;
db.on("error", () => { //'on' signifies the event will be called every time that it occurred
    console.log("error while connecting to the mongoDB");
});
db.once("open", () => { //'once' signifies that the event will be called only once i.e the first time
    console.log("Connected to the mongoDB");
    require("./utils/addingAdmin")(User, bcrypt, mongoose); //adding adming and seed data
});


require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/ticket.route")(app);

// exporting for integration testing purpose
module.exports = app.listen(serverConfig.PORT, () => {
    console.log(`Server is up on the port ${serverConfig.PORT}`);
})