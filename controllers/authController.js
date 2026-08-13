const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const connection = require("../config/database");

// ==========================
// REGISTER
// ==========================
const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
    } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        message:
          "First name, last name, email and password are required",
      });
    }

    // Check if email already exists
    const checkUserQuery = `
      SELECT id
      FROM users
      WHERE email = ?
    `;

    const [results] = await connection.query(
      checkUserQuery,
      [email]
    );

    if (results.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const insertUserQuery = `
      INSERT INTO users
      (first_name, last_name, email, password, phone)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await connection.query(
      insertUserQuery,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        phone || null,
      ]
    );

    return res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================
// LOGIN
// ==========================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by email
    const query = `
      SELECT id, first_name, last_name, email, password, phone, role
      FROM users
      WHERE email = ?
    `;

    const [results] = await connection.query(query, [email]);

    // User not found
    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = results[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
};