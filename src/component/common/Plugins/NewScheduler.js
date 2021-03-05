import React, { Component } from "react";
import "./devExpressScheduler/Styles.scss";
import Modal from "assets/images/modal-avatar.png";
import man from "assets/images/man.png";
import newUser from "assets/images/user-image.png";
import Scheduler, { Resource, View } from "devextreme-react/scheduler";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import ResourceCell from "./devExpressScheduler/ResourceCell";
import AppointmentCell from "./devExpressScheduler/AppointmentCell";

const groups = ["id"];

const views = [
  {
    type: "day",
    name: "day",
    groupOrientation: "Horizontally",
    intervalCount: 1,
  },
  {
    type: "week",
    name: "week",
    groupOrientation: "vertical",
    intervalCount: 1,
    maxAppointmentsPerCell: "unlimited",
  },
  {
    type: "month",
    name: "Month",
    intervalCount: 1,
    groupOrientation: "Horizontally",
    maxAppointmentsPerCell: "unlimited",
  },
];

export class NewSchedulerModal extends React.Component {
  state = {
    selectedDate: new Date(),
    selectedView: "",
    DefaultDate: new Date(),
    DefaultView: "",
  };

  onEmptyClick = e => {
    e.cancel = true;
    let date = new Date(e.cellData.startDate);
    console.log(e.cellData.groups.id);
    this.props.onEmptyClick(date, e.cellData);
  };
  onAppointmentClick = e => {
    e.cancel = true;
    let date = new Date(e.appointmentData.startDate);
    this.props.onEmptyClick(date, e.appointmentData);
    console.log(date, e.appointmentData);
  };

  componentWillMount() {
    this.setState({
      DefaultDate: this.props.filterDate,
      DefaultView: this.props.filterType,
    });
  }

  handleViewChange = async e => {
    await this.setState({ selectedView: e });
    this.handleChange();
  };

  handleDateChange = async e => {
    await this.setState({ selectedDate: e });
    this.handleChange();
  };

  handleChange = () => {
    let { selectedDate, selectedView, DefaultDate, DefaultView } = this.state;
    let newDate = new Date();
    let newMode = "";
    let prevMode = DefaultView;
    let prevDate = DefaultDate;
    if (selectedView) {
      newMode = selectedView;
    } else {
      newMode = DefaultView;
    }
    if (selectedDate) {
      newDate = selectedDate;
    } else {
      newDate = selectedDate;
    }
    this.props.handleChangeFilter(prevMode, prevDate, newMode, newDate);
  };

  render() {
    let { staffList, event, meta } = this.props;
    let { pagination } = meta;
    console.log(staffList, "stafflisting on scheduler part");
    console.log(event, "appointment lists for scheduler");

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <React.Fragment>
          {meta ? (
            <div className="row">
              {pagination && pagination.total_pages > 1 ? (
                <div className="col-md-6 col-sm-6 col-6">
                  <div>
                    {pagination.total_pages < pagination.current_page ||
                    pagination.current_page > 1 ||
                    pagination.total_pages == pagination.current_page ? (
                      <button
                        className="cursor-pointer dx-button-content disabled"
                        onClick={this.props.handleBack}
                      >
                        <svg
                          width="9"
                          height="15"
                          viewBox="0 0 6 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 0.5L1 5L5 9.5"
                            stroke="#888888"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    ) : (
                      ""
                    )}
                    {/* <span className="dx-button-staff-content"> Staff </span> */}
                    {pagination.total_pages > pagination.current_page &&
                    pagination.total_pages !== pagination.current_page ? (
                      <button
                        className="cursor-pointer dx-button-content"
                        onClick={this.props.handleNext}
                      >
                        <svg
                          width="9"
                          height="15"
                          viewBox="0 0 6 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.5 9.5L4.5 5L0.5 0.5"
                            stroke="#888888"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <Scheduler
            dataSource={event}
            views={views}
            defaultCurrentView="day"
            groups={groups}
            height={650}
            width={1500}
            startDayHour={8}
            endDayHour={21}
            firstDayOfWeek={0}
            showAllDayPanel={false}
            crossScrollingEnabled={true}
            cellDuration={15}
            resourceCellComponent={ResourceCell}
            editing={{
              allowUpdating: false,
              allowAdding: false,
              allowDeleting: false,
              allowDragging: false,
            }}
            onCellClick={e => this.onEmptyClick(e)}
            onAppointmentClick={e => this.onAppointmentClick(e)}
            onAppointmentUpdating={this.onAppointmentUpdating}
            //dateSerializationFormat="yyyy-MM-ddTHH:mm:ssZ"
            appointmentComponent={AppointmentCell}
            onCurrentViewChange={this.handleViewChange}
            onCurrentDateChange={this.handleDateChange}
          >
            <View type="day" label="day" />
            <View type="week" label="week" />
            <View type="month" label="month" />
            <Resource
              dataSource={staffList}
              fieldExpr="id"
              useColorAsDefault={true}
              allowMultiple={false}
            />
          </Scheduler>
        </React.Fragment>
      </div>
    );
  }
}
