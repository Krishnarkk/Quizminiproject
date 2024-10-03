import React, { useContext } from "react";
import { QuestionContext } from "./QuestionContext";
import { Link } from "react-router-dom"; // Import Link to navigate to new page
import { formatDate } from "../../common/commonFunctions";

const AllQuestions = ({ questions }) => {
  const { loggedInUser } = useContext(QuestionContext);

  if (questions?.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center  py-5">
        <p className="text-muted fs-4">No questions are added ...!!</p>
      </div>
    );
  }

  const latestQuestions = questions?.sort((a, b) => b.id - a.id);

  return (
    <div>
      {latestQuestions?.map((question, idx) => (
        <div key={idx} className="card mb-3 shadow bg-white rounded">
          <div className="card-body">
            <h6>
              <span className="badge bg-secondary"> {question.category}</span>
            </h6>
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
                Posted By: {loggedInUser?.username || "John"}
              </h5>
              <h6 className="text-muted small">{formatDate(question.id)}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllQuestions;
