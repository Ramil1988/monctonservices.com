import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";
import { serviceTypes } from "./serviceTypes";
import { thingsToDo } from "./ThingsToDo";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import Navigation from "./Helper/Navigation";
import Homepage from "./Homepage/Homepage";
import Profile from "./Profile/Profile";
import RatingTable from "./RatingTable/RatingTable";
import Company from "./Company/Company";
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
        <Route
          path="/"
          element={
            <Homepage serviceTypes={serviceTypes} thingsToDo={thingsToDo} />
          }
        />
        <Route
          path="/Profile/:profileId"
          element={<Profile items={serviceTypes} />}
        />
        <Route path="/:serviceType" element={<RatingTable />} />
        <Route path="/company/:companyId" element={<Company />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="/about" element={<About />} />
        <Route path="/guide" element={<Guide />} />
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
