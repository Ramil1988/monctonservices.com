import { useState, useEffect } from "react";
import styled from "styled-components";
import UploadCompanyImage from "./UploadCompanyImage";

const CompanyCreateForm = () => {
  const [setCompanies] = useState([]);
  const [notification, setNotification] = useState("");

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

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    setNotification("Company created successfully!");

    try {
      const response = await fetch("/company", {
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
        image: "",
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
        Image URL:
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
  background-color: #00cc00;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 8px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 20%;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  background-color: #333;
  color: #fff;

  &:hover {
    background-color: #444;
  }

  &[type="button"] {
    background-color: #cc0000;

    &:hover {
      background-color: #e60000;
    }
  }
`;

export default CompanyCreateForm;
