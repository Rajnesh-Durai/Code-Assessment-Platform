import React, { useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Bell_V from "../../assets/Bell.png";
import Kanini from "../../assets/kanini-c.png";

const Navbar = () => {
  const [menu, setMenu] = useState(false); // Toggle for sidebar menu
  const sideBar = () => {
    setMenu(!menu);
  };
  const name = localStorage.getItem("username");
  return (
    <>
      {/* navbar */}
      <div>
        <div className="navbar">
          {/* Menu Icon */}
          <div className="menu" onClick={sideBar}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          {/* Heading */}
          <div className="heading">
            <h3 id="title">
              Welcome {name} !
              <br />
              <br />
              <span id="desc">Visualize Your Coding Journey Progress</span>
            </h3>
          </div>
          {/* Admin Section */}
          <div className="inline">
            <div className="hide-icon" id="hr">
              {/* Bell icon */}
              <img
                src={Bell_V}
                id="bell"
                height="22px"
                width="22px"
                alt="Notification"
              />
              {/* Kanini Logo */}
              <span>
                <img
                  className="kanini-c"
                  src={Kanini}
                  alt="kanini"
                  height="48px"
                  width="48px"
                />
              </span>
              <span id="admintext">Kanini</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
