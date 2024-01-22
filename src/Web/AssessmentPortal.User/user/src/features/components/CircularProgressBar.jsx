import React from "react";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";
import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({score}) => {
  return (
    <div className="mark">
        <Example>
        <AnimatedProgressProvider
        valueStart={0}
        valueEnd={score}
        duration={2.5}
        easingFunction={easeQuadInOut}
        no-repeat
      >
        {(value) => {
          const roundedValue = Math.round(score);
          return (
            <CircularProgressbar
              value={value}
              text={`${roundedValue}%`}
              strokeWidth={6}
              text2={score}
              styles={buildStyles({
                pathTransition: "",
                textColor: "#23A6D5",
                trailColor: "#d6d6d6",
                pathColor: "#23A6D5",
              })}
            />
          );
        }}
      </AnimatedProgressProvider>
        </Example>
      
    </div>
  );
};

export default CircularProgressBar;



function Example(props) {
    return (
      <div style={{ marginBottom: '10px' }}>
        <div style={{ marginLeft: '10px', display: "flex" }}>
          <div className='circularBar' style={{}}>{props.children}</div>
        </div>
      </div>
    );
  }