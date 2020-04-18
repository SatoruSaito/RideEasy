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
//update the fields min_hrs,max_hrs,price,late_fee based on uuid
pricerange.updateById = (uuid, pricerange, result) => {
  sql.query(
    "UPDATE vehicle_price_range SET min_hours = ?, max_hours = ?, price = ? ,late_fee = ? WHERE uuid = ?",
    [pricerange.min_hours, pricerange.max_hours, pricerange.price,pricerange.late_fee ,uuid],
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
    // not found records with the uuid
    result({ kind: "not_found" }, null);
    return;
  }

  console.log("updated price_range_table: ", { id: uuid, ...pricerange });
  result(null, { id: uuid, ...pricerange });
}
);
};
//delete records of vehicle_price_range with uuid
pricerange.remove = (uuid, result) => {
  sql.query("DELETE FROM vehicle_price_range WHERE uuid = ?", uuid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
    // not found records with the uuid
    result({ kind: "not_found" }, null);
    return;
  }

  console.log("deleted record with uuid: ", uuid);
  result(null, res);
});
};


module.exports = pricerange;