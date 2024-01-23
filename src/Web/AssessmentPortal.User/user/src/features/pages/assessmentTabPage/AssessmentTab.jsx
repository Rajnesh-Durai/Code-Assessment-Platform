import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../layouts/Sidebar";
import AssessmentCards from "../../components/AssessmentCards";

const AssessmentTab = () => {
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const apiUrl =
    "https://localhost:9005/user/56b7d8b7-f393-4033-b05a-83dfc7769dad/assessment";

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios.get(apiUrl, { headers }).then((response) => {
      setUserData(response.data);
              // Check if status code is 400
              if (response.data.statusCode === 400) {
                setOpen(true);
              } else {
                setOpen(false);
              }
    });
  }, []);

  return (
    <>
      <Sidebar />
      <div className="take-assessment">
        <h1>Allocated Assessments</h1>
        {open ? (
        <div>
          <h2>There are no pending Assessments.</h2>
        </div>
      ) : (
        <div className="assessment-grid">
        {userData &&
            userData.map((userAssessment) => (
              <AssessmentCards
                key={userAssessment.id}
                userData={userAssessment}
              />
            ))}
        </div>)}
        <div className="bulb"></div>
      </div>
    </>
  );
};

export default AssessmentTab;
