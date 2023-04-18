import styled from "styled-components";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ListOfItems from "./ListOfItems";
import PopularServices from "./PopularServices";
import Reviews from "./Reviews";
import MonctonImage from "../Pictures/Moncton.jpg";

const Homepage = (props) => {
  const allItems = Object.values(props.items);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      const response = await fetch("/allReviews");
      const data = await response.json();
      setReviews(data.data);
    } catch (error) {
      console.error("Error fetching all reviews:", error);
    }
  };

  return (
    <>
      <LandingContainer>
        <BigImage src={MonctonImage} alt="Moncton" />
        <TextContainer>
          <SloganText>
            We can <HighlightedText>help</HighlightedText> you to find what you
            want in <HighlightedText>Moncton</HighlightedText>
          </SloganText>
          <NavLink to="/searchresults">
            <SearchButton>Search</SearchButton>
          </NavLink>
        </TextContainer>
      </LandingContainer>
      <MainWrapper>
        <BigText>Services in Moncton</BigText>
        <ListOfItems data={allItems} />
        <BigText>Popular Services</BigText>
        <PopularServices />
        <BigText>Recent reviews</BigText>
        <Reviews reviews={reviews} />
      </MainWrapper>
    </>
  );
};

const LandingContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
  overflow: hidden;
`;

const BigImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  opacity: 0.5;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const MainWrapper = styled.div`
  max-width: 100%;
  overflow-x: hidden;
`;

const SloganText = styled.h1`
  font-size: 2.5rem;
  color: #333;
  font-family: "Aeroport", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HighlightedText = styled.span`
  color: white;
  font-weight: bold;
`;

const SearchButton = styled.button`
  margin-top: 20px;
  padding: 20px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: black;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: white;
    color: black;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 1rem;
  }
`;

const BigText = styled.h1`
  margin: 40px 20px;
  color: black;
  font-family: Aeroport, -apple-system, "system-ui", "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 30px 10px;
  }
`;

export default Homepage;
