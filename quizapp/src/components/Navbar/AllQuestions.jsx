import React, { useContext, useState } from "react";
import { QuestionContext } from "./QuestionContext";
import Answer from "./Answer";
import { formatDate } from "../../common/commonFunctions";
import UpdateAnswerComponent from "./UpdateAnswerComponent";
import { toast } from "react-toastify";
const AllQuestions = ({ questions }) => {
  const { addAnswer, UpdateAnswer, loggedInUser } = useContext(QuestionContext);
  const [updatedAnswer, setUpdatedAnswer] = useState("");
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [currentAnswerIdx, setCurrentAnswerIdx] = useState(null);
  if (questions?.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center  py-5">
        <p className="text-muted fs-4">No questions are added ...!!</p>
      </div>
    );
  }
  const latestQuestions = questions?.sort((a, b) => b.id - a.id);
  const handleEditAnswer = (qElm, answerIdx) => {
    setCurrentQuestionId(qElm.id);
    setCurrentAnswerIdx(answerIdx);
    setUpdatedAnswer(qElm.answers[answerIdx]);
  };
  const handleUpdate = () => {
    if (currentAnswerIdx !== null && currentQuestionId !== null) {
      UpdateAnswer(currentQuestionId, updatedAnswer, currentAnswerIdx);
      setCurrentQuestionId(null);
      setCurrentAnswerIdx(null);
      setUpdatedAnswer("");
      toast.success("Yours answer is updated..!!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  return (
    <div>
      {latestQuestions?.map((question, idx) => (
        <div key={idx} className="card mb-3 shadow bg-white rounded">
          <div className="card-body">
            <h6>
              <span className="badge bg-secondary"> {question.category}</span>
            </h6>
            <h5 className="card-title text-danger">{question.title}?</h5>
            <p className="card-text">Answers:</p>
            <ul>
              {question.answers.length > 0 ? (
                question.answers?.map((answer, idx) => (
                  <div className="d-flex justify-content-between">
                    <li key={idx} className="text-success">
                      {answer}
                    </li>
                    <div className="answer-icons">
                      <i
                        class="bi bi-pencil"
                        style={{ cursor: "pointer" }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => handleEditAnswer(question, idx)}
                      ></i>
                    </div>
                  </div>
                ))
              ) : (
                <p>No answers yet.</p>
              )}
            </ul>
            <Answer questionId={question.id} addAnswer={addAnswer} />
            <div className="d-flex justify-content-between mt-4">
              <h5 className="text-truncate mb-0 small">
                Posted By:{" "}
                {loggedInUser?.username ? loggedInUser.username : "John"}
              </h5>
              <h6 className="text-muted small">{formatDate(question.id)}</h6>
            </div>
          </div>
        </div>
      ))}
      <div
        class="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-success" id="exampleModalLabel">
                Update your answer
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <UpdateAnswerComponent
                setUpdatedAnswer={setUpdatedAnswer}
                updatedAnswer={updatedAnswer}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                class="btn btn-primary"
                onClick={handleUpdate}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
