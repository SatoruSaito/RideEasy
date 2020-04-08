const sql = require("./db.js");

// constructor
const reservation = function(reservation) {
  this.uuid = reservation.uuid;
  this.vehicle_uuid = reservation.vehicle_uuid;
  this.user_uuid = reservation.user_uuid;
  this.start_date = reservation.start_date;
  this.end_date = reservation.end_date;
  this.created_at = reservation.created_at;
  this.updated_at = reservation.updated_at
};

reservation.create = (newReservation, result) => {
  sql.query("INSERT INTO reservation SET ?", newReservation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      console.log(this.uuid);
      return;
    }

    console.log("created Reservation ", { id: res.insertId, ...newReservation });
    result(null, { id: res.insertId, ...newReservation });
  });
};

module.exports = reservation;