import React from "react";
import StarIcon from "@mui/icons-material/Star";
import "../../css/Global.css";

const StarRating = ({ score }) => {
  const getStarCount = () => {
    if (score >= 90) {
      return 5;
    } else if (score >= 80) {
      return 4;
    } else if (score >= 60) {
      return 3;
    } else if (score >= 40) {
      return 2;
    } else {
      return 1;
    }
  };

  const starCount = getStarCount();

  return (
    <>
      {[...Array(starCount)].map((_, index) => (
        <StarIcon key={index} sx={{ color: "gold", marginBottom: "-3px" }} />
      ))}
    </>
  );
};

export default StarRating;
