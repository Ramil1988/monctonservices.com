import React, { useState } from "react";
import logo from "../../Pictures/logo-black.png";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { FaBook, FaSearch, FaBars } from "react-icons/fa";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { currentUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Logo to={`/`} onClick={window.location.reload}>
          <img src={logo} alt="Logo" />
        </Logo>
        <MenuIcon onClick={toggleMenu}>
          <FaBars />
        </MenuIcon>
        <NavLinks menuOpen={menuOpen}>
          <NavLink className="nav-link" to="/about" onClick={toggleMenu}>
            <StyledIcon as={FaBook} />
            About
          </NavLink>
          <NavLink
            className="nav-link"
            to="/searchresults"
            onClick={toggleMenu}
          >
            <StyledIcon as={FaSearch} />
            Search
          </NavLink>
        </NavLinks>
        <UserWrapper>
          {currentUser && (
            <UserName>
              Hello{" "}
              {currentUser.data
                ? currentUser.data.nickname
                : currentUser.nickname}
            </UserName>
          )}
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
  width: 100vw;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 15px;
  max-width: 1200px;
`;

const Logo = styled(NavLink)`
  display: block;

  & img {
    width: 300px;
  }

  @media (max-width: 1150px) {
    display: none;
  }
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 1.2rem;
  cursor: pointer;

  @media (max-width: 1150px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1150px) {
    display: ${({ menuOpen }) => (menuOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 20px;
    background-color: #ffffff;
    width: 20vw;
    padding: 10px;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    align-items: center;
    justify-content: center;
  }

  .nav-link {
    margin-right: 5rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: black;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
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

    @media (max-width: 1150px) {
      margin-right: 0;
      margin-bottom: 2rem;
    }
  }
`;

const StyledIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1150px) {
    width: 100%;
    justify-content: center;
  }
`;

const UserName = styled.div`
  margin-right: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: black;

  @media (max-width: 767px) {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default Header;
