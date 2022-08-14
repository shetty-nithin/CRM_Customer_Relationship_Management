const User = require("../models/user.model");
const constants = require("../utils/constants");

const validateSignUpRequestBody = async (req, res, next) => {

    // validating whether the name is present or not
    if(!req.body.name){
        return res.status(400).send({
            message : "Please provide the User Name and try again."
        })
    }
    
    // validating whether the userId is present in the request and the sent userId does not exists already.
    if(!req.body.userId){
        return res.status(400).send({
            message : "Please provid the User Id and try again."
        })
    }

    try{
        const user = await User.findOne({userId : req.body.userId});
        if(user !== null){
            return res.status(400).send({
                message : "Entered User Id is already exists. Please try with other User Id."
            });
        }
    }
    catch(err){
        return res.status(500).send({
            message : "Internal Server again. Please try again."
        });
    }
    
    // validating whether the password is present or not. 
    if(!req.body.password){
        return res.status(400).send({
            message : "Please provide the password to create the account."
        })
    }

    // validating whether the email id is present or not, sent mail is valid mail or not and the sent email id does not exists already
    if(!req.body.email){
        return res.status(400).send({
            message : "Please provide the email id and try again."
        })
    }
    
    const isValidEmail = (email) => {
        return String(email).toLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/)
    }
    if(!isValidEmail(req.body.email)){
        return res.status(400).send({
            message : "Please provide the valid email id/email id already exists, please try with other email id."
        })
    }
    
    try {
        const user = await User.findOne({email : req.body.email});
        if(user !== null){
            return res.status(400).send({
                message : "Entered Email Id is already exists. Please try with other Email Id."
            });
        }
    }
    catch(err){
        return res.status(500).send({
            message : "Internal Server again. Please try again."
        });
    }
    
    // validating whether the userType is present or not and its valid one or not.
    if(!req.body.userType){
        return res.status(400).send({
            message : "Please select the User Type : Sign up as a Customer or an Engineer."
        })
    }
    if(req.body.userType == constants.userTypes.admin){
        return res.status(400).send({
            message : "You cannot be admin. You can create an account either as a Customer or as a Engineer."
        })
    }
    
    const userTypes = [constants.userTypes.customer, constants.userTypes.engineer];
    if(!userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message : `${req.body.userType} is a invalid User Type. Please SignUp either as a Customer or as an Engineer.`
        })
    }
    
    next();
}

const validateSignInRequestBody = (req, res, next) =>{

    // validating whether the userId is present or not.
    if(!req.body.userId){
        return res.status(400).send({
            message : "Please provide the User Id to Sign In."
        })
    }
    
    // validating whether the password is present or not.
    if(!req.body.password){
        return res.status(400).send({
            message : "Please provide the Password to Sign In."
        })
    }

    next();
}


module.exports = {validateSignUpRequestBody, validateSignInRequestBody};