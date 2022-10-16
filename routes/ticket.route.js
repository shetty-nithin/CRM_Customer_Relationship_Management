const ticketController = require("../controllers/ticket.controller");
const {authJwt, ticketValidator} = require("../middlewares");

module.exports = (app) => {
    app.post("/crm/api/v1/tickets",[authJwt.verifyToken], ticketController.createTicket);
    app.get("/crm/api/v1/tickets", [authJwt.verifyToken], ticketController.getAllTickets);
    app.put("/crm/api/v1/tickets/:id", [authJwt.verifyToken, ticketValidator.isValidUser], ticketController.updateTicket); 
}