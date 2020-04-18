

const VehicleType = require("../models/vehicle_type.model.js");
const { uuid } = require('uuidv4');

//Get all vehicle types
exports.getAll = (req,res) => {
    VehicleType.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving locations."
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


