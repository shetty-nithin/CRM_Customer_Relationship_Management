const User = require("../models/user.model");
const Ticket = require("../models/ticket.model");
const constants = require("../utils/constants");

const isValidUser = async (req, res, next) => {
    const callingUser = await User.findOne({userId : req.userId});
    const ticket = await Ticket.findOne({_id : req.params.id});

    if(callingUser.userType == constants.userTypes.customer){
        const reporter = ticket.reporter;
        if(callingUser.userId != reporter){
            return res.status(403).send({
                message : "You are not the creator of this ticket."
            })
        }
    }
    else if(callingUser.userType == constants.userTypes.engineer){
        const reporterId = ticket.reporter;
        const engineerId = ticket.assignee;

        if(callingUser.userId != reporterId && callingUser.userId != engineerId){
            return res.status(403).send({
                message : "You are neither the creator nor the assigned engineer of this ticket."
            });
        }
    }

    if(req.body.assignee && req.body.assignee != ticket.assignee && callingUser.userType != constants.userTypes.admin){
        return res.status(403).send({
            message : "Only admin is allowed to reassign the engineer to the the ticket."
        })
    }

    if(req.body.assignee){
        const engineer = await User.findOne({userId : req.body.assignee});
        if(!engineer){
            return res.status(401).send({
                message : "engineer user id passed as assignee is wrong"
            })
        } 
    }
    next();
}

module.exports = {isValidUser};