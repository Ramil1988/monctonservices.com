import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styled from "styled-components";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1);
  };

  if (location.pathname === "/") {
    return null;
  }

  return (
    <NavWrapper>
      <BackButton onClick={goBack}>
        <AiOutlineArrowLeft />
      </BackButton>
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.1rem;
  margin-left: 2rem;
  margin-top: 1rem;
`;

const BackButton = styled.button`
  font-size: 40px;
  margin-bottom: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #666;
  }
`;

export default Navigation;
