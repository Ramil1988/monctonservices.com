import { useState, useEffect } from "react";
import styled from "styled-components";
import UploadCompanyImage from "./UploadCompanyImage";

const ROOT_API = "/.netlify/functions/api";

const CompanyCreateForm = () => {
  const [setCompanies] = useState([]);
  const [notification, setNotification] = useState("");

  const [newCompany, setNewCompany] = useState({
    serviceType: "",
    name: "",
    address: "",
    phoneNumber: "",
    website: "",
    image: "",
    lat: "",
    lang: "",
  });

  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${ROOT_API}/allCompanies`);
      const data = await response.json();
      setCompanies(data.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    setNotification("Company created successfully!");

    try {
      const response = await fetch(`${ROOT_API}/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCompany),
      });

      await response.json();
      fetchCompanies();

      setNewCompany({
        serviceType: "",
        name: "",
        address: "",
        phoneNumber: "",
        website: "",
        image: "",
        lat: "",
        lang: "",
      });
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const handleNewCompanyChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  return (
    <>
      <h2>Create a new company</h2>
      <Form onSubmit={handleCreateCompany}>
        <Label>
          Service Type:
          <Input
            type="text"
            name="serviceType"
            value={newCompany.serviceType}
            onChange={handleNewCompanyChange}
            required
          />
        </Label>
        <Label>
          Name:
          <Input
            type="text"
            name="name"
            value={newCompany.name}
            onChange={handleNewCompanyChange}
            required
          />
        </Label>
        <Label>
          Address:
          <Input
            type="text"
            name="address"
            value={newCompany.address}
            onChange={handleNewCompanyChange}
            required
          />
        </Label>
        <Label>
          Phone Number:
          <Input
            type="text"
            name="phoneNumber"
            value={newCompany.phoneNumber}
            onChange={handleNewCompanyChange}
            required
          />
        </Label>
        <Label>
          Website:
          <Input
            type="text"
            name="website"
            value={newCompany.website}
            onChange={handleNewCompanyChange}
          />
        </Label>
        <Label>
          Lat:
          <Input
            type="text"
            name="lat"
            value={newCompany.lat}
            onChange={handleNewCompanyChange}
          />
        </Label>
        <Label>
          Long:
          <Input
            type="text"
            name="lang"
            value={newCompany.lang}
            onChange={handleNewCompanyChange}
          />
        </Label>
        <UploadCompanyImage
          newCompany={newCompany}
          setNewCompany={setNewCompany}
        />
        <Button type="submit">Create</Button>
      </Form>
      {notification && <Notification>{notification}</Notification>}
    </>
  );
};

const Notification = styled.div`
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  padding: 10px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  margin: 16px 0 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface);
  color: var(--text);
  border-radius: 12px;
  font-size: 1rem;
  margin-top: 6px;
  &:focus { outline: none; border-color: var(--primary-start); }
`;

const Button = styled.button`
  width: 220px;
  padding: 10px 16px;
  margin-top: 20px;
  border: none;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  transition: transform 0.15s ease, box-shadow 0.2s ease;

  &:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(34,211,238,0.25); }

  &[type="button"] {
    background: linear-gradient(90deg, #ef4444, #f97316);
    color: var(--pill-text);
  }
`;

export default CompanyCreateForm;
