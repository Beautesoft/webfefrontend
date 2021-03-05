import React, { useState, useEffect } from "react";
import "./style.scss";
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
import 'moment/locale/it.js';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export const NormalDateTime = ({
  onChange,
  name = "",
  showTime = false,
  timeOnly = false,
  value,
  className,
  showYearDropdown = false,
  dateFormat
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const handleDateSelect = (date) => {
    onChange(name, date)
    setStartDate(date)
  }

  return (
    <div className={`${className} date-picker`}>
      <DatePicker
        selected={value ? value:startDate}
        onChange={date => handleDateSelect(date)}
        showTimeSelect={showTime}
        showTimeSelectOnly={timeOnly}
        timeIntervals={15}
        // timeCaption="Time"
        dateFormat={dateFormat}
        showYearDropdown={showYearDropdown}
      />
      <span className="icon-calendar icon font-lg icon"></span>
    </div>
  );
};

// export default RTDatepick;
NormalDateTime.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
}