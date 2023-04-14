import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ProfileReviews from "./ProfileReviews";

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
      const sortedReviews = data.data.reviews.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setReviews(sortedReviews);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  };

  const fetchUserFavorites = async () => {
    try {
      const response = await fetch(`/user/${currentUser.sub}`);
      const data = await response.json();
      setFavorites(data.data.favorites);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  const handleRemoveFavoriteClick = async (event, companyId) => {
    event.stopPropagation();
  
    try {
      const response = await fetch(`/user/remove-favorite/${currentUser.sub}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId: companyId,
        }),
      });

      if (response.ok) {
        fetchUserFavorites();
      } else {
        console.error("Error removing favorite");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <ProfileWrapper>
      <Name>
        <span>Nice to see you again</span> {currentUser.name}!
      </Name>
      <SectionWrapper>
        <h2>Your Reviews</h2>
        <ProfileReviews reviews={reviews} />
      </SectionWrapper>
      <SectionWrapper>
        <h2>Favorites</h2>
        <FavoriteGrid>
          {favorites &&
            favorites.map((favorite) => (
              <FavoriteContainer key={favorite._id}>
                <Bookmark>
                  <HeaderWrapper>
                    <StyledNavLink to={`/company/${favorite._id}`}>
                      <FavoriteName>{favorite.name}</FavoriteName>
                    </StyledNavLink>
                    <RemoveFavoriteButton
                      onClick={(event) =>
                        handleRemoveFavoriteClick(event, favorite._id)
                      }
                    >
                      <CloseIcon />
                    </RemoveFavoriteButton>
                  </HeaderWrapper>
                  <StyledNavLink to={`/company/${favorite._id}`}>
                    <FavoriteType>{favorite.serviceType}</FavoriteType>
                  </StyledNavLink>
                </Bookmark>
              </FavoriteContainer>
            ))}
        </FavoriteGrid>
      </SectionWrapper>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const blinkCursor = keyframes`
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: black;
  }
`;
const Name = styled.h2`
  font-size: 1.8rem;
  font-family: Aeroport, -apple-system, "system-ui", "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 700;
  line-height: 44px;
  margin-bottom: 1rem;
  overflow: hidden;
  white-space: nowrap;
  animation: ${typing} 3s steps(60, end), ${blinkCursor} 0.5s step-end infinite;
  animation-fill-mode: forwards;

  & span {
    font-style: italic;
  }
`;

const SectionWrapper = styled.div`
  margin-bottom: 2rem;
  width: 100%;
`;

const FavoriteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1.5rem;
  padding: 1rem;

  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FavoriteContainer = styled.div`
  margin-right: 1.5rem;
`;

const StyledNavLink = styled(Link)`
  font-size: 1rem;
  color: black;
  text-decoration: none;
  position: relative;
`;

const Bookmark = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  padding: 15px;
  width: 100%;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RemoveFavoriteButton = styled(IconButton)`
  color: #e74c3c;
  padding: 0;
  background-color: #fff;
  border-radius: 50%;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const FavoriteName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const FavoriteType = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
  font-style: italic;
`;

export default Profile;
