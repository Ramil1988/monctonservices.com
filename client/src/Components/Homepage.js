import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ListOfItems from "./ListOfItems";
import PopularServices from "./PopularServices";
import Reviews from "./Reviews";
import MonctonImage from "../Pictures/Moncton.jpg";

const Homepage = (props) => {
  const allItems = Object.values(props.items);
  const [reviews, setReviews] = useState([]);
  const [companies, setAllCompanies] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(8);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    fetchAllReviews();
    fetchAllcompanies();
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

  const fetchAllcompanies = async () => {
    try {
      const response = await fetch("/allCompanies");
      const data = await response.json();
      setAllCompanies(data.data);
    } catch (error) {
      console.error("Error fetching all reviews:", error);
    }
  };

  const handleShowMoreLess = () => {
    if (showMore) {
      setDisplayedItems(displayedItems + 8);
    } else {
      setDisplayedItems(8);
    }
    setShowMore(!showMore);
  };

  return (
    <Wrapper>
      <LandingContainer>
        <BigImage src={MonctonImage} alt="Moncton" />
        <TextContainer>
          <SloganText>
            We can <HighlightedText>help</HighlightedText> you to find what you
            want in <HighlightedText>Moncton</HighlightedText>
          </SloganText>
          <StatisticText>
            Our website already has <span>{companies.length}</span> companies
            listed.
          </StatisticText>
          <NavLink to="/searchresults">
            <SearchButton>Search</SearchButton>
          </NavLink>
        </TextContainer>
      </LandingContainer>
      <MainWrapper>
        <BigText>Services in Moncton</BigText>
        <ListOfItems data={allItems.slice(0, displayedItems)} />
        <ButtonWrapper>
          {showMore && displayedItems < allItems.length ? (
            <ShowMoreLessButton onClick={handleShowMoreLess}>
              Show more
            </ShowMoreLessButton>
          ) : (
            <ShowMoreLessButton onClick={handleShowMoreLess}>
              Show less
            </ShowMoreLessButton>
          )}
        </ButtonWrapper>
        <BigText>Popular Services</BigText>
        <PopularServices />
        <BigText>Recent reviews</BigText>
        <Reviews reviews={reviews} />
      </MainWrapper>
    </Wrapper>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  animation: ${fadeIn} 1s ease-in;
  background-color: #f2f2f2;
`;

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

const StatisticText = styled.h2`
  font-style: italic;
  font-family: "Aeroport", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";

  & span {
    color: white;
    padding: 5px;
    font-size: 30px;
    border-radius: 10px;
    border: 5px solid white;
  }
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const ShowMoreLessButton = styled.button`
  margin: auto;
  text-align: center;
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: black;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: #555;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
`;

export default Homepage;
