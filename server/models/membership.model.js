const sql = require("./db.js")
const moment = require('moment');
// constructor
const Membership = function(membership) {
  this.uuid = membership.uuid
  this.user_uuid = membership.user_uuid
  this.start_date = moment.utc(membership.start_date).format('YYYY-MM-DD HH:mm:ss')
  this.end_date = moment.utc(membership.end_date).format('YYYY-MM-DD HH:mm:ss')
  this.status = membership.status
}

Membership.create = (newMembership, result) => {
  sql.query("INSERT INTO membership SET ?", newMembership, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("Created membership: ", { id: res.insertId, ...newMembership })
    result(null, { id: res.insertId, ...newMembership })
  })
}

// For the admin to see all members, if user uuid is provided show details for that user only

Membership.getAllByUserUuid = (userUuid, result) => {
  sql.query(
    `SELECT * FROM membership WHERE user_uuid = \'${escape(userUuid)}\'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }

      if (res.length) {
        console.log("membership details for the given user: ", res)
        result(null, res)
        return
      } else {
        sql.query(`SELECT * FROM membership`, (err, res) => {
          if (err) {
            console.log("error: ", err)
            result(null, err)
            return
          }

          console.log("membership details for all users: ", res)
          result(null, res)
        })
      }
    }
  )
}

// For the admin to terminate membership

Membership.patchByUuId = (membershipUuid, result) => {
  sql.query(
    `UPDATE rental_car_system.membership SET status = 'INACTIVE' WHERE uuid = \'${escape(
      membershipUuid
    )}\'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(err, null)
        return
      } else console.log("membership status updated", res)
      result(null, res)
    }
  )
}

module.exports = Membership
