import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { FaBars } from "react-icons/fa";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { currentUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Brand to={`/`} onClick={window.location.reload}>
          Moncton <em>services</em>
        </Brand>
        <MenuIcon onClick={toggleMenu}>
          <FaBars />
        </MenuIcon>
        <NavLinks menuOpen={menuOpen}>
          <NavLink className="nav-link" to="/" onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink className="nav-link" to="/about" onClick={toggleMenu}>
            About
          </NavLink>
          <NavLink
            className="nav-link"
            to="/searchresults"
            onClick={toggleMenu}
          >
            Search
          </NavLink>
        </NavLinks>
        <UserWrapper>
          <ThemeToggle />
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
  background-color: var(--header-bg, #ffffff);
  width: 100vw;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  position: sticky;
  top: 0;
  z-index: 50;
  /* Decorative blobs like ruStore */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(200px 120px at 85% 30%, rgba(99,102,241,0.25), transparent 60%),
                radial-gradient(180px 110px at 70% 70%, rgba(34,211,238,0.18), transparent 60%);
    opacity: 0.8;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 12px 16px;
  max-width: 1200px;
  gap: 12px;
  flex-wrap: nowrap;
`;

const Brand = styled(NavLink)`
  display: block;
  font-weight: 900;
  font-size: clamp(1.25rem, 1.1rem + 1.2vw, 2rem);
  letter-spacing: 0.4px;
  text-decoration: none;
  color: var(--text);
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  em {
    font-style: normal;
    opacity: 0.9;
  }

  @media (max-width: 1150px) {
    margin-right: 8px;
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
  justify-content: center;
  gap: 18px;
  flex: 1 1 auto;

  @media (max-width: 1150px) {
    display: ${({ menuOpen }) => (menuOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 20px;
    right: 20px;
    background-color: var(--surface);
    border: 1px solid var(--surface-border);
    border-radius: 8px;
    padding: 20px;
    z-index: 10;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    align-items: center;
    justify-content: center;
  }

  .nav-link {
    margin-right: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text);
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    transition: all 0.15s ease-in-out;

    &:hover {
      background-color: var(--surface);
      transform: translateY(-2px);
      border: 1px solid var(--surface-border);
    }

    @media (max-width: 1150px) {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
`;
const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;

  @media (max-width: 1150px) {
    width: auto;
    justify-content: flex-end;
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const UserName = styled.div`
  margin-right: 0.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1000px) {
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
