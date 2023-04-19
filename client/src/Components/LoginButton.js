import { useAuth0 } from "@auth0/auth0-react";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useLocation } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  let location = useLocation();
  const { currentUser, isAuthenticated } = useContext(UserContext);

  const handleLoginClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: {
          returnTo: `${location.pathname} `,
        },
      });
    }
  };

  const checkUser = async () => {
    try {
      const response = await fetch(`/user/${currentUser.sub}`);
      if (response.ok) {
        const existingUser = await response.json();
        if (!existingUser) {
          saveUser();
        }
      } else if (response.status === 404) {
        saveUser();
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      checkUser();
    }
  }, [currentUser]);

  const saveUser = async () => {
    try {
      const userData = {
        userId: currentUser.sub,
        name: currentUser.given_name,
        nickname: currentUser.nickname,
        email: currentUser.email,
      };

      const response = await fetch("/user/login", {
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
    <LoginIconWrapper
      to={
        isAuthenticated && currentUser
          ? `/Profile/${encodeURIComponent(currentUser.sub)}`
          : null
      }
      onClick={handleLoginClick}
    >
      <FaUserIcon />
    </LoginIconWrapper>
  );
};

const LoginIconWrapper = styled(NavLink)`
  font-size: 24px;
  margin: 20px;
  margin-left: 20px;
  cursor: pointer;
  color: black;

  &:hover {
    transform: scale(1.1);
  }
`;

const FaUserIcon = styled(FaUser)``;

export default LoginButton;
