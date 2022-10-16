const Ticket = require("../models/ticket.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const sendNotificationReq = require("../utils/notificationClient");

exports.createTicket = async (req, res) => {
    try{
        const ticketObj = {
            title : req.body.title,
            ticketPriority : req.body.ticketPriority,
            description : req.body.description,
            status : req.body.status,
            reporter : req.userId
        }
        
        const engineer = await User.find({userType : constants.userTypes.engineer}).sort({ticketsAssigned : 1}).findOne({
            userStatus : constants.userStatus.approved
        });
        
        if(engineer){
            ticketObj.assignee = engineer.userId;
        }
        else{
            return res.status(503).send({
                message : "Engineers are not available at the moment."
            })
        }
        
        const ticketCreated = await Ticket.create(ticketObj);

        if(ticketCreated){
            const customer = await User.findOne({ userId : req.userId });

            customer.ticketsCreated.push(ticketCreated._id);
            await customer.save();
            engineer.ticketsAssigned.push(ticketCreated._id);
            await engineer.save();
            
            sendNotificationReq(`Ticket created with id : ${ticketCreated._id}`,"Ticket Created. It will be resolved soon.", `${customer.email}, ${engineer.email}`, "CRM APP");
            return res.status(200).send(ticketCreated);
        }
    }catch(err){
        return res.status(500).send({
            message : "internal server error"
        })
    }
}



exports.getAllTickets = async (req, res) => {
    try{
        const user = await User.findOne({userId : req.userId});
        const qureyObj = {};
        const ticketsCreated = user.ticketsCreated;
        const ticketsAssigned = user.ticketsAssigned;

        if(user.userType == constants.userTypes.customer){
            if(!ticketsCreated){
                return res.status(200).send({
                    message : "No ticket raised yet"
                })
            }
    
            qureyObj["_id"] = { $in : ticketsCreated}
        }
        else if(user.userType == constants.userTypes.engineer){
            qureyObj["$or"] = [{"_id" : { $in : ticketsCreated}}, {"_id" : { $in : ticketsAssigned}}]
        }
    
        const tickets = await Ticket.find(qureyObj);
        return res.status(200).send(tickets);  
    }
    catch(err){
        return res.status(500).send({
            message : "internal server error"
        })
    }
}
    

exports.updateTicket = async (req, res) => {
    try {  
        const ticket = await Ticket.findOne({"_id" : req.params.id});
        
        ticket.title = req.body.title ? req.body.title : ticket.title;
        ticket.description = req.body.description ? req.body.description : ticket.description;
        ticket.ticketPriority = req.body.ticketPriority ? req.body.ticketPriority : ticket.ticketPriority;
        ticket.status = req.body.status ? req.body.status : ticket.status;
        ticket.assignee = req.body.assignee ? req.body.assignee : ticket.assignee;
        
        const updateTicket = await ticket.save();
        return res.status(200).send(updateTicket);

    }catch(err){
        return res.status(500).send({
            message : "some internal error while updating"
        })
    }
}