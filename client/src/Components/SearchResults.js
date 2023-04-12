import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

const SearchResults = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/allCompanies");
        const data = await response.json();
        setCompanies(data.data);
        setFilteredCompanies(data.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  return (
    <div>
      <h1>Search Results</h1>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {filteredCompanies.map((company) => (
          <li key={company._id}>
            <NavLink to={`/company/${company._id}`}>
              {company.name} - {company.type}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
