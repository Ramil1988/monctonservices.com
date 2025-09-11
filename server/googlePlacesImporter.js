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
const serviceTypesCol = database.collection("serviceTypes");

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
  { id: "massage_therapist", name: "Massage therapists", query: "massage therapist" },
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

async function fetchTextSearchAllPages(query, pages = 1, capOverride) {
  const all = [];
  let next = null;
  let pageCount = 0;
  const hardCap = parseInt(capOverride ?? MAX_PLACES_RESULTS ?? "20", 10);
  do {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/textsearch/json"
    );
    url.searchParams.set("query", query);
    url.searchParams.set("region", "ca");
    url.searchParams.set("key", GOOGLE_MAPS_API_KEY);
    if (next) url.searchParams.set("pagetoken", next);
    const resp = await fetch(url.href);
    const data = await resp.json();
    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      throw new Error(`Google Places error: ${data.status}`);
    }
    if (Array.isArray(data.results)) all.push(...data.results);
    next = data.next_page_token || null;
    pageCount += 1;
    if (next && pageCount < pages) {
      await sleep(2000); // next_page_token delay
    }
    // respect hard cap
    if (Number.isFinite(hardCap) && hardCap > 0 && all.length >= hardCap) {
      break;
    }
  } while (next && pageCount < pages);

  if (Number.isFinite(hardCap) && hardCap > 0) return all.slice(0, hardCap);
  return all;
}

async function fetchPlaceDetails(placeId) {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json"
  );
  url.searchParams.set("place_id", placeId);
  url.searchParams.set(
    "fields",
    "formatted_phone_number,international_phone_number,website"
  );
  url.searchParams.set("key", GOOGLE_MAPS_API_KEY);
  const resp = await fetch(url.href);
  const data = await resp.json();
  if (data.status !== "OK") return {};
  const { formatted_phone_number, international_phone_number, website } =
    data.result || {};
  const phone = international_phone_number || formatted_phone_number || "";
  return { phoneNumber: phone, website: website || "" };
}

function humanizeType(type) {
  if (!type) return "";
  const s = type.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getAdminFromHeaders(req) {
  const h = req.headers || {};
  const auth = (h.authorization || "").trim();
  if (auth.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }
  return (h["x-admin-secret"] || "").toString().trim();
}

// POST /admin/import/:serviceType?city=Moncton,%20NB
const importCompaniesFromGoogle = async (req, res) => {
  try {
    const adminSecret = getAdminFromHeaders(req);
    if (ADMIN_SECRET && adminSecret !== ADMIN_SECRET) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }

    const { serviceType } = req.params;
    const city = req.query.city || IMPORT_CITY || "Moncton, NB";
    const onlyNew = req.query.onlyNew === "true";
    const refreshMissing = req.query.refreshMissing === "true";
    let mapping = TYPE_QUERY_MAP[serviceType];
    // Fallback: allow raw Google type id or free text query
    if (!mapping) {
      mapping = { query: serviceType.replace(/_/g, " "), display: humanizeType(serviceType) };
    }
    if (!mapping) {
      return res.status(400).json({
        status: 400,
        message: `Unsupported serviceType: ${serviceType}`,
      });
    }

    const query = `${mapping.query} in ${city}`;
    await client.connect();
    const pages = Math.min(parseInt(req.query.pages || "1", 10) || 1, 3);
    const maxResults = parseInt(req.query.max || MAX_PLACES_RESULTS || "20", 10) || 20;
    const results = await fetchTextSearchAllPages(query, pages, maxResults);

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
    let skippedExisting = 0;

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
      if (onlyNew && existingDoc && !refreshMissing) {
        skippedExisting += 1;
        continue;
      }
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
        source: "google",
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

      if (onlyNew && !refreshMissing) {
        try {
          const ins = await companies.insertOne(doc);
          if (ins.insertedId) inserted += 1;
        } catch (e) {
          if (e && e.code === 11000) skippedExisting += 1; // duplicate key
          else throw e;
        }
      } else {
        const result = await companies.updateOne(
          { _id: placeId },
          { $set: doc },
          { upsert: true }
        );
        if (result.upsertedCount) inserted += 1;
        else if (result.matchedCount) updated += 1;
      }
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
        skippedExisting,
        onlyNew,
        refreshMissing,
      },
    });
  } catch (error) {
    console.error("Import error:", error);
    return res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = { importCompaniesFromGoogle };
// Geocode an address using Google Geocoding API
module.exports.geocodeAddress = async (req, res) => {
  try {
    const address = (req.query.address || '').toString();
    if (!address) return res.status(400).json({ status: 400, message: 'address is required' });
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    const tryGeocode = async (addr, postal) => {
      const url = new URL(baseUrl);
      if (addr) url.searchParams.set('address', addr);
      url.searchParams.set('region', 'ca');
      url.searchParams.set('key', GOOGLE_MAPS_API_KEY);
      // Always hint country CA; add postal_code component when looks like Canadian postal code
      const comps = [];
      comps.push('country:CA');
      if (postal) comps.push(`postal_code:${postal}`);
      url.searchParams.set('components', comps.join('|'));
      const resp = await fetch(url.href);
      if (!resp.ok) {
        return { ok: false, status: resp.status, json: null };
      }
      const json = await resp.json();
      return { ok: true, status: 200, json };
    };

    // Detect Canadian postal code (e.g., E1A 9B2 or E1A9B2)
    const postalMatch = address.replace(/\s+/g, '').match(/^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/);
    const postal = postalMatch ? address.replace(/\s+/g, '').toUpperCase() : '';

    // First attempt: given address + country (and postal if detected)
    let resp1 = await tryGeocode(address, postal);
    let data = resp1.json || {};
    // Fallback attempt: if ZERO_RESULTS, append ", New Brunswick, Canada"
    if (!(data.status === 'OK' && Array.isArray(data.results) && data.results.length > 0)) {
      const augmented = /canada|nb|new brunswick/i.test(address) ? address : `${address}, New Brunswick, Canada`;
      resp1 = await tryGeocode(augmented, postal);
      data = resp1.json || {};
    }

    if (!(data.status === 'OK' && Array.isArray(data.results) && data.results.length > 0)) {
      // Fallback to OpenStreetMap Nominatim for light usage
      try {
        const nomiUrl = new URL('https://nominatim.openstreetmap.org/search');
        nomiUrl.searchParams.set('format', 'json');
        nomiUrl.searchParams.set('q', address);
        nomiUrl.searchParams.set('addressdetails', '1');
        nomiUrl.searchParams.set('countrycodes', 'ca');
        const respN = await fetch(nomiUrl.href, { headers: { 'User-Agent': 'MonctonServices/1.0 (+https://monctonservices.com)' } });
        const jsonN = await respN.json();
        if (Array.isArray(jsonN) && jsonN.length > 0) {
          const rN = jsonN[0];
          const compsN = rN.address || {};
          const cityN = compsN.city || compsN.town || compsN.village || compsN.hamlet || '';
          const provinceN = compsN.state || '';
          const countryN = compsN.country || '';
          const postalN = compsN.postcode || '';
          return res.status(200).json({ status: 200, data: {
            lat: parseFloat(rN.lat),
            lang: parseFloat(rN.lon),
            formatted: rN.display_name,
            city: cityN,
            province: provinceN,
            country: countryN,
            postal_code: postalN,
          }, message: data.status || 'FALLBACK_NOMINATIM' });
        }
      } catch (_) {}
      return res.status(200).json({ status: 200, data: null, message: data.status || 'NO_RESULTS' });
    }
    const r = data.results[0];
    const lat = r.geometry?.location?.lat;
    const lang = r.geometry?.location?.lng;
    const formatted = r.formatted_address;
    const comps = r.address_components || [];
    const pick = (type) => (comps.find(c => c.types.includes(type))?.long_name) || '';
    const city = pick('locality') || pick('postal_town') || pick('sublocality') || '';
    const province = pick('administrative_area_level_1');
    const country = pick('country');
    const postal_code = pick('postal_code');
    return res.status(200).json({ status: 200, data: { lat, lang, formatted, city, province, country, postal_code } });
  } catch (e) {
    console.error('geocode error', e);
    return res.status(500).json({ status: 500, message: e.message });
  }
};
module.exports.listPlaceTypes = (req, res) => {
  res.status(200).json({ status: 200, data: PLACE_TYPES });
};

// Discover place types for a city by sampling a few generic queries
// If onlyNew=true, only append types that don't already exist in DB
module.exports.discoverPlaceTypes = async (req, res) => {
  try {
    const { ADMIN_SECRET } = process.env;
    const adminSecret = getAdminFromHeaders(req);
    if (ADMIN_SECRET && adminSecret !== ADMIN_SECRET) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
    const city = req.query.city || IMPORT_CITY || "Moncton, NB";
    const onlyNew = req.query.onlyNew === "true";
    const seeds = (req.query.seeds || "restaurant,store,service,clinic,school,shop, massage therapist, spa, physiotherapist, chiropractor, beauty salon").split(",");
    const pages = Math.min(parseInt(req.query.pages || "1", 10) || 1, 3);
    const set = new Set();
    for (const seed of seeds) {
      const results = await fetchTextSearchAllPages(`${seed.trim()} in ${city}`, pages);
      for (const r of results) {
        if (Array.isArray(r.types)) {
          r.types.forEach((t) => {
            if (!t || t === "point_of_interest" || t === "establishment") return;
            set.add(t);
          });
        }
      }
    }
    const data = Array.from(set)
      .sort()
      .map((t) => ({ id: t, name: humanizeType(t), query: t.replace(/_/g, " ") }));
    // Persist to Mongo so clients can read from DB rather than Google
    try {
      await client.connect();
      const existingDoc = await serviceTypesCol.findOne({ _id: city });
      const existing = Array.isArray(existingDoc?.types) ? existingDoc.types : [];
      let toStore = data;
      let added = data.length;
      if (onlyNew && existing.length) {
        const existingIds = new Set(existing.map((t) => t.id));
        const newOnes = data.filter((t) => !existingIds.has(t.id));
        toStore = existing.concat(newOnes);
        added = newOnes.length;
      }
      await serviceTypesCol.updateOne(
        { _id: city },
        { $set: { types: toStore, updatedAt: new Date(), source: "google" } },
        { upsert: true }
      );
      return res.status(200).json({ status: 200, data: toStore, added, city, onlyNew });
    } catch (e) {
      console.error("persist serviceTypes error", e);
      return res.status(200).json({ status: 200, data, city, onlyNew, added: 0 });
    }
  } catch (e) {
    console.error("discoverPlaceTypes error", e);
    return res.status(500).json({ status: 500, message: e.message });
  }
};

// GET /service-types?city=Moncton,%20NB -> returns saved list from Mongo
module.exports.getServiceTypesForCity = async (req, res) => {
  try {
    const city = req.query.city || IMPORT_CITY || "Moncton, NB";
    await client.connect();
    const doc = await serviceTypesCol.findOne({ _id: city });
    const types = doc?.types || [];
    return res.status(200).json({ status: 200, city, data: types });
  } catch (e) {
    console.error("getServiceTypesForCity error", e);
    return res.status(500).json({ status: 500, message: e.message, data: [] });
  }
};
