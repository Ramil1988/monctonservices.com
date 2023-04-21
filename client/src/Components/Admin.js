import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import CompanyForm from "./CompanyForm";
import { Label, Input, Button } from "./CompanyForm";

const Admin = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [newCompany, setNewCompany] = useState({
    serviceType: "",
    name: "",
    address: "",
    phoneNumber: "",
    image: "",
  });

  const fetchCompanies = async () => {
    try {
      const response = await fetch("/allCompanies");
      const data = await response.json();
      setCompanies(data.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCreateCompany = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCompany),
      });

      const data = await response.json();
      fetchCompanies();

      setNewCompany({
        serviceType: "",
        name: "",
        address: "",
        phoneNumber: "",
        image: "",
      });
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const handleNewCompanyChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

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
      const response = await fetch(`/company/${updatedCompany._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCompany),
      });
      const data = await response.json();
      fetchCompanies();
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  const handleCompanyDelete = async (companyId) => {
    try {
      const response = await fetch(`/company/${companyId}`, {
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
      <SearchButton onClick={handleSearch}>Search</SearchButton>
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
      {selectedCompany && (
        <CompanyForm
          company={selectedCompany}
          onUpdate={handleCompanyUpdate}
          onDelete={handleCompanyDelete}
        />
      )}
      <h2>Create a new company</h2>
      <form onSubmit={handleCreateCompany}>
        <Label>
          Service Type:
          <Input
            type="text"
            name="serviceType"
            value={newCompany.serviceType}
            onChange={handleNewCompanyChange}
          />
        </Label>
        <Label>
          Name:
          <Input
            type="text"
            name="name"
            value={newCompany.name}
            onChange={handleNewCompanyChange}
          />
        </Label>
        <Label>
          Address:
          <Input
            type="text"
            name="address"
            value={newCompany.address}
            onChange={handleNewCompanyChange}
          />
        </Label>
        <Label>
          Phone Number:
          <Input
            type="text"
            name="phoneNumber"
            value={newCompany.phoneNumber}
            onChange={handleNewCompanyChange}
          />
        </Label>
        <Label>
          Image URL:
          <Input
            type="text"
            name="image"
            value={newCompany.image}
            onChange={handleNewCompanyChange}
          />
        </Label>
        <Button type="submit">Create</Button>
      </form>
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

export default Admin;
