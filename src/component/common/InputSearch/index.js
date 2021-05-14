import React from "react";
import "./style.scss";

import PropTypes from "prop-types";

export const InputSearch = ({
  inputClassName = "form-control pl-3",
  onChange,
  onEnter,
  placeholder = "Search",
  value,
}) => {
  return (
    <div className="search-box input-group">
      <input
        className={inputClassName}
        placeholder={placeholder}
        name="search"
        type="text"
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter(e);
          }
        }}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
        }}
      />
      <i className={`icon-searchIcon search-icon`}></i>
    </div>
  );
};

InputSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
