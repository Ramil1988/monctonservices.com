import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const reviews = [
  {
    id: 1,
    provider: "Plumbing Services Inc.",
    rating: 4.5,
    comment:
      "Excellent service! The plumber arrived on time and was able to fix the issue quickly.",
  },
  {
    id: 2,
    provider: "Fitness Center",
    rating: 3.0,
    comment:
      "The gym was too crowded and some of the equipment was not working properly.",
  },
];

const bookmarks = [
  { id: 1, provider: "Plumbing Services Inc." },
  { id: 2, provider: "Fitness Center" },
  { id: 3, provider: "Beauty Salon" },
];

const Profile = () => {
  const { user } = useAuth0();
  console.log(user);

  return (
    <ProfileWrapper>
      <Name>
        {user.given_name} {} {user.family_name}{" "}
      </Name>

      <ReviewsWrapper>
        <h3>Reviews</h3>
        {reviews.map((review) => (
          <Review key={review.id}>
            <ReviewProvider>{review.provider}</ReviewProvider>
            <ReviewRating>{review.rating}</ReviewRating>
            <ReviewComment>{review.comment}</ReviewComment>
          </Review>
        ))}
      </ReviewsWrapper>

      <BookmarksWrapper>
        <h3>Bookmarks</h3>
        {bookmarks.map((bookmark) => (
          <Bookmark key={bookmark.id}>{bookmark.provider}</Bookmark>
        ))}
      </BookmarksWrapper>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Name = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ReviewsWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Review = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewProvider = styled.div`
  font-weight: 600;
  margin-right: 1rem;
  color: #3498db;
`;

const ReviewRating = styled.div`
  font-weight: 600;
  color: #e67e22;
  margin-right: 1rem;
`;

const ReviewComment = styled.div`
  flex: 1;
`;

const BookmarksWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Bookmark = styled.div`
  margin-bottom: 1rem;
  font-weight: 600;
`;

export default Profile;
