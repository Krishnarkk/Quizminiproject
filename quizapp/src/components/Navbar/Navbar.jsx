import React, { useContext } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { QuestionContext } from "./QuestionContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/mirafra-logo.svg";

const Navbar = () => {
  const { loggedInUser, logout, toggleTheme, isDarkTheme } =
    useContext(QuestionContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top ${
        isDarkTheme ? "navbar-dark bg-dark" : "navbar-light"
      }`}
      style={
        isDarkTheme
          ? { backgroundColor: "#343a40" }
          : { backgroundColor: "#e3f2fd" }
      }
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} style={{ width: "10vw" }} alt="Logo" className="logo-img" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            {loggedInUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Questions and Answers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-danger fw-bolder"
                    to="/add-question"
                  >
                    Add Questions
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item">
              <button
                className="btn btn-outline me-2 d-flex align-items-center"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDarkTheme ? (
                  <i
                    className="bi bi-sun-fill sun-icon"
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                ) : (
                  <i
                    className="bi bi-moon-fill moon-icon"
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                )}
              </button>
            </li>
            {loggedInUser && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i
                    className="bi bi-person-circle me-2"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                  {loggedInUser.username.toUpperCase() || loggedInUser.email}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                  style={{ borderRadius: "8px" }}
                >
                  <li className="px-3 py-2">
                    <strong>
                      {loggedInUser.username || loggedInUser.email}
                    </strong>
                  </li>
                  <hr className="dropdown-divider" />
                  <li className="text-center">
                    <button
                      className="btn btn-danger w-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
