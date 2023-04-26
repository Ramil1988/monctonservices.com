import React from "react";
import { serviceTypes } from "./serviceTypes";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import Navigation from "./Navigation";
import Homepage from "./Homepage";
import Profile from "./Profile";
import RatingTable from "./RatingTable";
import Company from "./Company";
import Header from "./Header";
import SearchResults from "./SearchResults";
import Review from "./Review";
import Footer from "./Footer";
import About from "./About";
import Admin from "./Admin";

const App = () => {
  const { currentUser } = useContext(UserContext);
  const allowedUserId = "google-oauth2|116851775782187261081";

  console.log(currentUser);

  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage items={serviceTypes} />} />
        <Route
          path="/Profile/:profileId"
          element={<Profile items={serviceTypes} />}
        />
        <Route path="/companies/:serviceType" element={<RatingTable />} />
        <Route path="/company/:companyId" element={<Company />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="/about" element={<About />} />
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
