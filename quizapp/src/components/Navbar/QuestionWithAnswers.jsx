import React, { useContext, useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import Category from "./Category";
import AllQuestions from "./AllQuestions";
import { QuestionContext } from "./QuestionContext";
const QuestionWithAnswers = () => {
  const { questions, addAnswer } = useContext(QuestionContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const categories = ["HTML", "CSS", "JavaScript", "ReactJs","Java"];
  const filteredQuestions = questions?.filter((qElm) => {
    const mactchedSearch =
      qElm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qElm.answers.some((answer) =>
        answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchedCategory =
      selectCategory === "" || qElm.category === selectCategory;
    return mactchedSearch && matchedCategory;
  });
  return (
    <div className="container d-flex flex-column justify-content-center">
      <Searchbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <Category
        categories={categories}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
      />
      <AllQuestions questions={filteredQuestions} addAnswer={addAnswer} />
    </div>
  );
};

export default QuestionWithAnswers;
