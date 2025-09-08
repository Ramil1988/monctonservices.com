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

  const ROOT_API = "/.netlify/functions/api";

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
      <SearchHeader>
        <Title>Search</Title>
        <StyledSelect
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="Name">by company name</option>
          <option value="ServiceType">by service type</option>
        </StyledSelect>
      </SearchHeader>
      <Controls>
        <StyledInputsuggestion
          type="text"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          placeholder="Type to search..."
        />
        <StyledClearButton onClick={() => setValue("")}>Clear</StyledClearButton>
      </Controls>
      <StyledUl>{renderList()}</StyledUl>
      {renderPagination()}
    </StyledSearchWrapper>
  );
};

const StyledSearchWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 40px;
`;

const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Title = styled.h1`
  color: #e5e7eb;
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin: 14px 0 20px;
`;

const StyledInputsuggestion = styled.input`
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(255,255,255,0.06);
  color: #e5e7eb;
  border-radius: 12px;
  padding: 12px 14px;
  width: 320px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &::placeholder { color: #94a3b8; }

  &:focus {
    outline: none;
    border-color: rgba(99, 102, 241, 0.45);
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
`;

const StyledLi = styled.li`
  width: 100%;
  padding: 18px 16px;
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  backdrop-filter: blur(6px);
  transition: transform 0.18s ease, box-shadow 0.22s ease, border-color 0.22s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(0,0,0,0.35);
    border-color: var(--primary-start);
  }

  & a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
`;

const StyledType = styled.li`
  grid-column: 1 / -1;
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--text);
  margin: 16px 4px 4px;
`;

const StyledSelect = styled.select`
  padding: 10px 12px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  background: var(--surface);
  backdrop-filter: blur(6px);
  &:focus {
    outline: none;
    border-color: var(--primary-start);
  }
`;

const StyledClearButton = styled.button`
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  border-radius: 999px;
  padding: 10px 16px;
  border: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: transform 0.15s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(34,211,238,0.25);
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
  background: ${({ active }) => (active ? "linear-gradient(90deg, var(--primary-start), var(--primary-end))" : "var(--surface)")};
  color: ${({ active }) => (active ? "var(--pill-text)" : "var(--text)")};
  border-radius: 999px;
  width: 36px;
  height: 36px;
  text-align: center;
  margin: 0 6px;
  border: 1px solid var(--surface-border);
  transition: transform 0.15s ease;

  &:hover { transform: translateY(-2px); }

  @media (max-width: 1200px) {
    margin: 8px;
  }
`;

const HighlightedText = styled.span`
  font-size: 1rem;
  font-weight: 800;
  background: linear-gradient(90deg, #60a5fa, #a78bfa, #34d399);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export default SearchResults;
