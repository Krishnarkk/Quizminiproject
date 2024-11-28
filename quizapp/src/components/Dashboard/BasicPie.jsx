import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useContext } from "react";
import { QuestionContext } from "../Navbar/QuestionContext";
export default function BasicPie({ allQuestions }) {
  const { isDarkTheme } = useContext(QuestionContext);
  console.log(isDarkTheme);
  function getCategoryQuestionCounts(questions) {
    const categoryCounts = {};

    questions.forEach((question) => {
      const category = question.category;
      if (categoryCounts[category]) {
        categoryCounts[category] += 1;
      } else {
        categoryCounts[category] = 1;
      }
    });

    const chartData = Object.keys(categoryCounts).map((category, index) => ({
      id: index,
      value: categoryCounts[category],
      label: category,
      fill: "red",
    }));

    return chartData;
  }

  const categoryData = getCategoryQuestionCounts(allQuestions);

  return (
    <PieChart
      series={[
        {
          data: categoryData,
        },
      ]}
      width={500}
      height={250}
      // label={({ label }) => ({
      //   text: label,
      //   style: {
      //     fill: "red",
      //   },
      // })}
    />
  );
}
