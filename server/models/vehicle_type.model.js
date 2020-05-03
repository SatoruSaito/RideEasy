const sql = require("./db.js");

// constructor
const VehicleType = function(vehicle_type) {
    this.uuid = vehicle_type.uuid;
    this.type = vehicle_type.type;
};

VehicleType.create = (newVehicleType, result) => {
    sql.query("INSERT INTO vehicle_type SET ?", newVehicleType, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created vehicle_type: ", {...newVehicleType });
        result(null, {...newVehicleType });
    });
};

VehicleType.getAll = result => {
    sql.query("SELECT * FROM vehicle_type", null,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("vehicle types: ", res);
        result(null, res);
    });
};

//Retrieve vehicle price range by vehicle type

VehicleType.getPriceRangeByVehicleType = (vehicleTypeUuid, result) => {
    console.log("vehicle_type_uuid",vehicleTypeUuid);
    var qrystring = `SELECT * FROM vehicle_price_range WHERE vehicle_type_uuid = \'${escape(vehicleTypeUuid)}\';`;
    console.log("query =" + qrystring);
    sql.query(qrystring,
      (err, res) => {
        if (err) {
          console.log("error: ", err)
          result(err, null)
          return
        }
  
        if (res.length) {
          console.log("found vehicle price range with vehicle type uuid: ", res)
          result(null, res)
          return
        }
        // not found vehicle with the uuid
        result({ kind: "not_found" }, null)
      }
    )
  }
  

  

module.exports = VehicleType;