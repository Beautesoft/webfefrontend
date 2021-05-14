import React, { Component } from "react";
import { NormalInput, NormalButton, TableWrapper } from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./style.scss";

export class CoursePopupClass extends Component {
  state = {
    headerDetails: [
      { label: "Date", sortKey: "date" },
      { label: "Treatement Id", sortKey: "treatment_id", enabled: true },
      { label: "Program", sortKey: "program", enabled: true },
      { label: "Type", sortKey: "type", enabled: true },
      { label: "Next appt", sortKey: "next_appoinment", enabled: true },
      { label: "Amt", sortKey: "amount", enabled: true },
    ],
    treatmentId: "",
    course: "",
    no_of_treatments: "",
    free_sessions: "",
    quantity: "",
    deposit: "",
    unit_price: "",
    discount: "",
    outstanding: "",
    auto_proportional: false,
    treatment_data: [],
    is_presentage: true,
  };

  handleSubmit = () => {};

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let {
      treatmentId,
      course,
      auto_proportional,
      deposit,
      free_sessions,
      discount,
      no_of_treatments,
      outstanding,
      quantity,
      treatment_data,
      unit_price,
      is_presentage,
      headerDetails,
    } = this.state;
    return (
      <>
        <div className="container-fluid mb-4">
          <div className="row pl-3">
            <div className="col-10">
              <h4>Course Page</h4>
            </div>
            <div className="col-2">
              <NormalButton
                mainbg={true}
                className="col-12 fs-15 "
                label="Done "
                onClick={() => this.handleSubmit()}
              />
            </div>
          </div>
          <div className="row pl-5 pr-5 mt-4">
            <div className="row mb-3">
              <div className="col-4">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Treatment Id
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={treatmentId}
                    disabled
                  />
                </div>
              </div>
              <div className="col-4">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Course
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={course}
                    disabled
                  />
                </div>
              </div>
              <div className="col-2">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  No.Of.Treatments
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={no_of_treatments}
                    type="number"
                    name="no_of_treatments"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-2">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Free Sessions
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={free_sessions}
                    type="number"
                    name="free_sessions"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-1">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Quantity
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={quantity}
                    type="number"
                    name="quantity"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="col-2">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Deposit
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={deposit}
                    type="number"
                    name="deposit"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="col-2">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Unit Price
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={unit_price}
                    type="number"
                    name="unit_price"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="col-2">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Discount
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    className="col"
                    value={discount}
                    type="number"
                    name="free_sessions"
                    onChange={this.handleChange}
                  />
                  <NormalButton
                    mainbg={is_presentage}
                    className="col"
                    label="%"
                    onClick={() =>
                      this.setState({ is_presentage: !is_presentage })
                    }
                  />
                  <NormalButton
                    mainbg={!is_presentage}
                    className="col"
                    label="$"
                    onClick={() =>
                      this.setState({ is_presentage: !is_presentage })
                    }
                  />
                </div>
              </div>

              <div className="col-2 p-0 m-0">
                <div className="input-group mt-5">
                  <input
                    className="mt-1 mr-1"
                    type="checkbox"
                    name="auto_proportionment"
                    checked={auto_proportional}
                    onChange={() =>
                      this.setState({ auto_proportional: !auto_proportional })
                    }
                  ></input>
                  <label for="auto_poportionment">Auto Proportionment</label>
                </div>
              </div>

              <div className="col-3">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Outstanding
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    className="col"
                    value={outstanding}
                    type="number"
                    disabled
                  />{" "}
                  <NormalButton
                    mainbg={true}
                    className="col"
                    label="Reset"
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="tab-table-content">
                <div className="py-4">
                  <div className="table-container">
                    <TableWrapper
                      headerDetails={headerDetails}
                      parentHeaderChange={(value) =>
                        this.setState(() => (headerDetails = value))
                      }
                    >
                      {treatment_data
                        ? treatment_data.map((item, index) => {
                            let {
                              id,
                              date,
                              treatment_id,
                              program,
                              type,
                              next_appt,
                              amt,
                            } = item;
                            return (
                              <tr key={index}>
                                <td
                                  className={
                                    headerDetails[0].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {date}
                                  </div>
                                </td>
                                <td
                                  className={
                                    headerDetails[1].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {treatment_id}
                                  </div>
                                </td>
                                <td
                                  className={
                                    headerDetails[2].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {program}
                                  </div>
                                </td>
                                <td
                                  className={
                                    headerDetails[3].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {type}
                                  </div>
                                </td>
                                <td
                                  className={
                                    headerDetails[4].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {next_appt}
                                  </div>
                                </td>
                                <td
                                  className={
                                    headerDetails[5].enabled ?? true
                                      ? ""
                                      : "d-none"
                                  }
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    {amt}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        : ""}
                    </TableWrapper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export const CoursePopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursePopupClass);
