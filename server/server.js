"use strict";
"use strict1";

const express = require("express");
const morgan = require("morgan");
var cors = require("cors");
const path = require("path");
const sm = require("sitemap");

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

let sitemap;

const getUrls = function () {
  return ["/", "/searchresults", "/about", "/guide", "/events"];
};

express()
  .use(morgan("tiny"))
  .use(express.static(path.join(__dirname, "public")))
  .use(express.json({ limit: "50mb" }))
  .use(express.urlencoded({ limit: "50mb", extended: true }))
  .use(cors())

  // Static route for sitemap
  .get("/sitemap.xml", function (req, res) {
    if (!sitemap) {
      const urls = getUrls();
      const sitemapUrls = urls.map((url) => ({ url }));
      sitemap = sm.createSitemap({
        hostname: "https://monctonservices-com.onrender.com",
        cacheTime: 600000,
        urls: sitemapUrls,
      });
    }
    res.header("Content-Type", "application/xml");
    res.send(sitemap.toString());
  })

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

  // All other routes are handled by React
  .get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
