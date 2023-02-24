import Homepage from "./Homepage";
import React from "react";
import { items } from "./data";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage items={items} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
