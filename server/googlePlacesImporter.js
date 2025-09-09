"use strict";

require("dotenv").config();
const { MongoClient } = require("mongodb");

const { MONGO_URI, GOOGLE_MAPS_API_KEY, IMPORT_CITY, ADMIN_SECRET } =
  process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const database = client.db("MonctonServicesCom");
const companies = database.collection("companies");

// Map internal serviceType ids to Google Places text queries and display names
const TYPE_QUERY_MAP = {
  hotels: { query: "hotels", display: "Hotels" },
  beautysalons: { query: "beauty salon", display: "Beauty salons" },
  autodealerships: { query: "car dealer", display: "Auto dealers" },
  autoservice: { query: "car repair", display: "Auto services" },
  petclinics: { query: "veterinary care", display: "Pet clinics" },
  dentalclinics: { query: "dentist", display: "Dental clinics" },
  banks: { query: "bank", display: "Banks" },
  insurance: { query: "insurance agency", display: "Insurance companies" },
  propertymanagement: { query: "apartment rental", display: "Rental appartments" },
  realestate: { query: "real estate agency", display: "Real Estate agencies" },
  travel: { query: "travel agency", display: "Travel agencies" },
  cleaning: { query: "cleaning service", display: "Cleaning service" },
  event: { query: "event planner", display: "Event agencies" },
  daycares: { query: "daycare", display: "Daycares, Afterschools, Summer camps" },
  drivingschool: { query: "driving school", display: "Driving schools" },
  tutoringcenters: { query: "tutoring center", display: "Tutoring centers" },
  computermobilerepair: { query: "computer repair", display: "Computer and mobile repairs" },
  taxis: { query: "taxi service", display: "Taxis" },
  plumbing: { query: "plumber", display: "Plumbing companies" },
  walkinClinics: { query: "walk-in clinic", display: "Walk in clinics" },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchTextSearchAllPages(query) {
  // Keep to a single page to avoid long function runtimes
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/textsearch/json"
  );
  url.searchParams.set("query", query);
  url.searchParams.set("region", "ca");
  url.searchParams.set("key", GOOGLE_MAPS_API_KEY);
  const resp = await fetch(url.href);
  const data = await resp.json();
  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw new Error(`Google Places error: ${data.status}`);
  }
  return Array.isArray(data.results) ? data.results : [];
}

async function fetchPlaceDetails(placeId) {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json"
  );
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "formatted_phone_number,website");
  url.searchParams.set("key", GOOGLE_MAPS_API_KEY);
  const resp = await fetch(url.href);
  const data = await resp.json();
  if (data.status !== "OK") return {};
  const { formatted_phone_number, website } = data.result || {};
  return { phoneNumber: formatted_phone_number || "", website: website || "" };
}

// POST /admin/import/:serviceType?city=Moncton,%20NB
const importCompaniesFromGoogle = async (req, res) => {
  try {
    const adminSecret = req.headers["x-admin-secret"];
    if (ADMIN_SECRET && adminSecret !== ADMIN_SECRET) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }

    const { serviceType } = req.params;
    const city = req.query.city || IMPORT_CITY || "Moncton, NB";

    const mapping = TYPE_QUERY_MAP[serviceType];
    if (!mapping) {
      return res.status(400).json({
        status: 400,
        message: `Unsupported serviceType: ${serviceType}`,
      });
    }

    const query = `${mapping.query} in ${city}`;
    await client.connect();
    const results = await fetchTextSearchAllPages(query);

    let inserted = 0;
    let updated = 0;
    let detailedLookups = 0;

    for (let i = 0; i < results.length; i++) {
      const p = results[i];
      const placeId = p.place_id;
      const name = p.name;
      const address = p.formatted_address || p.vicinity || "";
      const lat = p.geometry?.location?.lat;
      const lang = p.geometry?.location?.lng;
      const photoRef = Array.isArray(p.photos) && p.photos.length > 0 ? p.photos[0].photo_reference : null;
      const image = photoRef
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef}&key=${GOOGLE_MAPS_API_KEY}`
        : null;

      let phoneNumber = "";
      let website = "";
      if (detailedLookups < 10) {
        const details = await fetchPlaceDetails(placeId);
        phoneNumber = details.phoneNumber || "";
        website = details.website || "";
        detailedLookups += 1;
      }

      const doc = {
        _id: placeId,
        serviceType: mapping.display,
        name,
        address,
        phoneNumber,
        image: image || "",
        website,
        reviews: [],
        lat,
        lang,
      };

      const result = await companies.updateOne(
        { _id: placeId },
        { $set: doc },
        { upsert: true }
      );
      if (result.upsertedCount) inserted += 1;
      else if (result.matchedCount) updated += 1;
    }

    return res.status(200).json({
      status: 200,
      message: `Imported ${inserted} new and updated ${updated} companies for ${mapping.display}.`,
      data: { inserted, updated, totalFetched: results.length },
    });
  } catch (error) {
    console.error("Import error:", error);
    return res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = { importCompaniesFromGoogle };
