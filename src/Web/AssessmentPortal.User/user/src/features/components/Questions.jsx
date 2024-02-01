import React from "react";

const Questions = ({ currentQuestion, currentQuestionIndex }) => {
  return (
    <div>
      <p className="qn-header">Question:</p>
      <p className="qn-body">
        {currentQuestionIndex + 1}. {currentQuestion.question}
      </p>
      <p className="sample-input-header">Sample Input:</p>
      <p className="sample-input-body">{currentQuestion.sample_input}</p>
      <p className="sample-output-header">Sample Output:</p>
      <p className="sample-output-body">{currentQuestion.sample_output}</p>
      <p className="above-qn">For the above question, Try this..</p>
      <p className="exp-input-header">Expected Input:</p>
      <p className="exp-input-body">{currentQuestion.expected_input}</p>
      <p className="exp-output-header">Expected Output:</p>
      <p className="exp-output-body">{currentQuestion.expected_output}</p>
    </div>
  );
};

export default Questions;
