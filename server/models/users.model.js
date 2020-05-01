const sql = require("./db.js")

// constructor
const User = function(user) {
  this.uuid = user.uuid
  this.first_name = user.first_name
  this.last_name = user.last_name
  this.user_name = user.user_name
  this.driver_license_number = user.driver_license_number
  this.license_state = user.license_state
  this.email_address = user.email_address
  this.address = user.address
  this.city = user.city
  this.state = user.state
  this.zip_code = user.zip_code
  this.credit_card_number = user.credit_card_number
}

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("Created user: ", { id: res.insertId, ...newUser })
    result(null, { id: res.insertId, ...newUser })
  })
}

//find user by UUID

User.getByUuid = (userUuid, result) => {
  sql.query(
    `SELECT * FROM user WHERE uuid = \'${escape(userUuid)}\'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(err, null)
        return
      }

      if (res.length) {
        console.log("found user: ", res[0])
        result(null, res[0])
        return
      }
      // user with the uuid not found
      result({ kind: "not_found" }, null)
    }
  )
}

// Retrieve all membership details of a user by membership UUID

User.getMembershipByUserUuid = (userUuid, result) => {
  sql.query(
    `SELECT M.user_uuid, M.status, M.uuid, M.start_date, M.end_date FROM membership M JOIN user U ON U.uuid = M.user_uuid WHERE U.uuid = \'${escape(userUuid)}\'`,

    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(err, null)
        return
      }

      if (res.length) {
        console.log("found membership details of given user: ", res[0])
        result(null, res[0])
        return
      }
      // member with the uuid not found
      result({ kind: "not_found" }, null)
    }
  )
}


// Update membership by user uuid
User.putMembership = (userUuid, Membership, result) => {
  var current_end_date = new Date(Membership.end_date)
  var extended_date = new Date(
    current_end_date.setMonth(current_end_date.getMonth() + 6)
  )
  console.log("extended end date: " + extended_date)
  Membership.end_date = extended_date
  console.log("updated membership end date: " + Membership.end_date)

  sql.query(
    "UPDATE membership SET start_date = ?, end_date = ?, status = ? WHERE user_uuid = ?",
    [Membership.start_date, Membership.end_date, Membership.status, userUuid],
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        // not found records with the uuid
        result({ kind: "not_found" }, null)
        return
      }

      console.log("updated membership for the user: ", {
        id: userUuid,
        ...Membership
      })
      result(null, { id: userUuid, ...Membership })
    }
  )
}

// For user to see all unreserved vehicles available in the system

// User.getAllVehicles = (result) => {
//   sql.query(
//     "SELECT * FROM vehicle WHERE vehicle.is_reserved = false",
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err)
//         result(null, err)
//         return
//       }

//       console.log("vehicles: ", res)
//       result(null, res)
//     }
//   )
// }

// Update user profile with details like credit card, drivers license etc
User.putProfile = (userUuid, User, result) => {
  sql.query(
    "UPDATE user SET first_name = ?, last_name = ?, user_name = ?, driver_license_number = ?, license_state =?, email_address =?, address =?, credit_card_number =? WHERE uuid = ?",
    [
      User.first_name,
      User.last_name,
      User.user_name,
      User.driver_license_number,
      User.license_state,
      User.email_address,
      User.address,
      User.credit_card_number,
      userUuid
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        // not found records with the uuid
        result({ kind: "not_found" }, null)
        return
      }

      console.log("updated profile for the user with UUID: ", {
        id: userUuid,
        ...User
      })
      result(null, { id: userUuid, ...User })
    }
  )
}

module.exports = User
