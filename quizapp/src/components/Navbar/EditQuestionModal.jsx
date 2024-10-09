import React, { useContext, useState } from "react";
import { QuestionContext } from "./QuestionContext";
import Loader from "./Loader";

const EditQuestionModal = ({ question, closeModal }) => {
  const { editQuestion } = useContext(QuestionContext);
  const [title, setTitle] = useState(question.title);
  const [category, setCategory] = useState(question.category);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      editQuestion(question.id, title, category);
      setLoading(false);
      closeModal();
    }, 1000);
  };

  return (
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Question</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            {loading ? ( // Show Loader if loading is true
              <Loader />
            ) : (
              <>
                <div className="mb-3">
                  <label htmlFor="questionTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="questionTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="questionCategory" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="questionCategory"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            {!loading && ( // Hide buttons if loading
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionModal;
