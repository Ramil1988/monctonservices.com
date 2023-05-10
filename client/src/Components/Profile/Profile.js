import React from "react";
import styled from "styled-components";
import logo from "../../Pictures/avatar.png";
import { keyframes } from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ProfileReviews from "./ProfileReviews";
import EditProfileForm from "./EditProfileForm";
import UploadProfileImage from "./UploadProfileImage";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const ROOT_API = "https://monctonservices-com.onrender.com";

const Profile = () => {
  const [user, setUser] = useState();
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showUploadImageForm, setShowUploadImageForm] = useState(false);

  const [refreshData, setRefreshData] = useState(true);

  const handleRefreshData = () => {
    setRefreshData(!refreshData);
  };

  useEffect(() => {
    if (refreshData) {
      fetchUser();
      setRefreshData(false);
    }
  }, [refreshData]);

  const { profileId } = useParams();

  const handleClickAway = () => {
    setShowUploadImageForm(false);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`${ROOT_API}/user/${profileId}`);
      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchUserReviews();
    fetchUserFavorites();
  }, []);

  const fetchUserReviews = async () => {
    try {
      const response = await fetch(`${ROOT_API}/user/${profileId}`);
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
      const response = await fetch(`${ROOT_API}/user/${profileId}`);
      const data = await response.json();
      setFavorites(data.data.favorites);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  const handleRemoveFavoriteClick = async (event, companyId) => {
    event.stopPropagation();

    try {
      const response = await fetch(
        `${ROOT_API}/user/remove-favorite/${user._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId: companyId,
          }),
        }
      );

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
      {user && (
        <>
          <SideWrapper>
            <Sidebar>
              <SidebarTop>
                <ProfileImage
                  src={user.image ? user.image : logo}
                  onClick={() => setShowUploadImageForm(true)}
                />
                {showUploadImageForm && (
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <GridItem>
                      <UploadProfileImage user={user} setUser={setUser} />
                    </GridItem>
                  </ClickAwayListener>
                )}
                <NameFields>
                  <StyledSpan>Name:</StyledSpan> {user.name}
                </NameFields>
                <NameFields>
                  <StyledSpan>Nickname:</StyledSpan> {user.nickname}
                </NameFields>
                <NameFields>
                  <StyledSpan>email:</StyledSpan> {user.email}
                </NameFields>
                <EditProfile onClick={() => setShowEditForm(true)}>
                  <EditIcon fontSize="small" />
                  <span>Edit profile</span>
                </EditProfile>
              </SidebarTop>
              {showEditForm && (
                <EditProfileForm
                  open={showEditForm}
                  handleClose={() => setShowEditForm(false)}
                  handleRefreshData={handleRefreshData}
                />
              )}
              <StatsWrapper>
                <Stat>
                  <StatNumber>{reviews.length}</StatNumber>
                  <StatLabel>Reviews</StatLabel>
                </Stat>
                <Stat>
                  <StatNumber>{favorites.length}</StatNumber>
                  <StatLabel>Favorites</StatLabel>
                </Stat>
              </StatsWrapper>
            </Sidebar>
            <SloganText>
              <span>Nice to see you again</span> {user.name}
            </SloganText>
          </SideWrapper>
          <MainContent>
            <SectionWrapper>
              <h2>Your Reviews</h2>
              <ProfileReviews reviews={reviews} />
            </SectionWrapper>
            <SectionWrapper>
              <h2>Your Favorites</h2>
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
          </MainContent>
        </>
      )}
    </ProfileWrapper>
  );
};

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
    border-color: #204c84;
  }
`;

const SloganText = styled.h1`
  color: black;
  margin: 2rem;
  font-family: "Aeroport", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  overflow: hidden;
  white-space: nowrap;
  animation: ${typing} 3s steps(60, end), ${blinkCursor} 0.5s step-end infinite;
  animation-fill-mode: forwards;
  display: block;

  & span {
    font-style: italic;
  }

  @media (max-width: 1300px) {
    display: none;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem;
  margin: 2rem 2rem;
  background-color: #f2f2f2;

  @media (max-width: 767px) {
    width: 330px;
  }
`;

const SideWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 1rem;
  width: 100%;
  margin: 20px 0px 0px 20px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 2fr;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    margin: auto;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 500px;

  @media (max-width: 767px) {
    width: 315px;
  }
`;

const SidebarTop = styled.div`
  background: linear-gradient(135deg, #003262, #005492);
  padding: 40px;
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const GridItem = styled.div`
  width: 100%;
`;

const NameFields = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 5px;
  padding: 5px 20px;

  @media (max-width: 767px) {
    padding: 10px 20px;
    font-weight: 200;
    font-size: 1rem;
  }
`;

const StyledSpan = styled.span`
  font-style: italic;
  font-weight: 300;
  font-size: 1.2rem;
  margin-right: 10px;

  @media (max-width: 767px) {
    display: none;
  }
`;

const EditProfile = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
  margin-top: 20px;

  &:hover {
    text-decoration: underline;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatNumber = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const StatLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #777;
`;

const MainContent = styled.div`
  width: 100%;
  margin: auto;
`;

const SectionWrapper = styled.div`
  margin: auto;
  width: 80%;

  & h2 {
    margin-top: 50px;
  }
`;

const FavoriteGrid = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  padding: 1rem;

  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 1rem;
  }
`;

const FavoriteContainer = styled.div`
  margin: 0.5rem;
  max-width: 250px;
`;

const Bookmark = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  padding: 15px;
  width: 90%;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const StyledNavLink = styled(Link)`
  font-size: 1rem;
  color: black;
  text-decoration: none;
  position: relative;
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
