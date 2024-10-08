// import React, { useState, useEffect, createContext } from "react";
// export const QuestionContext = createContext();

// // Default questions to load if local storage is empty
// const defaultQuestion = [
//   {
//     id: 1,
//     title: "What is React?",
//     category: "JavaScript",
//     answers: [
//       {
//         text: "React is a JavaScript library for building user interfaces.",
//         rating: 4,
//         answeredBy: "John",
//         answeredAt: "2024-10-01T12:00:00Z",
//       },
//     ],
//   },
// ];

// const QuestionProvider = ({ children }) => {
//   const [questions, setQuestions] = useState([]);
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   // Load questions and the logged-in user from local storage on initial load
//   useEffect(() => {
//     const storedQuestions = localStorage.getItem("questions");
//     const storedUser = localStorage.getItem("currentUser");

//     // Check if questions exist in local storage
//     if (storedQuestions) {
//       try {
//         const parsedQuestions = JSON.parse(storedQuestions);
//         if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
//           setQuestions(parsedQuestions); // Set questions if present in local storage
//         } else {
//           setQuestions(defaultQuestion); // Fallback to default questions
//         }
//       } catch (err) {
//         console.error("Error while parsing questions:", err);
//         setQuestions(defaultQuestion); // Fallback to default questions in case of error
//       }
//     } else {
//       setQuestions(defaultQuestion); // If no questions in local storage, load default
//     }

//     // Check if a user is logged in
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setLoggedInUser(parsedUser); // Set logged in user
//       } catch (err) {
//         console.error("Error while parsing user data:", err);
//         setLoggedInUser(null); // Clear user if there's an error parsing
//       }
//     }
//   }, []);

//   // Save questions to local storage when questions are updated
//   useEffect(() => {
//     if (questions.length > 0) {
//       localStorage.setItem("questions", JSON.stringify(questions));
//     }
//   }, [questions]);

//   // Save current user to local storage when logged in/out
//   useEffect(() => {
//     if (loggedInUser) {
//       localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
//     } else {
//       localStorage.removeItem("currentUser"); // Remove user from local storage when logged out
//     }
//   }, [loggedInUser]);

//   // Function to add a new question
//   const addNewQuestion = (newQuestion) => {
//     setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
//   };

//   // Function to add an answer to a question
//   const addAnswer = (questionId, newAnswer) => {
//     const updatedQuestions = questions.map((question) => {
//       if (question.id === questionId) {
//         const updatedAnswers = [...question.answers, newAnswer];
//         return { ...question, answers: updatedAnswers };
//       }
//       return question;
//     });

//     setQuestions(updatedQuestions);
//     localStorage.setItem("questions", JSON.stringify(updatedQuestions));
//   };

//   // Function to update an answer
//   const updateAnswer = (questionId, newAnswer, answerIdx) => {
//     const updatedQuestions = questions.map((question) => {
//       if (question.id === questionId) {
//         const updatedAnswers = [...question.answers];
//         updatedAnswers[answerIdx] = newAnswer; // Update the specific answer
//         return { ...question, answers: updatedAnswers };
//       }
//       return question;
//     });
//     setQuestions(updatedQuestions);
//     localStorage.setItem("questions", JSON.stringify(updatedQuestions)); // Sync with local storage
//   };

//   // Function to rate an answer
//   const rateAnswer = (questionId, answerIdx, newRating) => {
//     setQuestions((prevQuestions) =>
//       prevQuestions.map((question) =>
//         question.id === questionId
//           ? {
//               ...question,
//               answers: question.answers.map((answer, idx) =>
//                 idx === answerIdx
//                   ? { ...answer, rating: newRating } // Update rating for the specific answer
//                   : answer
//               ),
//             }
//           : question
//       )
//     );
//   };

//   // Signup function to register a new user
//   const signUp = (username, password) => {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const userExists = users.some((user) => user.username === username);

//     if (!userExists) {
//       const newUser = { username, password };
//       const updatedUsers = [...users, newUser];
//       localStorage.setItem("users", JSON.stringify(updatedUsers));
//       setLoggedInUser(newUser); // Log in the new user
//       return { success: true };
//     } else {
//       return { success: false, message: "User already exists" };
//     }
//   };

//   // Login function to authenticate a user
//   const login = (username, password) => {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const user = users.find(
//       (userElm) =>
//         userElm.username === username && userElm.password === password
//     );

//     if (user) {
//       setLoggedInUser(user); // Set logged in user
//       return { success: true };
//     } else {
//       return { success: false, message: "Invalid username or password" };
//     }
//   };

//   // Logout function to clear the current user
//   const logout = () => {
//     setLoggedInUser(null);
//     localStorage.removeItem("currentUser"); // Remove user from local storage
//   };

//   return (
//     <QuestionContext.Provider
//       value={{
//         questions,
//         addNewQuestion,
//         addAnswer,
//         updateAnswer,
//         login,
//         logout,
//         signUp,
//         rateAnswer,
//         loggedInUser,
//       }}
//     >
//       {children}
//     </QuestionContext.Provider>
//   );
// };

// export default QuestionProvider;

import React, { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
export const QuestionContext = createContext();

// Default questions to load if local storage is empty
const defaultQuestion = [
  {
    id: 1,
    title: "What is React?",
    category: "JavaScript",
    answers: [
      {
        text: "React is a JavaScript library for building user interfaces.",
        rating: 4,
        answeredBy: "John",
        answeredAt: "2024-10-01T12:00:00Z",
      },
    ],
    postedBy:"John"
  },
];

const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Load questions and the logged-in user from local storage on initial load
  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    const storedUser = localStorage.getItem("currentUser");

    // Check if questions exist in local storage
    if (storedQuestions) {
      try {
        const parsedQuestions = JSON.parse(storedQuestions);
        if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
          setQuestions(parsedQuestions); // Set questions if present in local storage
        } else {
          setQuestions(defaultQuestion); // Fallback to default questions
        }
      } catch (err) {
        console.error("Error while parsing questions:", err);
        setQuestions(defaultQuestion); // Fallback to default questions in case of error
      }
    } else {
      setQuestions(defaultQuestion); // If no questions in local storage, load default
    }

    // Check if a user is logged in
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setLoggedInUser(parsedUser); // Set logged in user
      } catch (err) {
        console.error("Error while parsing user data:", err);
        setLoggedInUser(null); // Clear user if there's an error parsing
      }
    }
  }, []);

  // Save questions to local storage when questions are updated
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem("questions", JSON.stringify(questions));
    }
  }, [questions]);

  // Save current user to local storage when logged in/out
  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("currentUser"); // Remove user from local storage when logged out
    }
  }, [loggedInUser]);

  // Function to add a new question
  const addNewQuestion = (newQuestion) => {
    const isDuplicate = questions.some((question) => question.title.toLowerCase() === newQuestion.title.toLowerCase());
    if (!isDuplicate) {
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
      toast.success("Your question was added!", { position: "top-center" });
    } else {
      toast.warning("Duplicate question, same question is already added!", { position: "top-center" });
    }
  };
  // Function to delete a question
  const deleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter(
      (question) => question.id !== questionId
    );
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };
  //edit question
  const editQuestion = (questionId, updatedTitle, updatedCategory) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? { ...question, title: updatedTitle, category: updatedCategory }
        : question
    );

    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  // Function to add an answer to a question
  const addAnswer = (questionId, newAnswer) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const updatedAnswers = [...question.answers, newAnswer];
        return { ...question, answers: updatedAnswers };
      }
      return question;
    });

    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  // Function to update an answer
  const updateAnswer = (questionId, newAnswer, answerIdx) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const updatedAnswers = [...question.answers];
        updatedAnswers[answerIdx] = newAnswer; // Update the specific answer
        return { ...question, answers: updatedAnswers };
      }
      return question;
    });

    setQuestions(updatedQuestions); // Update state
    localStorage.setItem("questions", JSON.stringify(updatedQuestions)); // Sync with local storage
  };

  // Function to rate an answer
  const rateAnswer = (questionId, answerIdx, newRating) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              answers: question.answers.map((answer, idx) =>
                idx === answerIdx
                  ? { ...answer, rating: newRating } // Update rating for the specific answer
                  : answer
              ),
            }
          : question
      )
    );
  };

  // Signup function to register a new user
  const signUp = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.username === username);

    if (!userExists) {
      const newUser = { username, password };
      const updatedUsers = [...users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setLoggedInUser(newUser); // Log in the new user
      return { success: true };
    } else {
      return { success: false, message: "User already exists" };
    }
  };

  // Login function to authenticate a user
  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (userElm) =>
        userElm.username === username && userElm.password === password
    );

    if (user) {
      setLoggedInUser(user); // Set logged in user
      return { success: true };
    } else {
      return { success: false, message: "Invalid username or password" };
    }
  };

  // Logout function to clear the current user
  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("currentUser"); // Remove user from local storage
  };

  return (
    <>
    <QuestionContext.Provider
      value={{
        questions,
        addNewQuestion,
        deleteQuestion, // <-- Add deleteQuestion to the context
        addAnswer,
        updateAnswer,
        login,
        logout,
        signUp,
        rateAnswer,
        deleteQuestion,
        editQuestion,
        loggedInUser,
      }}
    >
      {children}
    </QuestionContext.Provider>
    
    </>
  );
};

export default QuestionProvider;
