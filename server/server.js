const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


// home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EasyRide." });
});


require("./routes/user.routes.js")(app);
require("./routes/admin.routes.js")(app);


app.listen(3000, () => {
  console.log("Express Server is running on port 3000.");
});