import React, { Component } from "react";
import "./style.scss";

export class CalenderTable extends Component {
  state = {
    selectedMonth: "",
  };
  componentWillMount() {
    const date = new Date();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    this.setState({ selectedMonth: `${year}-${month}` });
  }
  componentDidMount() {
    for (let index = 1; index <= 31; index++) {
      let anchor = document.getElementById(index)?.parentElement;
      if (anchor) {
        anchor.onclick = () => {
          if (this.props.disabled ?? false) return;
          document.getElementById(index).classList.toggle("show");
        };
      }
    }
  }
  componentDidUpdate() {
    var tableData = document.getElementsByTagName("TD");
    for (var i = 0; i < tableData.length; i++) {
      var td = tableData[i];
      td.onclick = null;
    }

    for (let index = 1; index <= 31; index++) {
      let anchor = document.getElementById(index)?.parentElement;
      if (anchor) {
        anchor.onclick = () => {
          if (this.props.disabled ?? false) return;
          document.getElementById(index).classList.toggle("show");
        };
      }
    }
  }
  render() {
    let {
      date = this.state.selectedMonth,
      data = "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      onChange,
      disabled = false,
    } = this.props;

    const handOnOptionClick = (index, value) => {
      if (disabled) return;
      data =
        data.substr(0, index - 1) + value + data.substr(index, data.length);
      onChange(data);
    };
    const getDate = (index) => {
      var d = new Date(date);
      var firstDayDate = new Date(d.getFullYear(), d.getMonth(), 1);
      var lastDayDate = new Date(
        d.getFullYear(),
        d.getMonth() + 1,
        0
      ).getDate();
      var startIndex = firstDayDate.getDay() == 0 ? 7 : firstDayDate.getDay();
      var currentDate = index - startIndex + 1;
      if (currentDate <= 0) return;
      if (currentDate > lastDayDate) return;
      return (
        <>
          {currentDate}
          <div id={currentDate} class="dropdown-content">
            <label onClick={() => handOnOptionClick(currentDate, "e")}>
              empty
            </label>
            <label onClick={() => handOnOptionClick(currentDate, "o")}>
              option 1
            </label>
            <label onClick={() => handOnOptionClick(currentDate, "w")}>
              option 2
            </label>
          </div>
        </>
      );
    };

    const getClassName = (index) => {
      var d = new Date(date);
      var firstDayDate = new Date(d.getFullYear(), d.getMonth(), 1);
      var lastDayDate = new Date(
        d.getFullYear(),
        d.getMonth() + 1,
        0
      ).getDate();
      var startIndex = firstDayDate.getDay() == 0 ? 7 : firstDayDate.getDay();
      var currentDate = index - startIndex + 1;
      if (currentDate <= 0) return "empty";
      if (currentDate > lastDayDate) return "empty";
      return data[currentDate - 1];
    };
    return (
      <table className="table">
        <tr className="table-header-color">
          <th className="text-dark">Mon</th>
          <th className="text-dark">Tue</th>
          <th className="text-dark">Wed</th>
          <th className="text-dark">Thu</th>
          <th className="text-dark">Fri</th>
          <th className="text-danger">Sat</th>
          <th className="text-danger">Sun</th>
        </tr>
        <tr>
          <td className={getClassName(1)}>{getDate(1)}</td>
          <td className={getClassName(2)}>{getDate(2)}</td>
          <td className={getClassName(3)}>{getDate(3)}</td>
          <td className={getClassName(4)}>{getDate(4)}</td>
          <td className={getClassName(5)}>{getDate(5)}</td>
          <td className={getClassName(6)}>{getDate(6)}</td>
          <td className={getClassName(7)}>{getDate(7)}</td>
        </tr>
        <tr>
          <td className={getClassName(8)}>{getDate(8)}</td>
          <td className={getClassName(9)}>{getDate(9)}</td>
          <td className={getClassName(10)}>{getDate(10)}</td>
          <td className={getClassName(11)}>{getDate(11)}</td>
          <td className={getClassName(12)}>{getDate(12)}</td>
          <td className={getClassName(13)}>{getDate(13)}</td>
          <td className={getClassName(14)}>{getDate(14)}</td>
        </tr>
        <tr>
          <td className={getClassName(15)}>{getDate(15)}</td>
          <td className={getClassName(16)}>{getDate(16)}</td>
          <td className={getClassName(17)}>{getDate(17)}</td>
          <td className={getClassName(18)}>{getDate(18)}</td>
          <td className={getClassName(19)}>{getDate(19)}</td>
          <td className={getClassName(20)}>{getDate(20)}</td>
          <td className={getClassName(21)}>{getDate(21)}</td>
        </tr>
        <tr>
          <td className={getClassName(22)}>{getDate(22)}</td>
          <td className={getClassName(23)}>{getDate(23)}</td>
          <td className={getClassName(24)}>{getDate(24)}</td>
          <td className={getClassName(25)}>{getDate(25)}</td>
          <td className={getClassName(26)}>{getDate(26)}</td>
          <td className={getClassName(27)}>{getDate(27)}</td>
          <td className={getClassName(28)}>{getDate(28)}</td>
        </tr>
        <tr>
          <td className={getClassName(29)}>{getDate(29)}</td>
          <td className={getClassName(30)}>{getDate(30)}</td>
          <td className={getClassName(31)}>{getDate(31)}</td>
          <td className={getClassName(32)}>{getDate(32)}</td>
          <td className={getClassName(33)}>{getDate(33)}</td>
          <td className={getClassName(34)}>{getDate(34)}</td>
          <td className={getClassName(35)}>{getDate(35)}</td>
        </tr>
        <tr>
          <td className={getClassName(36)}>{getDate(36)}</td>
          <td className={getClassName(37)}>{getDate(37)}</td>
          <td className={getClassName(38)}>{getDate(38)}</td>
          <td className={getClassName(39)}>{getDate(39)}</td>
          <td className={getClassName(40)}>{getDate(40)}</td>
          <td className={getClassName(41)}>{getDate(41)}</td>
          <td className={getClassName(42)}>{getDate(42)}</td>
        </tr>
      </table>
    );
  }
}
