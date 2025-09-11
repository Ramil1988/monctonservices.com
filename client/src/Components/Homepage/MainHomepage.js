import { useEffect, useState } from "react";
import Homepage from "./Homepage";
import { googleServiceTypes } from "../serviceTypes"; // Import the Google service types

const ROOT_API = "/.netlify/functions/api";

const MainHomePage = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const loadUnion = async () => {
      const cities = ["Moncton, NB", "Dieppe, NB", "Riverview, NB"];

      // mapper from a raw Google type to our enriched type
      const mapWithIcons = (t) => {
        let serviceTypeData = googleServiceTypes[t.id];
        if (!serviceTypeData && t.name) {
          const nameKey = t.name.toLowerCase().replace(/\s+/g, "_");
          serviceTypeData = googleServiceTypes[nameKey];
        }
        if (!serviceTypeData && t.name) {
          const matchingKey = Object.keys(googleServiceTypes).find(
            (key) => googleServiceTypes[key].name.toLowerCase() === t.name.toLowerCase()
          );
          if (matchingKey) serviceTypeData = googleServiceTypes[matchingKey];
        }
        if (serviceTypeData) {
          return {
            id: t.id,
            name: t.name,
            icon: serviceTypeData.icon,
            color: serviceTypeData.color,
            hasIcon: true,
          };
        }
        return { id: t.id, name: t.name, icon: null, color: null, hasIcon: false };
      };

      try {
        // try live fetch for all cities
        const results = await Promise.all(
          cities.map((city) =>
            fetch(`${ROOT_API}/service-types?city=${encodeURIComponent(city)}`)
              .then((r) => r.json())
              .then((d) => ({ city, list: Array.isArray(d.data) ? d.data : [] }))
          )
        );

        const unionMap = new Map();
        results.forEach(({ city, list }) => {
          const mapped = list.map(mapWithIcons);
          // cache per-city for Admin use and offline fallback
          try {
            localStorage.setItem(`placeTypes:${city}`, JSON.stringify(mapped));
          } catch (_) {}
          mapped.forEach((t) => {
            if (!unionMap.has(t.id)) unionMap.set(t.id, t);
          });
        });

        const unionList = Array.from(unionMap.values()).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setTypes(unionList);
        try {
          localStorage.setItem(`placeTypes:TriCitiesUnion`, JSON.stringify(unionList));
        } catch (_) {}
      } catch (_) {
        // fallback to cache: merge any available per-city caches
        const unionMap = new Map();
        cities.forEach((city) => {
          try {
            const raw = localStorage.getItem(`placeTypes:${city}`);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return;
            parsed.forEach((t) => {
              const serviceTypeData = googleServiceTypes[t.id];
              const enriched = {
                ...t,
                icon: t.icon || serviceTypeData?.icon || null,
                color: t.color || serviceTypeData?.color || null,
              };
              if (!unionMap.has(enriched.id)) unionMap.set(enriched.id, enriched);
            });
          } catch (_) {}
        });
        if (unionMap.size > 0) {
          const unionList = Array.from(unionMap.values()).sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setTypes(unionList);
        } else {
          // last resort
          try {
            const raw = localStorage.getItem(`placeTypes:TriCitiesUnion`);
            if (raw) setTypes(JSON.parse(raw));
          } catch (_) {}
        }
      }
    };
    loadUnion();
  }, []);

  return (
    <div>
      <Homepage serviceTypes={types} />
    </div>
  );
};

export default MainHomePage;
