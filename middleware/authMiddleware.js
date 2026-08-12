const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // Check Authorization header
    if (!authHeader) {
      return res.status(401).json({
        message: "Access token is required",
      });
    }

    // Expected format:
    // Authorization: Bearer <token>

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store decoded user information in request
    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);

    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authenticateToken;