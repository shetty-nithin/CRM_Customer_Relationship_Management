/**
 * Method to create the ticket creation
 * 1. Any authenticated user should be able to create the ticket
 *        --middleware
 * 2. Ensure that request body has valid data
 *        --middleware
 * 3. After the ticket is created ensure that customer, engineer documents are also updated.
 */
const Ticket = require("../models/ticket.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const sendNotificationReq = require("../utils/notificationClient");


// send the email after creating the ticket to all the stake
exports.createTicket = async (req, res) => {
    try{
        // read the request and create the ticket object
        const ticketObj = {
            title : req.body.title,
            ticketPriority : req.body.ticketPriority,
            description : req.body.description,
            status : req.body.status,
            reporter : req.userId //from access token : decode.id
        }
        
        // find the engineer available and attach the ticket object
        // assignment 2: choose the engineer who has lease number of tickets
        const engineer = await User.find({userType : constants.userTypes.engineer}).sort({ticketsAssigned : 1}).findOne({
            // userType : constants.userTypes.engineer,
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
        
        // insert the tiket object
        const ticketCreated = await Ticket.create(ticketObj);
        if(ticketCreated){
            //update the customer document.
            const customer = await User.findOne({
                userId : req.userId
            });
            customer.ticketsCreated.push(ticketCreated._id);
            await customer.save();
            
            //update the engineer document.
            if(engineer){
                engineer.ticketsAssigned.push(ticketCreated._id);
                await engineer.save();
            }
            
            sendNotificationReq(`Ticket created with id : ${ticketCreated._id}`,"ticket has raised", `${customer.email}, ${engineer.email}, shettynithin007@gmail.com`, "CRM APP");
            return res.status(200).send(ticketCreated);
        }
    }catch(err){
        console.log("Error while inserting the object into the DB", err.message);
        return res.status(500).send({
            message : "internal server error"
        })
    }
}




exports.getAllTickets = async (req, res) => {
    try{
        // need to find the userType. And depending on the userType, we have to frame the search field
        const user = await User.findOne({userId : req.userId});
        const qureyObj = {};
        const ticketsCreated = user.ticketsCreated;
        const ticketsAssigned = user.ticketsAssigned;
        if(user.userType == constants.userTypes.customer){
            // query for fetching all the ticket raised by the user
            if(!ticketsCreated){
                return res.status(200).send({
                    message : "No ticket raised yet"
                })
            }
    
            qureyObj["_id"] = { $in : ticketsCreated}
        }
        else if(user.userType == constants.userTypes.engineer){
            // query object for fetching all the tickets assigned/created to/by the engineer/user
            qureyObj["$or"] = [{"_id" : { $in : ticketsCreated}}, {"_id" : { $in : ticketsAssigned}}]
        }
    
        const tickets = await Ticket.find(qureyObj);
        return res.status(200).send(tickets);  
    }
    catch(err){
        console.log("Error while inserting the object into the DB", err.message);
        return res.status(500).send({
            message : "internal server error"
        })
    }
}
    

exports.updateTicket = async (req, res) => {
    try {  
        const ticket = await Ticket.findOne({"_id" : req.params.id});
        
        //update this ticket object based on the request body passed
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