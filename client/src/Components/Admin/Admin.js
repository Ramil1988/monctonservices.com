import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import CompanyUpdateForm from "./CompanyUpdateForm";
import CompanyCreateForm from "./CompanyCreateForm";
import ReviewAdmin from "./ReviewAdmin";
import EventsAddForm from "./EventsAddForm";

const ROOT_API = "https://monctonservices-com.onrender.com";

const Admin = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${ROOT_API}/allCompanies`);
      const data = await response.json();
      setCompanies(data.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSearch = (currentTerm) => {
    if (currentTerm.length >= 1) {
      let filtered = companies.filter((company) =>
        company.name.toLowerCase().includes(currentTerm.toLowerCase())
      );
      setMatches(filtered);
    } else {
      setMatches([]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
    setSelectedCompany(null);
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  const handleCompanyUpdate = async (updatedCompany) => {
    try {
      const response = await fetch(
        `${ROOT_API}/company/${updatedCompany._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCompany),
        }
      );
      await response.json();
      fetchCompanies();
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  const handleCompanyDelete = async (companyId) => {
    try {
      await fetch(`${ROOT_API}/company/${companyId}`, {
        method: "DELETE",
      });
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <AdminWrapper>
      <Title>Admin Page</Title>
      <h2>Update an existing company</h2>
      <SearchInput
        type="text"
        placeholder="Search for a company"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <SearchButton onClick={() => setSearchTerm("")}>Clear</SearchButton>
      {!selectedCompany && (
        <>
          <CompanyList>
            {matches.map((company) => (
              <CompanyItem
                key={company._id}
                onClick={() => handleCompanySelect(company)}
              >
                {company.name}
              </CompanyItem>
            ))}
          </CompanyList>
        </>
      )}
      {selectedCompany && (
        <CompanyUpdateForm
          company={selectedCompany}
          onUpdate={handleCompanyUpdate}
          onDelete={handleCompanyDelete}
        />
      )}
      <CompanyCreateForm />
      <ReviewAdmin />
      <EventsAddForm />
    </AdminWrapper>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Title = styled.h1`
  margin-bottom: 50px;
  text-align: center;
`;

const AdminWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
  font-family: "Raleway", sans-serif;
  animation: ${fadeIn} 2s ease-in;
  border-radius: 10px;
`;

const SearchButton = styled.button`
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #0071bc;
    color: #ffffff;
  }
`;

const SearchInput = styled.input`
  width: calc(100% - 110px);
  padding: 10px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 20px;
  margin-right: 10px;
`;

const CompanyList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const CompanyItem = styled.li`
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`;

export default Admin;
