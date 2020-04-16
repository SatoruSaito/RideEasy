const Location = require("../models/location.model.js");
const { uuid } = require('uuidv4');

// Add location
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Location payload can not be empty!"
        });
    }

    const location = new Location({
        uuid: uuid(),
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        capacity: req.body.capacity,
        number_of_vehicles: req.body.number_of_vehicles
    });

    Location.create(location, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error occurred while adding the location."
            });
        else res.send(data);
    });
};


