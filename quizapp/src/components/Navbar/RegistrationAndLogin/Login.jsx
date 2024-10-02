import React, { useState, useContext } from "react";
import { QuestionContext } from "../QuestionContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { login } = useContext(QuestionContext);
  const  navigate  = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const response = login(username, password);
    if (response.success) {
      toast.success("Login successful");
      navigate("/add-question");
    } else {
      toast.error(response.message || "login failed");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-md-4">
        <h3 className="text-center">Login</h3>
        <form onSubmit={handleLogin} className="shadow p-4 rounded bg-light">
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
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-primary">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
