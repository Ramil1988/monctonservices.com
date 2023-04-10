import React from "react";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchUserReviews();
    fetchUserFavorites();
  }, []);

  const fetchUserReviews = async () => {
    try {
      const response = await fetch(`/user/${currentUser.sub}`);
      const data = await response.json();
      setReviews(data.data.reviews);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  };

  const fetchUserFavorites = async () => {
    try {
      const response = await fetch(`/user/${currentUser.sub}`);
      const data = await response.json();
      setFavorites(data.data.favorites);
      console.log(favorites);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  if (currentUser) {
    console.log(currentUser.sub);
  } else {
    console.log("User is not defined");
  }

  return (
    <ProfileWrapper>
      <Name>{currentUser.name}</Name>
      <ReviewsWrapper>
        <h3>Reviews</h3>
        {reviews &&
          reviews.map((review) => (
            <Review key={review._id}>
              <ReviewProvider>{review.provider}</ReviewProvider>
              <ReviewRating>{review.grade}</ReviewRating>
              <ReviewComment>{review.title}</ReviewComment>
            </Review>
          ))}
      </ReviewsWrapper>
      <BookmarksWrapper>
        <h3>Favorites</h3>
        {favorites &&
          favorites.map((favorite) => (
            <NavLink to={`/company/${favorite._id}`} key={favorite._id}>
              <Bookmark>{favorite.name}</Bookmark>
            </NavLink>
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
