"use strict";

const express = require("express");
const morgan = require("morgan");
var cors = require("cors");
const path = require("path");

const PORT = 3000;

const {
  createCompany,
  createUser,
  createReview,
  createFavorite,
  createEvent,
  getAllCompanies,
  getCompaniesByServiceType,
  getCompanyById,
  getAllReviews,
  getReviewById,
  getAllUsers,
  getUserById,
  getUserReviews,
  getUserFavorites,
  getAllEvents,
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

const {
  createNewUser,
  getAllUsers1,
  getUserById1,
  deleteAllUsers,
  deleteUserById,
} = require("./handlers1");

const { importCompaniesFromGoogle, listPlaceTypes } = require("./googlePlacesImporter");

const app = express()
  .use(morgan("tiny"))
  .use(express.static(path.join(__dirname, "public")))
  .use(express.json({ limit: "50mb" }))
  .use(express.urlencoded({ limit: "50mb", extended: true }))
  .use(cors())

  // POST REST endpoints
  .post("/company", createCompany)
  .post("/company/review/:companyId", createReview)
  .post("/user/login", createUser)
  .post("/user/favorite/:userId", createFavorite)
  .post("/user/remove-favorite/:userId", removeFavorite)
  .post("/event", createEvent)

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
  .get("/allEvents", getAllEvents)

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

  // REST endpoints CV generator
  .post("/user", createNewUser)
  .get("/allUsers1", getAllUsers1)
  .get("/user1/:id", getUserById1)
  .delete("/allUsers", deleteAllUsers)
  .delete("/user1/:id", deleteUserById);

// Admin: import companies via Google Places (protected by ADMIN_SECRET)
// Example: POST /.netlify/functions/api/admin/import/hotels?city=Moncton,%20NB
app.post("/admin/import/:serviceType", importCompaniesFromGoogle);
app.get("/admin/place-types", listPlaceTypes);

// Export the Express app for serverless usage. Only listen when run directly.
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
}
