//all membership apis will be updated in this file
const Membership = require("../models/membership.model.js")
const { uuid } = require("uuidv4")

// Create and Save a new Membership
exports.create = (req, res) => {
  // Validate request
  console.log("inside create exports")
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  // Create a Membership
  const membership = new Membership({
    uuid: uuid(),
    user_uuid: req.body.user_uuid,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    status: req.body.status
  })

  // Save Membership in the database
  Membership.create(membership, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error occurred while creating the membership."
      })
    else res.send(data)
  })
}

// For the admin to see all members, if user uuid is provided show details for that user only

exports.findAllByUserUuid = (req, res) => {
  Membership.getAllByUserUuid(req.query.userUuid, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error occurred while retrieving membership."
      })
    else res.send(data)
  })
}

// For the admin to terminate membership

exports.updateOne = (req, res) => {
  Membership.patchByUuId(req.params.membershipUuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `membership with the uuid ${req.params.membershipUuid} not found.`
        })
      } else {
        res.status(500).send({
          message:
            "Error retrieving membership with uuid " + req.params.membershipUuid
        })
      }
    } else
      res.send({
        message: `membership status for ${req.params.membershipUuid} updated successfully.`
      })
  })
}
