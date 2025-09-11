import styled from "styled-components";
import RatingTable from "./RatingTable";
import { Link } from "react-router-dom";

const MainRatingTable = () => {
  return (
    <div>
      <RatingTable />
      <AddButton to="/add-company" title="Add a new company">Add new company</AddButton>
    </div>
  );
};

export default MainRatingTable;

const AddButton = styled(Link)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 12px 16px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  font-size: 14px;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 10px 24px rgba(0,0,0,0.25);
  transition: transform 0.15s ease, box-shadow 0.2s ease;
  z-index: 1000;
  &:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(0,0,0,0.35); }
`;
