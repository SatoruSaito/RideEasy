const reservation = require("../models/reservation.model.js")
const {uuid} = require("uuidv4")

// Post a new reservation to reservation table
exports.create = (req, res) => {
  // Validate request
  console.log("inside create exports")
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    })
  }

  // Create a reservation
  const reserve = new reservation({
    uuid: uuid(), //uuidv4(),
    vehicle_uuid: req.body.vehicle_uuid,
    user_uuid: req.body.user_uuid,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  })

  console.log("reservation" + this.uuid)

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

 //Cancel reservation with user uuid and also check that cancel reservation should be successful only when the
  //user tries to cancel reservation 1 hr prior to start time otherwise need to charge 1 hr price
  exports.delete = (req, res) => {
    reservation.removebyUuid(req.query.uuid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found reservation records  with  uuid ${req.query.uuid}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete reservation with id " + req.query.uuid
          });
        }
      } else res.send({ message: `reservation  was cancelled successfully!` });
    });
  };
//get reservation by user uuid
  exports.findByUuid = (req, res) => {
    reservation.getByUserId (req.query.userUuid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `reservation  with the user uuid ${req.query.userUuid} not found.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving reservation with user uuid " + req.query.userUuid
          });
        }
      } else res.send(data);
  });
  };

exports.returnVehicle =(req,res) => {
  console.log("INSIDE returnVehicle CONTROLER");
  reservation.updateReservationForReturn (req.params.reservation_uuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `reservation  with the reservation_uuid ${req.params.reservation_uuid} not found.`
        });
      } else {
        res.status(500).send({
          message: `Error updating reservation with reservation_uuid ${req.params.reservation_uuid}`
        });
      }
    } else {
      reservation.increaseVehicleCount(req.body.vehicle_uuid,(err,data) =>{
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `location  with the vehicle_uuid ${req.body.vehicle_uuid} not found.`
            });
          } else {
            res.status(500).send({
              message: `Error updating number of vehicles in location table for vehicle_uuid ${req.body.vehicle_uuid}`
            });
          }
        }else{
          res.send(data);
        }
      })
    }
  });
};


