import React from "react";
import { serviceTypes } from "./serviceTypes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Profile from "./Profile";
import RatingTable from "./RatingTable";
import Company from "./Company";
import Header from "./Header";
import SearchResults from "./SearchResults";
import Footer from "./test";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage items={serviceTypes} />} />
        <Route
          path="/Profile/:profileId"
          element={<Profile items={serviceTypes} />}
        />
        <Route path="companies/:serviceType" element={<RatingTable />} />
        <Route path="company/:companyId" element={<Company />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/test" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
