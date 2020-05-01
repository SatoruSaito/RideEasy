
module.exports = app => {
    const Reservation = require("../controllers/reservation.controller.js");

    // Create a new reservation
    app.post("/reservations", Reservation.create);
    console.log("here in routes");

    //cancel reservation by  uuid
    app.delete("/reservations/:uuid",Reservation.delete);
    //get reservation by user uuid
   // app.get("/reservations", Reservation.findByUuid);

    //return vehicle
    app.put("/reservations/:reservation_uuid/return_vehicle",Reservation.returnVehicle);

}
