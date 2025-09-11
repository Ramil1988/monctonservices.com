import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const ROOT_API = "/.netlify/functions/api";

const ProfileReviews = ({ reviews }) => {
  const [startIndex, setStartIndex] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(3);
  
  React.useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(Math.max(0, startIndex - itemsPerPage));
    }
  };

  const handleNext = () => {
    if (startIndex < reviews.length - itemsPerPage) {
      setStartIndex(Math.min(reviews.length - itemsPerPage, startIndex + itemsPerPage));
    }
  };

  const visibleReviews = reviews.slice(startIndex, startIndex + itemsPerPage);

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
      <ReviewNavigation disabled={startIndex === 0 || reviews.length === 0} onClick={handlePrevious}>
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
        disabled={startIndex >= reviews.length - itemsPerPage || reviews.length === 0}
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
  gap: clamp(8px, 2vw, 16px);
  margin-top: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const ReviewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(12px, 3vw, 20px);
  width: 100%;
  max-width: 900px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: clamp(16px, 4vw, 24px);
  min-height: 160px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: var(--primary-start);
    
    &::before {
      transform: scaleX(1);
    }
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

const ReviewTitle = styled.h3`
  font-size: clamp(16px, 3vw, 18px);
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReviewDate = styled.div`
  font-size: clamp(11px, 2vw, 12px);
  color: var(--muted);
  margin: 4px 0;
  font-weight: 500;
`;

const ReviewCompany = styled.p`
  font-size: clamp(13px, 2.5vw, 14px);
  margin-bottom: 8px;
  color: var(--muted);
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReviewGrade = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(16px, 3vw, 18px);
  font-weight: 700;
  margin-top: auto;
  padding: 8px 12px;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 20px;
  gap: 4px;

  svg {
    color: #fbbf24;
  }
`;

const ReviewNavigation = styled.button`
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--surface-border);
  width: clamp(36px, 8vw, 48px);
  height: clamp(36px, 8vw, 48px);
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: clamp(16px, 3vw, 20px);
  cursor: pointer;
  transition: all 0.2s ease;
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  flex-shrink: 0;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: var(--primary-start);
    color: white;
    border-color: var(--primary-start);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    position: relative;
    z-index: 1;
  }
`;

export default ProfileReviews;
