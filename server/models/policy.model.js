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


module.exports = Policy;
