module.exports = app => {
    const location = require("../controllers/location.controller.js");

// Add a new location
    app.post("/locations", location.create);

    // Get all locations
    app.get("/locations", location.findAll);
};