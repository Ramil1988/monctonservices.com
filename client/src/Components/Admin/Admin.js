import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import CompanyUpdateForm from "./CompanyUpdateForm";
import CompanyCreateForm from "./CompanyCreateForm";
import ReviewAdmin from "./ReviewAdmin";
import EventsAddForm from "./EventsAddForm";
// Fetch Google-aligned types from server

const ROOT_API = "/.netlify/functions/api";

const Admin = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState("hotels");
  const [importCity, setImportCity] = useState("Moncton, NB");
  const [adminSecret, setAdminSecret] = useState("");
  const [importStatus, setImportStatus] = useState("");
  const [placeTypes, setPlaceTypes] = useState([]);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const resp = await fetch(`${ROOT_API}/admin/place-types`);
        const data = await resp.json();
        if (resp.ok && Array.isArray(data.data)) {
          setPlaceTypes(data.data);
          // Ensure selected value is valid
          if (!data.data.find((t) => t.id === selectedServiceType)) {
            setSelectedServiceType(data.data[0]?.id || "hotels");
          }
        }
      } catch (_) {}
    };
    loadTypes();
  }, []);

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

  const handleImport = async () => {
    setImportStatus("Importing...");
    try {
      const resp = await fetch(
        `${ROOT_API}/admin/import/${selectedServiceType}?city=${encodeURIComponent(
          importCity
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-secret": adminSecret || "",
          },
        }
      );
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Import failed");
      setImportStatus(
        `OK: ${data.data?.inserted || 0} new, ${
          data.data?.updated || 0
        } updated (fetched ${data.data?.totalFetched || 0}).`
      );
      // Refresh companies cache in UI
      fetchCompanies();
    } catch (e) {
      setImportStatus(`Error: ${e.message}`);
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
      <ImportCard>
        <h2>Import companies from Google</h2>
        <ImportRow>
          <Label>Service type</Label>
          <Select value={selectedServiceType} onChange={(e) => setSelectedServiceType(e.target.value)}>
            {placeTypes.length > 0
              ? placeTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))
              : [
                  <option key="hotels" value="hotels">
                    Hotels
                  </option>,
                ]}
          </Select>
        </ImportRow>
        <ImportRow>
          <Label>City/Area</Label>
          <Input
            type="text"
            value={importCity}
            onChange={(e) => setImportCity(e.target.value)}
          />
        </ImportRow>
        <ImportRow>
          <Label>Admin secret</Label>
          <Input
            type="password"
            placeholder="Enter secret to authorize"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
          />
        </ImportRow>
        <SearchButton onClick={handleImport}>Import</SearchButton>
        {importStatus && <ImportStatus>{importStatus}</ImportStatus>}
      </ImportCard>
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
  padding: 10px 16px;
  font-size: 0.95rem;
  font-weight: 700;
  border: none;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(34,211,238,0.25); }
`;

const SearchInput = styled.input`
  width: calc(100% - 110px);
  padding: 10px 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface);
  color: var(--text);
  border-radius: 12px;
  font-size: 1rem;
  margin-bottom: 20px;
  margin-right: 10px;
  &:focus { outline: none; border-color: var(--primary-start); }
`;

const CompanyList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 12px 0 24px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const CompanyItem = styled.li`
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  backdrop-filter: blur(6px);
  padding: 14px 16px;
  transition: transform 0.18s ease, box-shadow 0.22s ease, border-color 0.22s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(0,0,0,0.35);
    border-color: var(--primary-start);
    cursor: pointer;
  }
`;

const ImportCard = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.25);
`;

const ImportRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 12px;
  align-items: center;
  margin: 10px 0;
`;

const Label = styled.label`
  font-weight: 700;
  color: var(--text);
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface);
  color: var(--text);
  border-radius: 12px;
  font-size: 1rem;
  &:focus { outline: none; border-color: var(--primary-start); }
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface);
  color: var(--text);
  border-radius: 12px;
  font-size: 1rem;
  &:focus { outline: none; border-color: var(--primary-start); }
`;

const ImportStatus = styled.div`
  margin-top: 12px;
  color: var(--muted);
`;

export default Admin;
