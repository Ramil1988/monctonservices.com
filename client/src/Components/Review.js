import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import Spinner from "./Spinner";
import ReviewUpdateForm from "./ReviewUpdateForm";
import { UserContext } from "./UserContext";

const Review = () => {
  const [review, setReview] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [author, setAuthor] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchReviewById();
  }, []);

  useEffect(() => {
    const isAuthor = () => {
      return currentUser && review && currentUser._id === review.userId;
    };

    if (review) {
      setAuthor(isAuthor());
    }
  }, [review, currentUser]);

  const fetchReviewById = async () => {
    try {
      const response = await fetch(`/review/${id}`);
      const data = await response.json();
      setReview(data.data);
    } catch (error) {
      console.error("Error fetching review by ID:", error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleUpdate = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/review/${id}`, {
        method: "DELETE",
      });

      if (response.status !== 200) {
        throw new Error("Failed to delete review");
      }

      setNotification({
        show: true,
        message: "Review deleted successfully!",
        type: "success",
      });
      setTimeout(() => {
        setNotification({ ...notification, show: false });
        goBack();
      }, 3000);
    } catch (error) {
      console.error("Error deleting review:", error);
      setNotification({
        show: true,
        message: "Failed to delete review.",
        type: "error",
      });
      setTimeout(() => setNotification({ ...notification, show: false }), 3000);
    }
  };

  const handleUpdateSubmit = async (updatedData) => {
    const result = await updateReviewById(id, updatedData);
    if (result && result.status === 200) {
      setReview(result.updatedReview);
      setShowUpdateForm(false);
      setNotification({
        show: true,
        message: "Review updated successfully!",
        type: "success",
      });
      setTimeout(() => setNotification({ ...notification, show: false }), 3000);
      fetchReviewById();
    } else {
      setNotification({
        show: true,
        message: "Failed to update review.",
        type: "error",
      });
      setTimeout(() => setNotification({ ...notification, show: false }), 3000);
    }
  };

  const updateReviewById = async (id, updateData) => {
    try {
      const response = await fetch(`/review/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.message);
      }

      return { status: response.status, updatedReview: data.data };
    } catch (error) {
      console.error("Error updating review by ID:", error);
    }
  };

  if (!review) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <>
      <ReviewWrapper>
        <ReviewHeader>
          <StyledNavlink to={`/company/${review.companyId}`}>
            <CompanyName>{review.companyName}</CompanyName>
          </StyledNavlink>
          <Rating>Rating: {review.grade} / 5</Rating>
        </ReviewHeader>
        <ReviewSubHeader>
          <ReviewTitle>{review.title}</ReviewTitle>
        </ReviewSubHeader>
        <ReviewContent>{review.text}</ReviewContent>
        <ReviewAuthor>
          Left by {review.userName}
          <ReviewDate>
            {" "}
            on {new Date(review.date).toLocaleDateString()}
          </ReviewDate>
        </ReviewAuthor>
      </ReviewWrapper>
      {showUpdateForm ? (
        <ReviewUpdateForm
          review={review}
          handleUpdateSubmit={handleUpdateSubmit}
          open={showUpdateForm}
          handleClose={() => setShowUpdateForm(false)}
        />
      ) : (
        <>
          {author && (
            <ActionButtonsContainer>
              <StyledUpdateButton onClick={handleUpdate}>
                Update
              </StyledUpdateButton>
              <StyledDeleteButton onClick={handleDelete}>
                Delete
              </StyledDeleteButton>
            </ActionButtonsContainer>
          )}
        </>
      )}
      <Notification show={notification.show} type={notification.type}>
        {notification.message}
      </Notification>
    </>
  );
};

const Notification = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 15px;
  max-width: 400px;
  height: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${({ type }) =>
    type === "success" ? "#27ae60" : "#c0392b"};
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition: opacity 0.3s ease-in-out;
`;

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  margin: 30px auto;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledNavlink = styled(NavLink)`
  text-decoration: none;
`;

const CompanyName = styled.h2`
  font-size: 1.7rem;
  font-weight: bold;
  color: #2c3e50;
`;

const Rating = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color: #e67e22;
`;

const ReviewSubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: bold;
  color: #8e44ad;
`;

const ReviewDate = styled.span`
  font-size: 1rem;
  color: #7f8c8d;
`;

const ReviewContent = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  color: #2c3e50;
  word-wrap: break-word;
`;

const ReviewAuthor = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #27ae60;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ActionButtonsContainer = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledUpdateButton = styled.button`
  margin: 5px;
  padding: 8px 12px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #3f51b5;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #2980b9;
  }
`;

const StyledDeleteButton = styled.button`
  margin: 5px;
  padding: 8px 12px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: red;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #c0392b;
  }
`;

export default Review;
