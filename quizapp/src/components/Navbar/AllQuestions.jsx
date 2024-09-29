import React, { useContext } from "react";
import { QuestionContext } from "./QuestionContext";
import Answer from "./Answer";
import { formatDate } from "../../common/commonFunctions";
const AllQuestions = ({ questions }) => {
  const { addAnswer } = useContext(QuestionContext);
  if (questions?.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center  py-5">
        <p className="text-muted fs-4">No questions are added ...!!</p>
      </div>
    );
  }
  console.log(questions);
  const latestQuestions = questions?.sort((a, b) => b.id - a.id);
  console.log(latestQuestions);
  return (
    <div>
      {latestQuestions?.map((question) => (
        <div key={question.id} className="card mb-3 shadow bg-white rounded">
          <div className="card-body">
            <h6>
              <span className="badge bg-secondary"> {question.category}</span>
            </h6>
            <h5 className="card-title text-danger">{question.title}?</h5>
            <p className="card-text">Answers:</p>
            <ul>
              {question.answers?.length > 0 ? (
                question.answers?.map((answer, idx) => (
                  <li key={idx} className="text-success">
                    {answer}
                  </li>
                ))
              ) : (
                <p>No answers yet.</p>
              )}
            </ul>
            <Answer questionId={question.id} addAnswer={addAnswer} />
            <div className="d-flex mt-4 justify-content-between">
              <h5>Posted By : {question.name ? question.name : "John"}</h5>
              <h6 className="text-muted">{formatDate(question.id)}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllQuestions;
