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
  const { currentUser, isAuthenticated, setshouldFetchUser } =
    useContext(UserContext);

  const handleLoginClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: {
          returnTo: `${location.pathname} `,
        },
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setshouldFetchUser(true);
    }
  }, [isAuthenticated]);

  const checkUser = async () => {
    try {
      const response = await fetch(`/user/${currentUser._id}`);
      const existingUser = await response.json();
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      checkUser();
    }
  }, [currentUser, isAuthenticated]);

  return (
    <LoginIconWrapper
      to={
        isAuthenticated && currentUser
          ? `/Profile/${encodeURIComponent(currentUser._id)}`
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
