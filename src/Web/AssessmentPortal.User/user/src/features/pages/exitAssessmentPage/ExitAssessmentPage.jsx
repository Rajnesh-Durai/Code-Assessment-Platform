import React, { useEffect } from "react";
import Kanini from "../../../assets/logo.png";
import "../../../css/Global.css";
import { Link } from "react-router-dom";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
 
const ExitAssessmentPage = () => {
  const { width, height } = useWindowSize();
  useEffect(() => {
    // Hide scroll bar when the component mounts
    document.body.style.overflow = "hidden";
 
    // Show scroll bar when the component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <>
      <div id="nav1">
        <Confetti width={width} height={height} recycle={false} />
        <div id="logo1">
          <img src={Kanini} alt="Kanini logo." />
        </div>
      </div>
      <div id="product-landing">
        <div id="hero1">
          <div id="hero-intro1">
            <div id="hero-text">
              <h1>
                Kanini Assessment Portal
              </h1>
              <p>Thanking for taking the Assessment.</p>
            </div>
            <div id="hero-action-btn1">
              <div id="apple1" class="hero-btn">
                <Link to="/dashboard">
                <div>
    <button class="btn2"><i class="animation"></i>View Result<i class="animation"></i>
    </button>
</div>
                </Link>
              </div>
            </div>
          </div>
          <div id="hero-visual1">
            <div id="hero-img">
              <img
                src="https://img.freepik.com/free-vector/employees-celebrating-business-success-with-huge-trophy_1150-37475.jpg?w=996&t=st=1706789532~exp=1706790132~hmac=2092e4cd1b68bbb091101360757d2ddee27c35ddb0b5943a5ccbd4020fa171fd"
                alt="Completed"
                id="testImage"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default ExitAssessmentPage;