const sql = require("./db.js");

// constructor
const Vehicle = function(vehicle) {
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
};

Vehicle.create = (newVehicle, result) => {
  sql.query("INSERT INTO vehicle SET ?", newVehicle, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created vehicle: ", { id: res.insertId, ...newVehicle });
  result(null, { id: res.insertId, ...newVehicle });
});
};

Vehicle.getAll = (vehicleType,city,startTime, result) => {
  sql.query(`SELECT T.uuid, L.uuid, V.uuid, V.vehicle_type_uuid, V.model, V.make, V.year, V.registration_number, V.current_mileage, V.last_serviced_date, V.is_reserved, V.vehicle_condition, V.next_available_time, V.location_uuid, T.type, L.name, L.address, L.city, L.state, L.zip_code, L.capacity, L.number_of_vehicles FROM vehicle V LEFT OUTER JOIN vehicle_type T ON V.vehicle_type_uuid = T.uuid LEFT OUTER JOIN location L ON V.location_uuid = L.uuid WHERE V.is_reserved = false AND T.type = \'${escape(vehicleType)}\' AND L.city = \'${escape(city)}\' AND V.next_available_time >= \'${escape(startTime)}\'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if(res.length){
    console.log("number of matching vehicles at given location: ", res.length);
    result(null, res);
    return;

  } else {

    sql.query(`SELECT T.uuid, L.uuid, V.uuid, V.vehicle_type_uuid, V.model, V.make, V.year, V.registration_number, V.current_mileage, V.last_serviced_date, V.is_reserved, V.vehicle_condition, V.next_available_time, V.location_uuid, T.type, L.name, L.address, L.city, L.state, L.zip_code, L.capacity, L.number_of_vehicles FROM vehicle V LEFT OUTER JOIN vehicle_type T ON V.vehicle_type_uuid = T.uuid LEFT OUTER JOIN location L ON V.location_uuid = L.uuid WHERE V.is_reserved = false AND T.type = \'${escape(vehicleType)}\' AND V.next_available_time >= \'${escape(startTime)}\'`, (err, res) => {

      if(err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Number of vehicles at other locations: ", res.length);
    result(null, res);
    return;

  });
  }
});
};

Vehicle.getByUuid = (vehicleUuid, result) => {
  sql.query(`SELECT * FROM vehicle WHERE uuid = \'${escape(vehicleUuid)}\'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
    console.log("found vehicle: ", res[0]);
    result(null, res[0]);
    return;
  }
  // not found vehicle with the uuid
  result({kind: "not_found"}, null);
});
};


module.exports = Vehicle;