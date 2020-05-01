const Policy = require("../models/policy.model.js");
const { uuid } = require('uuidv4');

// Add Policy
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Policy payload can not be empty!"
        });
    }

    const policy = new Policy({
        uuid: uuid(),
        price: req.body.price,
        time_in_months: req.body.time_in_months
    });

    Policy.create(policy, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error occurred while adding the location."
            });
        else res.send(data);
    });
};

