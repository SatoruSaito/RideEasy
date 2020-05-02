const sql = require("./db.js")

// constructor
const Vehicle = function(vehicle) {
  this.uuid = vehicle.uuid
  this.vehicle_type_uuid = vehicle.vehicle_type_uuid
  this.model = vehicle.model
  this.make = vehicle.make
  this.year = vehicle.year
  this.registration_number = vehicle.registration_number
  this.current_mileage = vehicle.current_mileage
  this.last_serviced_date = vehicle.last_serviced_date
  this.is_reserved = vehicle.is_reserved
  this.vehicle_condition = vehicle.vehicle_condition
  this.next_available_time = vehicle.next_available_time
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


// Retrieve all unreserved Vehicles which satisfy the search criteria

Vehicle.getBySearchCriteria = (
  vehicle_type,
  location,
  reservation_start_time,
  reservation_end_time,
  result
) => {
  sql.query(
    `SELECT T.uuid, L.uuid, R.uuid, V.uuid, V.vehicle_type_uuid, V.model, V.make, V.year, V.registration_number, V.current_mileage, V.last_serviced_date, V.vehicle_condition, V.next_available_time, V.location_uuid, T.type, L.name, L.address, L.city, L.state, L.zip_code, L.capacity, L.number_of_vehicles, R.vehicle_uuid, R.user_uuid, R.start_date, R.end_date, R.is_pickedUp FROM vehicle V LEFT OUTER JOIN vehicle_type T ON V.vehicle_type_uuid = T.uuid LEFT OUTER JOIN location L ON V.location_uuid = L.uuid LEFT OUTER JOIN reservation R ON V.uuid = R.vehicle_uuid WHERE R.is_pickedUp = false AND T.type = \'${escape(
      vehicle_type
    )}\' AND L.city = \'${escape(location)}\' AND (((\'${escape(
      reservation_start_time
    )}\' < R.start_date) AND (\'${escape(
      reservation_end_time
    )}\' < R.start_date )) OR ((\'${escape(
      reservation_start_time
    )}\' > R.end_date) AND (\'${escape(reservation_start_time)}\' > R.end_date)))`,
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }

      if (res.length) {
        console.log("number of matching vehicles at given location: ", res.length)
        result(null, res)
        return
      } else {
        sql.query(
          `SELECT T.uuid, L.uuid, R.uuid, V.uuid, V.vehicle_type_uuid, V.model, V.make, V.year, V.registration_number, V.current_mileage, V.last_serviced_date, V.vehicle_condition, V.next_available_time, V.location_uuid, T.type, L.name, L.address, L.city, L.state, L.zip_code, L.capacity, L.number_of_vehicles, R.vehicle_uuid, R.user_uuid, R.start_date, R.end_date, R.is_pickedUp FROM vehicle V LEFT OUTER JOIN vehicle_type T ON V.vehicle_type_uuid = T.uuid LEFT OUTER JOIN location L ON V.location_uuid = L.uuid LEFT OUTER JOIN reservation R ON V.uuid = R.vehicle_uuid WHERE R.is_pickedUp = false AND T.type = \'${escape(
            vehicle_type
          )}\' AND (((\'${escape(
            reservation_start_time
          )}\' < R.start_date) AND (\'${escape(
            reservation_end_time
          )}\' < R.start_date )) OR ((\'${escape(
            reservation_start_time
          )}\' > R.end_date) AND (\'${escape(
            rreservation_end_time
          )}\' > R.end_date)))`,
          (err, res) => {
            if (err) {
              console.log("error: ", err)
              result(null, err)
              return
            }

            console.log("Number of vehicles at other locations: ", res.length)
            result(null, res)
            return
          }
        )
      }
    }
  )
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

module.exports = Vehicle
