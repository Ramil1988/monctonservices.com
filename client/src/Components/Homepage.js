import logo from "../Pictures/logo.png";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import ListOfItems from "./ListOfItems";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";

const Homepage = (props) => {
  const allFruits = Object.values(props.items);
  const { user } = useAuth0();
  console.log(user);

  const saveUser = async () => {
    try {
      const userData = {
        userId: user.sub,
        name: user.name,
        nickname: user.nickname,
        email: user.email,
      };

      const response = await fetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userData }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  useEffect(() => {
    if (user) {
      saveUser();
    }
  }, [user]);

  return (
    <>
      <Header>
        <Logo to={`/`} onClick={window.location.reload}>
          <img src={logo} alt="Logo" />
        </Logo>
        <SearchWrapper>
          <SearchBar />
        </SearchWrapper>
        <LoginButton />
        <LogoutButton />
      </Header>
      <MainWrapper>
        <SloganText>We are helping you to choose the best service!</SloganText>
        <ListOfItems data={allFruits} />
      </MainWrapper>
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

const LoginIconWrapper = styled(NavLink)``;

const MainWrapper = styled.div`
  padding: 20px;

  background: linear-gradient(to bottom, #204c84, rgba(20, 78, 137, 0.3));
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
    border-color: #204c84;
  }
`;

const SloganText = styled.h1`
  margin-bottom: 50px;
  color: white;
  font-style: italic;
  font-family: "Aeroport", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  overflow: hidden;
  white-space: nowrap;
  animation: ${typing} 3s steps(60, end), ${blinkCursor} 0.5s step-end infinite;
  animation-fill-mode: forwards;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Homepage;
