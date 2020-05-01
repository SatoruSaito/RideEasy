const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')()
const { server } = require('../config');
var cors = require('cors');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pino)
app.use(bodyParser.json());
app.use(cors());


// home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EasyRide." });
});

require("./routes/reservation.routes.js")(app);
require("./routes/vehicle.routes.js")(app);
require("./routes/membership.routes.js")(app);
require("./routes/vehicle_price_range.routes.js")(app);
require("./routes/location.routes.js")(app);
require("./routes/users.routes.js")(app);
require("./routes/vehicle_type.routes.js")(app);
require("./routes/policy.routes.js")(app);


app.listen(server, () => {
  console.log("Express Server is running on port " + server);
});
