const sql = require("./db.js");

// constructor
const reservation = function(reservation) {
  this.uuid = reservation.uuid;
  this.vehicle_uuid = reservation.vehicle_uuid;
  this.user_uuid = reservation.user_uuid;
  this.start_date = reservation.start_date;
  this.end_date = reservation.end_date;
  
  
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
    var qry_str = "UPDATE vehicle SET is_reserved = true WHERE uuid = \'"+ escape(newReservation.vehicle_uuid) + "'";
    console.log("querystring = " + qry_str);
    sql.query(qry_str,(err, res) => {
      if(err){
        console.log("error: ", err);
        
        return;
      }
      console.log("vehicle table updated");

    }
  );
  });
};

module.exports = reservation;