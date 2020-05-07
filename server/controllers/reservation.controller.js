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
    reservation.removebyUuid(req.params.uuid, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found reservation records  with  uuid ${req.params.uuid}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete reservation with id " + req.params.uuid
          });
        }
      } else res.send(result);
    });
  };

exports.returnVehicle =(req,res) => {
  console.log("INSIDE returnVehicle CONTROLER");
  // reservation.updateReservationForReturn (req.params.reservation_uuid, (err, data) => {
  //   if (err) {
  //     if (err.kind === "not_found") {
  //       res.status(404).send({
  //         message: `reservation  with the reservation_uuid ${req.params.reservation_uuid} not found.`
  //       });
  //     } else {
  //       res.status(500).send({
  //         message: `Error updating reservation with reservation_uuid ${req.params.reservation_uuid}`
  //       });
  //     }
  //   } else {
      // if(data.changedRows == 0)
      //   return res.send({message:"Vehicle has been previously returned"});
      reservation.increaseVehicleCount(req.body.vehicle_uuid,(err,data) => {
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
        } else {
          reservation.calculateCharges(req.body.vehicle_uuid, req.body.start_date, req.body.end_date, (err, reservation_charges) => {
            if (err)
              res.status(500).send({
                message: `Error calculating charges for vehicle_uuid ${req.body.vehicle_uuid}`
              });

            reservation.updateReservationForReturn(req.params.reservation_uuid, (err, data) => {
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
                res.send(reservation_charges);
              }
            });
          });
        }
      });
};

//Update is_pickeUp in reservation table when user clicks pick up
//and also decrement the count of nor of vehicles in location table

exports.updateispickedup = (req, res) => {
  reservation.updateispickedup(req.params.uuid,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `reservation details  to update is_pickedUp with the uuid ${req.params.uuid} not found.`
        })
      } else {
        res.status(500).send({
          message:
            "Error retrieving reservation details to update is_pickedUp with uuid " + req.params.uuid
        })
      }
    } else
      res.send({
        message: `is_pickedUp for reservation uuid ${req.params.uuid} updated successfully.`
      })
  })
}


