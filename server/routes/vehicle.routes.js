
module.exports = (app) => {
  const vehicles = require("../controllers/vehicle.controller.js")

  // Create a new Vehicle
  app.post("/vehicles", vehicles.create)

  // Retrieve all unreserved Vehicles which satisfy the search criteria

  // Retrieve a single vehicle with vehicle UUID
  app.get("/vehicles/:vehicleUuid", vehicles.findVehicleByUuid)

   //For Admin to retrieve all vehicles in the system
   app.get("/vehicles", vehicles.findVehicles)
}