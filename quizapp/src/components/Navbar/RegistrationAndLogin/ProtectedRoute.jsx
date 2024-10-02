import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { QuestionContext } from "../QuestionContext";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(QuestionContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
