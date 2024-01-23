import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../layouts/Sidebar";
import AssessmentCards from "../../components/AssessmentCards";

const AssessmentTab = () => {
  const [userData, setUserData] = useState(null);
  const UserId=localStorage.getItem('UserId')
  const apiUrl =
    `https://localhost:9005/user/${UserId}/assessment`;

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios.get(apiUrl, { headers }).then((response) => {
      setUserData(response.data);

    });
  }, []);

  return (
    <>
      <Sidebar />
      <div className="take-assessment">
        <h1>Allocated Assessments</h1>
        <div className="assessment-grid">
        {userData &&
            userData.map((userAssessment) => (
              <AssessmentCards
                key={userAssessment.id}
                userData={userAssessment}
              />
            ))}
        </div>
        <div className="bulb"></div>
      </div>
    </>
  );
};

export default AssessmentTab;
