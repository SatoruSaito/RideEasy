const sql = require("./db.js");

// constructor
const vehicle = function(vehicle) {
    this.uuid = vehicle.uuid;
    this.vehicle_type_uuid = vehicle.vehicle_type_uuid;
    this.model = vehicle.model;
    this.make = vehicle.make;
    this.year = vehicle.year;
    this.registration_number = vehicle.registration_number;
    this.current_mileage = vehicle.current_mileage;
    this.last_serviced_date = vehicle.last_serviced_date;
    this.is_reserved = vehicle.is_reserved;
    this.vehicle_condition = vehicle.vehicle_condition;
    this.next_available_time = vehicle.next_available_time;
    this.location_uuid = vehicle.location_uuid;
    this.created_at = vehicle.created_at;
    this.updated_at = vehicle.updated_at;
  };

  vehicle.create = (newvehicle, result) => {
    sql.query("INSERT INTO vehicle SET ?", newvehicle, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created vehicle: ", { id: res.insertId, ...newvehicle });
      result(null, { id: res.insertId, ...newvehicle });
    });
  };
  
  vehicle.getAll = result => {
      sql.query("SELECT vehicle.uuid, vehicle.model, vehicle.make, vehicle.is_reserved, vehicle_type.type FROM vehicle INNER JOIN vehicle_type ON vehicle.vehicle_type_uuid = vehicle_type.uuid WHERE vehicle.is_reserved = false", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("vehicles: ", res);
        result(null, res);
      });
    };

  
module.exports = vehicle;