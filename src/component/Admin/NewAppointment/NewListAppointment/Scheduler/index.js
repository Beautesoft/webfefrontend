import React, { Component } from "react";
import { NewSchedulerModal } from "component/common/Plugins/NewScheduler";
// import BigSchedulerModal from 'component/common/Plugins/BigScheduler';
import {
  NormalInput,
  NormalSelect,
  NormalButton,
  NormalDate,
  NormalModal,
} from "component/common";
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

const data = [
  {
    start_date: "2020-06-09 4:00",
    end_date: "2020-06-09 6:00",
    text: "Event 1",
    id: 1,
  },
  {
    start_date: "2020-06-11 8:00",
    end_date: "2020-06-11 10:00",
    text: "Event 2",
    id: 2,
  },
  {
    start_date: "2020-06-12 12:00",
    end_date: "2018-06-12 14:00",
    text: "dblclick me!",
    id: 3,
  },
];

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
    limit: 7,
    meta: [],
  };

  componentWillMount = () => {
    this.validator = new SimpleReactValidator({
      element: message => (
        <span className="error-message text-danger validNo fs14">
          {message}
        </span>
      ),
      autoForceUpdate: this,
    });
    let { brachList, appointment, formField, filterDate } = this.state;
    this.props.getCommonApi(`treatment/Outlet/`).then(key => {
      let { status, data } = key;
      if (status === 200) {
        for (let value of data) {
          brachList.push({ value: value.id, label: value.itemsite_desc });
        }
        this.setState({ brachList });
        // console.log(brachList, "jhksdfkjsdhfks")
      }
    });
    //this.getAvailability();
    // this.getAppointment();
    this.getAppointmentWithStaff();
  };

  getAvailability = () => {
    let { filterDate } = this.state;
    this.props
      .getCommonApi(
        `staffsavailable/?Appt_date=${dateFormat(filterDate, "yyyy-mm-dd")}`
      )
      .then(key => {
        let { status, data } = key;
        if (status === 200) {
          // for (let value of data) {
          //     staffList.push({ value: value.id, label: value.emp_name })
          // }
          this.setState({ list: data });
        }
      });
  };

  handleAppointmentOpen = (id, e) => {
    console.log(e, id, "hgjsydfisuyfsdfm ==== handleAppointmentOpen");
  };
  getHoursFromDate = date => {
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
    // if (this.validator.allValid()) {
    let time = new Date(date);

    formField["time"] = this.getHoursFromDate(time);
    formField["date"] = date;
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
    history.push(`/admin/newappointment/create`);
  };

  getAppointment = () => {
    let { brachList, events, formField, filterType, filterDate } = this.state;
    this.props
      .getCommonApi(
        `appointmentcalender/?date=${dateFormat(
          filterDate
        )}&check=${filterType}`
      )
      .then(async key => {
        let { status, data } = key;
        if (status === 200) {
          events = [];
          await this.setState({ events: null });
          events = data;
          await this.setState({ events });
          console.log(events, "appointmentlist", key);
        }
      });
  };
  handleChangeFilter = async (prevMode, prevDate, newMode, newDate) => {
    let { filterDate, filterType } = this.state;
    filterDate = newDate;
    filterType = newMode;
    await this.setState({
      filterDate,
      filterType,
    });
    console.log("dfhgfhjhjghjdfhg", prevMode, prevDate, newMode, newDate);
    if (prevMode !== newMode || prevDate !== newDate) {
      // this.getAvailability();
      //this.getAppointment();
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
      //this.getAvailability();
      // this.getAppointment();
      this.getAppointmentWithStaff();
    }
    // console.log(formField, "afasfasdfdfasd")
    this.props.updateForm("basicApptDetail", formField);
  };

  handleDelete = async (id, event) => {
    let { selectedId } = this.state;
    console.log(id, "===afasfasdfdfasd=====", selectedId);
    if (id !== selectedId) {
      await this.setState({
        selectedId: id,
      });
      await this.props.commonDeleteApi(`appointment/${id}/`).then(res => {});
    }
  };

  handleOpenStaff = (one, two, three) => {
    console.log("namdfsfgsghsfghf", one, two, three);
    let { filterDate } = this.state;
    this.props.handleOpen(filterDate);
  };

  getAppointmentWithStaff = () => {
    let { filterDate, filterType, page, limit } = this.state;
    this.props
      .getCommonApi(
        `empappointmentview/?date=${dateFormat(
          filterDate
        )}&check=${filterType}&page=${page}&limit=${limit}`
      )
      .then(key => {
        let { status, data, event } = key;
        console.log(event);
        if (status === 200) {
          this.setState({
            staffList: data.dataList,
            events: event,
            meta: data.meta,
          });
        }
        console.log(data, "staffwithpagination");
      });
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
    } = this.state;

    return (
      <>
        <div className="row m-0">
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
              onDeleteEvent={this.handleDelete}
              openDetail={this.openDetail}
              openStaffView={this.handleOpenStaff}
              handleBack={this.handleBack}
              handleNext={this.handleNext}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  customerDetail: state.appointment.customerDetail,
  customerList: state.common.customerList,
  multipleCustomerForm: state.appointment.multipleCustomerForm,
});

const mapDispatchToProps = dispatch => {
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
