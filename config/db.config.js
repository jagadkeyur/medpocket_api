require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 20, // You can adjust this based on traffic
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  multipleStatements: true, // Optional: only if you need to run multiple SQL statements at once
});

// Optional: Test the connection on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("MySQL pool connected successfully.");
    connection.release(); // Release back to pool
  }
});

module.exports = pool;
