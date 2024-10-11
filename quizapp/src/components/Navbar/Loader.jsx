import React from "react";
import "./Loader.css"; 

const Loader = () => {
  return (
    <div class="d-flex justify-content-center loader-container">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
  );
};

export default Loader;
