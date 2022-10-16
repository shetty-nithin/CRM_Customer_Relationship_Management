const User = require("../../models/user.model");
const { mockRequest, mockResponse } = require("../interceptor");
const { findAll } = require("../../controllers/user.controller");


const userTestPayload = {
    name : "Test",
    userId : "Test01",
    email : "test@gmail.com",
    userType : "CUSTOMER",
    userStatus : "APPROVED",
    ticketsCreated : [],
    ticketsAssigned : [],
}


describe("testing findAll method", () => {
    it("scenario with no query in the passed request", async () => {
        // mocking for user.findAll
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload]));
        // mocking for req and res
        const req = mockRequest();
        const res = mockResponse();
        req.query = {};

        await findAll(req, res);
        //Assertions
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    name : "Test"
                })
            ])
        )
    })

    it("test the scenarion when user status is passed in query param", async () => {
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload]));
        const req = mockRequest();
        const res = mockResponse();

        req.query = {userStatu : "APPROVED"};

        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    userStatus : "APPROVED"
                })
            ])
        )
    })
    
    it("error while calling the User.findAll method", async () => {
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject([new Error("error while testing")]));
        const req = mockRequest();
        const res = mockResponse();

        req.query = {userStatus : "APPROVED"};

        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message : "Internal server error"
        });    
    })
});

describe("testing update method", () => {
    it("req : updating by the user", () => {
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload]));

        const req = mockRequest();
        const res = mockResponse();
    })
});