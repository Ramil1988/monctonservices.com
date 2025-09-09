import { useState, useEffect } from "react";
import styled from "styled-components";
import UploadCompanyImage from "./UploadCompanyImage";

const CompanyUpdateForm = ({ company, onUpdate, onDelete }) => {
  const [updatedCompany, setUpdatedCompany] = useState(company);
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    setUpdatedCompany({ ...updatedCompany, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedCompany);

    setNotification("Company updated successfully!");
  };

  const handleDelete = () => {
    onDelete(company._id);
    setNotification("Company deleted successfully!");
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
      <h2>Update an existing company</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          Service Type:
          <Input
            type="text"
            name="serviceType"
            value={updatedCompany.serviceType}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Name:
          <Input
            type="text"
            name="name"
            value={updatedCompany.name}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Address:
          <Input
            type="text"
            name="address"
            value={updatedCompany.address}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Phone Number:
          <Input
            type="text"
            name="phoneNumber"
            value={updatedCompany.phoneNumber}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Website:
          <Input
            type="text"
            name="website"
            value={updatedCompany.website}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Lat:
          <Input
            type="text"
            name="lat"
            value={updatedCompany.lat}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Long:
          <Input
            type="text"
            name="lang"
            value={updatedCompany.lang}
            onChange={handleChange}
          />
        </Label>
        Image URL:
        <UploadCompanyImage
          newCompany={updatedCompany}
          setNewCompany={setUpdatedCompany}
        />
        <ButtonWrapper>
          <Button type="submit">Update</Button>
          <Button type="button" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
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

export default CompanyUpdateForm;
