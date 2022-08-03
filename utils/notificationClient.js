// this file should have the logic to connect to the notificatoin service


const Client = require("node-rest-client").Client;
const client = new Client();  // this is the client obj which will be used for calling the REST API

// const serverConfig = require("../configs/server.config");

// exposing the method which takes the request parameters for sending the notification request
// to the notification sevice.
module.exports = (subject, content, recepients, requester) => {
    // create the request body
    const reqBody = {
        subject : subject,
        content : content,
        recepientEmails : recepients,
        requester : requester
    }

    // prepare the headres
    const reqHeader = {
        "Content-Type" : "application/json",
    }

    // combine the headers and request body together
    const args = {
        data : reqBody,
        headers : reqHeader
    }

    try {
        client.post("http://localhost:8080/notiserve/api/v1/notifications", args, (data, res) => {
            console.log("request sent");
            console.log(data); 
        })
    }catch(err){
        console.log(err.message);
    }
    // make a POST call and handle the response
}