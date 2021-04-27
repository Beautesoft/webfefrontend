import React, { Component } from "react";
import "./style.scss";

export class GroupAuthorizationTable extends Component {
  render() {
    let { onChange, disabled = false, data = [], columns = [] } = this.props;

    const handleOnChange = (index1, index2) => {
      if (disabled) return;
      data[index1].values[index2] = !data[index1].values[index2];
      if (onChange) onChange(data);
    };

    return (
      <div className="maintable table-container">
        <div className="maintable-content table-responsive">
          <table className="table table-bordered rounded">
            <thead>
              <tr>
                <th className="table-header-200">
                  <div className="d-flex ml-3">Security Groups</div>
                </th>
                {columns.map((e) => (
                  <th className="table-header-150">
                    <div className="d-flex align-items-center justify-content-center">
                      {e}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((e, index1) => (
                <tr key={e.id}>
                  <td className={e.className}>{e.name}</td>
                  {e.values.map((e, index2) => (
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        <input
                          type="checkbox"
                          checked={e}
                          onChange={() => handleOnChange(index1, index2)}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
