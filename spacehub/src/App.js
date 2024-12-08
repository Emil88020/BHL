import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home, ChatBox} from "./sections/export.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbox" element={<ChatBox />} />
      </Routes>
    </Router>
  );
};

export default App;
