import styled from "styled-components";
import { keyframes } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import ListOfItems from "./ListOfItems";

const Homepage = (props) => {
  const allItems = Object.values(props.items);
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      console.log("Auth0 user:", user); // Log the user object
      saveUser();
    }
  }, [user]);

  const saveUser = async () => {
    try {
      const userData = {
        userId: user.sub,
        name: user.given_name,
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

      await response.json();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <>
      <MainWrapper>
        <SloganText>We are helping you to choose the best service!</SloganText>
        <ListOfItems data={allItems} />
      </MainWrapper>
    </>
  );
};

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

export default Homepage;
