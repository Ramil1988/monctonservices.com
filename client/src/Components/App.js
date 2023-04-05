import React from "react";
import { serviceTypes } from "./serviceTypes";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./Homepage";
import Profile from "./Profile";
import CompanyList from "./List";
import RatingTable from "./RatingTable";
import Company from "./Company";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage items={serviceTypes} />} />
        <Route
          path="/Profile/:profileId"
          element={<Profile items={serviceTypes} />}
        />
        <Route path="/all" element={<CompanyList items={serviceTypes} />} />
        <Route path="companies/:serviceType" element={<RatingTable />} />
        <Route path="company/:companyId" element={<Company />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
