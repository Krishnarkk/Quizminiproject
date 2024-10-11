import React, { useContext, useEffect, useState } from "react";
import { QuestionContext } from "./QuestionContext";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../common/commonFunctions";
import EditQuestionModal from "./EditQuestionModal";
import Loader from "./Loader";
import "./AllQuestions.css";
import { toast } from "react-toastify";


const AllQuestions = ({ questions }) => {
  const {  deleteQuestion,loggedInUser} = useContext(QuestionContext);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const sortedQuestions = [...questions].sort((a, b) => b.id - a.id);
  const navigate=useNavigate();
  //  the index of the last question on the current page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = sortedQuestions?.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Show loader when the component first loads
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(sortedQuestions?.length / questionsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loader />;
  }

  if (sortedQuestions?.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center no-questions-container">
        <p className="text-muted fs-4">No questions are added ...!!</p>
      </div>
    );
  }


  const handleDeleteClick = (questionId) => {
    setQuestionToDelete(questionId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setLoading(true);
    setTimeout(() => {
      deleteQuestion(questionToDelete);
      setLoading(false);
      setShowModal(false);
    }, 1000);
  };

  const handleEditClick = (question) => {
    setLoading(true);
    setTimeout(() => {
      setQuestionToEdit(question);
      setLoading(false);
      setShowEditModal(true);
    }, 600);
  };
  
  const handleAnswerNavigation=(qId)=>{
    if (!loggedInUser?.username) {
      toast.warning("Please login to add your answer");
      setTimeout(()=>{
        navigate("/login")
      },300)
      return;
    }
    return navigate(`/add-answer/${qId}`);
  }

  return (
    <div>
      <div className="question-list">
        {currentQuestions?.map((question, idx) => (
          <div key={idx} className="card mb-3 shadow-lg question-card animate-fade-in">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h6>
                  <span className="badge bg-secondary"> {question.category}</span>
                </h6>

                <div className="d-flex align-items-center">
                  <i
                    className="bi bi-pencil-fill edit-icon"
                    onClick={() => handleEditClick(question)}
                  ></i>
                  <i
                    className="bi bi-trash ms-2 delete-icon"
                    onClick={() => handleDeleteClick(question.id)}
                  ></i>
                </div>
              </div>
              <h5 className="card-title text-danger question-title">{question.title}?</h5>
              <p className="card-text">Answer:</p>
              <ul>
                {question.answers.length > 0 ? (
                  <li className="text-success">{question?.answers[0].text}</li>
                ) : (
                  <p>No answers yet.</p>
                )}
              </ul>

              {/* <Link to={`/add-answer/${question.id}`}> */}
                <button className="btn btn-primary custom-btn" onClick={()=>handleAnswerNavigation(question.id)}>
                  Click to Add Your Answer
                </button>
              {/* </Link> */}

              <div className="d-flex justify-content-between mt-4">
                <h5 className="text-truncate mb-0 small">
                  Posted By: {question?.postedBy || "John"}
                </h5>
                <h6 className="text-muted small">{formatDate(question.id)}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

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

          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
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

      {showModal && (
        <div className="modal show d-block animate-fade-in" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this question?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
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
