import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner = () => {
  return <SpinnerWrapper />;
};

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: ${rotate} 1s linear infinite;
`;

export default Spinner;
