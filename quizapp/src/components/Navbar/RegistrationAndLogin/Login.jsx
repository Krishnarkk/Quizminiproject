import React, { useState, useContext } from "react";
import { QuestionContext } from "../QuestionContext";
import Confetti from "react-confetti";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Banner from "../../../assets/banner.png";
import mirLogo from "../../../assets/mirLogo.svg";

const Login = () => {
  const { login, isDarkTheme } = useContext(QuestionContext); // Access darkMode from context
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(username, password);
      if (response.success) {
        setShowConfetti(true);
        toast.success(`Welcome ${username}`);
        setTimeout(() => setShowConfetti(false), 4000);
        setTimeout(()=>navigate("/"),3000)
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex min-vh-100">
      {/* Image section */}
      <div className="col-lg-6 d-flex justify-content-center align-items-center text-white">
        <div className="text-center">
          <img src={mirLogo} className="mLogo mb-3" alt="Mirafra Logo" />
          <img src={Banner} className="banner w-100" alt="Banner" />
        </div>
      </div>

      {/* Login form section */}
      <div className="col-lg-6 col-sm-12 d-flex justify-content-center align-items-center">
        <div className="col-md-8 col-lg-8">
          {loading && <Loader />}
          {showConfetti && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}

          <h3 className="text-center title animate-slide-fade mb-4">Login</h3>
          <form
            onSubmit={handleLogin}
            className={`shadow p-4 rounded ${
              isDarkTheme ? "bg-secondary" : "bg-white"
            }`}
          >
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="form-control"
                value={username}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Don't have an account? &nbsp;
              <a href="/signup" className="text-primary">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
