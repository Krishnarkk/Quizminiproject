import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
const Searchbar = ({ setSearchTerm }) => {
  return (
    <div className="mb-4 mt-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search questions or answers...."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span
          className="input-group-text bg-white"
          style={{ cursor: "pointer" }}
        >
          <i class="bi bi-search"></i>
        </span>
      </div>
    </div>
  );
};

export default Searchbar;
