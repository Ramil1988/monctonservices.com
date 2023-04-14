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
    setStartIndex(startIndex === recentReviews.length - 3 ? 0 : startIndex + 3);
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
  justify-content: space-between;
  margin-top: 50px;
`;

const ReviewsContainer = styled.div`
  display: flex;
  gap: 20px;
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
`;

const ReviewAuthor = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const ReviewDate = styled.div`
  font-size: 14px;
  text-align: right;
  color: #777;
  margin-top: 10px;
`;

const ReviewCompany = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
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
`;

export default Reviews;