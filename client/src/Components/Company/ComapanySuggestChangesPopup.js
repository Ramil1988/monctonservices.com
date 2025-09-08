import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../Pictures/avatar.png";

const ComapanySuggestChangesPopup = () => {
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
        <p>Suggest changes?</p>
        <YesButton
          href="https://docs.google.com/forms/d/e/1FAIpQLScFW0Q9NmgzH63oQ2q-1bCLxkoc8gpDmg5oe-BUUCrsx06W2A/viewform?usp=sf_link"
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
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.25);
  z-index: 1000;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--text);
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
  padding: 10px 16px;
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  text-decoration: none;
  border-radius: 999px;
  margin-top: 10px;
`;

export default ComapanySuggestChangesPopup;
