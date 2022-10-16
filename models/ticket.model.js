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
        default : 5
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
    }
}, {timestamps: true ,versionKey: false})

module.exports = mongoose.model("Ticket", ticketSchema);