if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config(); // reads the keyvalue pair defined inside the .env file and it will be inserted  inside the prosess.env object
                                // process.env {
                                //      PORT : 8080
                                // }
}

module.exports = {
    PORT : process.env.PORT,
} 