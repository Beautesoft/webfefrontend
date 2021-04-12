import React, { Component } from "react";
import "./style.scss";

export class ScheduleTable extends Component {
  render() {
    let {
      onChangeWs,
      onChangeAltWs,
      ws = "eeeeeee",
      altws = "eeeeeee",
      disabled = false,
    } = this.props;

    const handleWsOnClick = (index, value) => {
      if (disabled) return;
      ws = ws.substr(0, index) + value + ws.substr(index + 1, ws.length);
      onChangeWs(ws);
    };
    const handleAltWsOnClick = (index, value) => {
      if (disabled) return;
      altws =
        altws.substr(0, index) + value + altws.substr(index + 1, altws.length);
      onChangeAltWs(altws);
    };
    const handleOpenMenu = (id) => {
      if (disabled) return;
      document.getElementById(id).classList.toggle("show");
    };
    const getWsOptions = (index) => {
      return (
        <>
          <label onClick={() => handleWsOnClick(index, "e")}>empty</label>
          <label onClick={() => handleWsOnClick(index, "o")}>option 1</label>
          <label onClick={() => handleWsOnClick(index, "w")}>option 2</label>
        </>
      );
    };
    const getAltWsOptions = (index) => {
      return (
        <>
          <label onClick={() => handleAltWsOnClick(index, "e")}>empty</label>
          <label onClick={() => handleAltWsOnClick(index, "o")}>option 1</label>
          <label onClick={() => handleAltWsOnClick(index, "w")}>option 2</label>
        </>
      );
    };

    return (
      <>
        <table className="table">
          <tr className="table-header-color">
            <th>Dow</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th className="text-danger">S</th>
            <th className="text-danger">S</th>
          </tr>
          <tr>
            <td class="table-header-color">WS</td>
            <td onClick={() => handleOpenMenu("ws0")} className={ws[0]}>
              <div id="ws0" class="dropdown-content">
                {getWsOptions(0)}
              </div>
            </td>
            <td onClick={() => handleOpenMenu("ws1")} className={ws[1]}>
              <div id="ws1" class="dropdown-content">
                {getWsOptions(1)}
              </div>
            </td>
            <td onClick={() => handleOpenMenu("ws2")} className={ws[2]}>
              <div id="ws2" class="dropdown-content">
                {getWsOptions(2)}
              </div>
            </td>
            <td onClick={() => handleOpenMenu("ws3")} className={ws[3]}>
              <div id="ws3" class="dropdown-content">
                {getWsOptions(3)}
              </div>
            </td>
            <td onClick={() => handleOpenMenu("ws4")} className={ws[4]}>
              <div id="ws4" class="dropdown-content">
                {getWsOptions(4)}
              </div>
            </td>
            <td onClick={() => handleOpenMenu("ws5")} className={ws[5]}>
              <div id="ws5" class="dropdown-content">
                {getWsOptions(5)}
              </div>
            </td>
            <td onClick={() => handleOpenMenu("ws6")} className={ws[6]}>
              <div id="ws6" class="dropdown-content">
                {getWsOptions(6)}
              </div>
            </td>
          </tr>
          <tr>
            <td class="table-header-color">ALT WS</td>
            <td onClick={() => handleOpenMenu("altws0")} className={altws[0]}>
              <div id="altws0" class="dropdown-content">
                {getAltWsOptions(0)}
              </div>
            </td>
            <td onClick={() => handleOpenMenu("altws1")} className={altws[1]}>
              <div id="altws1" class="dropdown-content">
                {getAltWsOptions(1)}
              </div>
            </td>
            <td onClick={() => handleOpenMenu("altws2")} className={altws[2]}>
              <div id="altws2" class="dropdown-content">
                {getAltWsOptions(2)}
              </div>
            </td>
            <td onClick={() => handleOpenMenu("altws3")} className={altws[3]}>
              <div id="altws3" class="dropdown-content">
                {getAltWsOptions(3)}
              </div>
            </td>
            <td onClick={() => handleOpenMenu("altws4")} className={altws[4]}>
              <div id="altws4" class="dropdown-content">
                {getAltWsOptions(4)}
              </div>
            </td>
            <td onClick={() => handleOpenMenu("altws5")} className={altws[5]}>
              <div id="altws5" class="dropdown-content">
                {getAltWsOptions(5)}
              </div>
            </td>
            <td onClick={() => handleOpenMenu("altws6")} className={altws[6]}>
              <div id="altws6" class="dropdown-content">
                {getAltWsOptions(6)}
              </div>
            </td>
          </tr>
        </table>
      </>
    );
  }
}
