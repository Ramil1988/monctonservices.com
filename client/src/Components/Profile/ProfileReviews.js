import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const ROOT_API = "/.netlify/functions/api";

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
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

const ReviewsContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const Review = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.25);
  padding: 18px;
  width: 320px;
  transition: transform 0.18s ease, box-shadow 0.22s ease, border-color 0.22s ease;

  &:hover {
    transform: translateY(-6px);
    cursor: pointer;
    box-shadow: 0 18px 40px rgba(0,0,0,0.35);
    border-color: var(--primary-start);
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
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 6px;
`;

const ReviewDate = styled.div`
  font-size: 12px;
  text-align: right;
  color: var(--muted);
  margin-top: 4px;
`;

const ReviewCompany = styled.p`
  font-size: 14px;
  margin-bottom: 6px;
  color: var(--muted);
`;

const ReviewGrade = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin: 8px;

  svg {
    color: #fbbf24;
    margin-right: 6px;
  }
`;

const ReviewNavigation = styled.button`
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--surface-border);
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  font-size: 22px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.22s ease;
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0,0,0,0.25);
    border-color: var(--primary-start);
  }
`;

export default ProfileReviews;
