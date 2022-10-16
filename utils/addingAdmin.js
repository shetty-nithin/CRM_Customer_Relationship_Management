module.exports = async (User, bcrypt, mongoose) => {
    try{
        await User.collection.drop();
        
        const adminUser = await User.create({
            name : "admin",
            userId : "admin",
            password : bcrypt.hashSync("welcome1", 8),
            email : "admin@gmail.com",
            userType : "ADMIN",
        });
        const user1 = await User.create({
            name : "cust1",
            userId : "c1",
            password : bcrypt.hashSync("welcome1", 8),
            email : "cust1@gmail.com",
            userType : "CUSTOMER",
        });
        const user2 = await User.create({
            name : "cust2",
            userId : "c2",
            password : bcrypt.hashSync("welcome1", 8),
            email : "cust2@gmail.com",
            userType : "CUSTOMER",
        });
        const user3 = await User.create({
            name : "cust3",
            userId : "c3",
            password : bcrypt.hashSync("welcome1", 8),
            email : "cust3@gmail.com",
            userType : "CUSTOMER",
            userStatus : "PENDING"
        });
        const eng1 = await User.create({
            name : "eng1",
            userId : "e1",
            password : bcrypt.hashSync("welcome1", 8),
            email : "eng1@gmail.com",
            userType : "ENGINEER",
            userStatus : "APPROVED"
        });
        const eng2 = await User.create({
            name : "eng2",
            userId : "e2",
            password : bcrypt.hashSync("welcome1", 8),
            email : "eng2@gmail.com",
            userType : "ENGINEER",
            userStatus : "APPROVED"
        });
        const eng3 = await User.create({
            name : "eng3",
            userId : "e3",
            password : bcrypt.hashSync("welcome1", 8),
            email : "eng3@gmail.com",
            userType : "ENGINEER",
            userStatus : "APPROVED"
        });
    }catch(err){
        console.log("Error found while initializing the data to the DB : ", err.message);
    }
}