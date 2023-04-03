import React from "react";
import { items } from "./data";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./Homepage";
import Profile from "./Profile";
import CompanyList from "./List";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage items={items} />} />
        <Route path="/Profile/:profileId" element={<Profile items={items} />} />
        <Route path="/all" element={<CompanyList items={items} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
