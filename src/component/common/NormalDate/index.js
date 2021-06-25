import React, { Component } from "react";
import DatePicker from "react-datepicker";
// import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";

export class NormalDate extends Component {
  render() {
    let {
      className = "form-control",
      placeholder = "DD/MM/YY",
      onChange,
      value = "",
      name,
      iconname = "",
      disabled = false,
      showDisabledMonthNavigation = false,
      minDate = new Date("1970-01-01")
    } = this.props;
    return (
      <div className="row date-picker-wrapper m-0 w-100">
        <DatePicker
          className={className}
          disabled={disabled}
          placeholderText={placeholder}
          selected={value}
          autoComplete={"off"}
          minDate={minDate}
          showDisabledMonthNavigation={showDisabledMonthNavigation}
          dropdownMode="select"
          onChange={date => {
            let body = {};

            body = {
              target: {
                name: name,
                value: date

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