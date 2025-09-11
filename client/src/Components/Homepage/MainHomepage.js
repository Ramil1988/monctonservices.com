import { useEffect, useState } from "react";
import Homepage from "./Homepage";
import { googleServiceTypes, getServiceType } from "../serviceTypes"; // Import mappings and fallback builder

const ROOT_API = "/.netlify/functions/api";

const MainHomePage = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const loadUnion = async () => {
      // Always restrict to the tri-cities on the public homepage
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

        let unionList = Array.from(unionMap.values());
        // Augment with types inferred from existing companies in tri-cities (to include custom/manual types)
        try {
          const compResp = await fetch(`${ROOT_API}/allCompanies`);
          if (compResp.ok) {
            const compJson = await compResp.json();
            const tri = ["moncton", "dieppe", "riverview"];
            const comps = Array.isArray(compJson.data) ? compJson.data.filter((c) =>
              tri.some((t) => (c.address || "").toLowerCase().includes(t))
            ) : [];
            const existingIds = new Set(unionList.map((t) => t.id));
            const extrasMap = new Map();
            for (const c of comps) {
              const raw = (c.serviceType || "").trim();
              if (!raw) continue;
              const id = raw.toLowerCase().replace(/\s+/g, "_");
              if (existingIds.has(id)) continue;
              if (extrasMap.has(id)) continue;
              const st = getServiceType(id);
              extrasMap.set(id, { id, name: st.name || raw, icon: st.icon || null, color: st.color || null, hasIcon: !!st.icon });
            }
            if (extrasMap.size) {
              unionList = unionList.concat(Array.from(extrasMap.values()));
            }
          }
        } catch (_) {}
        // Manual overrides: always include Auto dealers and Massage therapist
        if (!unionList.some((t) => t.id === "car_dealer")) {
          const m = googleServiceTypes["car_dealer"];
          unionList.push({
            id: "car_dealer",
            name: m?.name || "Car dealer",
            icon: m?.icon || null,
            color: m?.color || null,
            hasIcon: !!m?.icon,
          });
        }
        if (!unionList.some((t) => t.id === "massage_therapist")) {
          const m = googleServiceTypes["massage_therapist"] || googleServiceTypes["massage therapist"];
          unionList.push({
            id: "massage_therapist",
            name: m?.name || "Massage therapist",
            icon: m?.icon || null,
            color: m?.color || null,
            hasIcon: !!m?.icon,
          });
        }
        unionList = unionList.sort((a, b) => a.name.localeCompare(b.name));
        setTypes(unionList);
        try {
          localStorage.setItem(`placeTypes:TriCitiesUnion`, JSON.stringify(unionList));
        } catch (_) {}
      } catch (_) {
        // fallback to cache: merge any available per-city caches
        const fallback = [];
        cities.forEach((city) => {
          try {
            const raw = localStorage.getItem(`placeTypes:${city}`);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return;
            parsed.forEach((t) => {
              const serviceTypeData = googleServiceTypes[t.id];
              fallback.push({
                ...t,
                icon: t.icon || serviceTypeData?.icon || null,
                color: t.color || serviceTypeData?.color || null,
              });
            });
          } catch (_) {}
        });
        if (fallback.length > 0) {
          const map = new Map();
          fallback.forEach((t) => {
            if (!map.has(t.id)) map.set(t.id, t);
          });
          let unionList = Array.from(map.values());
          // Also augment from cached companies if available
          try {
            const compRaw = localStorage.getItem(`allCompaniesCache`);
            const compList = compRaw ? JSON.parse(compRaw) : [];
            const tri = ["moncton", "dieppe", "riverview"];
            const comps = Array.isArray(compList) ? compList.filter((c) => tri.some((t) => (c.address || "").toLowerCase().includes(t))) : [];
            const existingIds = new Set(unionList.map((t) => t.id));
            const extrasMap = new Map();
            for (const c of comps) {
              const raw = (c.serviceType || "").trim();
              if (!raw) continue;
              const id = raw.toLowerCase().replace(/\s+/g, "_");
              if (existingIds.has(id)) continue;
              if (extrasMap.has(id)) continue;
              const st = getServiceType(id);
              extrasMap.set(id, { id, name: st.name || raw, icon: st.icon || null, color: st.color || null, hasIcon: !!st.icon });
            }
            if (extrasMap.size) {
              unionList = unionList.concat(Array.from(extrasMap.values()));
            }
          } catch (_) {}
          if (!unionList.some((t) => t.id === "car_dealer")) {
            const m = googleServiceTypes["car_dealer"];
            unionList.push({
              id: "car_dealer",
              name: m?.name || "Car dealer",
              icon: m?.icon || null,
              color: m?.color || null,
              hasIcon: !!m?.icon,
            });
          }
          if (!unionList.some((t) => t.id === "massage_therapist")) {
            const m = googleServiceTypes["massage_therapist"] || googleServiceTypes["massage therapist"];
            unionList.push({
              id: "massage_therapist",
              name: m?.name || "Massage therapist",
              icon: m?.icon || null,
              color: m?.color || null,
              hasIcon: !!m?.icon,
            });
          }
          unionList = unionList.sort((a, b) => a.name.localeCompare(b.name));
          setTypes(unionList);
        } else {
          // last resort
          try {
            const raw = localStorage.getItem(`placeTypes:TriCitiesUnion`);
            if (raw) {
              let cached = JSON.parse(raw) || [];
              if (!cached.some((t) => t.id === "car_dealer")) {
                const m = googleServiceTypes["car_dealer"];
                cached.push({
                  id: "car_dealer",
                  name: m?.name || "Car dealer",
                  icon: m?.icon || null,
                  color: m?.color || null,
                  hasIcon: !!m?.icon,
                });
              }
              if (!cached.some((t) => t.id === "massage_therapist")) {
                const m = googleServiceTypes["massage_therapist"] || googleServiceTypes["massage therapist"];
                cached.push({
                  id: "massage_therapist",
                  name: m?.name || "Massage therapist",
                  icon: m?.icon || null,
                  color: m?.color || null,
                  hasIcon: !!m?.icon,
                });
              }
              setTypes(cached.sort((a, b) => a.name.localeCompare(b.name)));
            }
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
