import React, { useState } from "react";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure Bootstrap icons are available

const Answer = ({ questionId, answers, addAnswer, updateAnswer }) => {
  const [answer, setAnswer] = useState("");
  const [showModal, setShowModal] = useState(false); // State for controlling the modal
  const [editedAnswer, setEditedAnswer] = useState("");
  const [rating, setRating] = useState(0); // State for the rating
  const [currentAnswerIdx, setCurrentAnswerIdx] = useState(null); // To track the current answer being edited

  // Handle adding a new answer
  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      addAnswer(questionId, {
        text: answer,
        rating: 0,
        answeredBy: "User",
        answeredAt: new Date().toISOString(),
      });
      setAnswer("");
      toast.success("Your answer has been submitted!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  // Handle opening the modal for editing an answer
  const handleEditClick = (answerIdx) => {
    setCurrentAnswerIdx(answerIdx);
    setEditedAnswer(answers[answerIdx].text);
    setRating(answers[answerIdx].rating); 
    setShowModal(true);
  };

  // Handle updating an answer (with rating)
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (editedAnswer.trim()) {
      const updatedAnswer = {
        text: editedAnswer,
        rating,
        answeredBy: "User",
        answeredAt: new Date().toISOString(),
      };
      updateAnswer(questionId, updatedAnswer, currentAnswerIdx);
      setShowModal(false);
      toast.success("Your answer has been updated!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  // Handle star rating click
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      {/* Display all answers with edit icon */}
      <div className="mt-4">
        {answers.map((answerObj, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-between border-bottom py-2"
          >
            <div>
              <p className="mb-1">{answerObj.text}</p>
              <p className="mb-1">
                <strong>Rating:</strong> {answerObj.rating} / 5
              </p>
            </div>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => handleEditClick(index)}
            >
              <i className="bi bi-pencil"></i> Edit
            </button>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal for editing the answer and rating */}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Answer</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)} // Close modal
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-3">
                  <label htmlFor="editedAnswer" className="form-label">
                    Answer
                  </label>
                  <input
                    type="text"
                    id="editedAnswer"
                    className="form-control"
                    value={editedAnswer}
                    onChange={(e) => setEditedAnswer(e.target.value)}
                    required
                  />
                </div>

                {/* Star rating system */}
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <div className="star-rating">
                    {[...Array(5)].map((star, index) => (
                      <i
                        key={index}
                        className={`bi ${
                          index < rating ? "bi-star-fill" : "bi-star"
                        }`} // Filled star for the current rating
                        style={{ cursor: "pointer", color: "#f39c12" }} // Styling for the stars
                        onClick={() => handleStarClick(index)} // Handle star click to set the rating
                      ></i>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default Answer;
