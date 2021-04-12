import React, { Component } from "react";
import "./style.scss";

export class BigCalander extends Component {
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
    for (
      let staffIndex = 0;
      staffIndex < this.props.data.length;
      staffIndex++
    ) {
      let staff = this.props.data[staffIndex];
      for (let index = 0; index <= staff.data.length; index++) {
        let anchor = document.getElementById(staff.name + index)?.parentElement;
        if (anchor) {
          anchor.onclick = () => {
            if (this.props.disabled ?? false) return;
            document
              .getElementById(staff.name + index)
              .classList.toggle("show");
          };
        }
      }
    }
  }
  componentDidUpdate() {
    var tableData = document.getElementsByTagName("TD");
    for (var i = 0; i < tableData.length; i++) {
      var td = tableData[i];
      td.onclick = null;
    }

    for (
      let staffIndex = 0;
      staffIndex < this.props.data.length;
      staffIndex++
    ) {
      let staff = this.props.data[staffIndex];
      for (let index = 0; index <= staff.data.length; index++) {
        let anchor = document.getElementById(staff.name + index)?.parentElement;
        if (anchor) {
          anchor.onclick = () => {
            if (this.props.disabled ?? false) return;
            document
              .getElementById(staff.name + index)
              .classList.toggle("show");
          };
        }
      }
    }
  }
  render() {
    let {
      date = this.state.selectedMonth,
      data = [
        { name: "apple", data: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
        { name: "orange", data: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
        { name: "mango", data: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
      ],
      onChange,
      disabled = false,
    } = this.props;

    let d = new Date(date);
    let lastDayDate = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

    const handOnOptionClick = (staffIndex, index, value) => {
      if (disabled) return;

      data[staffIndex].data =
        data[staffIndex].data.substr(0, index) +
        value +
        data[staffIndex].data.substr(index + 1, data[staffIndex].data.length);
      onChange(data);
    };

    const days = [];
    const headers = [];

    for (let index = 1; index <= lastDayDate; index++) {
      headers.push(<th>{index}</th>);
      days.push(index - 1);
    }
    const rows = [];
    for (let staffIndex = 0; staffIndex < data.length; staffIndex++) {
      let staff = data[staffIndex];
      console.log(data);
      rows.push(
        <tr>
          <th className="table-header-color">{staff.name}</th>
          {days.map((day) => (
            <td className={staff.data[day]}>
              <div id={staff.name + day} class="dropdown-content">
                <label onClick={() => handOnOptionClick(staffIndex, day, "e")}>
                  empty
                </label>
                <label onClick={() => handOnOptionClick(staffIndex, day, "o")}>
                  option 1
                </label>
                <label onClick={() => handOnOptionClick(staffIndex, day, "w")}>
                  option 2
                </label>
              </div>
            </td>
          ))}
        </tr>
      );
    }
    return (
      <div class="table-container">
        <table className="table">
          <tr className="table-header-color">
            <th>Staff</th>
            {headers}
          </tr>
          {rows}
        </table>
      </div>
    );
  }
}
