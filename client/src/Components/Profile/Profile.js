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

const ROOT_API = "/.netlify/functions/api";

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
          <TopSection>
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
                  {user.name}
                </NameFields>
                <NameFields>
                  <StyledSpan>@</StyledSpan>{user.nickname}
                </NameFields>
                <NameFields>
                  <StyledSpan>✉</StyledSpan> {user.email}
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
            <WelcomeAndReviews>
              <WelcomeHeader>
                <h2>Welcome back, {user.name}!</h2>
              </WelcomeHeader>
              <SectionWrapper>
                <h2>Your Reviews</h2>
                <ProfileReviews reviews={reviews} />
              </SectionWrapper>
            </WelcomeAndReviews>
          </TopSection>
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

const WelcomeHeader = styled.div`
  margin-bottom: 2px;

  h2 {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--muted);
    margin: 0;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  margin: 0 auto;
  max-width: 1200px;
  color: var(--text);
  gap: 16px;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 8px;
    gap: 12px;
  }
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 16px;
  width: 100%;
  margin-bottom: 12px;

  @media (max-width: 1024px) {
    grid-template-columns: 240px 1fr;
    gap: 12px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
    margin-bottom: 8px;
  }
`;

const WelcomeAndReviews = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
`;

const SidebarTop = styled.div`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  padding: 16px;
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--surface-border);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    border-color: var(--primary-start);
  }
`;

const GridItem = styled.div`
  width: 100%;
`;

const NameFields = styled.div`
  text-align: center;
  font-size: 0.85rem;
  color: var(--text);
  line-height: 1.3;
  
  &:first-of-type {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 2px;
  }
`;

const StyledSpan = styled.span`
  font-size: 0.75rem;
  color: var(--muted);
  font-weight: 500;
`;

const EditProfile = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: var(--primary-start);
  background: transparent;
  border: 1px solid var(--primary-start);
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 2px;

  &:hover {
    background: var(--primary-start);
    color: white;
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const StatNumber = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
`;

const StatLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
`;


const SectionWrapper = styled.div`
  width: 100%;

  & h2 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text);
    margin: 0 0 12px 0;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--surface-border);
  }
`;

const FavoriteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FavoriteContainer = styled.div`
  width: 100%;
`;

const Bookmark = styled.div`
  position: relative;
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 12px;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
    border-color: var(--primary-start);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const StyledNavLink = styled(Link)`
  white-space: nowrap;
  overflow: hidden;
  font-size: 1rem;
  color: var(--text);
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
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 50%;

  &:hover {
    background: var(--surface);
  }
`;

const FavoriteName = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
`;

const FavoriteType = styled.p`
  font-size: 12px;
  margin: 4px 0 0 0;
  color: var(--muted);
  font-style: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Profile;
