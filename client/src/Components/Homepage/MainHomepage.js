import { useEffect, useState } from "react";
import Homepage from "./Homepage";
import { googleServiceTypes } from "../serviceTypes"; // Import the Google service types

const ROOT_API = "/.netlify/functions/api";

const MainHomePage = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const load = async () => {
      const city = localStorage.getItem("placeTypesCity") || "Moncton, NB";
      try {
        const resp = await fetch(
          `${ROOT_API}/service-types?city=${encodeURIComponent(city)}`
        );
        const data = await resp.json();
        const arr = Array.isArray(data.data) ? data.data : [];

        console.log("Raw API data:", arr); // Debug: see what Google API actually returns

        // Map the Google API data with our icon mappings
        const typesWithIcons = arr.map((t) => {
          console.log("Processing service type:", t); // Debug: see the full object structure

          // Try multiple ways to match the service type
          let serviceTypeData = null;

          // 1. Try exact ID match
          serviceTypeData = googleServiceTypes[t.id];

          // 2. Try name-based matching (convert spaces to underscores and lowercase)
          if (!serviceTypeData && t.name) {
            const nameKey = t.name.toLowerCase().replace(/\s+/g, "_");
            serviceTypeData = googleServiceTypes[nameKey];
            console.log(
              "Trying name-based match:",
              nameKey,
              "Found:",
              !!serviceTypeData
            );
          }

          // 3. Try direct name match
          if (!serviceTypeData && t.name) {
            const matchingKey = Object.keys(googleServiceTypes).find(
              (key) =>
                googleServiceTypes[key].name.toLowerCase() ===
                t.name.toLowerCase()
            );
            if (matchingKey) {
              serviceTypeData = googleServiceTypes[matchingKey];
              console.log("Found by name match:", matchingKey, t.name);
            }
          }

          console.log(
            "Final serviceTypeData for",
            t.name,
            ":",
            serviceTypeData
          );

          if (serviceTypeData) {
            return {
              id: t.id,
              name: t.name,
              icon: serviceTypeData.icon,
              color: serviceTypeData.color,
              hasIcon: true,
            };
          }

          // Fallback for unmapped service types
          console.log("No mapping found for:", t.id, t.name);
          return {
            id: t.id,
            name: t.name,
            icon: null,
            color: null,
            hasIcon: false,
          };
        });

        console.log("Final types with icons:", typesWithIcons); // Debug log

        setTypes(typesWithIcons);

        // cache locally for offline/SSR gaps
        localStorage.setItem(
          `placeTypes:${city}`,
          JSON.stringify(typesWithIcons)
        );
      } catch (_) {
        // fallback to cache
        try {
          const raw = localStorage.getItem(`placeTypes:${city}`);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              // Ensure cached data also has icons (in case we added new mappings)
              const parsedWithIcons = parsed.map((t) => {
                const serviceTypeData = googleServiceTypes[t.id];
                return {
                  ...t,
                  icon: t.icon || serviceTypeData?.icon || null,
                  color: t.color || serviceTypeData?.color || null,
                };
              });
              setTypes(parsedWithIcons);
            }
          }
        } catch (_) {}
      }
    };
    load();
  }, []);

  return (
    <div>
      <Homepage serviceTypes={types} />
    </div>
  );
};

export default MainHomePage;
