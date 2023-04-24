import React, { useState } from "react";
import styled from "styled-components";

const ReviewAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [review, setReview] = useState(null);
  const [notification, setNotification] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/review/${searchTerm}`);
      const data = await response.json();
      setReview(data.data);
    } catch (error) {
      console.error("Error fetching review by ID:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/review/${review._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setReview(null);
        setSearchTerm("");
        setNotification("The review has been deleted.");
        setTimeout(() => {
          setNotification("");
        }, 5000);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <ReviewAdminWrapper>
      <h2>Search and delete reviews</h2>
      <SearchInput
        type="text"
        placeholder="Enter review ID"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
      {notification && <Notification>{notification}</Notification>}
      {review && (
        <ReviewBox>
          <h2>{review.companyName}</h2>
          <h3>{review.title}</h3>
          <p>{review.text}</p>
          <ItalicP>Left by {review.userName}</ItalicP>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </ReviewBox>
      )}
    </ReviewAdminWrapper>
  );
};

const ReviewAdminWrapper = styled.div`
  margin-top: 30px;
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

const ReviewBox = styled.div`
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 10px;
  margin-top: 20px;
`;

const DeleteButton = styled.button`
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #dc3545;
    color: #ffffff;
  }
`;

const ItalicP = styled.p`
  font-style: italic;
`;

const Notification = styled.div`
  background-color: #dff0d8;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  font-size: 16px;
  margin-top: 20px;
  padding: 10px;
  text-align: center;
`;

export default ReviewAdmin;
