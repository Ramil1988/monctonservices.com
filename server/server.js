"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const { createCompany, createReview, createUser } = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints

  .post("/company", createCompany)
  .post("/company/review/:companyId", createReview)
  .post("/users/login", createUser)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
