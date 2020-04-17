module.exports = app => {
    const membership = require("../controllers/membership.controller.js");

// Create a new membership
  app.post("/membership", membership.create);

// Get all members
  app.get("/membership", membership.findAll);

// Retrieve a specific member with membershipId
  app.get("/membership/:membershipUuid", membership.findByUuid);

// Retrieve membership status of a user by User UUID
  app.get("/membership/:userUuid", membership.findByUserUuid);

//update membership status when admin deletes the membership
  app.patch("/membership/:membershipUuid", membership.updateOne);

};