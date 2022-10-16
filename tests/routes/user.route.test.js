const db = require("../db");
const jwt = require("jsonwebtoken");
const authConfig = require("../../configs/auth.config");
const request  = require("supertest");
const app = require("../../server");
const User = require("../../models/user.model");

let token;

beforeAll(async () => {
    token = jwt.sign({id : "07"}, authConfig.SecretKey, {expiresIn : 1200});
    await db.clearDatabase();
    await User.create({
        name : "Nithin",
        userId : "07",
        email : "shettynithin007@gmail.com",
        userType : "ADMIN",
        password : "nopassword",
        userStatus : "APPROVED"
    })
});

afterAll(async () => {
    await db.closeDatabase();
})

describe("Find all users", () => {
    it("find all the users", async () => {
        // need to invoke API (making use of supertest)
        const res = await request(app).get("/crm/api/v1/users").set("x-access-token", token);
        
        // code for validation
        expect(res.statusCode).toEqual(200);
        // expect(res.body).toEqual(
        //     expect.arrayContaining([
        //         expect.objectContaining({
        //             "name" : "Nithin",
        //             "userId" : "07",
        //             "email" : "shettynithin744@gmail.com",
        //             "userType" : "ADMIN",
        //             "userStatus" : "APPROVED"
        //         })
        //     ])
        // )
    })
})

// describe("Find user based on userId", () => {
//     it("testing the end point /crm/api/v1/users/:id", async () => {
//         const userId = "07";
//         let res = await request(app).get(`/crm/api/v1/users/${userId}`).set("x-access-token", token)
        
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining({
//                     "name" : "Nithin",
//                     "userId" : "07",
//                     "email" : "shettynithin744@gmail.com",
//                     "userType" : "ADMIN",
//                     "userStatus" : "APPROVED"
//                 })
//             ])
//         )
//     })
// });