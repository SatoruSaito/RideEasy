const sql = require("./db.js");

// constructor
const Policy = function(policy) {
    this.uuid = policy.uuid;
    this.price = policy.price;
    this.time_in_months = policy.time_in_months;
};

Policy.create = (newPolicy, result) => {
    sql.query("INSERT INTO policy SET ?", newPolicy, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created Policy: ", { id: res.insertId, ...newPolicy });
        result(null, {...newPolicy });
    });
};

Policy.getAll = result => {
    sql.query("SELECT * FROM policy", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("policies: ", res);
        result(null, res);
    });
};


module.exports = Policy;
