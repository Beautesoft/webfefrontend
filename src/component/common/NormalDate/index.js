import React, { Component } from "react";
import DatePicker from "react-datepicker";
// import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";
import { withTranslation } from "react-i18next";

class NormalDateClass extends Component {
  render() {
    let {
      className = "form-control",
      placeholder = "dd/MM/yyyy",
      onChange,
      value = "",
      name,
      iconname = "",
      disabled = false,
      showDisabledMonthNavigation = false,
      minDate = new Date("1970-01-01"),
      popperPlacement = "top-start",
      t,
    } = this.props;
    return (
      <div className="row date-picker-wrapper m-0 w-100">
        <DatePicker
          dateFormat="dd/MM/yyyy"
          popperPlacement={popperPlacement}
          className={className}
          disabled={disabled}
          placeholderText={t(placeholder)}
          selected={value}
          autoComplete={"off"}
          minDate={minDate}
          showDisabledMonthNavigation={showDisabledMonthNavigation}
          dropdownMode="select"
          onChange={(date) => {
            let body = {};

            body = {
              target: {
                name: name,
                value: date,
              },
            };

            onChange(body);
          }}
          name={name}
        />
        <span className="icon-calendar icon font-lg icon"></span>
      </div>
    );
  }
}

export const NormalDate = withTranslation()(NormalDateClass);
