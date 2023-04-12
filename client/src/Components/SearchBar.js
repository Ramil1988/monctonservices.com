import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchBarWrapper>
      <SearchIcon />
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="What are you looking for?"
      />
      <SearchButton onClick={handleSearchClick}>Search</SearchButton>
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;

  @media screen and (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const SearchInput = styled.input`
  padding: 10px 10px 10px 40px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ddd;
  margin-right: 10px;
  width: 700px;
  height: 30px;
  font-size: 20px;
  border: 2px solid;
  border-color: #204c84;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 500px;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: opacity 0.2s ease-in-out;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    left: 0;
    margin-left: 10px;
  }
`;

const SearchButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: #204c84;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #16324f;
  }
`;

export default SearchBar;
