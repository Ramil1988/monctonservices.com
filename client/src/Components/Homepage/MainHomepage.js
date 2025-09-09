import Homepage from "./Homepage";
import SuggestionsPopup from "./SuggestionsPopup";

const MainHomePage = () => {
  let types = [];
  try {
    const city = localStorage.getItem("placeTypesCity") || "Moncton, NB";
    const raw = localStorage.getItem(`placeTypes:${city}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        types = parsed.map((t) => ({ id: t.id, name: t.name }));
      }
    }
  } catch (_) {}

  return (
    <div>
      <Homepage serviceTypes={types} />
      <SuggestionsPopup />
    </div>
  );
};

export default MainHomePage;
