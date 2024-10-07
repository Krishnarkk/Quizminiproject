import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddQuestions from "./components/Navbar/AddQuestions";
import QuestionWithAnswers from "./components/Navbar/QuestionWithAnswers";
import QuestionProvider from "./components/Navbar/QuestionContext";
import Login from "./components/Navbar/RegistrationAndLogin/Login";
import Signup from "./components/Navbar/RegistrationAndLogin/Signup";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AddAnswers from "./components/Navbar/AddAnswers";
import Footer from "./components/Navbar/Footer";
const App = () => {
  return (
    <QuestionProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<QuestionWithAnswers />} />
          <Route path="/add-question" element={<AddQuestions />} />
          <Route path="/add-answer/:questionId" element={<AddAnswers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </QuestionProvider>
  );
};

export default App;
