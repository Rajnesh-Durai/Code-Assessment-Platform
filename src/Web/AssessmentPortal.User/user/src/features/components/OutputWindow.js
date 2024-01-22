import React from "react";
import '../../css/Global.css'

const OutputWindow = ({ outputDetails, isActive }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3 || statusId === 4) {
      console.log(outputDetails.stdout)
      console.log(atob(outputDetails.stdout))
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500 padding-output">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <>
      {isActive === true ? (
        <div className="my-custom-style">
          {outputDetails ? <>{getOutput()}</> : null}
        </div>
      ) : (
        <div className="my-custom-style2">
          {outputDetails ? <>{getOutput()}</> : null}
        </div>
      )}
    </>
  );
};

export default OutputWindow;
