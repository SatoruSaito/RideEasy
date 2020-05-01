module.exports = app => {
    const user = require("../controllers/users.controller.js");

// Add a new user done by cognito
    app.post("/users", user.create);

// Retrieve a specific user with User UUID
    app.get("/users/:userUuid", user.findByUuid);

// Retrieve all membership details of a user by membership UUID
    app.get("/users/:userUuid/membership", user.findMembershipByUserUuid);

// Update membership for the user either due to termination or extension of membership
    app.put("/users/:userUuid/membership", user.updateMembershipByUserUuid);

// For user to see all unreserved vehicles available in the system ???
//    app.get("/users/:userUuid/vehicles", user.findAllVehicles);

//For user to update his profile details including driver's license and credit card number
    app.put("/users/:userUuid", user.updateProfileByUserUuid);

    //For user to get his reservation details on his user id
    app.get("/users/:userUuid/reservations", user.findReservationByUserUuid);

};
