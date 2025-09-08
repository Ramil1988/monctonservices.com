import { useEffect, useState } from "react";
import styled from "styled-components";

const ThemeToggle = () => {
  const [mode, setMode] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "dark"
      : "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-dark", mode === "dark");
    root.classList.toggle("theme-light", mode === "light");
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <Toggle onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      aria-label="Toggle theme">
      {mode === "dark" ? "Light" : "Dark"}
    </Toggle>
  );
};

const Toggle = styled.button`
  background: linear-gradient(90deg, #6366f1, #22d3ee);
  color: #0b1224;
  border: none;
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
`;

export default ThemeToggle;

