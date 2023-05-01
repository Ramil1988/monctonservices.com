import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../Helper/Spinner";
import ReviewUpdateForm from "./ReviewUpdateForm";
import { UserContext } from "../UserContext";

const Review = () => {
  const [review, setReview] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [author, setAuthor] = useState(false);
  const [commentFormVisible, setCommentFormVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsVersion, setCommentsVersion] = useState(0);

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchReviewById();
  }, [commentsVersion]);

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

  const handleAddCommentClick = () => {
    setCommentFormVisible(!commentFormVisible);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCancelCommentClick = () => {
    setComment("");
    setCommentFormVisible(false);
  };

  const handleSubmitCommentClick = async () => {
    const newComment = {
      date: new Date().toISOString(),
      user: currentUser.nickname,
      text: comment,
    };

    try {
      const response = await fetch(`/review/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: newComment }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.message);
      }

      setReview({
        ...review,
        comments: data.data.comments,
      });

      setComment("");
      setCommentFormVisible(false);
      setCommentsVersion(commentsVersion + 1);

      setNotification({
        show: true,
        message: "Comment added successfully!",
        type: "success",
      });
      setTimeout(() => setNotification({ ...notification, show: false }), 3000);
    } catch (error) {
      console.error("Error adding comment:", error);

      setNotification({
        show: true,
        message: "Failed to add comment.",
        type: "error",
      });
      setTimeout(() => setNotification({ ...notification, show: false }), 3000);
    }
  };

  const handleDeleteComment = async (commentDate) => {
    try {
      const response = await fetch(`/review/${id}/comments/${commentDate}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.message);
      }

      setReview({
        ...review,
        comments: data.updatedCompany.reviews.find((r) => r._id === id)
          .comments,
      });
      setCommentsVersion(commentsVersion + 1);

      setNotification({
        show: true,
        message: "Comment deleted successfully!",
        type: "success",
      });
      setTimeout(() => setNotification({ ...notification, show: false }), 3000);
    } catch (error) {
      console.error("Error deleting comment:", error);

      setNotification({
        show: true,
        message: "Failed to delete comment.",
        type: "error",
      });
      setTimeout(() => setNotification({ ...notification, show: false }), 3000);
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
      <BigText>Comments</BigText>
      {review.comments &&
        review.comments.map((comment, index) => (
          <Comment key={index}>
            <CommentHeader>
              <Nickname>{comment.user}</Nickname>
              <div>
                <Time>{new Date(comment.date).toLocaleDateString()}</Time>
                {currentUser.nickname === comment.user && (
                  <StyledDeleteCommentButton
                    onClick={() => {
                      handleDeleteComment(comment.date);
                    }}
                  >
                    X
                  </StyledDeleteCommentButton>
                )}
              </div>
            </CommentHeader>
            <div>{comment.text}</div>
          </Comment>
        ))}
      {commentFormVisible ? (
        <CommentForm>
          <CommentInput
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your comment here..."
          />
          <StyledCancelButton onClick={handleCancelCommentClick}>
            Cancel
          </StyledCancelButton>
          <StyledSubmitButton onClick={handleSubmitCommentClick}>
            Comment
          </StyledSubmitButton>
        </CommentForm>
      ) : (
        <AddCommentButtonContainer>
          <StyledAddCommentButton onClick={handleAddCommentClick}>
            Add comment
          </StyledAddCommentButton>
        </AddCommentButtonContainer>
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
  margin: 1rem;
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

const BigText = styled.h1`
  margin: 40px 20px;
  color: black;
  font-family: Aeroport, -apple-system, "system-ui", "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 30px 10px;
  }
`;

const Comment = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 5px;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const CommentForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
`;

const CommentInput = styled.input`
  flex-grow: 1;
  margin-right: 1rem;
  margin-left: 3.5rem;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AddCommentButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
`;
const StyledAddCommentButton = styled.button`
  padding: 8px 12px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #8e44ad;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #9b59b6;
  }
`;

const StyledCancelButton = styled.button`
  margin-left: 5px;
  padding: 8px 12px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #c0392b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #e74c3c;
  }
`;

const StyledSubmitButton = styled.button`
  margin-left: 5px;
  padding: 8px 12px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #27ae60;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #2ecc71;
  }
`;
const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Nickname = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Time = styled.span`
  font-size: 0.9rem;
  color: #777;
`;

const StyledDeleteCommentButton = styled.button`
  margin-left: 10px;
  padding: 2px 8px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #c0392b;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #e74c3c;
  }
`;

export default Review;
