// import React, { useState } from "react";
// import "../../css/codeEditor.css";
// import Editor from "@monaco-editor/react";

// const CodeEditorWindow = ({ onChange, language, code, theme }) => {
//   const [value, setValue] = useState(code || "");

//   const handleEditorChange = (value) => {
//     setValue(value);
//     onChange("code", value);
//     console.log(value)
//   };
//     // Set the desired font size
//     const editorOptions = {
//         fontSize: 18// Change this value as needed
//       };

//   return (
//     <div className="test-box">
//       <Editor
//         height="55vh"
//         width={`100%`}
//         language={language || "javascript"}
//         value={value}
//         theme={theme}
//         defaultValue="// some comment"
//         onChange={handleEditorChange}
//         options={editorOptions}
//       />
//     </div>
//   );
// };
// export default CodeEditorWindow;
