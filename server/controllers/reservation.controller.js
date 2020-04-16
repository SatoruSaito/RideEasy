const reservation  = require("../models/reservation.model.js");
const uuidv4 = require('uuid/v4');

// Post a new reservation to reservation table
exports.create = (req, res) => {
  // Validate request
  console.log("inside create exports");
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a reservation
  const reserve = new reservation({
    uuid : uuidv4(),//uuidv4(),
    vehicle_uuid:req.body.vehicle_uuid,
    user_uuid:req.body.user_uuid,
    start_date:req.body.start_date,
    end_date:req.body.end_date,
    
    
  });

  console.log("reservation" + this.uuid);

  // Save reservation details in the reservation  database
  reservation.create(reserve, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating reservation."
      });
    else res.send(data);
    
  });
};