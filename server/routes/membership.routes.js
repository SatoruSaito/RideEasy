module.exports = (app) => {
  const membership = require("../controllers/membership.controller.js")

// Creating a new membership record done from cognito
  app.post("/membership", membership.create);

// For the admin to see all members
  app.get("/membership", membership.findAll);

// For the admin to retrieve a specific member with membershipId
  app.get("/membership/:membershipUuid", membership.findByUuid);

// For the admin to terminate membership
  app.patch("/membership/:membershipUuid", membership.updateOne);

};
