import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class NormalButtonClass extends Component {
  render() {
    const {
      className = "",
      label = "",
      onClick,
      id,
      disabled = false,
      outline = false,
      mainbg = false,
      link = false,
      normal = false,
      success = false,
      danger = false,
      rightIcon = "",
      buttonClass = "",
      t,
    } = this.props;

    return (
      <div className={`${buttonClass}`}>
        <button
          id={id}
          className={`btn cursor-pointer ${outline ? "outline-btn" : ""} ${
            danger ? "danger-btn" : ""
          } ${mainbg ? "mainbg-btn" : ""} ${normal ? "normal-btn" : ""} ${
            link ? "delete-btn" : ""
          } ${success ? "success-btn" : ""} ${className}`}
          onClick={onClick}
          disabled={disabled}
        >
          {t(label)}
          {rightIcon !== "" ? (
            <span className={`btn-right-icon ${rightIcon}`}></span>
          ) : (
            ""
          )}
        </button>
      </div>
    );
  }
}

export const NormalButton = withTranslation()(NormalButtonClass);
