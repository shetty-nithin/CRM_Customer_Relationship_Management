const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");

const verifyToken = (req, res, next) => {

    const token = req.headers["x-access-token"];

    // Check if the token is present
    if(!token){
        return res.status(403).send({
            message : "No token provided. Please login"
        });
    }

    // Validate the token
    jwt.verify(token, authConfig.SecretKey, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message : "unauthorized!"
            });
        }
        // Read the value of the user id and set it in the request for further use
        req.userId = decoded.id;
        next();
    })
}

const isAdmin = async (req, res, next) => {
    const user = await User.findOne({userId : req.userId});
    if(user && user.userType == constants.userTypes.admin){
        next();
    }else{
        return res.status(403).send({
            message : "Only admin can check this."
        });
    }
}

const isValideUserReqParams = async (req, res, next) => {
    try {
        const user = await User.find({userId : req.params.id});
        if(!user){
            return res.status(400).send({
                message : "Userid passed is not present"
            })
        }
        next();
    }catch(err){
        console.log("error while reading the user info", err.message)
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}

const isAdminOrOwner = async (req, res, next) => {
    try {
        const callingUser = await User.findOne({userId : req.userId});

        if(callingUser.userType == constants.userTypes.admin || callingUser.userId == req.params.id){
            next();
        }else{
            return res.status(403).send({// 403 - forbidden
                message : "Only the user or the owner are allowrd to make this call"
            })
        }

    }catch(err){
        console.log("error while reading the user info", err.message)
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}

module.exports = {verifyToken, isAdmin, isValideUserReqParams, isAdminOrOwner};