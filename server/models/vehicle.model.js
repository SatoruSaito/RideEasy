const sql = require("./db.js")
const moment = require('moment');
// constructor
// constructor
const Vehicle = function(vehicle) {
    this.uuid = vehicle.uuid
    this.vehicle_type_uuid = vehicle.vehicle_type_uuid
    this.model = vehicle.model
    this.make = vehicle.make
    this.year = vehicle.year
    this.registration_number = vehicle.registration_number
    this.current_mileage = vehicle.current_mileage
    this.last_serviced_date = moment(vehicle.last_serviced_date).utc().format('YYYY-MM-DD HH:mm:ss');
    this.is_reserved = vehicle.is_reserved
    this.vehicle_condition = vehicle.vehicle_condition
    this.next_available_time = moment(vehicle.next_available_time).utc().format('YYYY-MM-DD HH:mm:ss');
    this.location_uuid = vehicle.location_uuid
}

Vehicle.create = (newVehicle, result) => {
  sql.query("INSERT INTO vehicle SET ?", newVehicle, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("Created vehicle: ", { id: res.insertId, ...newVehicle })
    result(null, { id: res.insertId, ...newVehicle })
  })
}


Vehicle.getBySearchCriteria = (
    vehicle_type_uuid,
    location_uuid,
    reservation_start_time,
    reservation_end_time,
    result
) => {
    reservation_start_time = moment(reservation_start_time).utc().format('YYYY-MM-DD HH:mm:ss');
    reservation_end_time = moment(reservation_end_time).utc().format('YYYY-MM-DD HH:mm:ss');
    let mytime1 = moment.utc().valueOf();
    let current_date_time = moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss');
    query = `SELECT v.uuid, v.vehicle_type_uuid, v.model, v.make, v.year, v.registration_number, v.current_mileage, v.last_serviced_date, v.vehicle_condition, v.next_available_time, v.location_uuid FROM vehicle v
    WHERE v.vehicle_type_uuid = \'${escape(vehicle_type_uuid)}\'
    and v.location_uuid = \'${escape(location_uuid)}\'
    and (v.uuid
    NOT IN (
        SELECT r.vehicle_uuid FROM reservation r
    WHERE ((\'${reservation_start_time}\' >= r.start_date  AND \'${reservation_end_time}\' <= r.end_date)
    OR (\'${reservation_start_time}\' <= r.start_date AND \'${reservation_end_time}\' >= r.start_date)
    OR (\'${reservation_start_time}\' <= r.end_date AND \'${reservation_end_time}\' >= r.end_date)
))
    OR
    v.uuid IN
    (
        SELECT r.vehicle_uuid FROM reservation r
    WHERE ((\'${reservation_start_time}\' >= r.start_date  AND \'${reservation_end_time}\' <= r.end_date)
    OR (\'${reservation_start_time}\' <= r.start_date AND \'${reservation_end_time}\' >= r.start_date)
    OR (\'${reservation_start_time}\' <= r.end_date AND \'${reservation_end_time}\' >= r.end_date)
) AND r.is_pickedUp = false AND \'${current_date_time}\' > r.start_date)
)`;

    sql.query(
        query,
        (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(null, err)
                return
            }

            if (!res.length) {
                query = `SELECT v.uuid, v.vehicle_type_uuid, v.model, v.make, v.year, v.registration_number, v.current_mileage, v.last_serviced_date, v.vehicle_condition, v.next_available_time, v.location_uuid FROM vehicle v
    WHERE v.vehicle_type_uuid = \'${escape(vehicle_type_uuid)}\'
    and (v.uuid
    NOT IN (
        SELECT r.vehicle_uuid FROM reservation r
    WHERE ((\'${reservation_start_time}\' >= r.start_date  AND \'${reservation_end_time}\' <= r.end_date)
    OR (\'${reservation_start_time}\' <= r.start_date AND \'${reservation_end_time}\' >= r.start_date)
    OR (\'${reservation_start_time}\' <= r.end_date AND \'${reservation_end_time}\' >= r.end_date)
))
    OR
    v.uuid IN
    (
        SELECT r.vehicle_uuid FROM reservation r
    WHERE ((\'${reservation_start_time}\' >= r.start_date  AND \'${reservation_end_time}\' <= r.end_date)
    OR (\'${reservation_start_time}\' <= r.start_date AND \'${reservation_end_time}\' >= r.start_date)
    OR (\'${reservation_start_time}\' <= r.end_date AND \'${reservation_end_time}\' >= r.end_date)
) AND r.is_pickedUp = false AND \'${current_date_time}\' > r.start_date)
)`;
                sql.query(
                    query,
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err)
                            result(null, err)
                            return
                        }

                        result(null, res);
                    }
                )
            } else {
                result(null, res);
            }

        })
}

// Retrieve a specific vehicle with vehicle UUID

Vehicle.getVehicleByUuid = (vehicleUuid, result) => {
  sql.query(
    `SELECT * FROM vehicle WHERE uuid = \'${escape(vehicleUuid)}\'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(err, null)
        return
      }

      if (res.length) {
        console.log("found vehicle: ", res[0])
        result(null, res[0])
        return
      }
      // not found vehicle with the uuid
      result({ kind: "not_found" }, null)
    }
  )
}

//For Admin to retrieve all vehicles in the system

Vehicle.getAllVehicles = (result) => {
  sql.query("SELECT * FROM vehicle", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log("vehicle: ", res)
    result(null, res)
  })
}

Vehicle.updateVehicle = (vehicle_uuid, vehicle, result) =>{
    sql.query(
        'UPDATE vehicle SET vehicle_type_uuid = ?, model = ?, make = ?, year = ?, registration_number = ?, current_mileage =?,last_serviced_date=?,vehicle_condition=?,next_available_time=?,location_uuid=? WHERE uuid =?',[vehicle.vehicle_type_uuid,vehicle.model,vehicle.make,vehicle.year,vehicle.registration_number,vehicle.current_mileage,vehicle.last_serviced_date,vehicle.vehicle_condition,vehicle.next_available_time,vehicle.location_uuid,escape(vehicle_uuid)],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null)
            } else {
                console.log("Number_of_vehicles updated", res);
                result(null, res)
            }
        }
    )
}

module.exports = Vehicle
