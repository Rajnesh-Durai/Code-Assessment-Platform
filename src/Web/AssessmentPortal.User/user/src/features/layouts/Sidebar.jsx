import React, { useEffect, useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/image 1.png";
import Dashboard_V from "../../assets/DashboardVector.png";
import L_Logo from "../../assets/Logo-l.png";
import Logout_V from "../../assets/LogoutVector.png";
import Assessment_V from "../../assets/QuestionsVector.png";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

const Sidebar = () => {
  const [menu, setMenu] = useState(false); // Toggle for sidebar menu
  const [activePara, setActivePara] = useState(null); // Track the active paragraph
  // Toggle sidebar menu
  const sideBar = () => {
    setMenu(!menu);
  };
  const handleParaClick = (paraId) => {
    setActivePara(paraId);
  };
  const handleOutsideClick = (event) => {
    if (!event.target.closest(".sidebar p")) {
      setActivePara(null); // Deactivate the active paragraph
    }
  };
  // Add event listener for outside click and remove it on component unmount
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      window.location.reload();
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const { instance } = useMsal();

  const handleSignOut=()=>{
    instance.logout();
  }
  return (
    <>
      <div className="container">
        <div className="grad-bar"></div>
        {/* Sidebar with dynamic class assignment based on 'menu' state */}
        <div className={menu ? "sidebar" : "sidebar hidden-2"} id="nav-links">
          {/* Logo section */}
          <div className="logo-2">
            <img
              src={Logo}
              alt="Logo"
              className="logo-img"
              width="47px"
              height="47px"
            />
            <h3 id="kaniniletter">
              Kanini
              <br />
              <span id="letter">Assessment</span>
            </h3>
            {/* Menu icon with click event to trigger sidebar function */}
            <div className="menu" onClick={sideBar}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <Link to="/dashboard">
            <p
              onClick={() => handleParaClick("dashboard")}
              className={activePara === "dashboard" ? "active" : ""} id="dashboardPara"
            >
              <img
                src={Dashboard_V}
                alt="Dashboard Vector"
                width="22px"
                height="22px"
              />
              &emsp;Dashboard
            </p>
          </Link>
          <Link to="/take-assessment">
            <p
              onClick={() => handleParaClick("assessment")}
              className={activePara === "assessment" ? "active" : ""}
            >
              <img src={Assessment_V} alt="Assessment Icon" />
              &emsp;Assessment
            </p>
          </Link>

          {/* Logo and logout section */}
          <div className="l-logo">
            <img
              src={L_Logo}
              className="logo-L"
              alt="Kanini Logo"
              width="180px"
              height="230px"
            />
            {/* Logout link */}
            <p
               onClick={() => {
                handleParaClick("logout");
                handleSignOut(); // Call handleSignOut when the Logout paragraph is clicked
              }}
              className={activePara === "logout" ? "active" : ""}
            >
              <img src={Logout_V} alt="Logout" width="22px" height="22px" />
              &emsp;Logout
            </p>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Sidebar;
