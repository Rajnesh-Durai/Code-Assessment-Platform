import React from "react";
import DetectRTC from "detectrtc";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var buttonViewDisabled = true;

function ValidateCheck() {
  var isAllowed = false;

  // Browser Check
  if (DetectRTC.browser.isChrome) {
    //.................................Chrome
    // If Browser is Chrome
    if (DetectRTC.browser.version > 80) {
      // If the Browser is updated
      isAllowed = true;
    } else {
      // If browser is not Updated
      swal("Please Update Browser or Try a Different Browser");
      isAllowed = false;
    }
  }
  if (DetectRTC.browser.isFirefox) {
    //.................................Firefox
    // If Browser is Chrome
    if (DetectRTC.browser.version > 60) {
      // If the Browser is updated
      isAllowed = true;
    } else {
      // If browser is not Updated
      swal("Please Update Browser or Try a Different Browser");
      isAllowed = false;
    }
  }
  if (DetectRTC.browser.isSafari) {
    //.................................Safari
    // If Browser is Chrome
    if (DetectRTC.browser.version > 12) {
      // If the Browser is updated
      isAllowed = true;
    } else {
      // If browser is not Updated
      swal("Please Update Browser or Try a Different Browser");
      isAllowed = false;
    }
  }
  if (DetectRTC.browser.isOpera) {
    //.................................Opera
    // If Browser is Chrome
    if (DetectRTC.browser.version > 60) {
      // If the Browser is updated
      isAllowed = true;
    } else {
      // If browser is not Updated
      swal("Please Update Browser or Try a Different Browser");
      isAllowed = false;
    }
  }
  if (DetectRTC.browser.isEdge) {
    //.................................Edge
    // If Browser is Chrome
    if (DetectRTC.browser.version > 80) {
      // If the Browser is updated
      isAllowed = true;
    } else {
      // If browser is not Updated
      swal("Please Update Browser or Try a Different Browser");
      isAllowed = false;
    }
  }

  // OS Check

  const webcam = DetectRTC.isWebsiteHasWebcamPermissions;

  //console.log(webcam)
  if (webcam) {
    isAllowed = true;
  } else {
    isAllowed = false;
  }

  // Final Approval
  if (isAllowed) {
    buttonViewDisabled = false;
  } else {
    buttonViewDisabled = true;
  }
}

const SystemCheck = () => {
  const [webcam, setWebcam] = useState(false);
  useEffect(() => {
    // Camera Permission
    DetectRTC.load(function () {
      const hasWebcamPermissions = DetectRTC.isWebsiteHasWebcamPermissions;

      if (!hasWebcamPermissions) {
        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;

        var video = document.querySelector("#videoElement");
        if (navigator.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function (stream) {
              video.srcObject = stream;
              setWebcam(true); // Update the state when webcam permission is granted
            })
            .catch(function (err0r) {
              setWebcam(false); // Update the state when webcam permission is not granted
              toast.warning("Please Enable Camera");
            });
        }
      } else {
        setWebcam(true); // Update the state when webcam permission is already granted
      }
    });
  });

  var DetectRTC = require("detectrtc");
  const webcamPermissionStatus = webcam ? " ON" : "OFF";

  ValidateCheck();

  function handleClick() {
    navigate("/validate");
  }

  var elem = document.documentElement;

  /* View in fullscreen */
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
      navigate("/instruction");
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
      navigate("/instruction");
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
      navigate("/instruction");
    }
  }
  const navigate = useNavigate();
  return (
    <>
      <div className="checkout-body">
        <div className="compatibility-content">
          <p className="sign" align="center">
            System Compatibility Check
          </p>
          <table align="center">
            <tbody>
              <tr>
                <td>
                  <ul>
                    <li className="test">
                      <span>
                        <b>OS:</b>{" "}
                        {"- " +
                          JSON.stringify(DetectRTC.osName, null, 2).slice(
                            1,
                            -1
                          ) +
                          " " +
                          JSON.stringify(DetectRTC.osVersion, null, 0).slice(
                            1,
                            -1
                          )}{" "}
                      </span>
                    </li>
                    <li className="test">
                      <span>
                        <b>Browser:</b>{" "}
                        {"- " +
                          JSON.stringify(DetectRTC.browser.name).slice(1, -1) +
                          " " +
                          JSON.stringify(DetectRTC.browser.version)}{" "}
                      </span>
                    </li>
                    <li className="test">
                      <span>
                        <b>Webcam:</b> {"- " + webcamPermissionStatus}
                      </span>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <center>
            <Button
              className="activate-button"
              variant="outlined"
              color="success"
              onClick={handleClick}
              sx={{ fontSize: "22px" }}
            >
              Take Your photo
            </Button>
          </center>
          <br />
          <br />
          <center>
              <Button
                size="large"
                disabled={buttonViewDisabled}
                variant="contained"
                onClick={openFullscreen}
                sx={{ fontSize: "20px", backgroundColor: "black" }}
              >
                Next
              </Button>
          </center>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default SystemCheck;
