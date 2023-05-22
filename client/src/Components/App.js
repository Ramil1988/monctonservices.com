import React from "react";
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

  return (
    <>
      <Header />
      <Navigation />
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

export default App;
