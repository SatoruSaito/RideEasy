module.exports = (app) => {
  const membership = require("../controllers/membership.controller.js")

  // Creating a new membership record done from cognito
  app.post("/membership", membership.create)

  // For the admin to see all members, if user uuid is provided show details for that user only
  app.get("/membership?:userUuid", membership.findAllByUserUuid)

  // For the admin to terminate membership
  app.patch("/membership/:membershipUuid", membership.updateOne)
}
