import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const SearchResults = () => {
  const [companies, setCompanies] = useState([]);
  const [value, setValue] = useState("");
  const [matches, setMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/allCompanies");
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
      const filtered = companies.filter((company) =>
        company.name.toLowerCase().includes(value.toLowerCase())
      );
      setMatches(filtered);
    } else {
      setMatches([]);
    }
  }, [value, companies]);

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
              {company.name} - {company.serviceType}
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
      <h1>Search for a company</h1>
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
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  background: #204c84;
  transition: background 0.5s;

  & h1 {
    color: white;
  }
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  height: 50vh;
`;

const StyledLi = styled.li`
  margin: 15px 0;
  width: 250px;
  padding: 5px 10px;
  &:hover {
    transform: scale(1.1);
  }
  & a {
    text-decoration: none;
    color: white;
  }
`;

const StyledType = styled.li`
  font-weight: bold;
  margin-top: 10px;
  font-size: 20px;
  padding: 5px 10px;
  color: white;
  border: 2px solid white;
  display: inline-block;
  margin-right: 10px;
`;

const StyledInputsuggestion = styled.input`
  width: 300px;
  padding-left: 10px;
  line-height: 2.7em;
  border-radius: 3px;
  border: 1px solid gray;
  margin-right: 15px;
  &:focus {
    outline-color: blue;
  }
`;

const StyledClearButton = styled.button`
  background-color: white;
  color: #204c84;
  border-radius: 5px;
  padding: 10px 20px;
  border: 1px solid blue;
  transition: color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const StyledPageButton = styled.button`
  background-color: ${({ active }) => (active ? "white" : "#204c84")};
  color: ${({ active }) => (active ? "#204c84" : "white")};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 0 5px;
  border: 1px solid white;
  transition: color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export default SearchResults;
