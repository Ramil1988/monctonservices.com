import { useEffect, useState } from "react";
import Homepage from "./Homepage";
import SuggestionsPopup from "./SuggestionsPopup";
import { serviceTypes } from "../serviceTypes"; // Import the serviceTypes

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

        // Map the API data with the local serviceTypes to get the images
        const typesWithImages = arr.map((t) => {
          const localServiceType = serviceTypes[t.id];
          return {
            id: t.id,
            name: t.name,
            imageSrc: localServiceType?.imageSrc || null, // Add the image source
          };
        });

        setTypes(typesWithImages);

        // cache locally for offline/SSR gaps
        localStorage.setItem(
          `placeTypes:${city}`,
          JSON.stringify(typesWithImages)
        );
      } catch (_) {
        // fallback to cache
        try {
          const raw = localStorage.getItem(`placeTypes:${city}`);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              // Ensure cached data also has images
              const parsedWithImages = parsed.map((t) => {
                const localServiceType = serviceTypes[t.id];
                return {
                  ...t,
                  imageSrc: t.imageSrc || localServiceType?.imageSrc || null,
                };
              });
              setTypes(parsedWithImages);
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
      <SuggestionsPopup />
    </div>
  );
};

export default MainHomePage;
