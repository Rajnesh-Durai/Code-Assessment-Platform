import React, { useState } from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";


const CustomCountdown = () => {
    const navigate = useNavigate();
  const [countdownKey, setCountdownKey] = useState(Date.now());
  const handleCountdownComplete = () => {
    navigate("/exit");
  };


  return (
    <Countdown
      key={countdownKey}
      date={Date.now() + 90 * 60 * 1000}
      onComplete={handleCountdownComplete}
    />
  );
};

export default CustomCountdown;