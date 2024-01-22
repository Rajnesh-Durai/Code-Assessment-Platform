export const customStyles = {
    control: (styles) => ({
      ...styles,
      width: "100%",
      maxWidth: "18rem",
      minWidth: "12rem",
      borderRadius: "5px",
      color: "#000",
      fontSize: "1.0rem",
      lineHeight: "1.75rem",
      backgroundColor: "#FFFFFF",
      cursor: "pointer",
      border: "2.5px solid #7BCCED",
      boxShadow: "",
      ":hover": {
        border: "2px solid #7BCCED",
        boxShadow: "none",
      },
    }),
    option: (styles) => {
      return {
        ...styles,
        color: "#000",
        fontSize:"1.0rem",
        lineHeight: "1.75rem",
        width: "100%",

        background: "#fff",
        ":hover": {
          backgroundColor: "rgb(243 244 246)",
          color: "#000",
          cursor: "pointer",
        },
      };
    },
    menu: (styles) => {
      return {
        ...styles,
        backgroundColor: "#fff",
        maxWidth: "18rem",
        border: "2px solid #7BCCED",
        fontSize:"1.0rem",
        borderRadius: "5px",
        boxShadow: "",
      };
    },
  
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#000",
        fontSize:"1.0rem",
        lineHeight: "1.75rem",
      };
    },
  };
  