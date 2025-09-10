import RatingTable from "./RatingTable";
import AddCompanyPopup from "./AddCompanyPopup";
import SuggestionsPopup from "../Homepage/SuggestionsPopup";

const MainRatingTable = () => {
  return (
    <div>
      <RatingTable />
      <AddCompanyPopup />
      <SuggestionsPopup />
    </div>
  );
};

export default MainRatingTable;
