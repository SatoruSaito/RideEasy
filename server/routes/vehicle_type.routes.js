module.exports = app => {
    const VehicleType = require("../controllers/vehicle_type.controller.js");

// Add a new location
    app.post("/vehicle_type", VehicleType.create);
};