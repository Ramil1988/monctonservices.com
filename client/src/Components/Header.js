import React from "react";
import logo from "../Pictures/logo-black.png";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { FaHome, FaBook, FaSearch } from "react-icons/fa";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Wrapper>
      <InnerWrapper>
        <Logo to={`/`} onClick={window.location.reload}>
          <img src={logo} alt="Logo" />
        </Logo>
        <div className="nav-links">
          <NavLink className="nav-link" to="/" exact>
            <StyledIcon as={FaHome} />
            Home
          </NavLink>
          <NavLink className="nav-link" to="/about">
            <StyledIcon as={FaBook} />
            About
          </NavLink>
          <NavLink className="nav-link" to="/searchresults">
            <StyledIcon as={FaSearch} />
            Search
          </NavLink>
        </div>
        <UserWrapper>
          {currentUser && <UserName>Hello, {currentUser.name}</UserName>}
          <SearchWrapper></SearchWrapper>
          <LoginButton />
          {currentUser && <LogoutButton />}
        </UserWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: #ffffff;
  box-shadow: 1px 2px 4px rgba(1, 2, 0, 0.1);
  width: 100%;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 15px 20px;
  max-width: 1200px;

  .nav-links {
    display: flex;
    align-items: center;
  }

  .nav-link {
    margin-left: 1.5rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: black;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }

    &:after {
      display: block;
      content: "";
      border-bottom: solid 3px white;
      transform: scaleX(0);
      transition: transform 500ms ease-in-out;
    }
    &:hover:after {
      transform: scaleX(1);
    }
  }
`;

const Logo = styled(NavLink)`
  display: block;
  & img {
    width: 400px;
    margin: 0 -80px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.div`
  margin-right: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: black;
`;

export default Header;
