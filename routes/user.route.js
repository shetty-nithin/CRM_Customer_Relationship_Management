/**
 * Routes for 
 *  - Find All Users
 *  - Find By UserId
 *  - Update User
 */

const userController = require("../controllers/user.controller");
const {authJwt} = require("../middlewares");

module.exports = (app) => {

    app.get("/crm/api/v1/users", [authJwt.verifyToken, authJwt.isAdmin], userController.findAll);
    app.get("/crm/api/v1/users/:id", [authJwt.verifyToken, authJwt.isValideUserReqParams, authJwt.isAdminOrOwner],  userController.findByUserId);
    app.put("/crm/api/v1/users/:id", [authJwt.verifyToken, authJwt.isValideUserReqParams, authJwt.isAdminOrOwner],  userController.update);
}