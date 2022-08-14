/**
 * Routes for
 *  - Create Ticket
 *  - Get all Ticket
 *  - Update Ticket
 */

const ticketController = require("../controllers/ticket.controller");
const {authJwt, ticketValidator} = require("../middlewares");

module.exports = (app) => {

    // Assignment 3 : Add the middleware for the validation of the request
    // like title is ther or not, check engineers are present or not
    app.post("/crm/api/v1/tickets",[authJwt.verifyToken], ticketController.createTicket);
    app.get("/crm/api/v1/tickets", [authJwt.verifyToken], ticketController.getAllTickets);
    app.put("/crm/api/v1/tickets/:id", [authJwt.verifyToken, ticketValidator.isValidUser], ticketController.updateTicket); 
}