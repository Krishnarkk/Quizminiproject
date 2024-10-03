import React, { useState, useContext, useEffect } from "react";
import { QuestionContext } from "./QuestionContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StarRating from "./StarRating";

const AddAnswers = () => {
  const { questionId } = useParams();
  const { questions, addAnswer, rateAnswer, loggedInUser } =
    useContext(QuestionContext);
  console.log(loggedInUser);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    const question = questions.find((q) => q.id === parseInt(questionId));
    if (question) {
      setCurrentQuestion(question);
    }
  }, [questionId, questions]);
  console.log(currentQuestion);
  const handleAnswerSubmit = () => {
    if (newAnswer.trim()) {
      addAnswer(currentQuestion.id, {
        text: newAnswer,
        rating: 0, // Default rating
        answeredBy: loggedInUser?.username, // Replace this with actual logged-in user
        answeredAt: new Date().toISOString(),
      });
      setNewAnswer("");
      toast.success("Answer added successfully!", { autoClose: 2000 });
    } else {
      toast.error("Please provide an answer!", { autoClose: 3000 });
    }
  };

  const handleRating = (answerIdx, rating) => {
    rateAnswer(currentQuestion.id, answerIdx, rating);
    toast.success("Rating updated successfully!", { autoClose: 2000 });
  };

  if (!currentQuestion) {
    return <p>Loading question...</p>;
  }

  return (
    <div className="container">
      <h2 className="mt-4">{currentQuestion.title}</h2>
      <h5 className="text-muted">{currentQuestion.category}</h5>
      <p>Answers:</p>
      <ul>
        {currentQuestion.answers.length > 0 ? (
          currentQuestion.answers.map((answer, index) => (
            <li key={index} className="mb-2">
              {/* Render the specific properties of the answer object */}
              <p>
                {answer.text} -{" "}
                <span className="text-muted small">
                  Answered by <b>{loggedInUser?.username.toUpperCase()}</b> on{" "}
                  {new Date(answer.answeredAt).toLocaleString()}
                </span>
              </p>
              <div>
                Rating:{" "}
                <StarRating
                  value={answer.rating}
                  setRating={(rating) => handleRating(index, rating)}
                />
              </div>
            </li>
          ))
        ) : (
          <p>No answers yet.</p>
        )}
      </ul>

      <div className="mt-4">
        <h5>Add Your Answer:</h5>
        <textarea
          className="form-control mb-2"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your answer here"
        />
        <button className="btn btn-primary mt-2" onClick={handleAnswerSubmit}>
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default AddAnswers;
