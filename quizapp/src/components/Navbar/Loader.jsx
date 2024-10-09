import React from "react";
import "./Loader.css"; // Import the CSS file for animation

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loader;
