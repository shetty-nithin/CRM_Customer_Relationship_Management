const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const constants = require("../utils/constants");


exports.signup = async (req, res) => {
    if(req.body.userType != constants.userTypes.customer){
        req.body.userStatus = constants.userStatus.pending;
    }

    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        password : bcrypt.hashSync(req.body.password, 8),
        email : req.body.email,
        userType : req.body.userType,
        userStatus : req.body.userStatus
    }

    try{
        const userCreated = await User.create(userObj);
        const response = {
            name : userCreated.name,
            userId : userCreated.userId,
            email : userCreated.email,
            userType : userCreated.userType,
            userStatus : userCreated.userStatus
        }
        res.status(201).send(response);

    }catch(err){
        res.status(500).send({
            message : `the error is ${err.message}`,
        });
    }

}

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({userId : req.body.userId});
        if(user == null){
            return res.status(400).send({
                message : "Failed! UserId does not exist in the database"
            })
        }
    
        if(user.userStatus == constants.userStatus.pending){
            return res.status(400).send({
                message : "Not yet approved by admin"
            });
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if(!isPasswordValid){
            return res.status(401).send({
                message : "Wrong Password"
            })
        }
    
        const token = jwt.sign({id : user.userId}, authConfig.SecretKey, {expiresIn : 600});
    
        res.status(200).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus,
            accessToken : token
        });
    }
    catch(err){
        res.status(500).send({message : "Internal error while signing in."})
    }
}

