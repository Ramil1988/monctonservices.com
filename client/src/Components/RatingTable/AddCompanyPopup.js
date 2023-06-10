import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../Pictures/avatar.png";

const AddCompanyPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <PopupContainer>
      <CloseButton onClick={() => setVisible(false)}>x</CloseButton>
      <ImageContainer>
        <img src={logo} alt="Logo" />
      </ImageContainer>
      <ContentContainer>
        <p>Do you want to add a new object?</p>
        <YesButton
          href="https://docs.google.com/forms/d/e/1FAIpQLSfqCQqxKtZ-kfIYNcn70acZ_lymeNX8EY9l8cz2mp5xRnrZug/viewform?usp=sf_link"
          target="_blank"
        >
          Yes
        </YesButton>
      </ContentContainer>
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  text-align: center;
  margin-bottom: 15px;

  img {
    width: 60%;
    height: 150px;
    border-radius: 8px;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const ContentContainer = styled.div`
  text-align: center;
`;

const YesButton = styled.a`
  display: inline-block;
  padding: 8px 16px;
  background-color: black;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 10px;
`;

export default AddCompanyPopup;
