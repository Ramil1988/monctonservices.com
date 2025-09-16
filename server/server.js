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

const google = require("./googlePlacesImporter");

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
app.post("/admin/import/:serviceType", google.importCompaniesFromGoogle);
app.get("/admin/place-types", google.listPlaceTypes);
app.get("/admin/discover-place-types", google.discoverPlaceTypes);
app.get("/service-types", google.getServiceTypesForCity);
// Register geocode route only if available to avoid undefined handler in some builds
if (typeof google.geocodeAddress === "function") {
  app.get("/geocode", google.geocodeAddress);
}

// Admin: purge companies (non-google or all)
app.post("/admin/companies/purge", async (req, res) => {
  try {
    const { ADMIN_SECRET, MONGO_URI } = process.env;
    const adminSecret = req.headers["x-admin-secret"];
    if (ADMIN_SECRET && adminSecret !== ADMIN_SECRET) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
    const { mode } = req.query; // 'non-google' | 'all'
    if (!mode || !["non-google", "all"].includes(mode)) {
      return res.status(400).json({ status: 400, message: "Invalid mode" });
    }
    const { MongoClient } = require("mongodb");
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 1,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    await client.connect();
    const db = client.db("MonctonServicesCom");
    const companies = db.collection("companies");
    let filter = {};
    if (mode === "non-google") {
      filter = { $or: [ { source: { $exists: false } }, { source: { $ne: "google" } } ] };
    }
    const result = await companies.deleteMany(filter);
    await client.close();
    return res.status(200).json({ status: 200, message: "Purge complete", data: { deleted: result.deletedCount, mode } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: e.message });
  }
});

// Export the Express app for serverless usage. Only listen when run directly.
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
}
