import React, { Component } from "react";
import "./devExpressScheduler/Styles.scss";
import Scheduler, {
  Resource,
  View,
  AppointmentDragging,
} from "devextreme-react/scheduler";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import ResourceCell from "./devExpressScheduler/ResourceCell";
import AppointmentCell from "./devExpressScheduler/AppointmentCell";
import { InputSearch } from "../InputSearch";
import _ from "lodash";
import { NormalButton, NormalSelect, NormalInput } from "component/common";
import { StaffSorting } from "../../Admin/NewAppointment/NewListAppointment/modal/StaffSorting";
import { BlockPopup } from "../../Admin/NewAppointment/NewListAppointment/modal/BlockPopup";
import { PrintModal } from "../../Admin/NewAppointment/NewListAppointment/modal/PrintModal";
import { Toast } from "service/toast";
import html2canvas from "html2canvas";
import { dateFormat } from "service/helperFunctions";
import { getCommonApi, commonPatchApi } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TreatmentHistory } from "component/Admin/NewAppointment/NewListAppointment/modal/TreatmentHistory";
import { UpcomingAppointment } from "component/Admin/NewAppointment/NewListAppointment/modal/UpcomingAppointment";
import Button from "devextreme/ui/button";

const groups = ["id"];
const draggingGroupName = "appointmentsGroup";
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
const scrolling = { mode: "virtual" };
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
    name: "month",
    intervalCount: 1,
    groupOrientation: "vertical",
    maxAppointmentsPerCell: "unlimited",
  },
];
const Dayview = [
  {
    type: "day",
    name: "day",
    groupOrientation: "Horizontally",
    intervalCount: 1,
  },
];

export class NewSchedulerModalClass extends Component {
  state = {
    selectedDate: new Date(),
    selectedView: "",
    DefaultDate: new Date(),
    DefaultView: "",
    searchtext: "",
    SelectedList: [],
    isOpenModal: false,
    isOpenBlockModal: false,
    appointmentId: 0,
    SchedulerHeight: 700,
    isOpenPrintModal: false,
    formFields: [],
    groupByList: [
      { label: "Group by Staff", value: "staff" },
      { label: "Group by Department", value: "department" },
      { label: "Group by Room", value: "room" },
    ],
    groupBy: "staff",
    customerNumber: 0,
    customerId: 0,
    clickCount: 0,
    visible: false,
    customerOption: [],
  };

  onEmptyClick = e => {
    e.cancel = true;
    let date = new Date(e.cellData.startDate);
    if (e.cellData.groups) {
      this.props.onEmptyClick(date, e.cellData);
    } else {
      Toast({ type: "error", message: "Not available" });
    }
  };

  onAppointmentDblClick = async e => {
    e.cancel = true;
    await this.setState({ appointmentId: 0 });
    let date = new Date(e.appointmentData.startDate);
    if (e.appointmentData.status === "Block") {
      await this.setState({ appointmentId: e.appointmentData.appt_id });
      this.handleBlockDialog();
    } else {
      this.props.onEmptyClick(date, e.appointmentData);
      await this.setState({
        customerId: e.appointmentData.cust_id,
        custName: e.appointmentData.cust_name,
        custPhone: e.appointmentData.cust_phone,
      });
    }
  };

  onAppointmentSingleClick = async e => {
    e.cancel = true;
    //await sleep(500);
    if (e.appointmentData.status !== "Block") {
      await this.setState({
        customerId: e.appointmentData.cust_id,
        custName: e.appointmentData.cust_name,
        custPhone: e.appointmentData.cust_phone,
      });
    }
  };

  componentDidMount() {
    this.setState({
      DefaultDate: this.props.filterDate,
      DefaultView: this.props.filterType,
    });
  }

  handleViewChange = async e => {
    await this.setState({
      selectedView: e,
    });
    this.handleChange();
  };

  handleDateChange = async e => {
    await this.setState({
      selectedDate: e,
    });
    this.handleChange();
  };
  handleTodayDateClick = async e => {
    //debugger;
    await this.setState({
      selectedDate: new Date(),
    });
    this.handleChange();
  };

  handleChange = () => {
    let { selectedDate, selectedView, DefaultDate, DefaultView, searchtext } =
      this.state;
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
    this.props.handleChangeFilter(
      prevMode,
      prevDate,
      newMode,
      newDate,
      searchtext
    );
  };

  // onContentReady(e) {
  //   sleep(500);
  //   const currentHour = new Date().getHours() - 1;
  //   e.component.scrollToTime(currentHour, 30, new Date());

  //   // if (this.added) return;

  //   let self = this;
  //   let element = document.querySelectorAll(".dx-scheduler");
  //   const container = document.createElement("div");

  //   element[0].appendChild(container);

  //   new Button(container, {
  //     text: "Today",
  //   });

  //   // this.added = true;
  // }
  onContentReady(e) {

    //sleep(500);
    //const currentHour = new Date().getHours() - 1;
    //e.component.scrollToTime(currentHour, 30, new Date());

    // let element = document.querySelectorAll(".dx-scheduler-navigator");
    // const container = document.createElement("div");
    // element[0].appendChild(container);
    // new Button(container, {
    //   text: "Today",
    //   onClick: function(event) => {
    //     schedulerRef.current.instance.option("currentDate", new Date());
    //   },
    // });
  }

  handleSearch = async event => {
    event.persist();
    await this.setState({ searchtext: event.target.value });
    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(() => {
        this.handleChange();
      }, 500);
    }
    this.debouncedFn();
  };

  handleDialog = () => {
    let { isOpenModal } = this.state;
    isOpenModal = !isOpenModal;
    this.setState({
      isOpenModal,
    });
  };
  handleBlockDialog = async () => {
    await this.setState(prevState => ({
      isOpenBlockModal: !prevState.isOpenBlockModal,
    }));
    await this.setState({ appointmentId: 0 });
  };
  handlePrintDialog = () => {
    let { isOpenPrintModal } = this.state;
    isOpenPrintModal = !isOpenPrintModal;
    this.setState({
      isOpenPrintModal,
    });
  };

  handleBack = () => {
    this.props.handleBack();
  };
  handleNext = () => {
    this.props.handleNext();
  };
  Snap = async () => {
    await this.setState({
      SchedulerHeight: 2800,
    });
    await sleep(1000); //
    window.scrollTo(0, 0);
    let img = "";
    let base64URL = "";

    html2canvas(document.querySelector("#Scheduler"), {
      allowTaint: true,
      useCORS: true,
      logging: false,
      scale: 1,
      removeContainer: true,
    }).then(function (canvas) {
      img = canvas.toDataURL("image/png", 1);
      base64URL = img.replace("image/png", "image/octet-stream");
      var byteCharacters = atob(
        img.replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
      );
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var file = new Blob([byteArray], { type: "image/png" + ";base64" });
      var fileURL = URL.createObjectURL(file);
      var a = document.createElement("a");
      a.setAttribute("download", "myImage.png");
      a.setAttribute("href", base64URL);
      a.click();
      window.open(fileURL);
    });
    window.scrollTo(0, document.documentElement.scrollHeight);
    await this.setState({ SchedulerHeight: 700 });
  };

  getHoursFromDate = date => {
    let hour = new Date(date).getHours();
    let minute = new Date(date).getMinutes();
    let hours = hour > 9 ? hour : "0" + hour;
    let minutes = minute > 9 ? minute : "0" + minute;
    return hours + ":" + minutes;
  };
  // onDragStart = async e => {
  //   if (e.itemData.status === "Block") {
  //     e.cancel = true;
  //   } else {
  //     await sleep(300);
  //     this.getDraggedData(e.itemData.appt_id);
  //   }
  // };
  onDragStart = async e => {
    console.log(e, "drag start data");
    if (e.itemData.status === "Block") {
      e.cancel = true;
    } else if (e.itemData.Merged) {
      e.cancel = true;
      Toast({
        type: "error",
        message: "Merged appointment not allowed for dragging",
      });
    }
  };

  onDragEnd = async e => {
    await sleep(500);
    if (e.itemData.appt_id) {
      let { formFields } = this.state;
      let startTime = this.getHoursFromDate(e.itemData.startDate);
      let endTime = this.getHoursFromDate(e.itemData.endDate);
      let targetStaff = e.itemData.id;
      this.props
        .getCommonApi(`appointmentresources/${e.itemData.appt_id}/`)
        .then(async key => {
          let { status, data } = key;
          console.log(key, "drag end data response");
          let appt_Date = data.appt_date;
          let date = appt_Date.split("/");
          let finaldate = date[2] + "-" + date[1] + "-" + date[0];
          if (status === 200) {
            formFields["appt_id"] = e.itemData.appt_id;
            formFields["custName"] = data.cust_name;
            formFields["appointmentDate"] = finaldate;
            formFields["bookingStatus"] = data.booking_status;
            formFields["new_remark"] = data.ori_remark;
            formFields["customerName"] = data.cust_id;
            formFields["Source_Codeid"] = data.source_id;
            formFields["Room_Codeid"] = data.room_id;
            formFields["sec_status"] = data.secondary_status;
            formFields["Appt_typeid"] = data.channel_id;

            formFields["start_time"] = data ? data.start_time : "";
            formFields["end_time"] = data ? data.end_time : "";
            formFields["Item_Codeid"] = data.Item_Codeid;
            formFields["Item_CodeName"] = data.item_name;
            formFields["emp_no"] = data.emp_id;
            formFields["add_duration"] = data.add_duration;
            formFields["edit_remark"] = "";
            formFields["requesttherapist"] = data.requesttherapist;
            formFields["recur_days"] = data.recur_days;
            formFields["recur_qty"] = data.recur_qty;
            formFields["item_text"] = data.item_name;

            if (
              formFields["start_time"] !== startTime ||
              formFields["emp_no"] !== targetStaff
            ) {
              formFields["appointmentDate"] = e.itemData.endDate;
              formFields["start_time"] = startTime;
              formFields["end_time"] = endTime;
              formFields["emp_no"] = targetStaff;
              formFields["item_text"] = e.itemData.item_name;
              formFields["recur_days"] = null;
              formFields["recur_qty"] = null;
              await this.setState({ formFields });
              let payload = {
                appt_date: dateFormat(
                  new Date(e.itemData.endDate),
                  "yyyy-mm-dd"
                ),
                Room_Codeid: data.room_id,
                appt_status: data.booking_status,
                sec_status: data.secondary_status,
                edit_remark: "",
                start_time: startTime,
                end_time: endTime,
                item_id: data.Item_Codeid,
                add_duration: data.add_duration,
                emp_id: targetStaff,
                requesttherapist: data.requesttherapist,
                item_text: e.itemData.item_name,
                recur_qty: null,
                recur_days: null,
              };

              this.props
                .commonPatchApi(
                  `appointmentresources/${e.itemData.appt_id}/`,
                  payload
                )
                .then(async res => {});
            }
          }
        });
    }
    this.props.getAppointmentWithStaff();
  };

  handleTreatmentHistory = () => {
    let { customerId } = this.state;
    if (customerId > 0) {
      this.setState(prevState => ({
        isTreatmentHistoryModal: !prevState.isTreatmentHistoryModal,
        customerNumber: this.state.customerId,
      }));
    } else {
      Toast({ type: "error", message: "Please select customer" });
    }
  };
  handleUpcomingAppointment = () => {
    let { customerId } = this.state;
    if (customerId > 0) {
      this.setState(prevState => ({
        isUpcomingAppointmentModal: !prevState.isUpcomingAppointmentModal,
        customerNumber: this.state.customerId,
      }));
    } else {
      Toast({ type: "error", message: "Please select customer" });
    }
  };
  handleSearch = async event => {
    //    event.persist();
    let { custName, visible } = this.state;
    custName = event.target.value;
    visible = true;
    await this.setState({ custName, visible });
    console.log(this.state.custName);
    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(async () => {
        let { customerList } = this.state;
        let { basicApptDetail } = this.props;
        this.search(basicApptDetail);
      }, 500);
    }
    this.debouncedFn();
  };

  search = basicApptDetail => {
    let { custName } = this.state;
    this.props
      .getCommonApi(
        `custappt/?Outlet=${
          basicApptDetail.branchId ? basicApptDetail.branchId : ""
        }&search=${custName}`
      )
      .then(key => {
        let { status, data } = key;
        if (status === 200) {
          this.setState({ customerOption: data });
        }
      });
  };
  handleClick = key => {
    if (!this.state.visible) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    if (this.state.visible) {
      let { basicApptDetail } = this.props;
      this.search(basicApptDetail);
    }
    this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  };
  handleOutsideClick = e => {
    if (this.node != null) {
      if (this.node.contains(e.target)) {
        return;
      }
    }
    this.handleClick();
  };

  handleSelectCustomer = async data => {
    console.log(data, "selectCustomer");
    await this.setState({
      customerId: data.id,
      custName: data.cust_name,
      custPhone: data.cust_phone1,
    });
    this.handleClick();
  };
  handleGroupbyChange = async ({ target: { value, name } }) => {
    if (value == "") {
      value = "staff";
    }
    if (value !== this.state.groupBy) {
      this.setState({
        groupBy: value,
      });
      this.props.groupByAppointment(value);
    }
  };
  render() {
    let {
      isOpenModal,
      isOpenBlockModal,
      appointmentId,
      SchedulerHeight,
      isOpenPrintModal,
      groupBy,
      isTreatmentHistoryModal,
      isUpcomingAppointmentModal,
      customerNumber,
      visible,
      customerOption,
    } = this.state;
    let { filterDate } = this.props;

    return (
      <div className="row" style={{ width: "100%", height: "100%" }}>
        <React.Fragment>
          <StaffSorting
            isOpenModal={isOpenModal}
            handleDialog={this.handleDialog}
            handleChange={this.handleChange}
            filterDate={filterDate}
          />
          {isOpenBlockModal ? (
            <BlockPopup
              isOpenBlockModal={isOpenBlockModal}
              handleBlockDialog={this.handleBlockDialog}
              handleChange={this.handleChange}
              filterDate={filterDate}
              appointmentId={appointmentId}
            />
          ) : (
            ""
          )}
          {isOpenPrintModal ? (
            <PrintModal
              isOpenPrintModal={isOpenPrintModal}
              handlePrintDialog={this.handlePrintDialog}
            />
          ) : (
            ""
          )}

          <div className="col-12 d-flex justify-content-start p-1 m-1">
            {this.props.meta ? (
              <div className="col-md-1 col-12 text-right p-1">
                {this.props.meta.pagination &&
                this.props.meta.pagination.total_pages > 1 ? (
                  <div className="col-12">
                    <div>
                      {this.props.meta.pagination.total_pages <
                        this.props.meta.pagination.current_page ||
                      this.props.meta.pagination.current_page > 1 ||
                      this.props.meta.pagination.total_pages ==
                        this.props.meta.pagination.current_page ? (
                        <button
                          className="cursor-pointer dx-button-content disabled"
                          onClick={this.handleBack}
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
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      ) : (
                        ""
                      )}
                      {/* <span className="dx-button-staff-content"> Staff </span> */}
                      {this.props.meta.pagination.total_pages >
                        this.props.meta.pagination.current_page &&
                      this.props.meta.pagination.total_pages !==
                        this.props.meta.pagination.current_page &&
                      this.props.meta.pagination.current_page > 0 ? (
                        <button
                          className="cursor-pointer dx-button-content"
                          onClick={this.handleNext}
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
                              strokeLinecap="round"
                              strokeLinejoin="round"
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
            <div className="col-md-3 col-12">
              <div className="d-flex flex-nowrap">
                <NormalInput
                  className="col-md-6 mr-1"
                  placeholder="customer.."
                  value={this.state.custName}
                  name="custName"
                  onChange={this.handleSearch}
                  onClick={this.handleClick}
                />
                <NormalButton
                  buttonClass={"mr-1"}
                  mainbg={true}
                  className="col-12 fs-15 m-0 p-1"
                  label="Upcoming"
                  onClick={this.handleUpcomingAppointment}
                />
                <NormalButton
                  buttonClass={"mr-1"}
                  mainbg={true}
                  className="col-12 fs-15 "
                  label="History"
                  onClick={this.handleTreatmentHistory}
                />
              </div>
            </div>
            <div className="col-md-2 w-100">
              <NormalSelect
                options={this.state.groupByList}
                placeholderrequired={`false`}
                value={this.state.groupBy}
                name="groupBy"
                onChange={this.handleGroupbyChange}
                className="status py-1"
              />
            </div>

            <div className="col-md-1">
              <NormalButton
                buttonClass={"p-0"}
                mainbg={true}
                className=" fs-14 confirm"
                label={`Snap`}
                outline={false}
                onClick={this.Snap}
              />
            </div>
            <div className="col-1">
              <NormalButton
                buttonClass={"p-0"}
                mainbg={true}
                className=" fs-15 confirm"
                label={`Print`}
                outline={false}
                onClick={() => {
                  this.setState({ isOpenPrintModal: true });
                }}
              />
            </div>
            <div className="col-1">
              <NormalButton
                buttonClass={"p-0"}
                mainbg={true}
                className=" fs-15 confirm"
                label={`Sort`}
                outline={false}
                onClick={() => {
                  this.setState({ isOpenModal: true });
                }}
              />
            </div>
            <div className="col-md-1">
              <NormalButton
                buttonClass={"p-0"}
                mainbg={true}
                className="fs-15 confirm"
                label={`Block`}
                outline={false}
                onClick={() => {
                  this.setState({ isOpenBlockModal: true });
                }}
              />
            </div>
            <div className="col-md-2">
              <div className="w-100 p-1">
                <InputSearch
                  placeholder="Search here.."
                  value={this.state.searchtext}
                  onChange={this.handleSearch}
                  name="searchtext"
                />
              </div>
            </div>
          </div>

          {isTreatmentHistoryModal ? (
            <TreatmentHistory
              isTreatmentHistoryModal={isTreatmentHistoryModal}
              handleTreatmentHistory={this.handleTreatmentHistory}
              customerNumber={this.state.customerNumber}
              custName={this.state.custName}
              custPhone={this.state.custPhone}
            />
          ) : (
            ""
          )}
          {isUpcomingAppointmentModal ? (
            <UpcomingAppointment
              isUpcomingAppointmentModal={isUpcomingAppointmentModal}
              handleUpcomingAppointment={this.handleUpcomingAppointment}
              customerNumber={this.state.customerNumber}
              custName={this.state.custName}
              custPhone={this.state.custPhone}
            />
          ) : (
            ""
          )}
          <Scheduler
            id="Scheduler"
            className="col-12"
            height={SchedulerHeight}
            width={`100%`}
            dataSource={this.props.event}
            views={this.props.staffList ? views : Dayview}
            onContentReady={this.onContentReady}
            defaultCurrentView="day"
            groups={groups}
            startDayHour={8}
            endDayHour={21}
            cellDuration={15}
            firstDayOfWeek={0}
            showAllDayPanel={false}
            crossScrollingEnabled={true}
            resourceCellComponent={ResourceCell}
            editing={{
              allowDeleting: false,
              allowResizing: false,
              allowUpdating: true,
              allowDragging: true,
              allowTaint: true,
            }}
            onAppointmentClick={e => this.onAppointmentSingleClick(e)}
            onAppointmentDblClick={e => this.onAppointmentDblClick(e)}
            onCellClick={e => this.onEmptyClick(e)}
            //dateSerializationFormat="yyyy-MM-ddTHH:mm:ssZ"
            appointmentComponent={AppointmentCell}
            onCurrentViewChange={this.handleViewChange}
            onCurrentDateChange={this.handleDateChange}
            appointmentDragging={{
              autoScroll: true,
              scrollSpeed: 25,
              group: { draggingGroupName },
              onDragStart: e => this.onDragStart(e),
              onDragEnd: e => this.onDragEnd(e),
            }}
            scrolling={scrolling}
          >
            <View type="day" label="day" />
            <View type="week" label="week" />
            <View type="month" label="month" />

            <Resource
              dataSource={this.props.staffList}
              fieldExpr="id"
              useColorAsDefault={true}
              allowMultiple={false}
            />
            <button />
          </Scheduler>
        </React.Fragment>
        {visible ? (
          <div className="customerSearch-block">
            <div className="row mt-4 table table-header w-100 m-0">
              <div className="col-3">Name</div>
              <div className="col-2">Phone</div>
              <div className="col-2">Cust Code</div>
              <div className="col-3">Email</div>
              <div className="col-2">NRIC</div>
            </div>
            <div className="response-table w-100">
              {customerOption.length > 0 ? (
                customerOption.map((item, index) => {
                  return (
                    <div
                      className="row m-0 table-body w-100 border"
                      onClick={() => this.handleSelectCustomer(item)}
                      key={index}
                    >
                      <div className="col-3">{item.cust_name}</div>
                      <div className="col-2">{item.cust_phone1}</div>
                      <div className="col-2">{item.cust_code}</div>
                      <div className="col-3">{item.cust_email}</div>
                      <div className="col-2">{item.cust_nric}</div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center w-100">No Data are available</div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  basicApptDetail: state.appointment.basicApptDetail,
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCommonApi,
      commonPatchApi,
    },
    dispatch
  );
};

export const NewSchedulerModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewSchedulerModalClass);
