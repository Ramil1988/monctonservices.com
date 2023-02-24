import logo from "../Pictures/logo.png";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import ListOfServices from "./ListOfServices";
import RatingTable from "./RatingTable";
import SearchBar from "./SearchBar";
import ListOfItems from "./ListOfItems";

const Homepage = (props) => {
  const allFruits = Object.values(props.items);

  return (
    <>
      <Header>
        <Logo to={`/`} onClick={window.location.reload}>
          <img src={logo} alt="Logo" />
        </Logo>
        <SearcWrapper>
          <SearchBar />
        </SearcWrapper>
        <LoginIcon />
      </Header>
      <SloganText>We are helping you to choose the best service</SloganText>
      <ListOfItems data={allFruits} />
      <RatingTable />
    </>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Logo = styled(NavLink)`
  display: block;
  & img {
    width: 350px;
    margin: 20px;
  }
`;

const LoginIcon = styled(FaUser)`
  font-size: 24px;
  margin: 20px;
  margin-left: 120px;
  cursor: pointer;
  color: #204c84;

  &:hover {
    color: #fff;
    background-color: #204c84;
    border-radius: 50%;
    padding: 5px;
  }
`;

const SloganText = styled.h1`
  margin: 40px;
  color: #204c84;
  font-family: "Aeroport", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
`;

const SearcWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`;

export default Homepage;
