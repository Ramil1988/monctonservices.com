import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { logoutUser } = useContext(UserContext);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    logoutUser();
  };

  return <StyledButton onClick={handleLogout}>Log Out</StyledButton>;
};

const StyledButton = styled.button`
  background-color: #204c84;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #163959;
  }
`;

export default LogoutButton;
