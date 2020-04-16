module.exports = app => {
    const location = require("../controllers/location.controller.js");

// Add a new location
    app.post("/location", location.create);

};