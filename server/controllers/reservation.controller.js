const reservation = require("../models/reservation.model.js")
const uuidv4 = require("uuid/v4")

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
    uuid: uuidv4(), //uuidv4(),
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
    reservation.removebyUuid(req.params.uuid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found reservation records  with user uuid ${req.params.uuid}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete reservation with id " + req.params.uuid
          });
        }
      } else res.send({ message: `reservation  was cancelled successfully!` });
    });
  };

