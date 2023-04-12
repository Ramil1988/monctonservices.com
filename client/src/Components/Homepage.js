import styled from "styled-components";
import { keyframes } from "styled-components";
import ListOfItems from "./ListOfItems";
import PopularServices from "./PopularServices";

const Homepage = (props) => {
  const allItems = Object.values(props.items);

  return (
    <>
      <MainWrapper>
        <SloganText>What are you looking for?</SloganText>
        <ListOfItems data={allItems} />
        <PopularServicesText>Popular Services</PopularServicesText>
        <PopularServices />
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
  margin-bottom: 50px;
  color: black;
  font-family: "Aeroport", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  overflow: hidden;
  white-space: nowrap;
  animation: ${typing} 3s steps(60, end), ${blinkCursor} 0.5s step-end infinite;
  animation-fill-mode: forwards;
`;

const PopularServicesText = styled.h1`
  margin-bottom: 50px;
  color: black;
  font-family: "Aeroport", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  overflow: hidden;
  white-space: nowrap;
`;

export default Homepage;
