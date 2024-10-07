// import React, { useContext } from "react";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import { QuestionContext } from "./QuestionContext";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { loggedInUser, logout } = useContext(QuestionContext);
//   const navigate = useNavigate();
//   console.log(loggedInUser);

//   const handleLogout = () => {
//     logout(); // Call the logout function from context
//     navigate("/login");
//   };

//   return (
//     <nav
//       className="navbar navbar-expand-lg navbar-light sticky-top"
//       style={{ backgroundColor: "#e3f2fd" }}
//     >
//       <div className="container-fluid">
//         <Link
//           className="navbar-brand"
//           to="/" // Changed href to Link for routing
//           style={{ color: "green", fontWeight: "bolder" }}
//         >
//           Mirafra Technologies
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNavDropdown"
//           aria-controls="navbarNavDropdown"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNavDropdown">
//           <ul className="navbar-nav me-auto">
//             {" "}
//             {/* Add me-auto to push items to the left */}
//             {loggedInUser ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link active" aria-current="page" to="/">
//                     Questions and Answers
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link text-danger fw-bolder"
//                     to="/add-question"
//                   >
//                     Add Questions
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/signup">
//                     Signup
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//           {loggedInUser && ( // Check if loggedInUser exists before rendering
//             <ul className="navbar-nav ms-auto">
//               {" "}
//               {/* ms-auto to align logout button to the right */}
//               <li className="nav-item">
//                 <button
//                   className=" btn btn-danger" // Styled as a link
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useContext } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { QuestionContext } from "./QuestionContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { loggedInUser, logout } = useContext(QuestionContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light sticky-top"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{ color: "green", fontWeight: "bolder" }}
        >
          Mirafra Technologies
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
          {loggedInUser && (
            <ul className="navbar-nav ms-auto">
              {/* User Info and Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {loggedInUser.username.toUpperCase() || loggedInUser.email}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                  style={{ borderRadius: "8px" }} // Keep the dropdown white and clean
                >
                  {/* Display user's name inside the box */}
                  <li className="px-3 py-2">
                    <strong>
                      {loggedInUser.username || loggedInUser.email}
                    </strong>
                  </li>
                  <hr className="dropdown-divider" />
                  <li className="text-center">
                    <button
                      className="btn btn-danger w-100" // Full-width red logout button
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
