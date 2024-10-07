import React, { useState, useContext, useEffect } from "react";
import { QuestionContext } from "./QuestionContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StarRating from "./StarRating";

const AddAnswers = () => {
  const { questionId } = useParams();
  const { questions, addAnswer, rateAnswer, updateAnswer, loggedInUser } =
    useContext(QuestionContext);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editAnswerText, setEditAnswerText] = useState("");
  const [editAnswerRating, setEditAnswerRating] = useState(0);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(null);

  useEffect(() => {
    const question = questions.find((q) => q.id === parseInt(questionId));
    if (question) {
      setCurrentQuestion(question);
    }
  }, [questionId, questions]);

  const handleAnswerSubmit = () => {
    if (newAnswer.trim()) {
      addAnswer(currentQuestion.id, {
        text: newAnswer,
        rating: 0,
        answeredBy: loggedInUser?.username,
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

  const openEditModal = (answer, index) => {
    setEditAnswerText(answer.text);
    setEditAnswerRating(answer.rating);
    setCurrentAnswerIndex(index);
    setShowModal(true);
  };

  const handleEditAnswerSubmit = () => {
    if (editAnswerText.trim()) {
      updateAnswer(
        currentQuestion.id,
        {
          text: editAnswerText,
          rating: editAnswerRating,
          answeredBy: loggedInUser?.username,
          answeredAt: new Date().toISOString(),
        },
        currentAnswerIndex
      );
      setShowModal(false);
      toast.success("Answer updated successfully!", { autoClose: 2000 });
    } else {
      toast.error("Please provide an updated answer!", { autoClose: 3000 });
    }
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
              <p>
                {answer.text} -{" "}
                <span className="text-muted small">
                  Answered by <b>{answer.answeredBy.toUpperCase()}</b> on{" "}
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
              <button
                className="btn btn-secondary btn-sm mt-1"
                onClick={() => openEditModal(answer, index)}
              >
                Edit
              </button>
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

      {/* Modal for editing answer */}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Answer</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                value={editAnswerText}
                onChange={(e) => setEditAnswerText(e.target.value)}
                placeholder="Edit your answer here"
              />
              <div className="mt-2">
                <StarRating
                  value={editAnswerRating}
                  setRating={setEditAnswerRating}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditAnswerSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background overlay for modal */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default AddAnswers;
