const sql = require("./db.js");


// constructor
const User = function(user) {
    this.uuid = user.uuid;
    this.first_name = user.first_name;
    this.last_name  = user.last_name;
    this.user_name  = user.user_name;
    this.driver_license_number = user.driver_license_number;
    this.license_state  = user.license_state;
    this.email_address = user.email_address;
    this.address = user.address;
    this.city  = user.city;
    this.state  = user.state;
    this.zip_code  = user.zip_code;
    this.credit_card_number  = user.credit_card_number;

  };

  User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  //find user by UUID

  User.getByUuid = (userUuid, result) => {
    sql.query(`SELECT * FROM user WHERE uuid = \'${escape(userUuid)}\'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // user with the uuid not found
        result({kind: "not_found"}, null);
    });
};

// Retrieve all membership details of a user by membership UUID

User.getMembershipByUserUuid = (userUuid, result) => {
  sql.query(`SELECT M.user_uuid, M.status, M.uuid, M.start_date, M.end_date FROM user U JOIN membership M ON U.uuid = M.user_uuid WHERE U.uuid = \'${escape(userUuid)}\'`, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }

      if (res.length) {
          console.log("found membership details of given user: ", res[0]);
          result(null, res[0]);
          return;
      }
      // member with the uuid not found
      result({kind: "not_found"}, null);
  });
};


 module.exports = User;