const User = require("../models/user.model");
const constants = require("../utils/constants");
const objectConverter = require("../utils/objectConverter");

// getting the list of all the users
exports.findAll = async (req, res) => {
    // to read optional query params
    const queryObj = {};
    const userTypeQP = req.query.userType;
    const userStatusQP = req.query.userStatus;

    if(userTypeQP){
        queryObj.userType = userTypeQP;
    }
    if(userStatusQP){
        queryObj.userStatus = userStatusQP;
    }

    try {
        const users = await User.find(queryObj);
        return res.status(200).send(objectConverter.userResponse(users));

    }catch(err){
        console.log("error while fetching all the users");
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}

// This method will return the User details based on the id
exports.findByUserId = async (req, res) => {
    try {
        const user = await  User.find({userId : req.params.id});
        // user validation will be happend in middlware and user is array now
        return res.status(200).send(objectConverter.userResponse(user));

    }catch(err){
        console.log("Error while searching user based on id");
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}   

exports.update = async (req, res) => {
    try{
        const user = await User.findOne({userId : req.params.id});
        const callinUser = await User.findOne({userId : req.userId});

        user.name = req.body.name ? req.body.name : user.name;
        if((req.body.userType || req.body.userStatus) && callinUser.userType === constants.userTypes.admin){
            user.userType = req.body.userType ? req.body.userType : user.userType;
            user.userStatus = req.body.userStatus ? req.body.userStatus : user.userStatus;
        }
        else if((req.body.userType || req.body.userStatus) && callinUser.userType !== constants.userTypes.admin){
            return res.status(401).send({
                message : "unauthorized! Login as admin"
            })
        }

        const updatedUser = await user.save();
        res.status(200).send({
            name : updatedUser.name,
            userId : updatedUser.userId,
            email : updatedUser.email,
            userType : updatedUser.userType,
            userStatus : updatedUser.userStatus
        });

    }catch(err){
        console.log("error while fetching the user in udpate function", err.message);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}