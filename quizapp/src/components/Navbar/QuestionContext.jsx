import React, { useState, useEffect, createContext } from "react";
export const QuestionContext = createContext();
const defaultQuestion = [
  {
    id: 1,
    title: "What is HTML",
    category: "HTML",
    answers: ["Hyper Text Markup Language"],
  },
];
const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  //get all questions from localstorage in initial load
  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      //try catch to avoid JSON parse undefined error
      try {
        const parsedQuestion = JSON.parse(storedQuestions);
        setQuestions(parsedQuestion);
      } catch (err) {
        console.error(err, "error while parsing");
        setQuestions([]);
      }
    } else {
      setQuestions(defaultQuestion);
    }
  }, []);

  //saving question to localstorage when new question is posted
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem("questions", JSON.stringify(questions));
    }
  }, [questions]);

  const addNewQuestion = (newQuestion) => {
    const allQuestions = [...questions, newQuestion];
    setQuestions(allQuestions);
  };

  const addAnswer = (questionId, answer) => {
    const updatedQuestions = questions.map((qElm) => {
      if (qElm.id === questionId) {
        return {
          ...qElm,
          answers: qElm.answers ? [...qElm.answers,answer] : [answer],
        };
      }
      return qElm;
    });
    setQuestions(updatedQuestions);
  };

  const UpdateAnswer = (questionId, newAnswer, answerIdx) => {
    const updatedQuestions = questions.map((qElm) => {
      if (qElm.id === questionId) {
        const updatedAnswers = [...qElm.answers];
        updatedAnswers[answerIdx] = newAnswer; // Update the specific answer
        return { ...qElm, answers: updatedAnswers };
      }
      return qElm;
    });
    setQuestions(updatedQuestions); // Update the state with new questions
  };

  return (
    <QuestionContext.Provider
      value={{ questions, addNewQuestion, addAnswer, UpdateAnswer }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
export default QuestionProvider;
