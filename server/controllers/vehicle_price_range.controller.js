const pricerange  = require("../models/vehicle_price_range.model.js");
const uuidv4 = require('uuid/v4');

// Post a new vehicle_price_range to vehicle_price_range table
exports.create = (req, res) => {
  // Validate request
  console.log("inside create exports");
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a vehicle_price_range
  const price_range = new pricerange({
    uuid : uuidv4(),//uuidv4(),
    vehicle_type_uuid:req.body.vehicle_type_uuid,
    min_hours:req.body.min_hours,
    max_hours:req.body.max_hours,
    price:req.body.price,
    late_fee:req.body.late_fee

     });

  console.log("price_range" + this.uuid);

  // Save vehicle_price_range details in the vehicle_price_range  database
  pricerange.create(price_range, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating price_range."
      });
    else res.send(data);
    
  });
};