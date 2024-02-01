import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const COUNTDOWN_DURATION = 1.5 * 60 * 60 * 1000; // 1.5 hours in milliseconds
const COUNTDOWN_FROM = Date.now() + COUNTDOWN_DURATION;
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const CustomCountdown = () => {
  const intervalRef = useRef(null);

  const [remaining, setRemaining] = useState({
    days: 0,
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

    const days = Math.floor(distance / DAY);
    const hours = Math.floor((distance % DAY) / HOUR);
    const minutes = Math.floor((distance % HOUR) / MINUTE);
    const seconds = Math.ceil((distance % MINUTE) / SECOND);

    setRemaining({
      days,
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
        <CountdownItem num={remaining.days} />
        <CountdownItem num={remaining.hours} />
        <CountdownItem num={remaining.minutes} />
        <CountdownItem num={remaining.seconds} />
      </div>
    </div>
  );
};

const CountdownItem = ({ num, text }) => (
  <div style={{ margin: "0 5px", textAlign: "center" }}>
    <div style={{ position: "relative", overflow: "hidden", width: "40px" }}>
      <AnimatePresence>
        <motion.span
          key={num}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ ease: "backIn", duration: 0.75 }}
          style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}
        >
          {num}
        </motion.span>
      </AnimatePresence>
    </div>
  </div>
);

export default CustomCountdown;
