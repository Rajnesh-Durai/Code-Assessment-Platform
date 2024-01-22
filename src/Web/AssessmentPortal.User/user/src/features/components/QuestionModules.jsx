import React from "react";

const QuestionModules = ({ questions, currentQuestionIndex }) => (
  <div className="question-modules">
    <div className="const-header" id="questionModules">
      Question Modules
    </div>
    <div className="grid">
    {questions && Array.isArray(questions) ? (
        questions.map((data, index) => (
          <div
            key={data.id}
            className={`number ${
              currentQuestionIndex + 1 === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </div>
        ))
      ) : (
        <p>No questions available</p>
      )}
    </div>
  </div>
);

export default QuestionModules;
