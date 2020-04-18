module.exports = (app) => {
  const membership = require("../controllers/membership.controller.js")

  // Create a new membership
  app.post("/membership", membership.create)

  // Get all members
  app.get("/membership", membership.findAll)

  // Retrieve a specific member with membershipId
  app.get("/membership/:membershipUuid", membership.findByUuid)
}
