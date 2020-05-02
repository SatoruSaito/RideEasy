module.exports = (app) => {
  const vehicles = require("../controllers/vehicle.controller.js")

  // Create a new Vehicle
  app.post("/vehicles", vehicles.create)

  // Retrieve all unreserved Vehicles which satisfy the search criteria
  app.get(
    "/vehicles?:vehicle_type?:location?:reservation_start_time?:reservation_end_time",
    vehicles.findBySearchCriteria
  )

  // Retrieve a single vehicle with vehicle UUID
  app.get("/vehicles/:vehicleUuid", vehicles.findVehicleByUuid)

   //For Admin to retrieve all vehicles in the system
   app.get("/vehicles", vehicles.findAllVehicles)
}
