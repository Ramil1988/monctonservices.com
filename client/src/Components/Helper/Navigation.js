import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styled from "styled-components";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // An array to keep track of the history of navigations
  const historyStack = React.useRef([]);

  // Add to historyStack every time location changes
  useEffect(() => {
    historyStack.current.push(location.pathname);
  }, [location.pathname]);

  const goBack = () => {
    // If historyStack has more than one element
    if (historyStack.current.length > 1) {
      // Navigate back
      navigate(-1);
      // And remove the last added path from historyStack
      historyStack.current.pop();
    } else {
      // If no previous page, navigate to the root page
      navigate("/");
    }
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
