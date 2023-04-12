import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";
import styled from "styled-components";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { logoutUser } = useContext(UserContext);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    logoutUser();
  };

  return (
    <StyledButton onClick={handleLogout}>
      <StyledIcon />
      <span>Log out</span>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background-color: #fff;
  color: black;
  border: none;
  padding: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledIcon = styled(FaSignOutAlt)`
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

export default LogoutButton;
