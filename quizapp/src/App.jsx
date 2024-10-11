import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AddQuestions from "./components/Navbar/AddQuestions";
import QuestionWithAnswers from "./components/Navbar/QuestionWithAnswers";
import QuestionProvider from "./components/Navbar/QuestionContext";
import Login from "./components/Navbar/RegistrationAndLogin/Login";
import Signup from "./components/Navbar/RegistrationAndLogin/Signup";
import AddAnswers from "./components/Navbar/AddAnswers";
import Footer from "./components/Navbar/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Cursor from "./Cursor";
const App = () => {
  return (
    <>
    <QuestionProvider>
      <Router>
        <div className="container-wrapper">
          <Navbar />
          <div className="content flex-grow-1">
            <Routes>
              <Route path="/" element={<QuestionWithAnswers />} />
              <Route path="/add-question" element={<AddQuestions />} />
              <Route path="/add-answer/:questionId" element={<AddAnswers />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ToastContainer position="top-center" autoClose={3000} />
    </QuestionProvider>
    <Cursor/>
    </>
  );
};

export default App;
