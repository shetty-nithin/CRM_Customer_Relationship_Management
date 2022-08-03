if(process.env.NODE_ENV !== 'production'){  // SET NODE_ENV=development
    require('dotenv').config(); 
    // reads the keyvalue pair defined inside the .env file and it will be inserted  inside the prosess.env object
            // process.env {
            //      PORT : 8080
            // }
            // we have to read the data from th .env only when it is not in production.
}
module.exports = {
    PORT : process.env.PORT,
    // NOTIFICATION_REST_URL : process.env.NOTIFICATION_REST_URL
} 



// // method_1 : 
// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').config(); 
// }
// module.exports = {
//     PORT : process.env.PORT,
//     NOTIFICATION_REST_URL : process.env.NOTIFICATION_REST_URL
// } 


// // method_2 : 
// if(process.env.NODE_ENV !== 'production'){
//     process.env.PORT = 8000
// }
// module.exports = {
//     PORT : process.env.PORT,
// } 


// /**
//  *    1. Instead of method_1, can we use method_2 ?
//  * 
//  *    2. If yes, is it possible to add anything such as "PORT" to the inbuilt 
//  *       object "process.env" as im doing in line 28 ?
//  */