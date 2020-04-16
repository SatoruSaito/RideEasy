module.exports = app => {
    const Pricerange = require("../controllers/vehicle_price_range.controller.js");
  
    // route for creating records in vehicle_price_range table
    app.post("/vehiclepricerange", Pricerange.create);
    console.log("here in routes")

    //route for fetching all the records from the vehicle_price_range table
    app.get("/vehiclepricerange", Pricerange.findAll);
    
    //route for updating the records based on uuid
    app.put("/vehiclepricerange/:uuid", Pricerange.update);

      // Delete record with uuid
  app.delete("/vehiclepricerange/:uuid", Pricerange.delete);

};