import React from "react";
import { serviceTypes } from "./serviceTypes";
import { Routes, Route } from "react-router-dom";
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

const App = () => {
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
      </Routes>
      <Footer />
    </>
  );
};

export default App;
