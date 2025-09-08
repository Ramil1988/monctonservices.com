// Netlify Function wrapper for the existing Express app
const serverless = require("serverless-http");

// Import the Express app from the server
const app = require("../../server/server");

module.exports.handler = serverless(app);

