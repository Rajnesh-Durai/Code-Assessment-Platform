import React from "react";
import error from "../../assets/404page.jpg";
const Error = () => {
  return (
    <div>
      <img src={error} alt="error" className="error-img" />
    </div>
  );
};

export default Error;
