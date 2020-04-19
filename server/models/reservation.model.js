const sql = require("./db.js")

// constructor

const reservation = function(reservation) {
  this.uuid = reservation.uuid;
  this.vehicle_uuid = reservation.vehicle_uuid;
  this.user_uuid = reservation.user_uuid;
  this.start_date = reservation.start_date.substring(0, 10) + " " + reservation.start_date.substring(11, 19);//because it is ISO string it is fixed
  this.end_date = reservation.end_date.substring(0, 10) + " " + reservation.end_date.substring(11, 19);
  
  
};


reservation.create = (newReservation, result) => {
  
  sql.query("INSERT INTO reservation SET ?", newReservation, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      console.log(this.uuid)
      return
    }

    console.log("created Reservation ", { id: res.insertId, ...newReservation })
    result(null, { id: res.insertId, ...newReservation })
    var qry_str =
      "UPDATE vehicle SET is_reserved = true WHERE uuid = '" +
      escape(newReservation.vehicle_uuid) +
      "'"
    console.log("querystring = " + qry_str)
    sql.query(qry_str, (err, res) => {
      if (err) {
        console.log("error: ", err)

        return
      }
      console.log("vehicle table updated")
    })
  })
}



//cancel reservation by reservations uuid 1 hr prior to start time and update is_reserve field to false 
//in vehicle table else calculate the one hr price to charge on user and cancel reservation with update of 
//is_reserved field to false in vehicle table
reservation.removebyUuid = (uuid, result) => {
  var vehicle_uuid;
  var cancellation_fee;
  var sql_qry_string = "select vehicle_uuid from reservation where uuid = \'"+escape(uuid)+"'";
  console.log(sql_qry_string);
  sql.query(sql_qry_string,(err, res) => {
    if(err){
      console.log("error: ", err);
      
      return;
    }
    console.log("vehicle_uuid from reservation");
    console.log(res);
    console.log("vehicle_uuid = " + res[0].vehicle_uuid);
    vehicle_uuid = res[0].vehicle_uuid;
    console.log("vehicle uuid" + vehicle_uuid);
    var qry_str ="DELETE  FROM reservation WHERE uuid = \'" + escape(uuid) + "'"+"AND TIMEDIFF(start_date,NOW()) >= '01:00:00'";
    console.log("querystring" +qry_str);
    sql.query(qry_str, uuid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      console.log("reservation id",uuid);
      result(null, err);
      
      return;

    }

    if (res.affectedRows == 0) {
      // not found reservation with the id
      //result({ kind: "not_found" }, null);
      console.log("second case");
      //if cancellation of reservation is not successful ,then we need to charge one hour price to user
      var querystring = "select vt.price as cancellation_fee,vt.vehicle_type_uuid as vehicletype from vehicle_price_range vt join vehicle v on v.vehicle_type_uuid = vt.vehicle_type_uuid join reservation r on r.vehicle_uuid = v.uuid where (vt.min_hours=1 and vt.max_hours=5 ) and r.uuid = \'"+escape(uuid)+"'";
      console.log("query string" + querystring);
      sql.query(querystring,(err, res) => {
        if(err){
          console.log("error: ", err);
          
          return;
        }
        console.log("cancellation fee calculated");
        console.log("cancellation fee =" +res[0].cancellation_fee);
        //console.log("vehicle_type_uuid" + res[1].vehicletype);
        cancellation_fee = res[0].cancellation_fee;
        var query ="DELETE  FROM reservation WHERE uuid = \'"+escape(uuid)+"'";
        sql.query(query,(err, res) => {
          if(err){
            console.log("error: ", err);
            
            return;
          }
          console.log("reservation got cancelled with cancellation fee =" +cancellation_fee);
          console.log("res"+res);
          result(null,res);
          var qrystring = "UPDATE vehicle SET is_reserved = false WHERE uuid = \'"+ escape(vehicle_uuid) + "'";
          console.log("querystring = " + qrystring);
          sql.query(qrystring,(err, res) => {
          if(err){
          console.log("error: ", err);
        
          return;
      }
         
      console.log("vehicle table updated");
     
      
    });
    
  });

});
      return;
  }

    console.log("deleted reservation record with reservation id: ", uuid);
    result(null, res);
    console.log(res);
    var qrystring = "UPDATE vehicle SET is_reserved = false WHERE uuid = \'"+ escape(vehicle_uuid) + "'";
    console.log("querystring = " + qrystring);
    sql.query(qrystring,(err, res) => {
      if(err){
        console.log("error: ", err);
        
        return;
      }
      console.log("vehicle table updated");
     
      
    }
   );
  });

  });

  
};



module.exports = reservation;

