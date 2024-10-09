import React, { useContext, useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import Category from "./Category";
import AllQuestions from "./AllQuestions";
import { QuestionContext } from "./QuestionContext";

const QuestionWithAnswers = () => {
  const { questions, addAnswer } = useContext(QuestionContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const categories = ["HTML", "CSS", "JavaScript", "ReactJs", "Java"];

  const filteredQuestions = questions?.filter((qElm) => {
    const matchedSearch =
      qElm.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qElm.answers.some((answer) =>
        answer?.text?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchedCategory =
      selectCategory === "" || qElm.category === selectCategory;
    return matchedSearch && matchedCategory;
  });

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
    </div>
  );
};

export default QuestionWithAnswers;
