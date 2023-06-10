import Homepage from "./Homepage";
import SuggestionsPopup from "./SuggestionsPopup";
import { serviceTypes } from "../serviceTypes";
import { thingsToDo } from "../ThingsToDo";

const MainHomePage = () => {
  return (
    <div>
      <Homepage serviceTypes={serviceTypes} thingsToDo={thingsToDo} />
      <SuggestionsPopup />
    </div>
  );
};

export default MainHomePage;
