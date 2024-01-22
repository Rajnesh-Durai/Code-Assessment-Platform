import React, { useEffect } from "react";
import KaniniBg from "../../../assets/bgkanini.png";
import "../../../css/Global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ExitAssessmentPage = () => {
  useEffect(() => {
    // Hide scroll bar when the component mounts
    document.body.style.overflow = "hidden";

    // Show scroll bar when the component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <div>
      <img src={KaniniBg} className="kaninibg" alt="Kanini Background" />
      <div className="exit-container">
        <div className="align-center">
          <FontAwesomeIcon icon={faCircleCheck} className="completed-image" />
        </div>
        <div className="text-align">
          <h1 className="login-head">Thankyou For Taking the Assessment!!</h1>
          <h3 className="login-head4">
            Click on the below button to view your Result in Dashboard
          </h3>
        </div>
        <div className="move-center">
          <Link to="/">
            <button class="cssbuttons-io-button">
              Click Here
              <div class="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExitAssessmentPage;
