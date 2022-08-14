/**
 * Starting point of the CRM application
 */

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
    init();
});


async function init(){
    try{
        await User.collection.drop();
        
        const adminUser = await User.create({
            name : "admin",
            userId : "admin",
            password : bcrypt.hashSync("welcome1", 8),
            email : "admin@gmail.com",
            userType : "ADMIN",
        });
        const user1 = await User.create({
            name : "cust1",
            userId : "c1",
            password : bcrypt.hashSync("welcome1", 8),
            email : "cust1@gmail.com",
            userType : "CUSTOMER",
        });
        const user2 = await User.create({
            name : "cust2",
            userId : "c2",
            password : bcrypt.hashSync("welcome1", 8),
            email : "cust2@gmail.com",
            userType : "CUSTOMER",
        });
        const user3 = await User.create({
            name : "cust3",
            userId : "c3",
            password : bcrypt.hashSync("welcome1", 8),
            email : "cust3@gmail.com",
            userType : "CUSTOMER",
            userStatus : "PENDING"
        });
        const eng1 = await User.create({
            name : "eng1",
            userId : "e1",
            password : bcrypt.hashSync("welcome1", 8),
            email : "eng1@gmail.com",
            userType : "ENGINEER",
            userStatus : "APPROVED"
        });
        const eng2 = await User.create({
            name : "eng2",
            userId : "e2",
            password : bcrypt.hashSync("welcome1", 8),
            email : "eng2@gmail.com",
            userType : "ENGINEER",
            userStatus : "APPROVED"
        });
        const eng3 = await User.create({
            name : "eng3",
            userId : "e3",
            password : bcrypt.hashSync("welcome1", 8),
            email : "eng3@gmail.com",
            userType : "ENGINEER",
            userStatus : "APPROVED"
        });
    }catch(err){
        console.log("Error found while initializing the data to the DB : ", err.message);
    }
}

require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/ticket.route")(app);

// exporting for integration testing purpose
module.exports = app.listen(serverConfig.PORT, () => {
    console.log(`Server is up on the port ${serverConfig.PORT}`);
})