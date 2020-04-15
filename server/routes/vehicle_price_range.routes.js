module.exports = app => {
    const Pricerange = require("../controllers/vehicle_price_range.controller.js");
  
    // Create a new reservation
    app.post("/vehiclepricerange", Pricerange.create);
    console.log("here in routes")

};