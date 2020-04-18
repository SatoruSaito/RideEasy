const sql = require("./db.js")

// constructor
const Vehicle = function (vehicle) {
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

Vehicle.getAll = (result) => {
  sql.query(
    "SELECT vehicle.uuid, vehicle.model, vehicle.make, vehicle.is_reserved, vehicle_type.type FROM vehicle INNER JOIN vehicle_type ON vehicle.vehicle_type_uuid = vehicle_type.uuid WHERE vehicle.is_reserved = false",
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }

      console.log("vehicles: ", res)
      result(null, res)
    }
  )
}

Vehicle.getByUuid = (vehicleUuid, result) => {
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

module.exports = Vehicle
