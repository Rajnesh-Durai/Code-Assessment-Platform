import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import "../../css/Global.css";

const AssessmentCards = ({ userData }) => {
  const [imageSrc, setImageSrc] = useState(null);
  
  const handleButtonClick = () => {
    sessionStorage.setItem("AssessmentId", userData.id);
    sessionStorage.setItem("topicName", userData.topic_name);
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Dynamic import based on topic_name
        const imageModule = await import(`../../assets/${userData.topic_name}.png`);
        setImageSrc(imageModule.default);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, [userData.topic_name]);
  return (
    <>
      <div class="card-1">
        <svg
          fill="none"
          viewBox="0 0 342 175"
          height="175"
          width="342"
          xmlns="http://www.w3.org/2000/svg"
          class="background"
        >
          <path
            fill="url(#paint0_linear_103_640)"
            d="M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z"
          ></path>
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              y2="128"
              x2="354.142"
              y1="128"
              x1="0"
              id="paint0_linear_103_640"
            >
              <stop stop-color="#1487C3"></stop>
              <stop stop-color="#ADEBF5" offset="1"></stop>
            </linearGradient>
          </defs>
        </svg>
        <div class="cloud">
          <img
            src={imageSrc}
            alt="Language Logo"
          />
        </div>
        <p className="main-text">
          {userData.topic_name === "csharp" ? "C#" : userData.topic_name}
        </p>
        <div class="info">
          <div class="info-left">
            <p>
              <i className="skill-level-card">{userData.skill_level}</i>
            </p>
            <p>
              Questions: <b>{userData.number_of_questions}</b>
            </p>
            <p>
              <b>{userData.total_time}</b> mins
            </p>
          </div>
          <p class="info-right">
            <Link to={`/systemcheck/${userData.id}`}>
              <button class="continue-application" onClick={handleButtonClick}>
                <div>
                  <div class="pencil"></div>
                  <div class="folder">
                    <div class="top">
                      <svg viewBox="0 0 24 27">
                        <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                      </svg>
                    </div>
                    <div class="paper"></div>
                  </div>
                </div>
                start
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AssessmentCards;
