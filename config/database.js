const mysql = require("mysql2/promise");

const isProduction = process.env.NODE_ENV === "production";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,

  ...(isProduction && process.env.DB_SSL === "true"
    ? {
      ssl: {
        rejectUnauthorized: false,
      },
    }
    : {}),
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();

    console.log("✅ MySQL Connected Successfully");

    connection.release();
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
  }
}

testConnection();

module.exports = pool;






// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("❌ MySQL Connection Failed:", err.message);
//     return;
//   }

//   console.log("✅ MySQL Connected Successfully");

// });

// module.exports = connection;