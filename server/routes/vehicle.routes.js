module.exports = (app) => {
  const vehicles = require("../controllers/vehicle.controller.js")

  // Create a new Vehicle
  app.post("/addVehicles", vehicles.create)

  // Get all unreserved vehicles that satisfy the search criteria
  app.get("/vehicles", vehicles.findAll)

  // Retrieve a single vehicle with vehicleId
  app.get("/vehicle/:vehicleUuid", vehicles.findByUuid)
}
