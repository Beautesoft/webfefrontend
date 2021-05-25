import React, { Component } from "react";

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
    console.log(optionList);
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
              {Object.keys(data).map(function (keyName) {
                return (
                  <td
                    onClick={() => handleOnClick(keyName)}
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
                    <div id={keyName} class="dropdown-content">
                      {optionList.map((val) => {
                        return (
                          <label
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
          </tbody>
        </table>
        <div className="row m-2">
          {optionList.map((e) => {
            return (
              <div className="col-md-6 col-lg-4 col-sm-12">
                <div className="row w-100">
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "5px",
                      backgroundColor: `#${e.color}`,
                    }}
                  />
                  {e.shortDesc}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
