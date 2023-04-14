import styled from "styled-components";
import { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import ListOfItems from "./ListOfItems";
import PopularServices from "./PopularServices";
import Reviews from "./Reviews";

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
      <MainWrapper>
        <SloganText>What are you looking for?</SloganText>
        <ListOfItems data={allItems} />
        <BigText>Popular Services</BigText>
        <PopularServices />
        <BigText>Recent reviews</BigText>
        <Reviews reviews={reviews} />
      </MainWrapper>
    </>
  );
};
const MainWrapper = styled.div`
  padding: 20px;
  background: lightgray;
  transition: background 0.5s;
`;

const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const blinkCursor = keyframes`
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: black;
  }
`;

const SloganText = styled.h1`
  margin: 30px 20px;
  color: black;
  font-family: "Aeroport", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  overflow: hidden;
  white-space: nowrap;
  animation: ${typing} 3s steps(60, end), ${blinkCursor} 0.5s step-end infinite;
  animation-fill-mode: forwards;
`;

const BigText = styled.h1`
  margin: 40px 20px;
  color: black;
  font-family: Aeroport, -apple-system, "system-ui", "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  overflow: hidden;
  white-space: nowrap;
`;

export default Homepage;
