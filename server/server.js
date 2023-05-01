"use strict";

const express = require("express");
const morgan = require("morgan");
var cors = require("cors");

const PORT = 4000;

const {
  createCompany,
  createUser,
  createReview,
  createFavorite,
  getAllCompanies,
  getCompaniesByServiceType,
  getCompanyById,
  getAllReviews,
  getReviewById,
  getAllUsers,
  getUserById,
  getUserReviews,
  getUserFavorites,
  updateCompany,
  updateUser,
  updateReview,
  deleteCompany,
  deleteUser,
  deleteAllReviewsForCompany,
  deleteReview,
  removeFavorite,
  deleteComment,
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json({ limit: "50mb" }))
  .use(express.urlencoded({ limit: "50mb", extended: true }))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .use(express.static("public"))
  .use(cors())

  // POST REST endpoints
  .post("/company", createCompany)
  .post("/company/review/:companyId", createReview)
  .post("/user/login", createUser)
  .post("/user/favorite/:userId", createFavorite)
  .post("/user/remove-favorite/:userId", removeFavorite)

  // GET REST endpoints
  .get("/allCompanies", getAllCompanies)
  .get("/companies/:serviceType", getCompaniesByServiceType)
  .get("/company/:id", getCompanyById)
  .get("/allReviews", getAllReviews)
  .get("/review/:id", getReviewById)
  .get("/allUsers", getAllUsers)
  .get("/user/:id", getUserById)
  .get("/user/reviews/:id", getUserReviews)
  .get("/user/favorites/:userId", getUserFavorites)

  // PATCH REST endpoints
  .patch("/company/:id", updateCompany)
  .patch("/user/:id", updateUser)
  .patch("/review/:id", updateReview)

  //DELETE REST endpoints

  .delete("/company/:id", deleteCompany)
  .delete("/user/:id", deleteUser)
  .delete("/allReviews/company/:id", deleteAllReviewsForCompany)
  .delete("/review/:id", deleteReview)
  .delete("/review/:reviewId/comments/:commentDate", deleteComment)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
