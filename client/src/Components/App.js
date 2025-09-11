import { useEffect, useState } from "react";
import "./index.css";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { serviceTypes } from "./serviceTypes";
import Navigation from "./Helper/Navigation";
import MainHomePage from "./Homepage/MainHomepage";
import MainEventpage from "./Homepage/MainEventpage";
import Profile from "./Profile/Profile";
import MainRatingTable from "./RatingTable/MainRatingTable";
import MainCompanyPage from "./Company/MainCompanyPage";
import PublicCompanyCreate from "./Company/PublicCompanyCreate";
import Header from "./Header/Header";
import SearchResults from "./Search/SearchResults";
import Review from "./Review/Review";
import Footer from "./Homepage/Footer";
import About from "./Header/About";
import Admin from "./Admin/Admin";
import Guide from "./Homepage/GuideForNewCommers";

const App = () => {
  const { currentUser } = useContext(UserContext);
  const allowedUserId = "google-oauth2|116851775782187261081";

  const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const checkScrollTop = () => {
        if (!isVisible && window.pageYOffset > 400) {
          setIsVisible(true);
        } else if (isVisible && window.pageYOffset <= 400) {
          setIsVisible(false);
        }
      };

      window.addEventListener("scroll", checkScrollTop);
      return () => window.removeEventListener("scroll", checkScrollTop);
    }, [isVisible]);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    return (
      <ScrollButton onClick={scrollToTop} show={isVisible}>
        <FaArrowUp />
      </ScrollButton>
    );
  };

  return (
    <>
      <Header />
      <Navigation />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainHomePage />} />
        <Route
          path="/Profile/:profileId"
          element={<Profile items={serviceTypes} />}
        />
        {/* Admin route must be explicit so it doesn't match the serviceType route */}
        <Route path="/admin" element={<Outlet />}>
          <Route
            index
            element={
              currentUser &&
              (currentUser._id === allowedUserId ||
                (currentUser.data && currentUser.data._id === allowedUserId)) ? (
                <Admin />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Route>
        <Route path="/:serviceType" element={<MainRatingTable />} />
        <Route path="/company/:companyId" element={<MainCompanyPage />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/add-company" element={<PublicCompanyCreate />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="/about" element={<About />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/events" element={<MainEventpage />} />
        <Route path="/superadminpage" element={<Outlet />}>
          <Route
            index
            element={
              currentUser && currentUser._id === allowedUserId ? (
                <Admin />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

const ScrollButton = styled.button`
  position: fixed;
  right: 1em;
  bottom: 1em;
  width: 3em;
  height: 3em;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0.7;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transition: visibility 0.3s linear;
  &:hover {
    opacity: 1;
  }
`;

export default App;
