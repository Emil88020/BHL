import React from "react";
import "./home.css";
import "./custom.js";
import { Link } from "react-router-dom";

import Heartrate from "../charts/Heartrate.jsx";

const Home = () => {
  return (
    <div id="home">
      <div className="wrapper">
        <Link to="/chatbox">
          <button type="button" id="cta" className="chat-with-ai">
            Assist with AI <span></span>
          </button>
        </Link>
        <Heartrate />
      </div>
    </div>
  );
};

export default Home;
