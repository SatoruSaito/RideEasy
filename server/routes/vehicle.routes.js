module.exports = app => {
  const vehicles = require("../controllers/vehicle.controller.js");

// Create a new Vehicle
  app.post("/vehicles", vehicles.create);

// Get all unreserved vehicles that satisfy the search criteria
  app.get("/vehicles/:vehicleType/:city/:startTime", vehicles.findAll);

// Retrieve a single vehicle with vehicleId
  app.get("/vehicles/:vehicleUuid", vehicles.findByUuid);
};