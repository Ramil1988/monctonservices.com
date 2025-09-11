import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ROOT_API = "/.netlify/functions/api";

const PublicCompanyCreate = () => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [form, setForm] = useState({
    serviceType: "",
    name: "",
    address: "",
    phoneNumber: "",
    website: "",
    image: "",
  });
  const [status, setStatus] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);
  const [matches, setMatches] = useState([]);
  const [geo, setGeo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTypes = async () => {
      const cities = ["Moncton, NB", "Dieppe, NB", "Riverview, NB"];
      const map = new Map();
      try {
        for (const c of cities) {
          const resp = await fetch(`${ROOT_API}/service-types?city=${encodeURIComponent(c)}`);
          const data = await resp.json();
          const list = Array.isArray(data.data) ? data.data : [];
          list.forEach((t) => { if (!map.has(t.id)) map.set(t.id, t); });
        }
      } catch (_) {}
      const union = Array.from(map.values()).sort((a,b)=>a.name.localeCompare(b.name));
      setServiceTypes(union);
      if (union.length && !form.serviceType) setForm((f)=>({...f, serviceType: union[0].id }));
    };
    loadTypes();
  }, []);

  // Load existing companies (tri-city only) for suggestion/autofill
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const resp = await fetch(`${ROOT_API}/allCompanies`);
        const data = await resp.json();
        const tri = ["moncton", "dieppe", "riverview"];
        const list = Array.isArray(data.data) ? data.data.filter((c)=>{
          const a = (c.address || "").toLowerCase();
          return tri.some((t)=>a.includes(t));
        }) : [];
        setAllCompanies(list);
      } catch (_) {}
    };
    loadCompanies();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === 'name') {
      const v = (value || '').toLowerCase().trim();
      if (v.length >= 2) {
        const m = allCompanies
          .filter(c => (c.name || '').toLowerCase().includes(v))
          .slice(0, 6);
        setMatches(m);
      } else {
        setMatches([]);
      }
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      // Validate tri-city
      const addr = (form.address || '').toLowerCase();
      const tri = ["moncton", "dieppe", "riverview"];
      let geocity = (geo?.city || '').toLowerCase();
      const inTri = tri.some(t => addr.includes(t)) || tri.some(t => geocity.includes(t));
      if (!inTri) {
        const ok = window.confirm("The address appears outside Moncton/Dieppe/Riverview. Continue?");
        if (!ok) { setStatus("Submission cancelled."); return; }
      }
      const resp = await fetch(`${ROOT_API}/company`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Failed to create");
      const newId = data.createdCompanyId || data.createdCompany?._id;
      setStatus("Thank you! Company submitted successfully. Redirecting...");
      setTimeout(() => {
        if (newId) {
          navigate(`/company/${newId}`, { state: { toast: "Company submitted successfully" } });
        }
      }, 800);
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  };

  const onDetectGeo = async () => {
    if (!form.address) { setStatus("Enter an address first"); return; }
    setStatus("Detecting location...");
    try {
      const resp = await fetch(`${ROOT_API}/geocode?address=${encodeURIComponent(form.address)}`);
      const data = await resp.json();
      if (data?.data) {
        const g = data.data;
        setGeo(g);
        setForm((f)=>({ ...f, lat: g.lat || '', lang: g.lang || '', address: g.formatted || f.address }));
        setStatus("Location detected");
      } else {
        setStatus(`Could not detect location${data?.message ? ` (${data.message})` : ''}`);
      }
    } catch (e) {
      setStatus(`Geocode failed: ${e.message}`);
    }
  };

  return (
    <Wrap>
      <Card>
        <HeaderRow>
          <Back type="button" onClick={() => navigate(-1)}>Back</Back>
          <Title>Add a new company</Title>
        </HeaderRow>
        <Form onSubmit={onSubmit}>
          {matches.length > 0 && (
            <Suggestions>
              <Small>Possible duplicates (click to autofill fields):</Small>
              {matches.map((c) => (
                <SuggestionRow key={c._id} onClick={() => setForm((f)=>({
                  ...f,
                  name: c.name || f.name,
                  address: c.address || f.address,
                  phoneNumber: c.phoneNumber || f.phoneNumber,
                  website: c.website || f.website,
                }))}>
                  <b>{c.name}</b>
                  <span>{c.address}</span>
                </SuggestionRow>
              ))}
            </Suggestions>
          )}
          <Label>Service type</Label>
          <Select name="serviceType" value={form.serviceType} onChange={onChange} required>
            {serviceTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </Select>

          <Label>Company name</Label>
          <Input name="name" value={form.name} onChange={onChange} required />

          <Label>Address</Label>
          <Row>
            <Input name="address" value={form.address} onChange={onChange} required />
            <GeoButton type="button" onClick={onDetectGeo}>Detect lat/lng</GeoButton>
          </Row>

          <Row>
            <Col>
              <Label>Phone</Label>
              <Input name="phoneNumber" value={form.phoneNumber} onChange={onChange} />
            </Col>
            <Col>
              <Label>Website</Label>
              <Input name="website" value={form.website} onChange={onChange} />
            </Col>
          </Row>

          <Label>Image (optional)</Label>
          <Input type="file" accept="image/*" onChange={onFileChange} />

          <DetailsRow>
            <Col>
              <Label>Latitude (optional)</Label>
              <Input name="lat" value={form.lat || ''} onChange={onChange} />
            </Col>
            <Col>
              <Label>Longitude (optional)</Label>
              <Input name="lang" value={form.lang || ''} onChange={onChange} />
            </Col>
          </DetailsRow>

          <Submit type="submit">Submit</Submit>
          {status && <Status>{status}</Status>}
        </Form>
      </Card>
    </Wrap>
  );
};

export default PublicCompanyCreate;

const Wrap = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px 60px;
`;

const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  padding: 20px;
`;

const Title = styled.h1`
  margin: 0 0 12px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: 700;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface);
  color: var(--text);
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface);
  color: var(--text);
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const Submit = styled.button`
  margin-top: 10px;
  padding: 10px 14px;
  border: none;
  border-radius: 999px;
  font-weight: 700;
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  cursor: pointer;
`;

const Status = styled.div`
  margin-top: 8px;
  color: var(--muted);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 700px){
    grid-template-columns: 1fr;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Suggestions = styled.div`
  background: var(--surface);
  border: 1px dashed var(--surface-border);
  border-radius: 12px;
  padding: 10px;
`;

const SuggestionRow = styled.div`
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  display: grid;
  gap: 2px;
  &:hover { background: rgba(0,0,0,0.05); }
  b { color: var(--text); }
  span { color: var(--muted); font-size: 0.9rem; }
`;

const Small = styled.div`
  font-size: 0.85rem;
  color: var(--muted);
  margin-bottom: 6px;
`;

const DetailsRow = styled(Row)`
  margin-top: 6px;
  grid-template-columns: 1fr 1fr;
`;

const GeoButton = styled.button`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  white-space: nowrap;
  height: 100%;
`;

const Back = styled.button`
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
`;
