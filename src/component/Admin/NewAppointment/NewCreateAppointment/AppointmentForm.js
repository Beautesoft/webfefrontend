import React, { Component } from "react";
import {
  NormalInput,
  NormalSelect,
  NormalButton,
  NormalDate,
  NormalModal,
  NormalCheckbox,
} from "component/common";
import { CreateAppointment, updateForm } from "redux/actions/appointment";
import { getCustomer, getCommonApi } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dateFormat } from "service/helperFunctions";
import { history } from "helpers";
import SimpleReactValidator from "simple-react-validator";
import closeIcon from "assets/images/close.png";
import _ from "lodash";
import { AddWalkinCustomer } from "./NewWalkinCustomer";
import { AppointmentLog } from "../CommonModal/Appointmentlog";
import logicon from "assets/images/logicon.png";

export class AppointmentFormClass extends Component {
  state = {
    active: false,
    appt_fr_time: "",
    appt_to_time: "",
    currentValue: "-1",
    formFields: {
      customerName: "",
      emp_id: "",
      appointmentDate: new Date(),
      bookingStatus: "",
      Source_Codeid: "",
      ItemSite_Codeid: "",
      new_remark: "",
      Appt_typeid: "",
      // emp_noid : 4,
      Room_Codeid: "",
      sec_status: "",
      walkin: false,
    },
    multipleCustomerForm: {
      noOfCustomer: 1,
      treatment: "",
      room: "",
    },
    bookingList: [],
    isOpenModal: false,
    multipleCustomr: 1,
    customerElement: [],
    siteList: [],
    sourceList: [],
    channelList: [],
    staffList: [],
    secStatusList: [],
    roomList: [],
    customerOption: [],
    search: "",
    customerId: 0,
    appointmentId: null,
    isWalkin: false,
    isAppointmentLogModal: false,
    visible: false,
  };

  componentWillMount = () => {
    this.validator = new SimpleReactValidator({
      element: message => (
        <span className="error-message text-danger validNo fs14">
          {message}
        </span>
      ),
      autoForceUpdate: this,
      validators: {
        date: {
          // name the rule
          message: "The :attribute must be grater than today.",
          rule: (val, params, validator) => {
            let date1 = new Date(dateFormat(new Date()));
            let date2 = new Date(dateFormat(val));
            console.log(
              "gagasdfsdfsdffqwef",
              date1,
              date2,
              date1.getTime(),
              date2.getTime()
            );
            return date1.getTime() <= date2.getTime();
          },
          //   messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),  // optional
          required: true, // optional
        },
      },
    });
    this.props.getCustomer("all/").then(() => {});
    this.props.getCommonApi("bookingstatus/").then(res => {
      let { status, data, sec_data } = res;
      console.log(data);
      if (status === 200) {
        this.setState({ bookingList: data, secStatusList: sec_data });
      }
    });
    // this.handleCustomerElement()
    this.props.onRef(this);
    let { staffList, formFields } = this.state;
    let { basicApptDetail } = this.props;
    formFields["appointmentDate"] = basicApptDetail.date;
    //formFields["bookingStatus"] = "Booking";
    formFields["ItemSite_Codeid"] = basicApptDetail.branchId;
    this.setState({ formFields });
    this.getListData();
    this.props
      .getCommonApi(
        `appointment/Staffs/?Outlet=${
          this.state.formFields.ItemSite_Codeid
        }&date=${dateFormat(new Date())}`
      )
      .then(key => {
        let { status, data } = key;
        if (status === 200) {
          for (let value of data) {
            staffList.push({ value: value.id, label: value.emp_name });
          }
          this.setState({ staffList });
        }
      });

    if (basicApptDetail.appt_id) {
      console.log(basicApptDetail.appt_id);
      this.setState({ appointmentId: basicApptDetail.appt_id });
      this.props
        .getCommonApi(`appointmentresources/${basicApptDetail.appt_id}/`)
        .then(key => {
          let { status, data } = key;
          let appt_Date = data.appt_date;
          let date = appt_Date.split("/");
          let finaldate = date[2] + "-" + date[1] + "-" + date[0];
          if (status === 200) {
            console.log(data, "selectedCustomer");
            formFields["custName"] = data.cust_name;
            formFields["appointmentDate"] = finaldate;
            formFields["bookingStatus"] = data.booking_status;
            formFields["new_remark"] = data.ori_remark;
            formFields["customerName"] = data.cust_id;
            formFields["Source_Codeid"] = data.source_id;
            formFields["Room_Codeid"] = data.room_id;
            formFields["sec_status"] = data.secondary_status;
            formFields["Appt_typeid"] = data.channel_id;
            this.setState({ formFields });
            this.setState({ customerId: data.cust_id });
            this.props.selectedCustomer(data.cust_id);
            this.props.updateForm("appointmentCustomerDetail", formFields);
          }
        });
    }
  };

  componentDidMount() {
    // let formFields = Object.assign({}, this.state.formFields);
    // formFields["bookingStatus"] = "Booking";
    // this.setState({
    //   formFields,
    // });
  }

  componentWillUnmount() {
    this.props.onRef(null);
  }

  getListData = () => {
    let { staffList, sourceList, siteList, channelList, roomList } = this.state;

    this.props.getCommonApi(`source/`).then(key => {
      let { status, data } = key;
      if (status === 200) {
        for (let value of data) {
          sourceList.push({ value: value.id, label: value.source_desc });
        }
        this.setState({ sourceList });
        console.log(sourceList, "jhksdfkjsdhfks");
      }
    });
    this.props.getCommonApi(`treatment/Outlet/`).then(key => {
      let { status, data } = key;
      if (status === 200) {
        for (let value of data) {
          siteList.push({ value: value.id, label: value.itemsite_code });
        }
        this.setState({ siteList });
        console.log(siteList, "jhksdfkjsdhfks");
      }
    });
    this.props.getCommonApi(`appttype/`).then(key => {
      let { status, data } = key;
      if (status === 200) {
        for (let value of data) {
          channelList.push({ value: value.id, label: value.appt_type_desc });
        }
        this.setState({ channelList });
        console.log(siteList, "jhksdfkjsdhfks");
      }
    });
    this.props
      .getCommonApi(`room/?outlet=${this.state.formFields.ItemSite_Codeid}`)
      .then(key => {
        let { status, data } = key;
        if (status === 200) {
          for (let value of data) {
            roomList.push({ value: value.id, label: value.displayname });
          }
          this.setState({ roomList });
          console.log(roomList, "jhksdfkjsdhfks");
        }
      });
  };

  selectTime = async (key, type) => {
    let { formFields } = this.state;
    if (type === "appt_fr_time") {
      formFields["appt_fr_time"] = key;
      await this.setState({
        formFields,
        appt_fr_time: key,
      });
    } else {
      formFields["appt_to_time"] = key;
      await this.setState({
        formFields,
        appt_to_time: key,
      });
    }

    await this.props.updateForm("appointmentCustomerDetail", formFields);
    console.log("sdfsdfsdfsd", formFields);
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

  onFocus = () => {
    this.validator.showMessages();
  };

  handleChange = async ({ target: { value, name } }) => {
    let { formFields } = this.state;
    formFields[name] = value;
    await this.setState({
      formFields,
    });
    this.props.updateForm("customerDetail", formFields);
    await this.props.updateForm("appointmentCustomerDetail", formFields);
    if (name === "ItemSite_Codeid") {
      let { staffList } = this.state;
      this.props
        .getCommonApi(`appointment/Staffs/?Outlet=${value}`)
        .then(key => {
          let { status, data } = key;
          if (status === 200) {
            for (let value of data) {
              staffList.push({ value: value.id, label: value.emp_name });
            }
            this.setState({ staffList });
          }
        });
    }
    if (name === "walkin") {
      let { formFields } = this.state;
      formFields["customerName"] = "";
      formFields["custName"] = "";
      this.setState({ formFields });
      this.setState(prevState => ({
        isWalkin: !prevState.isWalkin,
      }));
    }
  };

  handleMultiple = async ({ target: { value, name } }) => {
    let { multipleCustomerForm } = this.state;
    if (name === "noOfCustomer") {
      multipleCustomerForm[name] = Number(value);
    }
    if (name === "sameForAllTreatment" || name === "differentForAllTreatment") {
      if (name === "differentForAllTreatment") {
        multipleCustomerForm["treatment"] = 2;
      } else {
        multipleCustomerForm["treatment"] = 1;
      }
    } else {
      if (name === "differentForAllRoom") {
        multipleCustomerForm["room"] = 2;
      } else {
        multipleCustomerForm["room"] = 1;
      }
    }

    await this.setState({
      multipleCustomerForm,
    });
    this.props.updateForm("multipleCustomerForm", multipleCustomerForm);
  };

  handleSubmit = () => {
    history.push(`/admin/newappointment/create/select-treatment`);
  };

  getTime = data => {
    let time = data.split(" ");
    let time1 = time[0].split(":");
    console.log(time, time1, "kghjhgdjfgsdf");
    if (time[1] === "pm") {
      return (
        (Number(time1[0]) + 12 === 24 ? "00" : Number(time1[0]) + 12) +
        ":" +
        time1[1]
      );
    } else {
      return time1[0] < 9 ? "0" + time[0] : time1[0] + ":" + time1[1];
    }
  };

  handleDialog = () => {
    let { isOpenModal } = this.state;
    isOpenModal = !isOpenModal;
    this.setState({
      isOpenModal,
    });
  };

  handleMultipleCustomer = async () => {
    let { multipleCustomerForm } = this.props;
    await this.setState({
      multipleCustomr: multipleCustomerForm.noOfCustomer,
      customerElement: [],
    });
    console.log(
      multipleCustomerForm,
      this.state,
      "dkjfkshgfghdfk",
      multipleCustomerForm.noOfCustomer
    );
    this.handleCustomerElement(multipleCustomerForm.noOfCustomer);
  };

  handleSearch = async event => {
    //    event.persist();
    let { formFields, visible } = this.state;
    formFields["custName"] = event.target.value;
    visible = true;
    await this.setState({ formFields, visible });
    console.log(this.state.formFields.custName);
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
    let { formFields } = this.state;
    this.props
      .getCommonApi(
        `custappt/?Outlet=${
          basicApptDetail.branchId ? basicApptDetail.branchId : ""
        }&search=${formFields.custName}`
      )
      .then(key => {
        let { status, data } = key;
        if (status === 200) {
          // for (let value of data) {
          //     customerList.push({ value: value.id, label: value.emp_name })
          // }
          this.setState({ customerOption: data });
        }
      });
  };

  handleSelectCustomer = async data => {
    let { formFields } = this.state;
    formFields["customerName"] = data.id;
    formFields["custName"] = data.cust_name;
    await this.setState({ formFields, customerOption: [] });
    await this.setState({ customerId: data.id });
    this.props.selectedCustomer(data.id);
    this.handleClick();
  };

  handleWalkInCustomer = data => {
    let { formFields } = this.state;
    formFields["customerName"] = data.id;
    formFields["custName"] = data.cust_name;
    this.setState({ formFields });
    this.setState({ customerId: data.id });
    this.props.selectedCustomer(data.id);
    this.setState(prevState => ({
      isWalkin: !prevState.isWalkin,
    }));
  };

  handleLogClick = () => {
    debugger;
    this.setState(prevState => ({
      isAppointmentLogModal: !prevState.isAppointmentLogModal,
    }));
  };
  render() {
    let {
      appt_fr_time,
      active,
      currentValue,
      bookingList,
      channelList,
      secStatusList,
      roomList,
      customerOption,
      isOpenModal,
      multipleCustomr,
      appt_to_time,
      siteList,
      sourceList,
      staffList,
      customerElement,
      formFields,
      appointmentId,
      isWalkin,
      isAppointmentLogModal,
      visible,
    } = this.state;
    let { customerDetail, customerList, multipleCustomerForm } = this.props;
    let { noOfCustomer, treatment, room } = multipleCustomerForm;
    return (
      <>
        <div className="form-group mb-4 pb-2 appointment-form">
          <div className="d-flex">
            <div className="d-flex justify-content-start col-9 h5 p-0">
              Appointment
            </div>
            {appointmentId && appointmentId > 0 ? (
              <div
                className="d-flex justify-content-end align-items-center bg-white col-3"
                onClick={this.handleLogClick}
              >
                <img src={logicon} alt="" width="35px" height="35px" />
              </div>
            ) : null}
          </div>
          <div className="row">
            <div className="col-3 mb-3">
              <label className="text-left text-black common-label-text ">
                Date{" "}
                <span className="error-message text-danger validNo fs-18">
                  *
                </span>
              </label>
              <div className="">
                <NormalDate
                  value={new Date(formFields.appointmentDate)}
                  name="appointmentDate"
                  type="date"
                  onChange={this.handleChange}
                  minDate={new Date()}
                  showDisabledMonthNavigation
                />
              </div>
              {this.validator.message(
                "appointmentDate",
                formFields.appointmentDate,
                "required|date"
              )}
            </div>
            <div className="col-3 mb-3">
              <div>
                <label className="text-left text-black common-label-text ">
                  Name{" "}
                  <span className="error-message text-danger validNo fs-18">
                    *
                  </span>
                </label>
              </div>
              <div className="input-group">
                {appointmentId ? (
                  <NormalInput
                    value={formFields.custName}
                    name="customerName"
                    onChange={this.handleSearch}
                    onClick={this.handleClick}
                    disabled
                  />
                ) : (
                  <NormalInput
                    placeholder="search"
                    value={formFields.custName}
                    name="customerName"
                    onChange={this.handleSearch}
                    onClick={this.handleClick}
                  />
                )}
              </div>
              {this.validator.message(
                "customerName",
                formFields.customerName,
                "required"
              )}
            </div>

            <div className="col-3 mb-3">
              <label className="text-left text-black common-label-text ">
                Booking status{" "}
                <span className="error-message text-danger validNo fs-18">
                  *
                </span>
              </label>
              <div className="input-group">
                <NormalSelect
                  // placeholder="Enter here" }
                  options={bookingList}
                  value={formFields.bookingStatus} //
                  name="bookingStatus"
                  onChange={this.handleChange}
                  className="customer-name status py-1"
                />
                {this.validator.message(
                  "Booking Status",
                  formFields.bookingStatus,
                  "required"
                )}
              </div>
            </div>

            <div className="col-3 mb-3">
              <div>
                <label className="text-left text-black common-label-text ">
                  Channel
                </label>
              </div>
              <div className="input-group">
                <NormalSelect
                  // placeholder="Enter here"
                  options={channelList}
                  value={formFields.Appt_typeid}
                  name="Appt_typeid"
                  onChange={this.handleChange}
                  className="customer-name py-1"
                />
              </div>
              {/* {this.validator.message('Appt_typeid', formFields.Appt_typeid, 'required')} */}
            </div>

            <div className="col-3 mb-3">
              <div>
                <label className="text-left text-black common-label-text ">
                  Remark
                </label>
              </div>
              <div className="input-group">
                {appointmentId ? (
                  <NormalInput
                    // placeholder="Enter here"
                    // options={siteList}
                    value={formFields.new_remark}
                    name="new_remark"
                    onChange={this.handleChange}
                    disabled
                  />
                ) : (
                  <NormalInput
                    // placeholder="Enter here"
                    // options={siteList}
                    value={formFields.new_remark}
                    name="new_remark"
                    onChange={this.handleChange}
                  />
                )}
              </div>
              {/* {this.validator.message('Remark', formFields.new_remark, 'required')} */}
            </div>

            <div className="col-3 mb-3">
              <div>
                <label className="text-left text-black common-label-text ">
                  Source Name
                </label>
              </div>
              <div className="input-group">
                <NormalSelect
                  // placeholder="Enter here"
                  options={sourceList}
                  value={formFields.Source_Codeid}
                  name="Source_Codeid"
                  onChange={this.handleChange}
                  className="customer-name py-1"
                />
              </div>
              {/* {this.validator.message('Source name', formFields.Source_Codeid, 'required')} */}
            </div>
            <div className="col-3 mb-3">
              <div>
                <label className="text-left text-black common-label-text ">
                  Room
                </label>
              </div>
              <div className="input-group">
                <NormalSelect
                  // placeholder="Enter here"
                  options={roomList}
                  value={formFields.Room_Codeid}
                  name="Room_Codeid"
                  onChange={this.handleChange}
                  className="customer-name py-1"
                />
              </div>
              {/* {this.validator.message('Room', formFields.Room_Codeid, 'required')} */}
            </div>

            <div className="col-3 mb-3">
              <label className="text-left text-black common-label-text ">
                Secondary status
              </label>
              <div className="input-group">
                <NormalSelect
                  // placeholder="Enter here"
                  options={secStatusList}
                  value={formFields.sec_status}
                  name="sec_status"
                  onChange={this.handleChange}
                  className="customer-name py-1"
                />
                {/* {this.validator.message('Secondary Status', formFields.sec_status, 'required')} */}
              </div>
            </div>

            {!appointmentId ? (
              <div className="col-1 mb-3">
                <label className="text-left text-black common-label-text ">
                  Walkin
                </label>
                <div className="input-group">
                  <NormalCheckbox
                    onChange={this.handleChange}
                    value={formFields.walkin}
                    name="walkin"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            {visible ? (
              <div className="customerSearch-block">
                <div className="row mt-4 table table-header w-100 m-0">
                  <div className="col-4">Name</div>
                  <div className="col-2">Phone</div>
                  <div className="col-3">Cust Code</div>
                  <div className="col-3">Email</div>
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
                          <div className="col-4">{item.cust_name}</div>
                          <div className="col-2">{item.cust_phone1}</div>
                          <div className="col-3">{item.cust_code}</div>
                          <div className="col-3">{item.cust_email}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center w-100">
                      No Data are available
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            {isWalkin ? (
              <>
                <AddWalkinCustomer
                  site_codeId={formFields.ItemSite_Codeid}
                  handleWalkInCustomer={this.handleWalkInCustomer}
                />
              </>
            ) : (
              ""
            )}
          </div>

          {isAppointmentLogModal ? (
            <AppointmentLog
              isAppointmentLogModal={isAppointmentLogModal}
              handleLogClick={this.handleLogClick}
              appointmentId={appointmentId}
            />
          ) : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  customerDetail: state.appointment.customerDetail,
  customerList: state.common.customerList,
  multipleCustomerForm: state.appointment.multipleCustomerForm,
  basicApptDetail: state.appointment.basicApptDetail,
  appointmentCustomerDetail: state.appointment.appointmentCustomerDetail,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      CreateAppointment,
      updateForm,
      getCustomer,
      getCommonApi,
    },
    dispatch
  );
};

export const AppointmentForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentFormClass);
