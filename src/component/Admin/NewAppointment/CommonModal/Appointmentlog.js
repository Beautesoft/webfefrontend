import React, { Component } from "react";
import { InputSearch, TableWrapper, NormalCheckbox } from "component/common";
import { getCommonApi } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NormalModal } from "component/common";
import closeIcon from "assets/images/close.png";
import _ from "lodash";

export class AppointmentLogClass extends Component {
  state = {
    headerDetails: [
      { label: "User" },
      { label: "Date" },
      { label: "From" },
      { label: "To" },
      { label: "Duration" },
      { label: "Treatment" },
      { label: "Status" },
      { label: "Secondary Status" },
      { label: "Created Date" },
      { label: "Staff" },
      { label: "Req. therapist" },
    ],
    LogList: [],
    meta: {},
    appointmentId: 0,
  };

  componentWillMount = async () => {
    debugger;
    await this.setState({
      appointmentId: this.props.appointmentId,
    });
    this.getAppointmentLogList({});
  };
  getAppointmentLogList = data => {
    debugger;
    let { appointmentId } = this.state;
    let { page = 1, limit = 10 } = data;
    this.props
      .getCommonApi(
        `appointmentlog/?appt_id=${appointmentId}&page=${page}&limit=${limit}`
      )
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          if (res.data) {
            this.setState({
              LogList: res.data.dataList,
              meta: res.data.meta.pagination,
            });
          }
        }
      });
  };

  handlePagination = page => {
    this.getAppointmentLogList(page);
  };

  render() {
    let { headerDetails, LogList, meta } = this.state;
    return (
      <>
        <NormalModal
          className={"multiple-appointment select-category"}
          style={{ minWidth: "75%" }}
          modal={this.props.isAppointmentLogModal}
          handleModal={this.props.handleLogClick}
        >
          <img
            onClick={this.props.handleLogClick}
            className="close"
            src={closeIcon}
            alt=""
          />
          <div className="customer-list container">
            <div className="tab-table-content">
              <div className="py-2">
                <div className="col-12 p-2 text-center">
                  <h5 className="fw-500">Appointment Log</h5>
                </div>
                <div className="table-container">
                  <TableWrapper
                    headerDetails={headerDetails}
                    queryHandler={this.handlePagination}
                    pageMeta={meta}
                  >
                    {LogList && LogList.length > 0 ? (
                      LogList.map((item, index) => {
                        let {
                          username,
                          appt_date,
                          appt_fr_time,
                          appt_to_time,
                          add_duration,
                          appt_remark,
                          appt_status,
                          sec_status,
                          created_at,
                          emp_name,
                          requesttherapist,
                        } = item;
                        return (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {username}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {appt_date}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {appt_fr_time}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {appt_to_time}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {add_duration}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {appt_remark}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {appt_status}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {sec_status}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {created_at}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                {emp_name}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center">
                                <NormalCheckbox
                                  value={requesttherapist}
                                  name="requesttherapist"
                                  checked={requesttherapist}
                                  disabled
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            No data available
                          </div>
                        </td>
                      </tr>
                    )}
                  </TableWrapper>
                </div>
              </div>
            </div>
          </div>
        </NormalModal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  // filter: state.dashboard
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCommonApi,
    },
    dispatch
  );
};

export const AppointmentLog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentLogClass);
