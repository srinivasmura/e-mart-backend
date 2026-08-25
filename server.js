const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://shopping-cart-tau-snowy.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("E-Mart Backend API is Running...");
});

const PORT = process.env.PORT || 5000;

// Vercel runs this file as a serverless function and calls the exported
// app directly per-request — it never actually runs app.listen(). Locally
// (and on Railway/Render, etc.) there's no VERCEL env var, so it starts
// a normal persistent server as before.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;