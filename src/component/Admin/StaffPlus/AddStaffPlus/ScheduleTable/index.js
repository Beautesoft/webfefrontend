import React, { Component } from "react";
import "./style.scss";

export class ScheduleTable extends Component {
  render() {
    let {
      onChange,
      data = {
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null,
        sunday: null,
      },
      disabled = false,
    } = this.props;

    const handleOnClick = (name) => {
      if (disabled) return;
      data[name] =
        data[name] == null ? "YES" : data[name] == "YES" ? "NO" : "YES";
      onChange(data);
    };

    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                onClick={() => handleOnClick("monday")}
                className={data.monday == "YES" ? "on" : "off"}
              >
                {data.monday == "YES" ? "NS" : "OFF"}
              </td>
              <td
                onClick={() => handleOnClick("tuesday")}
                className={data.tuesday == "YES" ? "on" : "off"}
              >
                {data.tuesday == "YES" ? "NS" : "OFF"}
              </td>
              <td
                onClick={() => handleOnClick("wednesday")}
                className={data.wednesday == "YES" ? "on" : "off"}
              >
                {data.wednesday == "YES" ? "NS" : "OFF"}
              </td>
              <td
                onClick={() => handleOnClick("thursday")}
                className={data.thursday == "YES" ? "on" : "off"}
              >
                {data.thursday == "YES" ? "NS" : "OFF"}
              </td>
              <td
                onClick={() => handleOnClick("friday")}
                className={data.friday == "YES" ? "on" : "off"}
              >
                {data.friday == "YES" ? "NS" : "OFF"}
              </td>
              <td
                onClick={() => handleOnClick("saturday")}
                className={data.saturday == "YES" ? "on" : "off"}
              >
                {data.saturday == "YES" ? "NS" : "OFF"}
              </td>
              <td
                onClick={() => handleOnClick("sunday")}
                className={data.sunday == "YES" ? "on" : "off"}
              >
                {data.sunday == "YES" ? "NS" : "OFF"}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
