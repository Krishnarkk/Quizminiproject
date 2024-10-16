import React, { useContext, useEffect, useMemo, useState } from "react";
import Searchbar from "./Searchbar";
import Category from "./Category";
import AllQuestions from "./AllQuestions";
import { QuestionContext } from "./QuestionContext";
import useDebounce from "../../common/useDebounce";
import { useNavigate } from "react-router-dom";

const QuestionWithAnswers = () => {
  const { questions, addAnswer } = useContext(QuestionContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const categories = [...new Set(questions.map(elm=>elm.category))];
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/add-question");
  };
  const filteredQuestions = useMemo(() => {
    return questions?.filter((qElm) => {
      const matchedSearch =
        qElm.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        qElm.answers.some((answer) =>
          answer?.text
            ?.toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        );
      const matchedCategory =
        selectCategory === "" || qElm.category === selectCategory;
      return matchedSearch && matchedCategory;
    });
  }, [questions, debouncedSearchTerm, selectCategory]);

  return (
    <div className="container d-flex flex-column justify-content-center">
      <h2 className="title animate-slide-fade mt-3">Explore Questions</h2>
      <div className="row mb-3">
        <div className="col-md-8">
          <Searchbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        </div>
        <div className="col-md-4">
          <Category
            categories={categories}
            selectCategory={selectCategory}
            setSelectCategory={setSelectCategory}
          />
        </div>
      </div>

      {/* All Questions Section */}
      <AllQuestions questions={filteredQuestions} addAnswer={addAnswer} />
      <span className="add-question-btn" onClick={handleNavigation}>
        +
      </span>
    </div>
  );
};

export default QuestionWithAnswers;
