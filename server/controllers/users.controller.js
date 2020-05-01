//all user apis will be updated in this file
const User = require("../models/users.model.js")
const Membership = require("../models/membership.model.js")
const { uuid } = require("uuidv4")

exports.create = (req, res) => {
  // Validate request
  console.log("inside create exports")
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const user = new User({
    uuid: uuid(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_name: req.body.user_name,
    driver_license_number: req.body.driver_license_number,
    license_state: req.body.license_state,
    email_address: req.body.email_address,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    credit_card_number: req.body.credit_card_number
  })

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error occurred while creating user."
      })
    else res.send(data)
  })
}

//retrieve specific user by user uuid

exports.findByUuid = (req, res) => {
  User.getByUuid(req.params.userUuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `user with the uuid ${req.params.userUuid} not found.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving user with uuid " + req.params.userUuid
        })
      }
    } else res.send(data)
  })
}

// Retrieve membership details of a user by User UUID

exports.findMembershipByUserUuid = (req, res) => {
  User.getMembershipByUserUuid(req.params.userUuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `membership with the user uuid ${req.params.userUuid} not found.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving membership with uuid " + req.params.userUuid
        })
      }
    } else res.send(data)
  })
}

// For the user to terminate/ extend membership

exports.updateMembershipByUserUuid = (req, res) => {
  User.putMembership(req.params.userUuid, new Membership(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `membership with the uuid ${req.params.userUuid} not found.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving membership with uuid " + req.params.userUuid
        })
      }
    } else res.send(data)
  })
}


// For user to see all unreserved vehicles available in the system

// exports.findAllVehicles = (req, res) => {
//   User.getAllVehicles((err, data) => {
//     if (err)
//       res.status(500).send({
//         message: err.message || "Error occurred while retrieving vehicles."
//       })
//     else res.send(data)
//   })
// }

//For user to update his profile details including driver's license and credit card number

exports.updateProfileByUserUuid = (req, res) => {
  User.putProfile(req.params.userUuid, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `profile with the user uuid ${req.params.userUuid} not found.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving profile with uuid " + req.params.userUuid
        })
      }
    } else res.send(data)
  })
}
