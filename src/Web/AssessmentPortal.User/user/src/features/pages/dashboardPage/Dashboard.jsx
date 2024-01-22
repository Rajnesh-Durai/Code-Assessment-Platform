import React, { useState, useEffect } from "react";
import Sidebar from "../../layouts/Sidebar";
import CircularProgressBar from "../../components/CircularProgressBar";
import ComparisonBarChart from "../../components/ComparisonBarChart";
import ChatBot from "../../components/ChatBot";
import StarRating from "../../components/StarRating";
import axios from "axios";

const Dashboard = () => {
  const [completed, setCompleted] = useState(null);
  const [notcompleted, setNotCompleted] = useState(null);
  const [lastScore, setLastScore] = useState({});
  const [barScore,setBarScore]=useState([{}]);
  const apiUrl =
    "https://localhost:9005/UserResult/GetCountOfCompletedAssessment?userId=56b7d8b7-f393-4033-b05a-83dfc7769dad";
  const apiUrl2 =
    "https://localhost:9005/UserResult/GetCountOfAssessmentPending?userId=56b7d8b7-f393-4033-b05a-83dfc7769dad";
  const apiUrl3 =
    "https://localhost:9005/UserResult/GetLastAssessmentResult?userId=56b7d8b7-f393-4033-b05a-83dfc7769dad";
    const apiUrl4 = "https://localhost:9005/UserResult/GetTopScoreByUserAssessmentId?userId=56b7d8b7-f393-4033-b05a-83dfc7769dad";
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios.get(apiUrl, { headers }).then((response) => {
      setCompleted(response.data);
    });

    axios.get(apiUrl2, { headers }).then((response) => {
      setNotCompleted(response.data);
    });

    axios.get(apiUrl3, { headers }).then((response) => {
      setLastScore(response.data);
    });
    
    axios.get(apiUrl4, { headers }).then((response) => {
      setBarScore(response.data);
    });
  }, []);
  return (
    <>
      <Sidebar />
      <div className="stats-card">
        <div class="card-2">
          <div class="border"></div>
          <div class="content">
            <h1>{completed + notcompleted}</h1>
            <span class="logo-bottom-text">Total Assessment</span>
          </div>
          <span class="bottom-text">Kanini</span>
        </div>
        <div class="card-3">
          <div class="border3"></div>
          <div class="content3">
            <h1>{completed}</h1>
            <span class="logo-bottom-text3">Assessment Completed</span>
          </div>
          <span class="bottom-text3">Kanini</span>
        </div>
        <div class="card-4">
          <div class="border4"></div>
          <div class="content4">
            <h1>{notcompleted}</h1>
            <span class="logo-bottom-text4">Assessment Pending</span>
          </div>
          <span class="bottom-text4">Kanini</span>
        </div>
      </div>
      <div className="chart-flex">
        <div className="comparison-bar">
          <h1>Score Comparison</h1>
          <div className="ruler"></div>
          <ComparisonBarChart barScore={barScore} />
        </div>
        <div className="circular-bar">
          <h1>Score Card</h1>
          <div className="ruler"></div>
          <div>
            <div className="mark-head">
              <CircularProgressBar score={lastScore.score} />
            </div>
            <div className="score-details">
              <h3><u>Details</u></h3>
              <div className="score-flex">
                <div>
                  Topic Name:
                  <span>
                    {lastScore.topic_name === "csharp"
                      ? "C#"
                      : lastScore.topic_name}
                  </span>
                </div>
                <div>
                  Difficulty:<span>{lastScore.skill_level}</span>
                </div>
              </div>
              <div className="score-flex">
                <div>
                  Correct Answer:<span>{lastScore.correct_answer}</span>
                </div>
                <div>
                  Wrong Answer:<span>{lastScore.wrong_answer}</span>
                </div>
              </div>
              <h3 className="mar-top2"><u>Overall</u></h3>
              <div>
                <h2 className={`grade ${lastScore.score < 50 ? 'bad' : 'grade'}`}>
                  {lastScore.score > 80
                    ? "Very Good"
                    : lastScore.score > 70
                    ? "Good"
                    : lastScore.score > 50
                    ? "Fair"
                    : "To Be Improved"}{" "}
                  <span>- </span>
                  <StarRating score={lastScore.score} />
                </h2>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
    </>
  );
};

export default Dashboard;
