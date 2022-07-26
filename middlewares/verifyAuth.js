const User = require("../models/user.model");
const constants = require("../utils/constants");

const validateSignUpRequestBody = async (req, res, next) => {
    // validating if name is present
    if(!req.body.name){
        return res.status(400).send({
            message : "Failed! user name is nor provided"
        })
    }

    // validating if the userId is present and its not duplicate
    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed! userId is nor provided"
        })
    }

    try {
        const user = await User.findOne({userId : req.body.userId});
        if(user !== null){
            return res.status(400).send({
                message : "Failed! UserId is already taken."
            });
        }
    }catch(err){
        return res.status(500).send({
            message : "Internal server error"
        });
    }

    // validating the password is present 
    if(!req.body.password){
        return res.status(400).send({
            message : "Failed! Password is required"
        })
    }

    // validating email id is present, valid and not duplicate
    if(!req.body.email){
        return res.status(400).send({
            message : "Failed! email is required"
        })
    }

    const isValidEmail = (email) => {
        return String(email).toLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/)
    }
    if(!isValidEmail(req.body.email)){
        return res.status(400).send({
            message : "Failed! not a valid email id."
        })
    }


    // validating if the userType is present, valid.
    if(req.body.userType == constants.userTypes.admin){
        return res.status(400).send({
            message : "Failed! cannot be a ADMIN"
        })
    }
    if(!req.body.userType){
        return res.status(400).send({
            message : "Failed! userType is not present"
        })
    }

    const userTypes = [constants.userTypes.customer, constants.userTypes.engineer];
    if(!userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message : "Failed! invalid userType"
        })
    }

    next(); // giving control to the next middleware or controller
}

const validateSignInRequestBody = (req, res, next) =>{
    // validating if the userId is present
    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed! userId is nor provided"
        })
    }

    // validating the password is present 
    if(!req.body.password){
        return res.status(400).send({
            message : "Failed! Password is required"
        })
    }

    next();
}

// const verifyRequestBodiesForAuth = {
//     validateSignUpRequestBody : validateSignUpRequestBody,
//     validateSignInRequestBody : validateSignInRequestBody
// }
 // module.exports = verifyRequestBodiesForAuth;

module.exports = {validateSignUpRequestBody, validateSignInRequestBody};