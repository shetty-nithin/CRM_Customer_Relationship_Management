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
                name : "ram",
                userId : "r1",
                password : bcrypt.hashSync("welcome1", 8),
                email : "ram@gmail.com",
                userType : "CUSTOMER",
        });
        const user2 = await User.create({
            name : "bhim",
            userId : "b1",
            password : bcrypt.hashSync("welcome1", 8),
            email : "bhim@gmail.com",
            userType : "CUSTOMER",
        });
        const user3 = await User.create({
            name : "shum",
            userId : "s1",
            password : bcrypt.hashSync("welcome1", 8),
            email : "shum@gmail.com",
            userType : "ENGINEER",
        });
        // console.log(adminUser, user1, user2, user3);

    } catch(err){
        console.log("err i db initialization : ", err.message);
    }
}


/**
 * we need to connect router to the server
 */
require("./routes/auth.route")(app); //this registers the server with the route
require("./routes/user.route")(app);




app.listen(serverConfig.PORT, () => {
    console.log(`Server is up on the port ${serverConfig.PORT}`);
})