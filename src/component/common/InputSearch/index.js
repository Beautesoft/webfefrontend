import React from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";

import PropTypes from "prop-types";

export const InputSearch = ({
  inputClassName = "form-control pl-3",
  onChange,
  onEnter,
  placeholder = "Search",
  value,
  disabled = false,
}) => {
  let { t } = useTranslation();
  return (
    <div className="search-box input-group">
      <input
        className={inputClassName}
        placeholder={t(placeholder)}
        name="search"
        type="text"
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") if (onEnter) onEnter(e);
        }}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
        }}
        disabled={disabled}
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
