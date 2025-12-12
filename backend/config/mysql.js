import mysql from "mysql2/promise";

// Create a pooled connection to MySQL. Uses environment variables for config.
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DB || "financeapp",
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
