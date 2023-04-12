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
  border: 3px solid black;
  border-radius: 50%;
  border-top-color: white;
  animation: ${rotate} 1s linear infinite;
`;

export default Spinner;
