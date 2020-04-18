const sql = require("./db.js");

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


module.exports = Location;