// Vercel looks inside /api for serverless functions. This file just
// re-exports the existing Express app from server.js so all your
// existing routes (defined in server.js/routes) work unchanged.
const app = require("../server");

module.exports = app;
