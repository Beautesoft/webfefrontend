import React, { Component } from "react";

export class ScheduleTable extends Component {
  render() {
    let {
      onChange,
      onAltChange,
      data = {
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null,
        sunday: null,
      },
      altws_data = {
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null,
        sunday: null,
      },
      optionList = [],
      disabled = false,
    } = this.props;

    const handleOnClick = (name) => {
      if (this.props.disabled ?? false) return;
      document.getElementById(name).classList.toggle("show");
    };

    const handOnOptionClick = (index, value) => {
      if (disabled) return;
      data[index] = value;
      onChange(data);
    };
    const handALTOnOptionClick = (index, value) => {
      if (disabled) return;
      altws_data[index] = value;
      onAltChange(altws_data);
    };
    return (
      <>
        <table className="table">
          <thead>
            <tr className="table-header-color">
              <th></th>
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
              <td className="table-header-color">WS</td>
              {Object.keys(data).map(function (keyName) {
                return (
                  <td
                    key={"ws" + keyName}
                    onClick={() => handleOnClick("ws" + keyName)}
                    style={{
                      color:
                        optionList.find((val) => val.value == data[keyName]) !=
                        null
                          ? "white"
                          : "black",
                      backgroundColor:
                        optionList.find((val) => val.value == data[keyName]) !=
                        null
                          ? "#" +
                            optionList.find((val) => val.value == data[keyName])
                              .color
                          : "white",
                      cursor: "pointer",
                    }}
                  >
                    {optionList.find((val) => val.value == data[keyName])
                      ?.shortDesc ?? "None"}
                    <div id={"ws" + keyName} class="dropdown-content">
                      {optionList.map((val) => {
                        return (
                          <label
                            key={"ws" + val.id}
                            onClick={() =>
                              handOnOptionClick(keyName, val.value)
                            }
                          >
                            {val.label}
                          </label>
                        );
                      })}
                    </div>
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="table-header-color">ALTWS</td>
              {Object.keys(altws_data).map(function (keyName) {
                return (
                  <td
                    key={"alt" + keyName}
                    onClick={() => handleOnClick("alt" + keyName)}
                    style={{
                      color:
                        optionList.find(
                          (val) => val.value == altws_data[keyName]
                        ) != null
                          ? "white"
                          : "black",
                      backgroundColor:
                        optionList.find(
                          (val) => val.value == altws_data[keyName]
                        ) != null
                          ? optionList.find(
                              (val) => val.value == altws_data[keyName]
                            ).color
                          : "white",
                      cursor: "pointer",
                    }}
                  >
                    {optionList.find((val) => val.value == altws_data[keyName])
                      ?.shortDesc ?? "None"}
                    <div id={"alt" + keyName} class="dropdown-content">
                      {optionList.map((val) => {
                        return (
                          <label
                            key={"alt" + val.id}
                            onClick={() =>
                              handALTOnOptionClick(keyName, val.value)
                            }
                          >
                            {val.label}
                          </label>
                        );
                      })}
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
