import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigation } from "react-minimal-side-navigation";
import { FormGroup, Label, Input } from "reactstrap";
import {
  NormalSelect,
  NormalInput,
  NormalRadio,
  NormalButton,
} from "component/common";
import { ScheduleTable } from "./SheduleTable";
import { CalenderTable } from "./CalenderTable";
import { BigCalander } from "./BigCalander";

class StaffScheduleClass extends React.Component {
  state = {
    currentMenu: "/indi",
    selectedMonth: new Date(),
    formFields: {
      ws: "eeeeeee",
      altws: "eeeeeee",
      cal_data: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      status: "All",
      staff_data: [
        { name: "apple", data: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
        { name: "orange", data: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
        { name: "mango", data: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
      ],
    },
  };

  componentWillMount() {
    const date = new Date();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    this.setState({ selectedMonth: `${year}-${month}` });
  }

  render() {
    let { currentMenu, formFields, selectedMonth } = this.state;

    let { ws, altws, cal_data, status,staff_data } = formFields;

    const handleMenuSelection = (value) => {
      this.setState({ currentMenu: value });
    };

    const handleMonthChange = (e) => {
      console.log(e.target.value);
      this.setState({ selectedMonth: e.target.value });
    };

    return (
      <div className="row">
        <div className="col-2.5 mb-4">
          <Navigation
            activeItemId={currentMenu}
            onSelect={({ itemId }) => handleMenuSelection(itemId)}
            items={[
              {
                title: "Individual Schedule",
                itemId: "/indi",
              },
              {
                title: "Full Schedule",
                itemId: "/full",
              },
            ]}
          />
        </div>
        <div className="container staffList-container">
          <div className="row align-items-center">
            <div className="col-md-4 mb-4">
              <h3>{currentMenu=='/indi' ? "Individual" : "Full"} Staff Schedule</h3>
            </div>
          </div>
          {currentMenu == "/indi" ? (
            <>
              <div className="form-group mb-4 pb-2">
                <div className="row">
                  <div className="col-12">
                    <label className="text-left text-black common-label-text fs-17 pb-3">
                      Staff
                    </label>
                    <div className="input-group">
                      <NormalSelect />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group mb-4 pb-2">
                <div className="row">
                  <div className="col-12">
                    <label className="text-left text-black common-label-text fs-17 pb-3">
                      Site List
                    </label>
                    <div className="input-group">
                      <NormalSelect />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group mb-4 pb-2">
                <div className="row">
                  <div className="col-12">
                    <label className="text-left text-black common-label-text fs-17 pb-3">
                      Work Schedule
                    </label>
                    <ScheduleTable
                      ws={ws}
                      altws={altws}
                      onChangeWs={(data) => {
                        let { formFields } = this.state;
                        formFields["ws"] = data;
                        this.setState({
                          formFields,
                        });
                      }}
                      onChangeAltWs={(data) => {
                        let { formFields } = this.state;
                        formFields["altws"] = data;
                        this.setState({
                          formFields,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group mb-4 pb-2">
                <div className="row">
                  <div className="col-4 mb-4">
                    <label className="text-left text-black common-label-text fs-17 pb-3">
                      Year and Month
                    </label>
                    <div className="input-group">
                      <NormalInput
                        type="month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group">
                      <CalenderTable
                        data={cal_data}
                        date={selectedMonth}
                        onChange={(data) => {
                          let { formFields } = this.state;
                          formFields["cal_data"] = data;
                          this.setState({
                            formFields,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="form-group mb-4 pb-2">
                <div className="row">
                  <div className="col-12">
                    <label className="text-left text-black common-label-text fs-17 pb-3">
                      Site
                    </label>
                    <div className="input-group">
                      <NormalSelect />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group mb-4 pb-2">
                <div className="row">
                  <div className="col-3">
                    <div className="input-group">
                      <NormalRadio
                        label="All"
                        name="status"
                        value="All"
                        selected={status == "All"}
                        onChange={(data) => {
                          let { formFields } = this.state;
                          formFields["status"] = data;
                          this.setState({
                            formFields,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="input-group">
                      <NormalRadio
                        label="Active"
                        name="status"
                        value="Active"
                        selected={status == "Active"}
                        onChange={(data) => {
                          let { formFields } = this.state;
                          formFields["status"] = data;
                          this.setState({
                            formFields,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="input-group">
                      <NormalRadio
                        label="Inactive"
                        name="status"
                        value="Inactive"
                        selected={status == "Inactive"}
                        onChange={(data) => {
                          let { formFields } = this.state;
                          formFields["status"] = data;
                          this.setState({
                            formFields,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group mb-4 pb-2">
                <div className="row">
                  <div className="col-6">
                    <div className="input-group">
                      <NormalButton outline={true} label="Show Schedule" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group mb-4 pb-2">
                <div className="row">
                  <div className="col-4 mb-4">
                    <label className="text-left text-black common-label-text fs-17 pb-3">
                      Year and Month
                    </label>
                    <div className="input-group">
                      <NormalInput
                        type="month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group">
                      <BigCalander
                        date={selectedMonth}
                        data={staff_data}
                        onChange={(data) => {
                            console.log(data)
                          let { formFields } = this.state;
                          formFields["staff_data"] = data;
                          this.setState({
                            formFields,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="palette">
                  <div className="color-detail">
                    <div className="color"></div>
                    <div className="detail">Available</div>
                  </div>
                  <div className="color-detail">
                    <div className="color not-available"></div>
                    <div className="detail">Holiday</div>
                  </div>
                </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export const StaffSchedule = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffScheduleClass);
