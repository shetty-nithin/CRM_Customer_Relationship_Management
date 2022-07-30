/**
 * this is the starting point of the application
 */


const express = require("express");
const app = express();
const serverConfig = require('./configs/server.config');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");

/**
 * Register the body-parser middleware
 */
app.use(bodyParser.json()); // only for json object
app.use(bodyParser.urlencoded({extended : true})); // false only for string and true for all the data types


/**
 * Initialize the  connection to the mongoDB
 */
mongoose.connect(dbConfig.DB_URL);      
const db = mongoose.connection;
db.on("error", () => {
    console.log("error while connecting to the mongoDB");
});
db.once("open", () => {
    console.log("Connected to the mongoDB");
    init();
});

/**
 * Creating the Admin user at the boot time.
 */
async function init(){
    
    try{
        await User.collection.drop();
        /**
         * Check if the admin user is already present
         */
        // let adminUser = await User.findOne({userId : "admin"});
        // if(adminUser){
        //     console.log("ADMIN is already exist");
        //     return;
        // }
        
        const adminUser = await User.create({
                name : "Nithin Shetty",
                userId : "admin",
                password : bcrypt.hashSync("welcome1", 8),
                email : "shettynithin744@gmail.com",
                userType : "ADMIN",
        });
        const user1 = await User.create({
                name : "user1",
                userId : "u1",
                password : bcrypt.hashSync("welcome1", 8),
                email : "user1@gmail.com",
                userType : "CUSTOMER",
        });
        const user2 = await User.create({
            name : "user2",
            userId : "u2",
            password : bcrypt.hashSync("welcome1", 8),
            email : "user2@gmail.com",
            userType : "CUSTOMER",
        });
        const user3 = await User.create({
            name : "user3",
            userId : "u3",
            password : bcrypt.hashSync("welcome1", 8),
            email : "user3@gmail.com",
            userType : "CUSTOMER",
            userStatus : "PENDING"
        });
        const user4 = await User.create({
            name : "user4",
            userId : "u4",
            password : bcrypt.hashSync("welcome1", 8),
            email : "user4@gmail.com",
            userType : "ENGINEER",
            userStatus : "APPROVED"
        });
        const user5 = await User.create({
            name : "user5",
            userId : "u5",
            password : bcrypt.hashSync("welcome1", 8),
            email : "user5@gmail.com",
            userType : "ENGINEER",
            userStatus : "APPROVED"
        });
        const user6 = await User.create({
            name : "user6",
            userId : "u6",
            password : bcrypt.hashSync("welcome1", 8),
            email : "user6@gmail.com",
            userType : "ENGINEER",
            userStatus : "APPROVED"
        });
        // console.log(adminUser, user1, user2, user3, user4, user5, user6);

    } catch(err){
        console.log("err i db initialization : ", err.message);
    }
}


/**
 * we need to connect router to the server
 */
require("./routes/auth.route")(app); //this registers the server with the route
require("./routes/user.route")(app);
require("./routes/ticket.route")(app);




app.listen(serverConfig.PORT, () => {
    console.log(`Server is up on the port ${serverConfig.PORT}`);
})