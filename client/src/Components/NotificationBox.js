import React from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

const NotificationBox = ({ title, message, buttonText, onButtonClick }) => {
  return (
    <Container>
      <SuccessBox>
        <Face>
          <Eye />
          <EyeRight />
          <MouthHappy />
        </Face>
        <ShadowScale />
        <Message>
          <AlertTitle className="alert">{title}</AlertTitle>
          <Paragraph>{message}</Paragraph>
        </Message>
        <ButtonBox onClick={onButtonClick}>
          <GreenText className="green">{buttonText}</GreenText>
        </ButtonBox>
      </SuccessBox>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: 50%;
  left: 40%;
  overflow: hidden;
  width: 800px;
  height: 350px;
`;

const SuccessBox = styled.div`
  position: absolute;
  width: 35%;
  height: 100%;
  background: linear-gradient(to bottom right, #b0db7d 40%, #99dbb4 100%);
  border-radius: 20px;
  box-shadow: 5px 5px 20px rgba(203, 205, 211, 0.1);
  perspective: 40px;
`;

const Face = styled.div`
  position: absolute;
  width: 25%;
  height: 25%;
  background: #fcfcfc;
  border-radius: 50%;
  border: 1px solid #777777;
  top: 21%;
  left: 37.5%;
  z-index: 2;
  animation: ${keyframes`
    50% {
      transform: translateY(-10px);
    }
  `} 1s ease-in infinite;
`;

const Eye = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background: #777777;
  border-radius: 50%;
  top: 40%;
  left: 20%;
`;

const EyeRight = styled(Eye)`
  left: 68%;
`;

const Mouth = styled.div`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  top: 43%;
  left: 41%;
`;

const MouthHappy = styled(Mouth)`
  border: 2px solid;
  border-color: transparent #777777 #777777 transparent;
  transform: rotate(45deg);
`;

const Shadow = styled.div`
  position: absolute;
  width: 21%;
  height: 3%;
  opacity: 0.5;
  background: #777777;
  left: 40%;
  top: 43%;
  border-radius: 50%;
  z-index: 1;
`;

const ShadowScale = styled(Shadow)`
  animation: ${keyframes`
    50% {
      transform: scale(0.9);
    }
  `} 1s ease-in infinite;
`;

const Message = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  height: 40%;
  top: 47%;
`;

const Alert = styled.h1`
  font-size: 0.9em;
  font-weight: 100;
  letter-spacing: 3px;
  padding-top: 5px;
  color: #fcfcfc;
  padding-bottom: 5px;
  text-transform: uppercase;
`;

const AlertTitle = styled(Alert)`
  font-weight: 700;
  letter-spacing: 5px;
`;

const Paragraph = styled.p`
  margin-top: -5px;
  font-size: 1em;
  font-weight: 100;
  color: black;
  letter-spacing: 1px;
  font-family: "Lato", sans-serif;
  text-transform: uppercase;
  text-align: center;
`;

const GreenText = styled.h2`
  color: #228a68;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
`;

const ButtonBox = styled.button`
  position: absolute;
  background: #fcfcfc;
  width: 50%;
  height: 15%;
  border-radius: 20px;
  top: 73%;
  left: 25%;
  outline: 0;
  border: none;
  box-shadow: 2px 2px 10px rgba(119, 119, 119, 0.5);
  cursor: pointer;
  transition: all 0.5s ease-in-out;

  &:hover {
    background: #f1f1f1;
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
`;

export default NotificationBox;
