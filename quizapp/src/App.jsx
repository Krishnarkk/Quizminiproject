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
const App = () => {
  return (
    <QuestionProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<QuestionWithAnswers />}/>
          <Route path="/add-question" element={<AddQuestions />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
      <ToastContainer />
    </QuestionProvider>
  );
};

export default App;
