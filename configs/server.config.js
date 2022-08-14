if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config(); 
    // reads the keyvalue pair defined inside the .env file and it will be inserted inside the prosess.env object
}
module.exports = {
    PORT : process.env.PORT,
    NOTIFICATION_REST_URL : process.env.NOTIFICATION_REST_URL
} 
