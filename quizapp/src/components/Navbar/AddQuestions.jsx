import React, { useContext, useState } from "react";
import { QuestionContext } from "./QuestionContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddQuestions = () => {
  const { loggedInUser, addNewQuestion } = useContext(QuestionContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("JavaScript");
  const [otherCategory, setOtherCategory] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  console.log(otherCategory);
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCategory = category === "Other" ? otherCategory : category;
    const newQuestion = {
      id: Date.now(),
      title,
      category: updatedCategory,
      name,
      answers: [],
      postedBy:loggedInUser?.username
    };
    addNewQuestion(newQuestion);
    navigate("/");
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="mb-4 mt-4 container">
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
        <label htmlFor="title" className="form-label">
          Enter your name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={loggedInUser?.username}
          required
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
          onChange={(e) => handleCategory(e)}
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
          onChange={(e) => {
            setOtherCategory(e.target.value);
          }}
          placeholder="enter your question category"
        />
      )}
      <button type="submit" className="btn btn-danger mt-4">
        Post Question
      </button>
    </form>
  );
};

export default AddQuestions;
