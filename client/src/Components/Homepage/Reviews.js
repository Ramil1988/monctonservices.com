import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight, AiFillStar } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Reviews = ({ reviews }) => {
  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {
    const sortedReviews = [...reviews].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setRecentReviews(sortedReviews.slice(0, 9));
  }, [reviews]);

  const [startIndex, setStartIndex] = useState(0);

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 3);
    }
  };

  const handleNext = () => {
    if (startIndex < recentReviews.length - 3) {
      setStartIndex(startIndex + 3);
    }
  };

  const visibleReviews = recentReviews.slice(startIndex, startIndex + 3);

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
              <ReviewAuthor>By {review.userName}</ReviewAuthor>
              <ReviewDate>On {formatDate(review.date)}</ReviewDate>
              <ReviewCompany>Company: {review.companyName}</ReviewCompany>
              <ReviewGrade>
                <AiFillStar />
                {review.grade}
              </ReviewGrade>
            </StyledLink>
          </Review>
        ))}
      </ReviewsContainer>
      <ReviewNavigation onClick={handleNext}>
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
  margin: 32px auto 0;
`;

const ReviewsContainer = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 1150px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const Review = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(255,255,255,0.06);
  color: #e5e7eb;
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  backdrop-filter: blur(6px);
  width: 320px;
  padding: 18px;
  transition: transform 0.18s ease, box-shadow 0.22s ease, border-color 0.22s ease;

  &:hover {
    transform: translateY(-6px);
    cursor: pointer;
    box-shadow: 0 18px 40px rgba(0,0,0,0.35);
    border-color: rgba(99, 102, 241, 0.45);
  }

  @media (max-width: 1150px) {
    width: 70vw;
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
  font-weight: 700;
  margin-bottom: 6px;
`;

const ReviewAuthor = styled.p`
  font-size: 14px;
  margin-bottom: 4px;
  color: #b0b8c2;
`;

const ReviewDate = styled.div`
  font-size: 12px;
  text-align: right;
  color: #94a3b8;
  margin-top: 4px;
`;

const ReviewCompany = styled.p`
  font-size: 14px;
  margin-bottom: 6px;
  color: #cbd5e1;
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
  background: rgba(255,255,255,0.08);
  color: #e5e7eb;
  margin: 0;
  border: 1px solid rgba(148, 163, 184, 0.25);
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
    border-color: rgba(99, 102, 241, 0.45);
  }
`;

export default Reviews;
