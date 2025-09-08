import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../UserContext";
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
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  border: none;
  padding: 8px 12px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  margin-left: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  gap: 8px;
  transition: transform 0.15s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(34,211,238,0.25);
  }
`;

const StyledIcon = styled(FaSignOutAlt)`
  font-size: 1rem;
`;

export default LogoutButton;
