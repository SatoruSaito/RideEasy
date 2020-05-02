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


Vehicle.getBySearchCriteria = (
  vehicle_type_uuid,
  location_uuid,
  reservation_start_time,
  reservation_end_time,
  result
) => {
  reservation_start_time = Date.parse(reservation_start_time);
  reservation_end_time = Date.parse(reservation_end_time);
  console.log("inside getBySearchCriteria");
  query =     `SELECT V.uuid FROM 
  vehicle V WHERE V.vehicle_type_uuid = \'${escape(vehicle_type_uuid)}\' AND
  V.location_uuid = \'${escape(location_uuid)}\'`;
  sql.query(
    query,
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }

      var vehicle_uuids;

      if(!res.length)
      {
          query = `SELECT V.uuid FROM 
  vehicle V WHERE V.vehicle_type_uuid = \'${escape(vehicle_type_uuid)}\'`;
          sql.query(
            query,
            (err, res) => {
            if (err) {
              console.log("error: ", err)
              result(null, err)
              return
              }

              vehicle_uuids = res;
            }
          )
      }
      else
      {
        vehicle_uuids = res;
      }

      sql.query(
        `SELECT R.vehicle_uuid ,R.start_date ,R.end_date FROM reservation R where R.is_pickedUp = false order by R.start_date`,
        (err, res) => {
          if (err) {
            console.log("error: ", err)
            result(null, err)
            return
          }

          console.log("res= " + JSON.stringify(res));
          var reservations_map = {};
          for (var i = 0; i < res.length; i++)
          {
            if (!reservations_map[res[i].vehicle_uuid])
            {
              reservations_map[res[i].vehicle_uuid] = [];
            }
            reservations_map[res[i].vehicle_uuid].push({start_date: res[i].start_date, end_date: res[i].end_date})
          }

          console.log(JSON.stringify(reservations_map));

          console.log(reservation_start_time);
          console.log(reservation_end_time);

          var available = [];
          for (var i = 0; i < vehicle_uuids.length; i++)
          {
            var vehicle_uuid = vehicle_uuids[i].uuid;
            var reservation = reservations_map[vehicle_uuid];
            if (reservation !== undefined)
            {
              // earlier than first reservation
              if (reservation_end_time <= reservation[0].start_date)
              {
                console.log("first");
                available.push(vehicle_uuid)
              }
              // later than last reservation
              else if (reservation_start_time >= reservation[reservation.length - 1].end_date)
              {
                console.log("last");
                available.push(vehicle_uuid)
              }
              // check all reservations
              else
              {
                for (var j = 0; j < reservation.length - 1; j++)
                {
                  if (reservation_start_time >= reservation[i].end_date && reservation_end_time <= reservation[i + 1].start_date)
                  {
                    console.log("between");
                    available.push(vehicle_uuid);
                    break;
                  }
                }
              }
            }
          }
          result(null, available);
          return;
        }
      )
    }
  )
}

 /* sql.query(
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
}*/

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
