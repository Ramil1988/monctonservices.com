import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ListOfServices from "./ListOfServices";
import PopularServices from "./PopularServices";
import Reviews from "./Reviews";
import MonctonImage from "../../Pictures/Moncton.jpg";
import MonctonImage1 from "../../Pictures/Moncton1.jpg";
import MonctonImage2 from "../../Pictures/Moncton2.jpg";
import MonctonImage3 from "../../Pictures/Moncton3.jpg";
import MonctonImage4 from "../../Pictures/Moncton4.jpg";

const ROOT_API = "/.netlify/functions/api";

const images = [
  MonctonImage,
  MonctonImage1,
  MonctonImage2,
  MonctonImage3,
  MonctonImage4,
];

const Homepage = (props) => {
  const serviceTypes = Object.values(props.serviceTypes);
  const thingsToDo = Object.values(props.thingsToDo);
  const [reviews, setReviews] = useState([]);
  const [companies, setAllCompanies] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    fetchAllReviews();
    fetchAllcompanies();
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Changes image every 5 seconds
    return () => clearInterval(imageInterval);
  }, []);

  const fetchAllReviews = async () => {
    try {
      const response = await fetch(`${ROOT_API}/allReviews`);
      const data = await response.json();
      setReviews(data.data);
    } catch (error) {
      console.error("Error fetching all reviews:", error);
    }
  };

  const fetchAllcompanies = async () => {
    try {
      const response = await fetch(`${ROOT_API}/allCompanies`);
      const data = await response.json();
      setAllCompanies(data.data);
    } catch (error) {
      console.error("Error fetching all companies:", error);
    }
  };

  return (
    <Wrapper>
      <LandingContainer>
        <BigImage src={images[currentImageIndex]} alt="Carousel" />
        <TextContainer>
          <SloganText>
            We can <HighlightedText>help</HighlightedText> you to find what you
            want in <HighlightedText>Moncton</HighlightedText>
          </SloganText>
          <StatisticText>
            Our website already has <span>{companies.length}</span> places to
            visit listed.
          </StatisticText>
          <NavLink to="/searchresults">
            <SearchButton>Search</SearchButton>
          </NavLink>
        </TextContainer>
      </LandingContainer>
      <MainWrapper>
        <TabMenu>
          <TabButton onClick={() => setCurrentTab(0)} active={currentTab === 0}>
            Services in Moncton
          </TabButton>
          <TabButton onClick={() => setCurrentTab(1)} active={currentTab === 1}>
            Things to Do in Moncton
          </TabButton>
          {/* <NavLink to="/events">
            <TabButton active={location.pathname === "/events"}>
              City events
            </TabButton>
          </NavLink> */}
          <NavLink to="/guide">
            <TabButton active={location.pathname === "/guide"}>
              Guide for newcomers
            </TabButton>
          </NavLink>
        </TabMenu>
        {currentTab === 0 ? (
          <>
            <BigText>Services in Moncton</BigText>
            <ListOfServices data={serviceTypes} />
          </>
        ) : currentTab === 1 ? (
          <>
            <BigText>Things to Do in Moncton</BigText>
            <ListOfServices data={thingsToDo} />
          </>
        ) : null}
        <BigText>Popular Services</BigText>
        <PopularServices />
        <BigText>Recent reviews</BigText>
        <Reviews reviews={reviews} />
      </MainWrapper>
    </Wrapper>
  );
};

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0.5;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  white-space: nowrap;
  scroll-snap-type: x mandatory;

  @media (max-width: 768px) {
    display: block;
    overflow-x: visible;
    white-space: normal;
  }
`;

const TabButton = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 1.1rem;
  background: ${(props) => (props.active ? "black" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#333333")};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  box-shadow: ${(props) => (props.active ? "0px 4px 4px black" : "none")};

  &:hover {
    background: ${(props) => (props.active ? "black" : "#eeeeee")};
  }

  @media (max-width: 768px) {
    margin: 5px 0;
    padding: 5px 10px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    margin: 2px 0;
    padding: 3px 6px;
    font-size: 0.8rem;
  }
`;

const Wrapper = styled.div`
  animation: ${fadeIn} 0.6s ease-in;
  background: var(--app-bg);
  color: var(--text);
`;

const LandingContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
  overflow: hidden;
  isolation: isolate;
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(60% 60% at 50% 40%, rgba(99,102,241,0.35) 0%, rgba(14,165,233,0.25) 40%, rgba(2,6,23,0.6) 100%);
    z-index: 1;
  }
`;

const BigImage = styled.img`
  width: 100%;
  height: 520px;
  object-fit: cover;
  filter: saturate(1.05) contrast(1.05);
  animation: ${fadeInOut} 8s infinite;

  @media (max-width: 768px) {
    height: 360px;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.25rem 1.5rem;
  z-index: 2;
  backdrop-filter: blur(8px);
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.35);

  @media (max-width: 768px) {
    top: 48%;
    width: calc(100% - 2rem);
    padding: 1rem;
  }
`;

const MainWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px 40px;
  overflow-x: hidden;
`;

const SloganText = styled.h1`
  font-size: clamp(1.6rem, 2.5vw + 1rem, 3rem);
  line-height: 1.15;
  color: var(--text);
  letter-spacing: 0.2px;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
`;

const HighlightedText = styled.span`
  background: linear-gradient(90deg, #60a5fa, #a78bfa, #34d399);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 800;
`;

const StatisticText = styled.h2`
  margin: 10px 0 0;
  font-size: clamp(1rem, 0.7rem + 1vw, 1.25rem);
  color: var(--muted);
  font-weight: 500;
  & span {
    color: var(--text);
    padding: 2px 10px;
    font-size: 1.35rem;
    border-radius: 999px;
    border: 1px solid var(--surface-border);
    background: var(--surface);
  }
`;

const SearchButton = styled.button`
  margin-top: 16px;
  padding: 14px 22px;
  font-size: 1rem;
  font-weight: 700;
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  box-shadow: 0 10px 25px rgba(34,211,238,0.25);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(34,211,238,0.35);
    opacity: 0.95;
  }
`;

const BigText = styled.h1`
  margin: 48px 0 16px;
  color: var(--text);
  font-weight: 800;
  font-size: clamp(1.25rem, 1rem + 1.5vw, 2rem);
  letter-spacing: 0.2px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const ShowMoreLessButton = styled.button`
  margin: auto;
  text-align: center;
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: black;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: #555;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
`;

export default Homepage;
