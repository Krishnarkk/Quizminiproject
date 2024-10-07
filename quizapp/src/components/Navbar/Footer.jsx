import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* About Us Section */}
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are dedicated to providing the best platform for sharing
              knowledge and answering questions.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/" className="text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="bg-light" />

        {/* Copyright Section */}
        <div className="row">
          <div className="col text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Your Company. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
