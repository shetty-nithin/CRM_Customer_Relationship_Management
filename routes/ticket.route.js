const ticketController = require("../controllers/ticket.controller");
const {authJwt, ticketValidator} = require("../middlewares");

module.exports = (app) => {

    // Assignment 3 : Add the middleware for the validation of the request
    // like title is ther or not, check engineers are present or not

    // Post : /crm/api/v1/tickets
    app.post("/crm/api/v1/tickets",[authJwt.verifyToken], ticketController.createTicket);

    // Get : /crm/api/v1/tickets
    app.get("/crm/api/v1/tickets", [authJwt.verifyToken], ticketController.getAllTickets);

    // Put : /crm/api/v1/tickets/:id
    app.put("/crm/api/v1/tickets/:id", [authJwt.verifyToken, ticketValidator.isValidUser], ticketController.updateTicket);
}