  
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')()
const { server } = require('../config');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pino)


// home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EasyRide." });
});


require("./routes/user.routes.js")(app);
require("./routes/admin.routes.js")(app);


app.listen(server, () => {
  console.log("Express Server is running on port 3000.");
});
