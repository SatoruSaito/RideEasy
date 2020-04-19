// config.js
const dotenv = require("dotenv")
dotenv.config()
module.exports = {
  port: process.env.PORT,
  server: process.env.SERVER_PORT || 3000,
}
