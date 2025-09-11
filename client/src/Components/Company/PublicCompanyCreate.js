import React, { useEffect, useMemo, useState } from "react";
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

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
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
      const resp = await fetch(`${ROOT_API}/company`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Failed to create");
      setStatus("Thank you! Company submitted successfully.");
      setForm({ serviceType: serviceTypes[0]?.id || "", name: "", address: "", phoneNumber: "", website: "", image: "" });
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <Wrap>
      <Card>
        <Title>Add a new company</Title>
        <Form onSubmit={onSubmit}>
          <Label>Service type</Label>
          <Select name="serviceType" value={form.serviceType} onChange={onChange} required>
            {serviceTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </Select>

          <Label>Company name</Label>
          <Input name="name" value={form.name} onChange={onChange} required />

          <Label>Address</Label>
          <Input name="address" value={form.address} onChange={onChange} required />

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
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface);
  color: var(--text);
  border-radius: 12px;
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
  gap: 10px;

  @media (max-width: 700px){
    grid-template-columns: 1fr;
  }
`;

const Col = styled.div``;

