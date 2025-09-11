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
                  {user.name}
                </NameFields>
                <NameFields>
                  <StyledSpan>Nickname</StyledSpan>
                  {user.nickname}
                </NameFields>
                <NameFields>
                  <StyledSpan>Email</StyledSpan>
                  {user.email}
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
              <h1><span>Welcome back,</span> {user.name}!</h1>
              <p>Manage your reviews and favorite businesses</p>
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

const SloganText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  padding: clamp(16px, 4vw, 32px);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(34, 211, 238, 0.1));
  border-radius: 16px;
  border: 1px solid var(--surface-border);

  h1 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 800;
    color: var(--text);
    margin: 0;
    line-height: 1.2;
    
    span {
      background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-style: italic;
    }
  }
  
  p {
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    color: var(--muted);
    margin: 0;
  }

  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: clamp(12px, 3vw, 24px);
  margin: 0 auto;
  max-width: 1200px;
  color: var(--text);
  min-height: calc(100vh - 120px);
  width: 100%;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const SideWrapper = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: clamp(16px, 4vw, 32px);
  width: 100%;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 280px 1fr;
    gap: 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  position: sticky;
  top: 80px;
  height: fit-content;

  @media (max-width: 768px) {
    position: static;
  }
`;

const SidebarTop = styled.div`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  padding: clamp(16px, 4vw, 32px);
  border-radius: 16px 16px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  }
`;

const ProfileImage = styled.img`
  width: clamp(80px, 12vw, 120px);
  height: clamp(80px, 12vw, 120px);
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--surface-border);
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    border-color: var(--primary-start);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const GridItem = styled.div`
  width: 100%;
`;

const NameFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  font-weight: 500;
  color: var(--text);
  width: 100%;
  
  &:first-of-type {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    font-weight: 700;
    margin-top: 8px;
  }
`;

const StyledSpan = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

const EditProfile = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
  background: var(--surface-border);
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background: var(--primary-start);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 16px;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const StatNumber = styled.span`
  font-size: clamp(20px, 4vw, 28px);
  font-weight: 800;
  color: var(--primary-start);
  line-height: 1;
`;

const StatLabel = styled.span`
  font-size: clamp(12px, 2.5vw, 14px);
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const SectionWrapper = styled.div`
  width: 100%;

  & h2 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    color: var(--text);
    margin: 0 0 20px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--surface-border);
    display: flex;
    align-items: center;
    gap: 12px;
    
    &::before {
      content: '';
      width: 4px;
      height: 24px;
      background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
      border-radius: 2px;
    }
  }
`;

const FavoriteGrid = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  padding: 1rem;

  @media (min-width: 1251px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1250px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const FavoriteContainer = styled.div`
  margin: 0.5rem;
  max-width: 250px;
`;

const Bookmark = styled.div`
  position: relative;
  background: var(--surface-strong);
  color: var(--text);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.25);
  padding: 16px;
  width: 90%;
  transition: transform 0.2s ease-in-out, border-color 0.22s ease;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
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

const FavoriteName = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
