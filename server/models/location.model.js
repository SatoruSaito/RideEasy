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


module.exports = Location;