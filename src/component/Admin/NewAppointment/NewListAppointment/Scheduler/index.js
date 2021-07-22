import React, { Component } from "react";
import { NewSchedulerModal } from "component/common/Plugins/NewScheduler";
// import BigSchedulerModal from 'component/common/Plugins/BigScheduler';

import {
  getCustomer,
  getCommonApi,
  commonDeleteApi,
} from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import timeOption from 'data/timeOption.json'
import { dateFormat } from "service/helperFunctions";
import { history } from "helpers";
import "./style.scss";
import SimpleReactValidator from "simple-react-validator";
import { CreateAppointment, updateForm } from "redux/actions/appointment";
import { NewCreateAppointment } from "../../NewCreateAppointment/index";
import { LoadPanel } from "devextreme-react/load-panel";

const position = { of: "#appointment" };
export class SchedulerClass extends Component {
  state = {
    appointment: [
      {
        time: "10.00 AM,",
        date: "Wednesday, 1st April, 2020",
        name: "Benjamin",
        treatment: "Head Massage",
      },
      {
        time: "12.00 PM,",
        date: "Wednesday, 1st April, 2020",
        name: "Daniel",
        treatment: "Pedicure",
      },
      {
        time: "1.00 PM,",
        date: "Wednesday, 1st April, 2020",
        name: "John",
        treatment: "Haircut",
      },
      {
        time: "2.00 PM,",
        date: "Wednesday, 1st April, 2020",
        name: "Josua",
        treatment: "Manicure",
      },
      {
        time: "4.00 PM, ",
        date: "Wednesday, 1st April, 2020",
        name: "Derrik",
        treatment: "Body Massage",
      },
    ],
    events: [],
    brachList: [],
    formField: {
      branchId: "",
      time: "",
      staff_id: "",
    },
    list: [],
    filterDate: new Date(),
    filterType: "day",
    selectedId: "",
    staffList: [],
    page: 1,
    limit: 8,
    meta: [],
    searchtext: "",
    staffSortlist: [],
    isOpenModal: false,
    loadPanelVisible: false,
    showIndicator: false,
    showCurrentTimeIndicator: false,
    shadeUntilCurrentTime: true,
    shading: true,
    showPane: true,
    groupByType: "staff",
  };

  componentWillMount = () => {
    this.validator = new SimpleReactValidator({
      element: (message) => (
        <span className="error-message text-danger validNo fs14">
          {message}
        </span>
      ),
      autoForceUpdate: this,
    });

    this.getAppointmentWithStaff();
    // let { brachList, appointment, formField, filterDate } = this.state;
    // this.props.getCommonApi(`treatment/Outlet/`).then(key => {
    //   let { status, data } = key;
    //   if (status === 200) {
    //     for (let value of data) {
    //       brachList.push({ value: value.id, label: value.itemsite_desc });
    //     }
    //     this.setState({ brachList });
    //   }
    // });
  };

  handleAppointmentOpen = (id, e) => {
    console.log(e, id, "hgjsydfisuyfsdfm ==== handleAppointmentOpen");
  };
  getHoursFromDate = (date) => {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let hours = hour > 9 ? hour : "0" + hour;
    let minutes;
    if (minute < 15) {
      minutes = "00";
    } else if (minute >= 15 && minute < 30) {
      minutes = "15";
    } else if (minute >= 30 && minute < 45) {
      minutes = "30";
    } else if (minute >= 45 && minute < 59) {
      minutes = "45";
    }
    return hours + ":" + minutes;
  };

  handleEmptyEvent = async (date, e) => {
    let { customerDetail } = this.props;
    let { formField } = this.state;

    let time = new Date(date);

    formField["time"] = this.getHoursFromDate(time);
    formField["date"] = date;
    formField["appt_id"] = 0;
    if (e.groups) {
      formField["staff_id"] = e.groups.id;
    }
    if (e.appt_id) {
      formField["appt_id"] = e.appt_id;
    }

    await this.setState({ formField });
    console.log(
      date,
      e,
      "hgjsydfisuyfsdfm ==== handleEmptyEvent",
      time.getHours
    );
    await this.props.updateForm("basicApptDetail", formField);
    await this.setState({ isOpenModal: true });
  };
  handleCloseDialog = async () => {
    await this.props.updateForm("treatmentList", []);
    await this.props.updateForm("basicApptDetail", {});
    await this.props.updateForm("appointmentCustomerDetail", {});
    await this.setState({
      isOpenModal: false,
    });
  };

  handleChangeFilter = async (prevMode, prevDate, newMode, newDate, search) => {
    let { filterDate, filterType, searchtext } = this.state;
    filterDate = newDate;
    filterType = newMode;
    searchtext = search;
    await this.setState({
      filterDate,
      filterType,
      searchtext,
    });
    console.log("dfhgfhjhjghjdfhg", prevMode, prevDate, newMode, newDate);
    if (prevMode !== newMode || prevDate !== newDate) {
      this.getAppointmentWithStaff();
    }
  };

  handleChange = async ({ target: { value, name } }) => {
    let { formField } = this.state;
    formField[name] = value;
    await this.setState({
      formField,
    });
    if (name === "branchId") {
      this.getAppointmentWithStaff();
    }
    this.props.updateForm("basicApptDetail", formField);
  };

  handleDelete = async (id, event) => {
    let { selectedId } = this.state;
    console.log(id, "===afasfasdfdfasd=====", selectedId);
    if (id !== selectedId) {
      await this.setState({
        selectedId: id,
      });
      await this.props.commonDeleteApi(`appointment/${id}/`).then((res) => {});
    }
  };

  handleOpenStaff = (one, two, three) => {
    console.log("namdfsfgsghsfghf", one, two, three);
    let { filterDate } = this.state;
    this.props.handleOpen(filterDate);
  };

  getAppointmentWithStaff = () => {
    this.setState(
      {
        loadPanelVisible: true,
      },
      () => {
        let {
          filterDate,
          filterType,
          page,
          limit,
          searchtext,
          staffList,
          events,
          meta,
          groupByType,
        } = this.state;
        this.props
          .getCommonApi(
            `empappointmentview/?date=${dateFormat(
              filterDate
            )}&check=${filterType}&page=${page}&limit=${limit}&search=${searchtext}&type=${groupByType}`
          )
          .then(async (key) => {
            let { status, data, event } = key;

            if (status === 200) {
              staffList = data.dataList;

              events = [];
              meta = [];
              this.setState({ events, meta });
              meta = data.meta;
              //events = event;
              if (event) {
                for (let cell of event) {
                  let filterList = events.find(
                    (Appoint) =>
                      Appoint.linkcode === cell.linkcode &&
                      Appoint.id === cell.id &&
                      Appoint.cust_id === cell.cust_id &&
                      (Appoint.endDate === cell.startDate ||
                        Appoint.startDate === cell.endDate)
                  );
                  if (filterList) {
                    if (filterList.startDate < cell.startDate) {
                      filterList["startDate"] = filterList.startDate;
                    } else {
                      filterList["startDate"] = cell.startDate;
                    }
                    if (filterList.endDate > cell.endDate) {
                      filterList["endDate"] = filterList.endDate;
                    } else {
                      filterList["endDate"] = cell.endDate;
                    }
                    filterList["appt_remark"] =
                      filterList.appt_remark +
                      " " +
                      "/" +
                      " " +
                      cell.appt_remark;
                    filterList["Merged"] = true;
                    await this.setState({ ...this.state.events, filterList });
                  } else {
                    events.push(cell);
                    await this.setState({ ...events, events });
                  }
                }
              }
              await this.setState({ staffList, meta });
              // await this.setState({ events, staffList, meta });
              console.log(event, "appointment cell data");

              setTimeout(this.hideLoadPanel);
            }
          });
      }
    );
  };

  handleNext = async () => {
    let { page } = this.state;
    page = page + 1;
    await this.setState({
      page,
    });
    if (page > 0) {
      this.getAppointmentWithStaff();
    }
  };

  handleBack = async () => {
    let { page } = this.state;
    page = page - 1;
    await this.setState({
      page,
    });
    if (page > 0) {
      this.getAppointmentWithStaff();
    }
  };
  hideLoadPanel = () => {
    this.setState({
      loadPanelVisible: false,
    });
  };

  groupByAppointment = async (groupBy) => {
    await this.setState({
      groupByType: groupBy,
    });
    this.getAppointmentWithStaff();
  };
  timeToMins = (time) => {
    var b = time.split(":");
    return b[0] * 60 + +b[1];
  };

  render() {
    let {
      appointment,
      brachList,
      branchId,
      formField,
      list,
      events,
      filterType,
      filterDate,
      staffList,
      limit,
      meta,
      searchtext,
      staffSortlist,
      isLoading,
      isOpenModal,
    } = this.state;

    return (
      <>
        <div className="row m-0" id="appointment">
          <LoadPanel
            shadingColor="rgba(0,0,0,0.4)"
            position={position}
            onHiding={this.hideLoadPanel}
            visible={this.state.loadPanelVisible}
            showIndicator={this.state.showIndicator}
            shading={this.state.shading}
            showPane={this.state.showPane}
            showCurrentTimeIndicator={this.state.showCurrentTimeIndicator}
            shadeUntilCurrentTime={this.state.shadeUntilCurrentTime}
          />
          <div className="scheduler-container pr-0">
            <NewSchedulerModal
              staffList={staffList}
              meta={meta}
              event={events}
              onClick={(id, e) => this.handleAppointmentOpen(id, e)}
              onEmptyClick={(date, e) => this.handleEmptyEvent(date, e)}
              handleChangeFilter={this.handleChangeFilter}
              filterType={filterType}
              filterDate={filterDate}
              searchtext={searchtext}
              onDeleteEvent={this.handleDelete}
              handleBack={this.handleBack}
              handleNext={this.handleNext}
              staffSortlist={staffSortlist}
              getAppointmentWithStaff={this.getAppointmentWithStaff}
              groupByAppointment={(groupBy) => this.groupByAppointment(groupBy)}
            />
          </div>
          <NewCreateAppointment
            isOpenModal={isOpenModal}
            handleCloseDialog={this.handleCloseDialog}
            handleSaveorUpdate={this.getAppointmentWithStaff}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  customerDetail: state.appointment.customerDetail,
  customerList: state.common.customerList,
  multipleCustomerForm: state.appointment.multipleCustomerForm,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCustomer,
      getCommonApi,
      updateForm,
      commonDeleteApi,
    },
    dispatch
  );
};

export const Scheduler = connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulerClass);
