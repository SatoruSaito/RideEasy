const sql = require("./db.js");

// constructor
const pricerange = function(pricerange) {
  this.uuid = pricerange.uuid;
  this.vehicle_type_uuid = pricerange.vehicle_type_uuid;
  this.min_hours = pricerange.min_hours;
  this.max_hours = pricerange.max_hours;
  this.price = pricerange.price;
  this.late_fee = pricerange.late_fee;
  
  
};
//creating records in vehicle_price_range tables
pricerange.create = (newPricerange, result) => {
  sql.query("INSERT INTO vehicle_price_range SET ?", newPricerange, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      console.log(this.uuid);
      return;
    }
     
    console.log("created Reservation ", { id: res.insertId, ...newPricerange });
    result(null, { id: res.insertId, ...newPricerange });
    });
};

//Fetching all the details from vehicle price_range table
pricerange.getAll = result => {
  sql.query("SELECT * from vehicle_price_range", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Vehicle_price_range: ", res);
    result(null, res);
  });
};

module.exports = pricerange;