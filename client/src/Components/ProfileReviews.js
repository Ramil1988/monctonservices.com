import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProfileReviews = ({ reviews }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 3);
    }
  };

  const handleNext = () => {
    if (startIndex < reviews.length - 3) {
      setStartIndex(startIndex + 3);
    }
  };

  const visibleReviews = reviews.slice(startIndex, startIndex + 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ReviewsWrapper>
      <ReviewNavigation disabled={startIndex === 0} onClick={handlePrevious}>
        <AiOutlineLeft />
      </ReviewNavigation>
      <ReviewsContainer>
        {visibleReviews.map((review) => (
          <Review key={review._id}>
            <StyledLink to={`/review/${review._id}`}>
              <ReviewTitle>{review.title}</ReviewTitle>
              <ReviewDate>On {formatDate(review.date)}</ReviewDate>
              <ReviewCompany>Company: {review.company}</ReviewCompany>
              <ReviewGrade>
                <AiFillStar />
                {review.grade}
              </ReviewGrade>
            </StyledLink>
          </Review>
        ))}
      </ReviewsContainer>
      <ReviewNavigation
        disabled={startIndex >= reviews.length - 3}
        onClick={handleNext}
      >
        <AiOutlineRight />
      </ReviewNavigation>
    </ReviewsWrapper>
  );
};

const ReviewsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const ReviewsContainer = styled.div`
  display: flex;
  gap: 50px;
  margin: 0px 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Review = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: calc(33.33% - 20px);
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 1.3px 17.9px rgba(0, 0, 0, 0.182), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0 15px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const ReviewTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    font-size: 20px;
  }
`;

const ReviewDate = styled.div`
  font-size: 14px;
  text-align: right;
  color: #777;
  margin-top: 10px;

  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

const ReviewCompany = styled.p`
  font-size: 16px;
  margin-bottom: 10px;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

const ReviewGrade = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  margin: 15px;

  svg {
    color: gold;
    margin-right: 2px;
  }

  @media (max-width: 1024px) {
    font-size: 24px;
  }
`;

const ReviewNavigation = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  color: ${(props) => (props.disabled ? "#ccc" : "inherit")};
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};

  &:hover {
    color: ${(props) => (props.disabled ? "#ccc" : "#666")};
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
  }
`;

export default ProfileReviews;
