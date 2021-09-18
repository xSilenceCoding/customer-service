const mysql = require('mysql2')
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  server: dbConfig.SERVER,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) {
	  console.log(error);
  } else {
  console.log("Successfully connected to the database.");
  }
});

module.exports = connection;