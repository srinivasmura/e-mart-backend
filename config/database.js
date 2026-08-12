const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // Enable SSL only when DB_SSL=true
  ...(process.env.DB_SSL === "true"
    ? {
      ssl: {
        minVersion: "TLSv1.2",
      },
    }
    : {}),
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Database Connection Failed:", err.message);
    return;
  }

  console.log("✅ Database Connected Successfully");
});

module.exports = connection;







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