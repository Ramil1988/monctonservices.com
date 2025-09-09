import { useEffect, useState } from "react";
import Homepage from "./Homepage";
import SuggestionsPopup from "./SuggestionsPopup";

const ROOT_API = "/.netlify/functions/api";

const MainHomePage = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const load = async () => {
      const city = localStorage.getItem("placeTypesCity") || "Moncton, NB";
      try {
        const resp = await fetch(`${ROOT_API}/service-types?city=${encodeURIComponent(city)}`);
        const data = await resp.json();
        const arr = Array.isArray(data.data) ? data.data : [];
        setTypes(arr.map((t) => ({ id: t.id, name: t.name })));
        // cache locally for offline/SSR gaps
        localStorage.setItem(`placeTypes:${city}`, JSON.stringify(arr));
      } catch (_) {
        // fallback to cache
        try {
          const raw = localStorage.getItem(`placeTypes:${city}`);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) setTypes(parsed.map((t) => ({ id: t.id, name: t.name })));
          }
        } catch (_) {}
      }
    };
    load();
  }, []);

  return (
    <div>
      <Homepage serviceTypes={types} />
      <SuggestionsPopup />
    </div>
  );
};

export default MainHomePage;
