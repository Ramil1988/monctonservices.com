import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "./Spinner";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Review = () => {
  const [review, setReview] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviewById();
  }, []);

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

  if (!review) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <>
      <BackButtonWrapper>
        <BackButton onClick={goBack}>
          <AiOutlineArrowLeft />
        </BackButton>
      </BackButtonWrapper>
      <ReviewWrapper>
        {" "}
        <ReviewHeader>
          <CompanyName>{review.companyName}</CompanyName>
          <Rating>Rating: {review.grade} / 5</Rating>
        </ReviewHeader>
        <ReviewSubHeader>
          <ReviewTitle>{review.title}</ReviewTitle>
        </ReviewSubHeader>
        <ReviewContent>{review.text}</ReviewContent>
        <ReviewAuthor>
          {" "}
          Left by {review.userName}
          <ReviewDate>
            {" "}
            on {new Date(review.date).toLocaleDateString()}
          </ReviewDate>
        </ReviewAuthor>
      </ReviewWrapper>
    </>
  );
};

const BackButtonWrapper = styled.div`
  margin: 2rem;
`;

const BackButton = styled.button`
  font-size: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #666;
  }
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

const CompanyName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
`;

const Rating = styled.span`
  font-size: 1.2rem;
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
  font-size: 1.2rem;
  font-weight: bold;
  color: #8e44ad;
`;

const ReviewDate = styled.span`
  font-size: 1rem;
  color: #7f8c8d;
`;

const ReviewContent = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  color: #2c3e50;
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

export default Review;
