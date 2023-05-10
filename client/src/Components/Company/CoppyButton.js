import React, { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import styled from "styled-components";

const CopyButton = ({ textToCopy }) => {
  const [color, setColor] = useState("black");
  const [copiedText, setCopiedText] = useState(""); // Add state for the "Copied" text

  const handleCopyClick = () => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        console.log("Text copied to clipboard:", textToCopy);
        setColor("green");
        setCopiedText("Copied!"); // Show "Copied" text when clicked
        setTimeout(() => {
          setColor("black");
          setCopiedText(""); // Hide "Copied" text after 1.5 seconds
        }, 1500);
      },
      (err) => {
        console.error("Could not copy text:", err);
      }
    );
  };

  return (
    <div>
      <CopyIconButton onClick={handleCopyClick} color={color}>
        <IoCopyOutline />
      </CopyIconButton>
      <CopiedText>{copiedText}</CopiedText>{" "}
      {/* Add the "Copied" text element */}
    </div>
  );
};

const CopyIconButton = styled.button`
  margin-left: 10px;
  margin-bottom: 20px;
  border: none;
  background: none;
  color: ${(props) => props.color};

  &:hover {
    transform: scale(1.2);
  }
`;

const CopiedText = styled.span`
  margin-left: 5px;
  font-size: 14px;
  color: green;
`;

export default CopyButton;
