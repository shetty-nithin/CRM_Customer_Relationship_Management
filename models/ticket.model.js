const mongoose = require("mongoose");
const constants = require("../utils/constants");

const ticketSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    ticketPriority : {
        type : Number,
        required : true,
        default : 4
    },
    description : {
        type : String,
        require : true,
    },
    status : {
        type : String,
        enum : [constants.ticketStatuses.open, constants.ticketStatuses.closed, constants.ticketStatuses.blocked],
        default : constants.ticketStatuses.open
    },
    reporter : {
        type : String,
        required : true
    },
    assignee : {
        type : String
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    }
}, {versionKey : false}) // this will ensure __v is not created by mongoose

module.exports = mongoose.model(" Ticket", ticketSchema);