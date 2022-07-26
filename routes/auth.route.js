/**
 * This file contains the logic for routing request
 */

const authController = require("../controllers/auth.controller");
const {verifyAuth} = require("../middlewares");

module.exports = (app) => {

    // Post : /crm/api/v1/auth/signup
    app.post("/crm/api/v1/auth/signup", [verifyAuth.validateSignUpRequestBody], authController.signup);

    // Post : /crm/api/v1/auth/signin
    app.post("/crm/api/v1/auth/signin", [verifyAuth.validateSignInRequestBody], authController.signin);
}