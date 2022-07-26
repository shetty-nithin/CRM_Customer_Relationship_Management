const userController = require("../controllers/user.controller");
const {authJwt} = require("../middlewares");

module.exports = (app) => {

    // Get : crm/api/v1/users - only for admin
    app.get("/crm/api/v1/users", [authJwt.verifyToken, authJwt.isAdmin], userController.findAll);
    
    // Get : /crm/api/v1/users/:id - for both admin and the owner
    app.get("/crm/api/v1/users/:id", [authJwt.verifyToken, authJwt.isValideUserReqParams, authJwt.isAdminOrOwner],  userController.findByUserId);
    
    // Put : /crm/api/v1/users/:id
    app.put("/crm/api/v1/users/:id", [authJwt.verifyToken, authJwt.isValideUserReqParams, authJwt.isAdminOrOwner],  userController.update);
}