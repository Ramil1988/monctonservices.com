"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const {
  createCompany,
  createReview,
  createUser,
  getAllCompanies,
  getCompaniesByServiceType,
  getCompanyById,
  getAllReviews,
  getReviewById,
  getAllUsers,
  getUserById,
  updateCompany,
  updateUser,
  updateReview,
  deleteReview,
  deleteCompany,
  deleteUser,
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // POST REST endpoints
  .post("/company", createCompany)
  .post("/company/review/:companyId", createReview)
  .post("/users/login", createUser)

  // GET REST endpoints
  .get("/allCompanies", getAllCompanies)
  .get("/companies/:serviceType", getCompaniesByServiceType)
  .get("/company/:id", getCompanyById)
  .get("/allReviews", getAllReviews)
  .get("/review/:id", getReviewById)
  .get("/allUsers", getAllUsers)
  .get("/user/:id", getUserById)

  // PATCH REST endpoints
  .patch("/company/:id", updateCompany)
  .patch("/user/:id", updateUser)
  .patch("/review/:id", updateReview)

  //DELETE REST endpoints
  .delete("/review/:id", deleteReview)
  .delete("/company/:id", deleteCompany)
  .delete("/user/:id", deleteUser)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
