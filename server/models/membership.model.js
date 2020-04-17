const sql = require("./db.js");

// constructor
const Membership = function(membership) {
    this.uuid = membership.uuid;
    this.user_uuid = membership.user_uuid;
    this.start_date = membership.start_date;
    this.end_date = membership.end_date;
    this.status = membership.status;
  };

  Membership.create = (newMembership, result) => {
    sql.query("INSERT INTO membership SET ?", newMembership, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Created membership: ", { id: res.insertId, ...newMembership });
      result(null, { id: res.insertId, ...newMembership });
    });
  };
  
  
  Membership.getAll = result => {
      sql.query("SELECT * FROM membership", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("membership: ", res);
        result(null, res);
      });
    };


  Membership.getByUuid = (membershipUuid, result) => {
    sql.query(`SELECT * FROM membership WHERE uuid = \'${escape(membershipUuid)}\'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found membership: ", res[0]);
            result(null, res[0]);
            return;
        }
        // member with the uuid not found
        result({kind: "not_found"}, null);
    });
};


Membership.patchByUuId = (membershipUuid, result) => {
  sql.query(`UPDATE rental_car_system.membership SET status = 'INACTIVE' WHERE uuid = \'${escape(membershipUuid)}\'`, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      } else 
        console.log("membership status updated", res);
        result(null,res);
  });
};

  
module.exports = Membership;