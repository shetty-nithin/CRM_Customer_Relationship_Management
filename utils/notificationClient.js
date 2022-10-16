const serverConfig = require("../configs/server.config");
const Client = require("node-rest-client").Client;
const client = new Client();

module.exports = (subject, content, recepients, requester) => {
    const reqBody = {
        subject : subject,
        content : content,
        recepientEmails : recepients,
        requester : requester
    }
    const reqHeader = {
        "Content-Type" : "application/json",
    }
    const args = {
        data : reqBody,
        headers : reqHeader
    }

    try {
        client.post(serverConfig.NOTIFICATION_REST_URL, args, (data, res) => {
            console.log("request sent");
            console.log(data); 
        })
    }catch(err){
        return res.status(500).send({
            message : "Internal server error."
        })
    }
}