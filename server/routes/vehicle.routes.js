module.exports = (app) => {
  const vehicles = require("../controllers/vehicle.controller.js")

  // Create a new Vehicle
  app.post("/vehicles", vehicles.create)

  // Get all unreserved vehicles that satisfy the search criteria
  app.get("/vehicles_all/:vehicleType/:city/:startTime", vehicles.findAll)

  //For Admin to retrieve all vehicles in the system
  app.get("/vehicles", vehicles.findAllVehicles)

  // Retrieve a single vehicle with vehicleId
  app.get("/vehicles/:vehicleUuid", vehicles.findByUuid)

}
