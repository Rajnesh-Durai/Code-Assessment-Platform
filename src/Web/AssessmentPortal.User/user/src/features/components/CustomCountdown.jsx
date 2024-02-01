import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";

const COUNTDOWN_DURATION = (90 * 60 + 10) * 1000;
const COUNTDOWN_FROM = Date.now() + COUNTDOWN_DURATION;
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const CustomCountdown = () => {
  const intervalRef = useRef(null);

  const [remaining, setRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const handleCountdown = () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = +end - +now;

    const hours = Math.floor((distance % DAY) / HOUR);
    const minutes = Math.floor((distance % HOUR) / MINUTE);
    const seconds = Math.floor((distance % MINUTE) / SECOND);

    setRemaining({
      hours,
      minutes,
      seconds,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex" }}>
        <FontAwesomeIcon
          icon={faStopwatch}
          style={{ color: "#ffffff", marginTop: "5px", marginRight: "6px" }}
        />
        <CountdownItem num={remaining.hours} />
        <span
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#fff",
            marginTop: "5px",
          }}
        >
          :
        </span>
        <CountdownItem num={remaining.minutes} />
        <span
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#fff",
            marginTop: "5px",
          }}
        >
          :
        </span>
        <CountdownItem num={remaining.seconds} />
      </div>
    </div>
  );
};

const CountdownItem = ({ num }) => (
  <div style={{ margin: "0 5px", textAlign: "center" }}>
    <div style={{ position: "relative", overflow: "hidden", width: "28.5px" }}>
      <AnimatePresence>
        <motion.span
          key={num}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ ease: "backIn", duration: 0.5 }}
          style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}
        >
          {num}
        </motion.span>
      </AnimatePresence>
    </div>
  </div>
);

export default CustomCountdown;
