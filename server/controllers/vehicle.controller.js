const vehicle = require("../models/vehicle.model.js");
const uuidv4 = require('uuid/v4');
//all vehicle apis will be updated in this file

// Create and Save a new Vehicle
exports.create = (req, res) => {
    // Validate request
    console.log("inside create exports");
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a Vehicle
  const Vehicle = new vehicle({
    uuid: uuidv4(),
    vehicle_type_uuid: req.body.vehicle_type_uuid,
    model: req.body.model,
    make: req.body.make,
    year: req.body.year,
    registration_number: req.body.registration_number,
    current_mileage: req.body.current_mileage,
    last_serviced_date: req.body.last_serviced_date,
    is_reserved: req.body.is_reserved,
    vehicle_condition : req.body.vehicle_condition,
    next_available_time : req.body.next_available_time,
    location_uuid : req.body.location_uuid,
    created_at : req.body.created_at,
    updated_at : req.body.updated_at
  });

  // Save Vehicle in the database
  vehicle.create(Vehicle, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vehicle."
      });
    else res.send(data);
  });
};

// Retrieve all unreserved Vehicles from the database which satisfy the search criteria

exports.findAll = (req, res) => {
    vehicle.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving vehicles."
        });
      else res.send(data);
    });
  };




