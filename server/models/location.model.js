const sql = require("./db.js");
const moment = require('moment');
// constructor
const Location = function(location) {
    this.uuid = location.uuid;
    this.name = location.name;
    this.address = location.address;
    this.city = location.city;
    this.state = location.state;
    this.zip_code = location.zip_code;
    this.capacity = location.capacity;
    this.number_of_vehicles = location.number_of_vehicles;
};

Location.create = (newLocation, result) => {
    sql.query("INSERT INTO location SET ?", newLocation, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created location: ", { id: res.insertId, ...newLocation });
        result(null, {...newLocation });
    });
};

Location.getAll = result => {
    sql.query("SELECT * FROM location", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("locations: ", res);
        result(null, res);
    });
};

Location.getByUuid = (locationUuid, result) => {
    sql.query(`SELECT * FROM location WHERE uuid = \'${escape(locationUuid)}\'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found location: ", res[0]);
            result(null, res[0]);
            return;
        }
        // member with the uuid not found
        result({kind: "not_found"}, null);
    });
};

Location.findVehiclesByLocationUuid = (location_uuid, result) => {
    let current_date_time = moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss');
    let queryUnreservedVehicles = `SELECT v.uuid, v.location_uuid, v.vehicle_type_uuid, v.model, v.make FROM vehicle v WHERE
 v.location_uuid = \'${escape(location_uuid)}\'
    and v.uuid
    NOT IN (
        SELECT r.vehicle_uuid FROM reservation r
    WHERE \'${current_date_time}\' < r.end_date
)`;

    let queryReservedVehicles = `SELECT v.uuid, v.location_uuid, v.vehicle_type_uuid, v.model, v.make FROM vehicle v WHERE
 v.location_uuid = \'${escape(location_uuid)}\'
    and v.uuid
     IN (
        SELECT r.vehicle_uuid FROM reservation r
    WHERE \'${current_date_time}\' < r.end_date
)`;
    let unreservedVehicles = [];
    let reservedVehicles = [];
    sql.query(queryUnreservedVehicles, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            unreservedVehicles = [...res];
            console.log("queryUnreservedVehicles at location: ", res);

        }

        sql.query(queryReservedVehicles, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                reservedVehicles = [...res];
                console.log("queryReservedVehicles at location: ", res);
            }
            result(null,{unreserved_vehicles:unreservedVehicles, reserved_vehicles:reservedVehicles})

        });
    });
};


module.exports = Location;
