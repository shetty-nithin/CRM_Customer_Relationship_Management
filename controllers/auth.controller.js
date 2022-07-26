/**
 * Users : 
 * 
 * 1. Customer
 *    - Register and is approved by default
 *    - Should be able to loging immediately
 * 
 * 2. Engineer
 *    - Should be able to register
 *    - Initially he/she will not be able to login, it will be in peding state.
 *    - ADMIN should approve first
 * 
 * 3. Admin
 *    - Admin user should be only created from the backend. No API should be supported for it.
 *   
 */


const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const constants = require("../utils/constants");


exports.signup = async (req, res) => {
    // read the data from the req body
    if(req.body.userType != constants.userTypes.customer){
        req.body.userStatus = constants.userStatus.pending;
    }

    // converting the data in js object to insert into the mongodb
    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        password : bcrypt.hashSync(req.body.password, 8), // 8 is salt
        email : req.body.email,
        userType : req.body.userType,
        userStatus : req.body.userStatus
    }

    // insert the data into the DB and return the response to the client
    try{
        const userCreated = await User.create(userObj);
        /**
         * we need to return the newly created user as a response and also we should remove some
         * sensitive fields
         *  - Password
         *  - __v
         *  - _id
         *  
         * we need to create a custom repsonse and return
         */

        const response = {
            name : userCreated.name,
            userId : userCreated.userId,
            email : userCreated.email,
            userType : userCreated.userType,
            userStatus : userCreated.userStatus,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }
        res.status(201).send(response);

    }catch(err){
        console.log("The error is : ", err.message);
        res.status(500).send({
            message : `the error is ${err.message}`,
        });
    }

}

exports.signin = async (req, res) => {

    try {
        // passed userId is correct or not
        const user = await User.findOne({userId : req.body.userId});
        if(user == null){
            return res.status(400).send({
                message : "Failed! UserId does not exist in the database"
            })
        }
    

        //check is the user status is pending
        if(user.userStatus == constants.userStatus.pending){
            return res.status(400).send({
                message : "Not yet approved by admin"
            });
        }


        // if the password is correct or not
        const passwordIsValied = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValied){
            return res.status(401).send({
                message : "Wrong Password"
            })
        }
    
        // create the JWT token
        const token = jwt.sign({
            id : user.userId
        }, authConfig.SecretKey, { expiresIn : 600});
    
        // send the succefull login response
        res.status(200).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus,
            accessToken : token
        });
    }catch(err){
        console.log("Internal error : ", err.message);
        req.status(500).send({message : "Internal error while signing in."})
    }
}

