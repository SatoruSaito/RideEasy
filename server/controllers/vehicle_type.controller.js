

const VehicleType = require("../models/vehicle_type.model.js");
const { uuid } = require('uuidv4');

//Get all vehicle types
exports.getAll = (req,res) => {
    VehicleType.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving vehicle types."
            });
        res.send(data);
    });
}
// Add Vehicle Type
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "VehicleType payload can not be empty!"
        });
    }

    const vehicleType = new VehicleType({
        uuid: uuid(),
        type: req.body.type,
    });

    VehicleType.create(vehicleType, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error occurred while adding the vehicle type."
            });
        else res.send(data);
    });
};

//Fetch the vehicle price range details based on vehicle type

exports.findPricerangebyVehicleType = (req, res) => {
    VehicleType.getPriceRangeByVehicleType(req.params.uuid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found vehicle price range with vehicle type uuid ${req.params.uuid}.`
          })
        } else {
          res.status(500).send({
            message: "Error retrieving Vehicle price range with vehicle type uuid " + req.params.uuid
          })
        }
      } else res.send(data)
    })
  }
  
