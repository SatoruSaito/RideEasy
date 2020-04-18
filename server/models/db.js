const mysql = require("mysql")
const dbConfig = require("../config/db.config.js")

// Create a connection to the database
const db = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
})

// open the MySQL connection
db.connect((error) => {
  if (error) throw error
  console.log("Successfully connected to the database.")
})

module.exports = db
