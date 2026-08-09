const db = require("../config/database");

const User = {
  findByEmail(email, callback) {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      callback
    );
  },

  create(user, callback) {
    const sql = `
      INSERT INTO users
      (first_name, last_name, email, password, phone)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.phone,
      ],
      callback
    );
  },
};

module.exports = User;