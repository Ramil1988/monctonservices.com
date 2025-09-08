// Netlify Function wrapper for the existing Express app
const serverless = require("serverless-http");
const express = require("express");

// Import the Express app from the server
const app = require("../../server/server");

// Mount the existing app under the Netlify Functions base path
const server = express();
server.use("/.netlify/functions/api", app);

module.exports.handler = serverless(server);
