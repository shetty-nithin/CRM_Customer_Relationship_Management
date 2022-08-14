/**
 * Routes for 
 *  - Sign Up
 *  - Sign In
 */

const authController = require("../controllers/auth.controller");
const {verifyAuth} = require("../middlewares");

module.exports = (app) => {

    app.post("/crm/api/v1/auth/signup", [verifyAuth.validateSignUpRequestBody], authController.signup);
    app.post("/crm/api/v1/auth/signin", [verifyAuth.validateSignInRequestBody], authController.signin);
}