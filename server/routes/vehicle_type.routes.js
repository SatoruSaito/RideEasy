module.exports = app => {
    const VehicleType = require("../controllers/vehicle_type.controller.js");

// Add a new vehicle type
    app.post("/vehicle_type", VehicleType.create);

//Get all vehicle types
    app.get("/vehicle_type", VehicleType.getAll);

//Get vehicle price range details by vehicle type
   app.get("/vehicle_type/:uuid/vehiclepricerange", VehicleType.findPricerangebyVehicleType);

//Get price by vehicle type
    app.get("/vehicle_type/:uuid/vehiclepricerange/totalprice", VehicleType.calculatePricebyVehicleType);
};