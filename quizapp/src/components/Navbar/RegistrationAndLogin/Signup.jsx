import React, { useState, useContext } from "react";
import { QuestionContext } from "../QuestionContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signUp } = useContext(QuestionContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const response = signUp(username, password);
    if (response.success) {
      toast.success("Signup successful");
      navigate("/add-question");
    } else {
      toast.error(response.message || "Signup failed");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-md-4">
        <h3 className="text-center">Signup</h3>
        <form onSubmit={handleSignup} className="shadow p-4 rounded bg-light">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="username"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="password"
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
            Already have an account?{" "}
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
