import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const SearchResults = () => {
  const [companies, setCompanies] = useState([]);
  const [value, setValue] = useState("");
  const [matches, setMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchType, setSearchType] = useState("Name");

  const ROOT_API = "https://monctonservices-com.onrender.com";

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${ROOT_API}/allCompanies`);
        const data = await response.json();
        setCompanies(data.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (value.length >= 1) {
      let filtered = [];
      if (searchType === "Name") {
        filtered = companies.filter((company) =>
          company.name.toLowerCase().includes(value.toLowerCase())
        );
      } else if (searchType === "ServiceType") {
        filtered = companies.filter((company) =>
          company.serviceType.toLowerCase().includes(value.toLowerCase())
        );
      }
      setMatches(filtered);
    } else {
      setMatches([]);
    }
  }, [value, companies, searchType]);

  const groupCompaniesByType = (companies) => {
    const groups = {};
    companies.forEach((company) => {
      if (!groups[company.serviceType]) {
        groups[company.serviceType] = [];
      }
      groups[company.serviceType].push(company);
    });
    return groups;
  };

  const highlightMatches = (text, searchValue) => {
    const regex = new RegExp(`(${searchValue})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) => {
      return part.toLowerCase() === searchValue.toLowerCase() ? (
        <HighlightedText key={index}>{part}</HighlightedText>
      ) : (
        part
      );
    });
  };

  const renderList = () => {
    const groupedMatches = groupCompaniesByType(
      matches.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
    const renderedItems = [];

    for (const type in groupedMatches) {
      renderedItems.push(<StyledType key={type}>{type}</StyledType>);
      groupedMatches[type].forEach((company) => {
        renderedItems.push(
          <StyledLi key={company._id}>
            <NavLink to={`/company/${company._id}`}>
              {searchType === "Name"
                ? highlightMatches(company.name, value)
                : company.name}{" "}
              - {company.serviceType}
            </NavLink>
          </StyledLi>
        );
      });
    }

    return renderedItems;
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(matches.length / itemsPerPage);
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <StyledPageButton
          key={i}
          onClick={() => setCurrentPage(i)}
          active={i === currentPage}
        >
          {i}
        </StyledPageButton>
      );
    }

    return <StyledPagination>{buttons}</StyledPagination>;
  };

  return (
    <StyledSearchWrapper>
      <h1>
        Search{" "}
        <StyledSelect
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="Name">by company name</option>
          <option value="ServiceType">by service type</option>
        </StyledSelect>
      </h1>
      <StyledInputsuggestion
        type="text"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
      <StyledClearButton onClick={() => setValue("")}>Clear</StyledClearButton>
      <StyledUl>{renderList()}</StyledUl>
      {renderPagination()}
    </StyledSearchWrapper>
  );
};

const StyledSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: lightgray;
  transition: background 0.5s;

  & h1 {
    color: black;
  }

  @media (max-width: 1200px) {
    padding: 10px;
  }
`;

const StyledInputsuggestion = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  margin: 20px;
  width: 250px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border: 1px solid black;
  }

  @media (max-width: 1200px) {
    width: 80%;
  }
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledLi = styled.li`
  margin: 15px 0;
  width: 100%;
  padding: 5px 10px;
  &:hover {
    transform: scale(1.05);
  }
  & a {
    text-decoration: none;
    color: black;
  }
`;

const StyledType = styled.li`
  font-weight: bold;
  margin-top: 10px;
  font-size: 20px;
  padding: 5px 10px;
  color: black;
  border: 2px solid white;
  display: inline-block;
  margin-right: 10px;
`;

const StyledSelect = styled.select`
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none;
  background-color: #ffffff;
  &:focus {
    outline: none;
    border: 1px solid #0071bc;
  }
`;

const StyledClearButton = styled.button`
  background-color: white;
  color: black;
  border-radius: 5px;
  padding: 13px 25px;
  border: 1px solid black;
  transition: color 0.2s ease-in-out;
  font-weight: bold;
  font-size: 15px;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  max-width: 100%;

  @media (max-width: 1200px) {
    flex-wrap: wrap;
  }
`;

const StyledPageButton = styled.button`
  background-color: ${({ active }) => (active ? "black" : "white")};
  color: ${({ active }) => (active ? "white" : "black")};
  border-radius: 50%;
  width: 30px;
  text-align: center;
  margin: 0 5px;
  border: 1px solid white;
  transition: color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 1200px) {
    margin: 10px;
  }
`;

const HighlightedText = styled.span`
  font-size: 20px;
  font-weight: bold;
  text-decoration: underline;
`;

export default SearchResults;
