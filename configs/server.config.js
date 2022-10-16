if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config(); 
}

module.exports = {
    PORT : process.env.PORT,
    NOTIFICATION_REST_URL : process.env.NOTIFICATION_REST_URL
} 
