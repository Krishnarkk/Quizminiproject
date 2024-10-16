import React, { useState, useContext, useEffect} from "react";
import { QuestionContext } from "./QuestionContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StarRating from "./StarRating";

const AddAnswers = () => {
  const { questionId } = useParams();
  const {isDarkTheme}=useContext(QuestionContext)
  const {
    questions,
    addAnswer,
    rateAnswer,
    updateAnswer,
    deleteAnswer,
    loggedInUser,
  } = useContext(QuestionContext);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editAnswerText, setEditAnswerText] = useState("");
  const [editAnswerRating, setEditAnswerRating] = useState(0);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [answerToDeleteIndex, setAnswerToDeleteIndex] = useState(null);

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

  const confirmDeleteAnswer = (index) => {
    setAnswerToDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleDeleteAnswer = () => {
    if (answerToDeleteIndex !== null) {
      deleteAnswer(currentQuestion.id, answerToDeleteIndex);
      toast.success("Answer deleted successfully!", { autoClose: 2000 });
    }
    setShowDeleteModal(false);
  };

  if (!currentQuestion) {
    return <p>Loading question...</p>;
  }

  return (
    <div className="container">
      <h2 className="mt-4 text-danger">{currentQuestion.title}?</h2>
      <h5 className="badge bg-secondary">{currentQuestion.category}</h5>
      <p>Answers:</p>
      <div className="answers-list mb-4">
        {currentQuestion.answers.length > 0 ? (
          currentQuestion.answers.map((answer, index) => (
            <div key={index} className="mb-3 p-1 border-bottom">
              <div className="mb-1">
                <span className="answered-by">
                  <span className={isDarkTheme?"text-secondary":"text-muted"}>
                  <i class="bi bi-person-circle"></i> {answer.answeredBy.toUpperCase()} on
                    {new Date(answer.answeredAt).toLocaleString()}
                  </span>
                </span>
              </div>
              <div className="answer-text">
                <p>{answer.text}</p>
              </div>
              <div className="answer-actions d-flex justify-content-between align-items-center">
                <StarRating
                  value={answer.rating}
                  setRating={(rating) => handleRating(index, rating)}
                />
                <div>
                  <i
                    className="bi bi-pencil-fill edit-icon ms-2"
                    onClick={() => openEditModal(answer, index)}
                  ></i>
                  <i
                    className="bi bi-trash ms-2 delete-icon"
                    onClick={() => confirmDeleteAnswer(index)}
                  ></i>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No answers yet.</p>
        )}
      </div>

      <div className="mt-4">
        <h5>Add Your Answer:</h5>
        <textarea
          className="form-control mb-2"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your answer here"
          rows={8}
          colums={50}
        />
        <button className="btn btn-primary mt-2" onClick={handleAnswerSubmit}>
          Submit Answer
        </button>
      </div>

      {/* Edit Answer Modal */}
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

      {/* Confirmation Modal for Deleting Answer */}
      <div
        className={`modal ${showDeleteModal ? "show" : ""}`}
        style={{ display: showDeleteModal ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowDeleteModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this answer?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteAnswer}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default AddAnswers;
