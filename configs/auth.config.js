if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

module.exports = {
    SecretKey: process.env.SECRETKEY,
}