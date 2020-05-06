module.exports = app => {
    const location = require("../controllers/location.controller.js");

// Add a new location
    app.post("/locations", location.create);

    // Get all locations
    app.get("/locations", location.findAll);

    // Retrieve a single location with locationUuid
    app.get("/locations/:locationUuid", location.findByUuid);

    // Retrieve vehicles at a given location
    app.get("/locations/:locationUuid/vehicles", location.findVehiclesByLocationUuid);

    // Retrieve a single location with locationUuid
    app.delete("/locations/:locationUuid", location.deleteByUuid);
};
