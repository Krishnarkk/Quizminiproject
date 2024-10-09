import React, { useContext, useMemo, useState } from "react";
import { QuestionContext } from "./QuestionContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const AddQuestions = React.memo(() => {
  const { loggedInUser, addNewQuestion } = useContext(QuestionContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("JavaScript");
  const [otherCategory, setOtherCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updatedCategory = useMemo(() => {
    return category === "Other" ? otherCategory : category;
  }, [category, otherCategory]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newQuestion = {
      id: Date.now(),
      title,
      category: updatedCategory,
      answers: [],
      postedBy: loggedInUser?.username || "",
    };

    setTimeout(() => {
      addNewQuestion(newQuestion);
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="container">
      {loading && <Loader />}
      <form onSubmit={handleSubmit} className="mb-4 mt-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Enter your Question
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Posted By
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={loggedInUser?.username || ""}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category of question
          </label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="JavaScript">JavaScript</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="ReactJs">ReactJs</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {category === "Other" && (
          <input
            type="text"
            className="form-control"
            value={otherCategory}
            onChange={(e) => setOtherCategory(e.target.value)}
            placeholder="Enter your question category"
          />
        )}
        <button
          type="submit"
          className="btn btn-danger mt-4"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Question"}
        </button>
      </form>
    </div>
  );
});

export default AddQuestions;
