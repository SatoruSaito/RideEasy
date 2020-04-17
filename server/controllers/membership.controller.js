//all membership apis will be updated in this file
const Membership = require("../models/membership.model.js");
const { uuid } = require('uuidv4');

// Create and Save a new Membership
exports.create = (req, res) => {
    // Validate request
    console.log("inside create exports");
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

// Create a Membership
  const membership = new Membership({
    uuid: uuid(),
    user_uuid: req.body.user_uuid,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    status: req.body.status
  });

  // Save Membership in the database
  Membership.create(membership, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error occurred while creating the membership."
      });
    else res.send(data);
  });
};

// Retrieve all members from the database

exports.findAll = (req, res) => {
    Membership.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving membership."
        });
      else res.send(data);
    });
  };

<<<<<<< HEAD

=======
>>>>>>> 5930abaea6fdf94e570aca8cc3eed218d4e0fce7
// Retrieve a specific member by membership uuid

exports.findByUuid = (req, res) => {
  Membership.getByUuid(req.params.membershipUuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `membership with the uuid ${req.params.membershipUuid} not found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving membership with uuid " + req.params.membershipUuid
        });
      }
    } else res.send(data);
  });
};


<<<<<<< HEAD
=======
// Retrieve membership status of a user by User UUID

exports.findByUserUuid = (req, res) => {
  Membership.getByUserUuid(req.params.userUuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `membership with the user uuid ${req.params.userUuid} not found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving membership with uuid " + req.params.userUuid
        });
      }
    } else res.send(data);
  });
};


>>>>>>> 5930abaea6fdf94e570aca8cc3eed218d4e0fce7
//update membership status when admin deletes the membership

exports.updateOne = (req, res) => {
  Membership.patchByUuId(req.params.membershipUuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `membership with the uuid ${req.params.membershipUuid} not found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving membership with uuid " + req.params.membershipUuid
        });
      }
    } else res.send({message: `membership status for ${req.params.membershipUuid} updated successfully.`});
    });
};


