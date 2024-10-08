import React, { useContext, useState } from "react";
import { QuestionContext } from "./QuestionContext";
import { Link } from "react-router-dom"; // Import Link to navigate to new page
import { formatDate } from "../../common/commonFunctions";
import EditQuestionModal from "./EditQuestionModal";

const AllQuestions = ({ questions }) => {
  const { loggedInUser, deleteQuestion } = useContext(QuestionContext); // Access deleteQuestion from context

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const questionsPerPage = 3; // Number of questions per page

  // Modal state for confirmation
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [questionToDelete, setQuestionToDelete] = useState(null); // Store the question to be deleted
  const [showEditModal, setShowEditModal] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState(null);

  // Calculate the index of the last question on the current page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  // Calculate the index of the first question on the current page
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  // Get the current questions to display using slice
  const currentQuestions = questions?.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Calculate total pages
  const totalPages = Math.ceil(questions?.length / questionsPerPage);

  // Function to handle changing pages
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (questions?.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <p className="text-muted fs-4">No questions are added ...!!</p>
      </div>
    );
  }

  const latestQuestions = currentQuestions?.sort((a, b) => b.id - a.id); // Sort only the current page questions

  // Open modal and set the question to delete
  const handleDeleteClick = (questionId) => {
    setQuestionToDelete(questionId);
    setShowModal(true);
  };

  // Confirm delete and trigger the deleteQuestion function
  const confirmDelete = () => {
    deleteQuestion(questionToDelete);
    setShowModal(false);
  };

  const handleEditClick = (question) => {
    setQuestionToEdit(question);
    setShowEditModal(true);
  };

  return (
    <div>
      {/* Questions Display */}
      {latestQuestions?.map((question, idx) => (
        <div key={idx} className="card mb-3 shadow bg-white rounded">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h6>
                <span className="badge bg-secondary"> {question.category}</span>
              </h6>

              {/* Align Edit and Delete Icons */}
              <div className="d-flex align-items-center">
                <i
                  className="bi bi-pencil-fill"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditClick(question)}
                ></i>
                {/* Adding space between icons using margin-start (ms-2) */}
                <i
                  className="bi bi-trash ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteClick(question.id)} // Set the question to be deleted
                ></i>
              </div>
            </div>
            <h5 className="card-title text-danger">{question.title}?</h5>
            <p className="card-text">Answer:</p>
            <ul>
              {question.answers.length > 0 ? (
                // Show only the first answer
                <li className="text-success">{question?.answers[0].text}</li>
              ) : (
                <p>No answers yet.</p>
              )}
            </ul>

            {/* Add answer button which navigates to a new page */}
            <Link to={`/add-answer/${question.id}`}>
              <button className="btn btn-primary">
                Click to Add Your Answer
              </button>
            </Link>

            <div className="d-flex justify-content-between mt-4">
              <h5 className="text-truncate mb-0 small">
                Posted By: {question?.postedBy || "John"}
              </h5>
              <h6 className="text-muted small">{formatDate(question.id)}</h6>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      {showEditModal && (
        <EditQuestionModal
          question={questionToEdit}
          closeModal={() => setShowEditModal(false)}
        />
      )}
      {/* Modal for delete confirmation */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)} // Close modal on cancel
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this question?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)} // Close modal on cancel
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete} // Call confirm delete function
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllQuestions;
