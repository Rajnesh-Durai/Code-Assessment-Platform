import React from "react";
import { Link } from "react-router-dom";

if (document.fullscreenElement) {
  // Check if the document is currently in fullscreen mode
  if (document.exitFullscreen) {
    // Standard syntax
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    // Chrome, Safari, and Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    // IE/Edge
    document.msExitFullscreen();
  }
}

const EndTestButton = ({onClick}) => (
  <div className="endtest-div">
    <Link to="/exit">
      <button className="end-btn" onClick={onClick}>End Test</button>
    </Link>
  </div>
);

export default EndTestButton;
