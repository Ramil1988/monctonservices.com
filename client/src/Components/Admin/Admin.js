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
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [importCity, setImportCity] = useState("Moncton, NB");
  const [adminSecret, setAdminSecret] = useState("");
  const [importStatus, setImportStatus] = useState("");
  const [placeTypes, setPlaceTypes] = useState([]);
  const [onlyNew, setOnlyNew] = useState(true);
  const [purgeStatus, setPurgeStatus] = useState("");

  // Admin dropdown: show a union list for the cities in the input
  // Build from cached per-city results in localStorage; fall back to stored union
  useEffect(() => {
    const inputCities = (importCity || "")
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
    const defaultCities = ["Moncton, NB", "Dieppe, NB", "Riverview, NB"];
    const cities = inputCities.length ? Array.from(new Set(inputCities)) : defaultCities;
    const unionMap = new Map();
    cities.forEach((c) => {
      try {
        const raw = localStorage.getItem(`placeTypes:${c}`);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return;
        parsed.forEach((t) => {
          if (!unionMap.has(t.id)) unionMap.set(t.id, t);
        });
      } catch (_) {}
    });
    let union = [];
    if (unionMap.size > 0) {
      union = Array.from(unionMap.values());
    } else {
      try {
        const raw = localStorage.getItem("placeTypes:TriCitiesUnion");
        const parsed = raw ? JSON.parse(raw) : [];
        union = Array.isArray(parsed) ? parsed : [];
      } catch (_) {}
    }
    // Manual override: ensure Auto dealers appears regardless of discovery
    if (!union.some((t) => t.id === "car_dealer")) {
      union.push({ id: "car_dealer", name: "Car dealer" });
    }
    union = union.sort((a, b) => a.name.localeCompare(b.name));
    setPlaceTypes(union);
    setSelectedServiceType(union[0]?.id || "");
  }, [importCity]);

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
      const cities = importCity
        .split(/[,;\n]/)
        .map((s) => s.trim())
        .filter(Boolean);
      const uniqueCities = Array.from(new Set(cities.length ? cities : [importCity]));

      let agg = { inserted: 0, updated: 0, skippedExisting: 0, totalFetched: 0 };
      for (const city of uniqueCities) {
        const resp = await fetch(
          `${ROOT_API}/admin/import/${selectedServiceType}?city=${encodeURIComponent(
            city
          )}&onlyNew=${onlyNew}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-admin-secret": adminSecret || "",
            },
          }
        );
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.message || `Import failed for ${city}`);
        agg.inserted += data.data?.inserted || 0;
        agg.updated += data.data?.updated || 0;
        agg.skippedExisting += data.data?.skippedExisting || 0;
        agg.totalFetched += data.data?.totalFetched || 0;
      }
      setImportStatus(
        `OK across ${uniqueCities.length} city(ies): ${agg.inserted} new, ${agg.updated} updated, ${agg.skippedExisting} skipped. Fetched ${agg.totalFetched}.`
      );
      // Refresh companies cache in UI
      fetchCompanies();
      // Trigger union rebuild via importCity change effect
      setImportCity(uniqueCities.join(", "));
    } catch (e) {
      setImportStatus(`Error: ${e.message}`);
    }
  };

  const handleImportAll = async () => {
    if (!placeTypes.length) {
      setImportStatus("No service types available to import. Discover first.");
      return;
    }
    setImportStatus("Importing all types...");
    try {
      const cities = importCity
        .split(/[,;\n]/)
        .map((s) => s.trim())
        .filter(Boolean);
      const uniqueCities = Array.from(new Set(cities.length ? cities : [importCity]));

      let agg = { inserted: 0, updated: 0, skippedExisting: 0, totalFetched: 0 };
      for (const city of uniqueCities) {
        for (let i = 0; i < placeTypes.length; i++) {
          const t = placeTypes[i];
          // preserve UI feedback occasionally
          if (i % 5 === 0) setImportStatus(`Importing ${i + 1}/${placeTypes.length} for ${city}...`);
          const resp = await fetch(
            `${ROOT_API}/admin/import/${encodeURIComponent(t.id)}?city=${encodeURIComponent(
              city
            )}&onlyNew=${onlyNew}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-admin-secret": adminSecret || "",
              },
            }
          );
          const data = await resp.json();
          if (!resp.ok) throw new Error(data.message || `Import failed for ${t.name} in ${city}`);
          agg.inserted += data.data?.inserted || 0;
          agg.updated += data.data?.updated || 0;
          agg.skippedExisting += data.data?.skippedExisting || 0;
          agg.totalFetched += data.data?.totalFetched || 0;
        }
      }
      setImportStatus(
        `ALL DONE across ${uniqueCities.length} city(ies) and ${placeTypes.length} type(s): ${agg.inserted} new, ${agg.updated} updated, ${agg.skippedExisting} skipped. Fetched ${agg.totalFetched}.`
      );
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
          <Select
            value={selectedServiceType}
            onChange={(e) => setSelectedServiceType(e.target.value)}
            disabled={placeTypes.length === 0}
          >
            {placeTypes.length === 0 ? (
              <option>Discover types for city first</option>
            ) : (
              placeTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))
            )}
          </Select>
        </ImportRow>
        <RowButtons>
          <SearchButton
            onClick={async () => {
              setImportStatus("Discovering types...");
              try {
                const cities = importCity
                  .split(/[,;\n]/)
                  .map((s) => s.trim())
                  .filter(Boolean);
                const uniqueCities = Array.from(new Set(cities.length ? cities : [importCity]));

                let totalDiscovered = 0;
                for (const city of uniqueCities) {
                  const resp = await fetch(
                    `${ROOT_API}/admin/discover-place-types?city=${encodeURIComponent(
                      city
                    )}&onlyNew=${onlyNew}`,
                    { headers: { "x-admin-secret": (adminSecret || "").trim() } }
                  );
                  const data = await resp.json();
                  if (!resp.ok) throw new Error(data.message || `Failed to discover for ${city}`);
                  const list = data.data || [];
                  totalDiscovered += list.length;
                  try {
                    localStorage.setItem(`placeTypes:${city}`, JSON.stringify(list));
                  } catch (_) {}
                }

                setImportStatus(`Discovered types for ${uniqueCities.length} city(ies); total ${totalDiscovered} entries.`);

                // Rebuild union for dropdown (union of the same cities input)
                try {
                  const unionMap = new Map();
                  uniqueCities.forEach((c) => {
                    const raw = localStorage.getItem(`placeTypes:${c}`);
                    if (!raw) return;
                    const parsed = JSON.parse(raw);
                    if (!Array.isArray(parsed)) return;
                    parsed.forEach((t) => {
                      if (!unionMap.has(t.id)) unionMap.set(t.id, t);
                    });
                  });
                  let union = Array.from(unionMap.values());
                  if (!union.some((t) => t.id === "car_dealer")) {
                    union.push({ id: "car_dealer", name: "Car dealer" });
                  }
                  union = union.sort((a, b) => a.name.localeCompare(b.name));
                  setPlaceTypes(union);
                  setSelectedServiceType(union[0]?.id || "");
                  localStorage.setItem("placeTypes:TriCitiesUnion", JSON.stringify(union));
                } catch (_) {
                  // ignore
                }
              } catch (e) {
                setImportStatus(`Error: ${e.message}`);
              }
            }}
          >
            Discover types for city
          </SearchButton>
          {/* No separate button; discovery now populates list directly */}
        </RowButtons>
        <ImportRow>
          <Label>City/Area</Label>
          <Input
            type="text"
            placeholder="e.g. Moncton, NB, Dieppe, NB, Riverview, NB"
            value={importCity}
            onChange={(e) => setImportCity(e.target.value)}
          />
        </ImportRow>
        <ImportRow>
          <Label>Only new</Label>
          <input
            type="checkbox"
            checked={onlyNew}
            onChange={(e) => setOnlyNew(e.target.checked)}
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
        <RowButtons>
          <SearchButton onClick={handleImport} disabled={!selectedServiceType}>
            Import selected type
          </SearchButton>
          <SearchButton onClick={handleImportAll} disabled={!placeTypes.length}>
            Import ALL types
          </SearchButton>
        </RowButtons>
        {importStatus && <ImportStatus>{importStatus}</ImportStatus>}

        <Divider />
        <h3>Switch entirely to Google data</h3>
        <p style={{ color: "var(--muted)", marginTop: 4 }}>
          Remove previously added companies (manual/non‑Google). This keeps only
          records imported via Google.
        </p>
        <RowButtons>
          <DangerButton
            onClick={async () => {
              setPurgeStatus("Purging non‑Google companies...");
              try {
                const resp = await fetch(
                  `${ROOT_API}/admin/companies/purge?mode=non-google`,
                  {
                    method: "POST",
                    headers: { "x-admin-secret": adminSecret || "" },
                  }
                );
                const data = await resp.json();
                if (!resp.ok) throw new Error(data.message || "Purge failed");
                setPurgeStatus(
                  `Removed ${data.data?.deleted || 0} non‑Google companies.`
                );
                fetchCompanies();
              } catch (e) {
                setPurgeStatus(`Error: ${e.message}`);
              }
            }}
          >
            Purge non‑Google
          </DangerButton>
          <DangerButton
            onClick={async () => {
              if (!window.confirm("Delete ALL companies? This cannot be undone.")) return;
              setPurgeStatus("Purging ALL companies...");
              try {
                const resp = await fetch(
                  `${ROOT_API}/admin/companies/purge?mode=all`,
                  {
                    method: "POST",
                    headers: { "x-admin-secret": adminSecret || "" },
                  }
                );
                const data = await resp.json();
                if (!resp.ok) throw new Error(data.message || "Purge failed");
                setPurgeStatus(`Removed ${data.data?.deleted || 0} companies.`);
                fetchCompanies();
              } catch (e) {
                setPurgeStatus(`Error: ${e.message}`);
              }
            }}
          >
            Purge ALL
          </DangerButton>
        </RowButtons>
        {purgeStatus && <ImportStatus>{purgeStatus}</ImportStatus>}
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

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--surface-border);
  margin: 16px 0;
`;

const RowButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const DangerButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 999px;
  font-weight: 700;
  background: linear-gradient(90deg, #ef4444, #f97316);
  color: var(--pill-text);
  cursor: pointer;
`;

export default Admin;
