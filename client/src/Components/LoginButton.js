import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { user } = useContext(UserContext);

  const handleLoginClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: `/` } });
    }
  };

  return (
    <LoginIconWrapper
      to={isAuthenticated ? `/Profile/${encodeURIComponent(user.name)}` : null}
      onClick={handleLoginClick}
    >
      <FaUserIcon />
    </LoginIconWrapper>
  );
};

const LoginIconWrapper = styled(NavLink)`
  font-size: 24px;
  margin: 20px;
  margin-left: 120px;
  cursor: pointer;
  color: #204c84;

  &:hover {
    color: #fff;
    background-color: #204c84;
    border-radius: 50%;
    padding: 5px;
  }
`;

const FaUserIcon = styled(FaUser)``;

export default LoginButton;
