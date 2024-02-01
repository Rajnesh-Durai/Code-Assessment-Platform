import React from "react";
import { Chart } from "react-google-charts";

const ComparisonBarChart = ({ barScore }) => {
  const data = [
    ["Languages", "Your Score", "Top Score"],
    ...barScore.map((data) => [
      data.topic_name === "csharp" ? "C#" : data.topic_name,
      data.score,
      data.top_score,
    ]),
  ];

  const options = {
    title: "Compare Your Score",
    chartArea: { width: "50%" },
    colors: ["#b4e88b", "#347dfa"],
    hAxis: {
      title: "Score",
      minValue: 0,
    },
    vAxis: {
      title: "Languages",
    },
  };

  return (
    <>
      <Chart
        chartType="BarChart"
        width="940px"
        height="500px"
        data={data}
        options={options}
      />
    </>
  );
};

export default ComparisonBarChart;
