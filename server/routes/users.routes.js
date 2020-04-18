module.exports = app => {
    const user = require("../controllers/users.controller.js");

// Add a new user done by cognito
    app.post("/users", user.create);

// Retrieve a specific user with User UUID
    app.get("/users/:userUuid", user.findByUuid);

// Retrieve all membership details of a user by membership UUID
    app.get("/users/:userUuid/membership", user.findMembershipByUserUuid);  
    
//Retrieve reservation details by user_uuid 
    app.get("/users/:userUuid/reservations", user.findReservationByUserUuid);


};