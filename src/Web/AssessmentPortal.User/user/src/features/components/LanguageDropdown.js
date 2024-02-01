import React from "react";
import Select from "react-select";
import { customStyles } from "../../constants/customStyles";
import { languageOptions } from "../../constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange }) => {
  const languageName=sessionStorage.getItem('topicName');  
  const selectedOption = languageOptions.filter(option => option.value === languageName);
  return (
    <Select
      placeholder={`Filter By Category`}
      options={selectedOption}
      styles={customStyles}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
