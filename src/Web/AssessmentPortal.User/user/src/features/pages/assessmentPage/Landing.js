import React, { useEffect, useState } from "react";
import axios from "axios";
import { languageOptions } from "../../../constants/languageOptions";
import "../../../css/codeEditor.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/image 1.png";
import { defineTheme } from "../../../lib/defineTheme";
import useKeyPress from "../../../hooks/useKeyPress";
import "./Landing.css";
import CameraMonitor from "../../components/CameraMonitor.jsx";
import Questions from "../../components/Questions.jsx";
import ExamCodeEditor from "../../components/ExamCodeEditor.jsx";
import EndTestButton from "../../components/EndTestButton.jsx";
import QuestionModules from "../../components/QuestionModules.jsx";
import { Box, Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import CustomInput from "../../components/CustomInput.js";
import OutputWindow from "../../components/OutputWindow.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader.jsx";
import emailjs from "@emailjs/browser";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_SERVICE_ID,
} from "../../../constants/emailCredentials.js";

const Landing = () => {
  const [code, setCode] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const [questions, setQuestions] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [nextQuestion, setNextQuestion] = useState({});
  const [previousQuestion, setPreviousQuestion] = useState({});
  const [answer, setAnswer] = useState("");
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [answeredQuestion, setAnsweredQuestion] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [value, setValue] = React.useState("1"); //Tab
  const [isFilterVisible, setIsFilterVisible] = useState(true); //hide filter
  const [isHide, setHide] = useState(true);
  const [isValidate, setValidate] = useState(true);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [countdownKey, setCountdownKey] = useState(Date.now());
  useEffect(() => {
    const id = sessionStorage.getItem("AssessmentId");
    axios
      .get(`https://localhost:9005/assessment/${id}/question`)
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched
      });
  }, []);

  // Alert on Tab Changed within the Same browser Window
  function handleVisibilityChange() {
    if (document.visibilityState === "hidden") {
      swal("Tab Change Detected", "Action has been Recorded", "error");
    } else {
    }
  }
  document.addEventListener("visibilitychange", handleVisibilityChange, false);

  //Alert on ctrl key press
  document.onkeydown = function (event) {
    if (event.ctrlKey || event.altKey) {
      if (event.ctrlKey) {
        swal("CtrlKey Press Detected", "Action has been Recorded", "error");
      } else {
        swal("AltKey Press Detected", "Action has been Recorded", "error");
      }
      return false;
    } else {
      return true;
    }
  };
  const displayQuestions = (
    questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    if (questions.length > 0) {
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      setCurrentQuestion(currentQuestion);
      setNextQuestion(nextQuestion);
      setPreviousQuestion(previousQuestion);
      setAnswer(answer);
    }
  };

  useEffect(() => {
    setTotalQuestion(questions.length);
    displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
  }, [questions]);

  useEffect(() => {
    setCode(""); // Set code to null when currentQuestionIndex changes
  }, [currentQuestionIndex]);

  const handleNext = () => {
    setValidate(true);
    if (currentQuestionIndex < totalQuestion - 1) {
      setHide(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnsweredQuestion(answeredQuestion + 1);

      const updatedCurrentQuestion = questions[currentQuestionIndex + 1];
      const updatedNextQuestion =
        currentQuestionIndex + 2 < totalQuestion
          ? questions[currentQuestionIndex + 2]
          : null;
      const updatedPreviousQuestion =
        currentQuestionIndex > 0 ? questions[currentQuestionIndex] : null;

      setCurrentQuestion(updatedCurrentQuestion);
      setNextQuestion(updatedNextQuestion);
      setPreviousQuestion(updatedPreviousQuestion);
    }
  };

  const handlePrevious = () => {
    setValidate(true);
    if (currentQuestionIndex > 0) {
      setHide(false);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const updatedCurrentQuestion = questions[currentQuestionIndex - 1];
      const updatedNextQuestion = questions[currentQuestionIndex];
      const updatedPreviousQuestion =
        currentQuestionIndex - 2 >= 0
          ? questions[currentQuestionIndex - 2]
          : null;
      // setCode('');
      setCurrentQuestion(updatedCurrentQuestion);
      setNextQuestion(updatedNextQuestion);
      setPreviousQuestion(updatedPreviousQuestion);
    }
  };

  const handleEndTest = () => {
    const scoreValidated = (correctAnswer * 100) / totalQuestion;
    const receiverUsername = localStorage.getItem("username");
    const receiverEmail = localStorage.getItem("email");

    const serviceId = EMAILJS_SERVICE_ID;
    const templateId = EMAILJS_TEMPLATE_ID;
    const publicKey = EMAILJS_PUBLIC_KEY;

    const templateParams = {
      email: receiverEmail,
      username: receiverUsername,
    };
    const formData = {
      user_id: localStorage.getItem("UserId"),
      user_assessment_id: sessionStorage.getItem("AssessmentId"),
      score: scoreValidated,
      correct_answer: correctAnswer,
      wrong_answer: totalQuestion - correctAnswer,
    };
    console.log(formData);
    const headers = {
      "Content-Type": "application/json", // Set the Content-Type header
    };

    axios
      .post("https://localhost:9005/result", formData, { headers })
      .then((response) => {
        console.log("User result added successfully:", response.data);
        showSuccessToast("Posted Successfully");
        emailjs
          .send(serviceId, templateId, templateParams, publicKey)
          .then((emailResponse) => {
            console.log("Email sent successfully:", emailResponse);
          })
          .catch((emailError) => {
            console.error("Error sending email:", emailError);
          });
      })
      .catch((error) => {
        console.error("Error adding user result:", error);
        showErrorToast("Not Posted Successfully");
      });
  };

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
    console.log(sl);
  };

  const onExamChange = (action, data) => {
    console.log("Action:", action);
    console.log("Data", data);
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = async () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
      expected_output: btoa(currentQuestion.expected_output),
    };
    try {
      const options = {
        method: "POST",
        url: "https://localhost:9005/api/Submission/submit",
        data: formData,
      };
      let response = await axios.request(options);
      console.log(response.data);
      let statusId = response.data.status_id;
      if (statusId === 1 || statusId === 2) {
        console.log("If");
        return;
      } else if (statusId === 6) {
        setOutputDetails(response.data);
        showErrorToast(`Syntax Error. Check your Code`);
      } else if (statusId === 3) {
        console.log("Correct");
        setValidate(false);
        setOutputDetails(response.data);
        showSuccessToast(
          `Success!! The Output matches with the Excepted Output`
        );
        setCurrentQuestion((prevCurrentQuestion) => ({
          ...prevCurrentQuestion,
          isAnswered: true,
          isCorrect: true,
        }));
        //handleValidate(currentQuestion);
      } else if (statusId === 4) {
        console.log("Not Correct");
        setOutputDetails(response.data);
        showErrorToast(`Output does not match expected output.`);
        if (!currentQuestion.isAnswered) {
          setWrongAnswer((prevWrongAnswer) => prevWrongAnswer + 1);
          setCurrentQuestion((prevCurrentQuestion) => ({
            ...prevCurrentQuestion,
            isAnswered: true,
            isCorrect: false,
          }));
        }
      }
      setAnsweredQuestion((prevAnsweredQuestion) => prevAnsweredQuestion + 1);
      console.log("response.data", response.data);
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };
  //Phi-2 Integration
  const handleValidate = () => {
    setLoader(true);
    const formData = {
      question: currentQuestion.question,
      sourceCode: code,
      language: localStorage.getItem("language_name"),
      model: "phi-2",
      prompt: "", // Initialize prompt with an empty string
    };

    formData.prompt = `Check if the following ${formData.language} code snippet matches the provided question:\n\n\`\`\`${formData.language}\n${formData.sourceCode}\n\`\`\`\n\nRespond with 'true' if the code matches the question; otherwise, respond with 'false'.`;

    console.log(formData);
    axios
      .post("https://localhost:9005/LocalAI/phi-2", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.choices && response.data.choices.length > 0) {
          const isTrueFound = response.data.choices.some((choice) =>
            choice.text.includes("true")
          );

          if (isTrueFound) {
            showSuccessToast(`Success!! It works for all Usecases`);
            setCorrectAnswer((prevCorrectAnswer) => prevCorrectAnswer + 1);
          } else {
            showErrorToast(
              `The code you have written is not valid for all Usecases`
            );
          }
        } else {
          showErrorToast(
            `The code you have written is not valid for all Usecases`
          );
          setWrongAnswer((prevWrongAnswer) => prevWrongAnswer + 1);
          setCurrentQuestion((prevCurrentQuestion) => ({
            ...prevCurrentQuestion,
            isAnswered: true,
            isCorrect: false,
          }));
        }
      })
      .catch((error) => {
        showErrorToast(`${error}`);
        console.error("Error:", error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
    const handleContextMenu = (event) => {
      event.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  //Tab Change
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "2") {
      setIsFilterVisible(false);
    } else {
      setIsFilterVisible(true);
    }
  };

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  // Update the countdownKey when the component mounts or when needed
  useEffect(
    () => {
      setCountdownKey(Date.now());
    },[]
  );
  const handleCountdownComplete = () => {
    navigate("/exit");
  };
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(true);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
        <div>{(loader || loading) && <Loader />}</div>
        <div className="header">
          <div className="flex-prop">
            <img src={logo} alt="kanini" className="kanini-img" />
            <div className="marg-top">KANINI</div>
          </div>
          <div>Kanini Assessment Portal</div>
          <div className="timer">
            <Countdown
              key={countdownKey}
              date={Date.now() + 90 * 60 * 1000}
              onComplete={handleCountdownComplete}
            />
          </div>
        </div>
        <div className="body">
          {isActive === true ? (
            <div className="question">
              <div>
                <Questions
                  currentQuestion={currentQuestion}
                  currentQuestionIndex={currentQuestionIndex}
                />
                <div
                  className="half-circle"
                  onClick={() => {
                    setIsActive(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faAnglesLeft}
                    size="xl"
                    className="left-arrow"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="closed">
              <div>
                <div
                  className="half-circle2"
                  onClick={() => {
                    setIsActive(true);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faAnglesRight}
                    size="xl"
                    className="right-arrow"
                  />
                </div>
              </div>
            </div>
          )}
          {isActive === true ? (
            <div className="terminal">
              <ExamCodeEditor
                code={code}
                onExamChange={onExamChange}
                language={language?.value}
                theme={theme.value}
                handleCompile={handleCompile}
                isActive={isActive}
                isValidate={isValidate}
                handleValidate={handleValidate}
                onSelectChange={onSelectChange}
                setValidate={setValidate}
              />
              <TabContext value={value}>
                <div>
                  <Box sx={{ borderBottom: 0 }}>
                    <TabList
                      onChange={handleChange}
                      TabIndicatorProps={{
                        style: {
                          backgroundColor: "#1589CC",
                          height: "4px",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <Tab
                        label="Input"
                        value="1"
                        aria-label="styled tabs example"
                        sx={{
                          textTransform: "none",
                          fontSize: "19px",
                          fontWeight: "400",
                          fontFamily: "League Spartan",
                          "&.Mui-selected": {
                            color: "#0C1116",
                            fontSize: "19px",
                            fontWeight: "500",
                            fontFamily: "League Spartan",
                          },
                        }}
                      />
                      <Tab
                        label="Output"
                        value="2"
                        sx={{
                          textTransform: "none",
                          fontSize: "19px",
                          fontWeight: "400",
                          fontFamily: "League Spartan",
                          "&.Mui-selected": {
                            color: "#0C1116",
                            fontSize: "19px",
                            fontWeight: "500",
                            fontFamily: "League Spartan",
                          },
                        }}
                      />
                    </TabList>
                  </Box>
                </div>
                <div>
                  <TabPanel value="1">
                    <CustomInput
                      customInput={customInput}
                      setCustomInput={setCustomInput}
                      isActive={isActive}
                    />
                  </TabPanel>
                  <TabPanel value="2">
                    <OutputWindow
                      outputDetails={outputDetails}
                      isActive={isActive}
                    />
                  </TabPanel>
                </div>
              </TabContext>
              <div className="flex-btn">
                {currentQuestionIndex > 0 && (
                  <div>
                    <button className="previous" onClick={handlePrevious}>
                      Previous
                    </button>
                  </div>
                )}
                {currentQuestionIndex < totalQuestion - 1 && (
                  <div>
                    <button className="next" onClick={handleNext}>
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="terminal2">
              <ExamCodeEditor
                code={code}
                onExamChange={onExamChange}
                language={language?.value}
                theme={theme.value}
                handleCompile={handleCompile}
                customInput={customInput}
                setCustomInput={setCustomInput}
                isActive={isActive}
                handleValidate={handleValidate}
                isValidate={isValidate}
                setValidate={setValidate}
              />
              <TabContext value={value}>
                <div>
                  <Box sx={{ borderBottom: 0 }}>
                    <TabList
                      onChange={handleChange}
                      TabIndicatorProps={{
                        style: {
                          backgroundColor: "#1589CC",
                          height: "4px",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <Tab
                        label="Input"
                        value="1"
                        aria-label="styled tabs example"
                        sx={{
                          textTransform: "none",
                          fontSize: "19px",
                          fontWeight: "400",
                          fontFamily: "League Spartan",
                          "&.Mui-selected": {
                            color: "#0C1116",
                            fontSize: "19px",
                            fontWeight: "500",
                            fontFamily: "League Spartan",
                          },
                        }}
                      />
                      <Tab
                        label="Output"
                        value="2"
                        sx={{
                          textTransform: "none",
                          fontSize: "19px",
                          fontWeight: "400",
                          fontFamily: "League Spartan",
                          "&.Mui-selected": {
                            color: "#0C1116",
                            fontSize: "19px",
                            fontWeight: "500",
                            fontFamily: "League Spartan",
                          },
                        }}
                      />
                    </TabList>
                  </Box>
                </div>
                <div>
                  <TabPanel value="1">
                    <CustomInput
                      customInput={customInput}
                      setCustomInput={setCustomInput}
                      isActive={isActive}
                    />
                  </TabPanel>
                  <TabPanel value="2">
                    <OutputWindow
                      outputDetails={outputDetails}
                      isActive={isActive}
                    />
                  </TabPanel>
                </div>
              </TabContext>
              <div className="flex-btn">
                {currentQuestionIndex > 0 && (
                  <div>
                    <button className="previous" onClick={handlePrevious}>
                      Previous
                    </button>
                  </div>
                )}
                {currentQuestionIndex < totalQuestion - 1 && (
                  <div>
                    <button className="next" onClick={handleNext}>
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="camera-endtest">
            <CameraMonitor />
            <QuestionModules
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
            />
            <EndTestButton onClick={handleEndTest} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing;
