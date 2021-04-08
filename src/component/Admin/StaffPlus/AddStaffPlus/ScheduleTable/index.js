import React, { Component } from "react";
import "./style.scss";

export class ScheduleTable extends Component {
  render() {
    let { onChange, data = "1110111", disabled = false} = this.props;

    const handleOnClick = (index) => {
      if(disabled) return;
      data[index] == "1" ? data = data.substr(0,index) + "0" + data.substr(index+1,data.length) : data = data.substr(0,index) + "1" + data.substr(index+1,data.length)
      onChange(data);
    };

    return (
      <>
        <table className="table">
          <tr>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
          <tr>
            <td onClick={()=>handleOnClick(0)} className={data[0] == "1" ? "on" : "off"}>{data[0] == "1" ? "NS" : "OFF"}</td>
            <td onClick={()=>handleOnClick(1)} className={data[1] == "1" ? "on" : "off"}>{data[1] == "1" ? "NS" : "OFF"}</td>
            <td onClick={()=>handleOnClick(2)} className={data[2] == "1" ? "on" : "off"}>{data[2] == "1" ? "NS" : "OFF"}</td>
            <td onClick={()=>handleOnClick(3)} className={data[3] == "1" ? "on" : "off"}>{data[3] == "1" ? "NS" : "OFF"}</td>
            <td onClick={()=>handleOnClick(4)} className={data[4] == "1" ? "on" : "off"}>{data[4] == "1" ? "NS" : "OFF"}</td>
            <td onClick={()=>handleOnClick(5)} className={data[5] == "1" ? "on" : "off"}>{data[5] == "1" ? "NS" : "OFF"}</td>
            <td onClick={()=>handleOnClick(6)} className={data[6] == "1" ? "on" : "off"}>{data[6] == "1" ? "NS" : "OFF"}</td>
          </tr>
        </table>
      </>
    );
  }
}
