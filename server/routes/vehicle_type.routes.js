module.exports = app => {
    const VehicleType = require("../controllers/vehicle_type.controller.js");

// Add a new vehicle type
    app.post("/vehicle_type", VehicleType.create);

//Get all vehicle types
    app.get("/vehicle_type", VehicleType.getAll);

//Get vechicle price range details by vehicle type
    app.get("/vehicle_type/:uuid/vehiclepricerange", VehicleType.findPricerangebyVehicleType);
};