const express = require("express");
const morgan = require("morgan");

// Below are methods that are included in express(). We chain them for convenience.
// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan

express().use(morgan("dev")).use(express.json());
