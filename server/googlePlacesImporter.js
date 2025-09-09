"use strict";

require("dotenv").config();
const { MongoClient } = require("mongodb");

const { MONGO_URI, GOOGLE_MAPS_API_KEY, IMPORT_CITY, ADMIN_SECRET, MAX_PLACES_RESULTS, MAX_DETAILS_LOOKUPS } =
  process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const database = client.db("MonctonServicesCom");
const companies = database.collection("companies");

// Canonical list of supported types (subset of Google Places taxonomy) used by the importer and exposed to the UI
const PLACE_TYPES = [
  { id: "hotels", name: "Hotels", query: "hotels" },
  { id: "restaurant", name: "Restaurants", query: "restaurant" },
  { id: "cafe", name: "Cafes", query: "cafe" },
  { id: "bar", name: "Bars", query: "bar" },
  { id: "grocery", name: "Grocery stores", query: "grocery store" },
  { id: "supermarket", name: "Supermarkets", query: "supermarket" },
  { id: "pharmacy", name: "Pharmacies", query: "pharmacy" },
  { id: "banks", name: "Banks", query: "bank" },
  { id: "insurance", name: "Insurance companies", query: "insurance agency" },
  { id: "autodealerships", name: "Auto dealers", query: "car dealer" },
  { id: "autoservice", name: "Auto services", query: "car repair" },
  { id: "gas", name: "Gas stations", query: "gas station" },
  { id: "petclinics", name: "Pet clinics", query: "veterinary care" },
  { id: "dentalclinics", name: "Dental clinics", query: "dentist" },
  { id: "doctor", name: "Doctors", query: "doctor" },
  { id: "walkinClinics", name: "Walk in clinics", query: "walk-in clinic" },
  { id: "plumbing", name: "Plumbing companies", query: "plumber" },
  { id: "realestate", name: "Real Estate agencies", query: "real estate agency" },
  { id: "propertymanagement", name: "Rental appartments", query: "apartment rental" },
  { id: "travel", name: "Travel agencies", query: "travel agency" },
  { id: "event", name: "Event agencies", query: "event planner" },
  { id: "daycares", name: "Daycares, Afterschools, Summer camps", query: "daycare" },
  { id: "drivingschool", name: "Driving schools", query: "driving school" },
  { id: "tutoringcenters", name: "Tutoring centers", query: "tutoring center" },
  { id: "computermobilerepair", name: "Computer and mobile repairs", query: "computer repair" },
  { id: "taxis", name: "Taxis", query: "taxi service" },
  { id: "gym", name: "Gyms", query: "gym" },
  { id: "hardware", name: "Hardware stores", query: "hardware store" },
  { id: "homegoods", name: "Home goods stores", query: "home goods store" },
  { id: "clothing", name: "Clothing stores", query: "clothing store" },
  { id: "electronics", name: "Electronics stores", query: "electronics store" },
  { id: "bakery", name: "Bakeries", query: "bakery" }
];

// Build a lookup map from the canonical list
const TYPE_QUERY_MAP = PLACE_TYPES.reduce((acc, t) => {
  acc[t.id] = { query: t.query, display: t.name };
  return acc;
}, {});

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
  let results = Array.isArray(data.results) ? data.results : [];
  const cap = parseInt(MAX_PLACES_RESULTS || "20", 10);
  if (Number.isFinite(cap) && cap > 0) results = results.slice(0, cap);
  return results;
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

    // Prefetch existing docs to avoid unnecessary details lookups
    const existing = await companies
      .find(
        { _id: { $in: results.map((r) => r.place_id) } },
        { projection: { _id: 1, phoneNumber: 1, website: 1 } }
      )
      .toArray();
    const existingMap = new Map(existing.map((d) => [d._id, d]));

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
      const existingDoc = existingMap.get(placeId);
      const detailsCap = parseInt(MAX_DETAILS_LOOKUPS || "10", 10);
      const needsDetails = !existingDoc || !(existingDoc.phoneNumber || existingDoc.website);
      if (needsDetails && detailedLookups < detailsCap) {
        const details = await fetchPlaceDetails(placeId);
        phoneNumber = details.phoneNumber || "";
        website = details.website || "";
        detailedLookups += 1;
      } else if (existingDoc) {
        phoneNumber = existingDoc.phoneNumber || "";
        website = existingDoc.website || "";
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

      if (req.query.dryRun === "true") continue; // Skip writes for dry runs

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
      data: {
        inserted,
        updated,
        totalFetched: results.length,
        detailsLookups: detailedLookups,
        dryRun: req.query.dryRun === "true",
      },
    });
  } catch (error) {
    console.error("Import error:", error);
    return res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = { importCompaniesFromGoogle };
module.exports.listPlaceTypes = (req, res) => {
  res.status(200).json({ status: 200, data: PLACE_TYPES });
};
