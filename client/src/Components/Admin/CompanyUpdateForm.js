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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
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

export default CompanyUpdateForm;
