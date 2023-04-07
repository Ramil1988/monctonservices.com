import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";

const bookmarks = [
  { id: 1, provider: "Plumbing Services Inc." },
  { id: 2, provider: "Fitness Center" },
  { id: 3, provider: "Beauty Salon" },
];

const Profile = () => {
  const { user } = useAuth0();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchUserReviews();
  }, []);

  const fetchUserReviews = async () => {
    try {
      const response = await fetch(`/user/reviews/${user.sub}`);
      const data = await response.json();
      setReviews(data.data);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  };

  if (user) {
    console.log(user.sub);
  } else {
    console.log("User is not defined");
  }

  return (
    <ProfileWrapper>
      <Name>{user.name}</Name>
      <ReviewsWrapper>
        <h3>Reviews</h3>
        {reviews.map((review) => (
          <Review key={review._id}>
            <ReviewProvider>{review.provider}</ReviewProvider>
            <ReviewRating>{review.grade}</ReviewRating>
            <ReviewComment>{review.text}</ReviewComment>
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
