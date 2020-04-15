  
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')()
const { server } = require('../config');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pino)
app.use(bodyParser.json());


// home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EasyRide." });
});


/*require("./routes/user.routes.js")(app);
require("./routes/admin.routes.js")(app);*/

require("./routes/reservation.routes.js")(app);
require("./routes/vehicle.routes.js")(app);
require("./routes/membership.routes.js")(app);
require("./routes/vehicle_price_range.routes.js")(app);


app.listen(server, () => {
  console.log("Express Server is running on port " + server);
});


