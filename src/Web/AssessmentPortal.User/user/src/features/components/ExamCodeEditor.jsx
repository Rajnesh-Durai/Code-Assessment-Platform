import React, { useState } from "react";
import "../../css/codeEditor.css";
import Editor from "@monaco-editor/react";
import LanguagesDropdown from "./LanguageDropdown";

const ExamCodeEditor = ({
  code,
  onExamChange,
  language,
  theme,
  handleCompile,
  isActive,
  isValidate,
  handleValidate,
  onSelectChange,
  setValidate
}) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onExamChange("code", value);
    console.log(value);
  };
  const handleClear = () => {
    setValue("");
    onExamChange("");
    isValidate = false;
    setValidate(true)
  };
  // Set the desired font size
  const editorOptions = {
    fontSize: 18, // Change this value as needed
  };
  return (
    <div>
      <LanguagesDropdown onSelectChange={onSelectChange} />
      <div className="test-box">
        <Editor
          height="55vh"
          width={`100%`}
          language={language || "javascript"}
          value={value}
          theme={theme}
          onChange={handleEditorChange}
          options={editorOptions}
        />
      </div>
      {isActive === true ? (
        <>
          {isValidate === false ? (
            //   <button onClick={handleValidate} className="validate-btn">
            //   Validate
            // </button>
            <button class="ui-btn" onClick={handleValidate}>
              <span>Validate</span>
            </button>
          ) : (
            <></>
          )}
          {/* <button onClick={handleClear} className="clear-btn">
            Clear
          </button> */}
          <button onClick={handleClear} class="clear-btn"><span class="text">Clear</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
          <button onClick={handleCompile} className="compile-btn">
            Run
          </button>
        </>
      ) : (
        <>
          {/* <button onClick={handleClear} className="clear-btn2">
            Clear
          </button> */}
          <button onClick={handleClear} class="clear-btn2"><span class="text">Clear</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
          <button onClick={handleCompile} className="compile-btn2">
            Run
          </button>
        </>
      )}
      {/* Other code editor components */}
    </div>
  );
};
export default ExamCodeEditor;
