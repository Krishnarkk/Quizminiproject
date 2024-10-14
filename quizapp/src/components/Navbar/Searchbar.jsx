import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
const Searchbar = React.memo(({ setSearchTerm }) => {
  return (
    <div className="mt-3">
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
          <i className="bi bi-search"></i>
        </span>
      </div>
    </div>
  );
});

export default Searchbar;
