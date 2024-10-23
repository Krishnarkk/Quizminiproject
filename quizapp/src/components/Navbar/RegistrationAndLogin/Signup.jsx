import React, { useState, useContext } from "react";
import { QuestionContext } from "../QuestionContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signUp, isDarkTheme } = useContext(QuestionContext); // Access isDarkTheme from context
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignup = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", { position: "top-center" });
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters long, contain 1 uppercase letter, 1 lowercase letter, and 1 number.", { position: "top-center" });
      return;
    }

    const response = signUp(username, password, email);
    if (response.success) {
      toast.success("Signup successful");
      navigate("/");
    } else {
      toast.error(response.message || "Signup failed");
    }
  };

  return (
    <div className={`container d-flex align-items-center justify-content-center min-vh-100`}>
      <div className="col-md-4">
        <h3 className="text-center title animate-slide-fade">Signup</h3>
        <form onSubmit={handleSignup} className={`shadow p-4 rounded ${isDarkTheme ? 'bg-secondary text-white' : 'bg-light'}`}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Signup
          </button>
        </form>
        <div className="mt-3 text-center">
          <p>
            Already have an account? &nbsp;
            <a href="/login" className="text-primary">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
