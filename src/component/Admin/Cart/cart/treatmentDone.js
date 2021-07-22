import React, { Component } from "react";
import "./style.scss";
import {
  NormalButton,
  NormalInput,
  NormalSelect,
  InputSearch,
  NormalModal,
  TableWrapper,
} from "component/common";
import { dateFormat } from "service/helperFunctions";
import _ from "lodash";
import { history } from "helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCommonApi,
  updateForm,
  commonCreateApi,
  commonDeleteApi,
  commonPatchApi,
} from "redux/actions/common";
import SimpleReactValidator from "simple-react-validator";
// import { Treatment, Payment, EditCart } from './cart/index';
import service from "assets/images/make-up-brush.png";
// import Discount from './cart/discount';
import { withTranslation } from "react-i18next";

export class TreatmentDoneClass extends Component {
  state = {
    isOpen: false,
    currentIndex: -1,
    tstaffList: [],
    cartData: {},
    postFields: {
      work_point: "",
      times: "",
      helper_id: "",
    },
    updateFields: {
      Room: null,
      Source: null,
      new_remark: null,
    },
    formFields: {
      cartid: "",
      Item: "",
      Price: "",
      Room: null,
      Source: null,
      add_duration: "",
      new_remark: null,
      times: null,
      work_point: "",
    },
    outletList: [],
    headerDetails: [
      { label: "Employee name", sortKey: false, width: "130px" },
      { label: "WP1", width: "42px" },
      { label: "St. time", sortKey: false, width: "55px" },
      { label: "End time", sortKey: false, width: "55px" },
      { label: "Duration", sortKey: false, width: "55px" },
    ],
    customerOption: [],
    // cartData: {},
    roomList: [],
    sourceList: [],
    staffList: [],
    duration: [],
    showPostError: false,
    showUpdateError: false,
    page: 1,
    startDuration: [],
    hideNotNeededControls: "false",
  };

  componentWillMount = () => {
    // this.getCart();
    this.validator = new SimpleReactValidator({
      element: (message) => (
        <span className="error-message text-danger validNo fs14">
          {message}
        </span>
      ),
      autoForceUpdate: this,
    });
    let { basicApptDetail } = this.props;
    if (basicApptDetail.custId) {
      let { formFields } = this.state;
      formFields["custId"] = basicApptDetail.custId;
      formFields["custName"] = basicApptDetail.custName;
      this.setState({ formFields });
    }
    let {
      roomList,
      sourceList,
      staffList,
      cartData,
      duration,
      startDuration,
      tstaffList,
    } = this.state;
    this.getStaffList();
    this.props.getCommonApi("room/").then((key) => {
      let { status, data } = key;
      for (let value of data) {
        roomList.push({ value: value.id, label: value.displayname });
      }
      this.setState({ roomList });
    });
    this.props.getCommonApi(`source/`).then((key) => {
      let { status, data } = key;
      if (status === 200) {
        for (let value of data) {
          sourceList.push({ value: value.id, label: value.source_desc });
        }
        this.setState({ sourceList });
      }
    });

    this.getCart();

    const durationLocal = [
      "00:10",
      "00:20",
      "00:30",
      "00:40",
      "00:50",
      "01:00",
      "01:10",
      "01:20",
      "01:30",
      "01:40",
      "01:50",
      "02:00",
      "02:10",
      "02:20",
      "02:30",
      "02:40",
      "02:50",
      "03:00",
      "03:10",
      "03:20",
      "03:30",
      "03:40",
      "03:50",
      "04:00",
      "04:10",
      "04:20",
      "04:30",
      "04:40",
      "04:50",
      "05:00",
      "05:10",
      "05:20",
      "05:30",
      "05:40",
      "05:50",
      "06:00",
      "06:10",
      "06:20",
      "06:30",
      "06:40",
      "06:50",
      "07:00",
      "07:10",
      "07:20",
      "07:30",
      "07:40",
      "07:50",
      "08:00",
      "08:10",
      "08:20",
      "08:30",
      "08:40",
      "08:50",
      "09:00",
      "09:10",
      "09:20",
      "09:30",
      "09:40",
      "09:50",
      "10:00",
      "10:10",
      "10:20",
      "10:30",
      "10:40",
      "10:50",
      "11:00",
      "11:10",
      "11:20",
      "11:30",
      "11:40",
      "11:50",
      "12:00",
      "12:10",
      "12:20",
      "12:30",
      "12:40",
      "12:50",
      "13:00",
      "13:10",
      "13:20",
      "13:30",
      "13:40",
      "13:50",
      "14:00",
      "14:10",
      "14:20",
      "14:30",
      "14:40",
      "14:50",
      "15:00",
      "15:10",
      "15:20",
      "15:30",
      "15:40",
      "15:50",
      "16:00",
      "16:10",
      "16:20",
      "16:30",
      "16:40",
      "16:50",
      "17:00",
      "17:10",
      "17:20",
      "17:30",
      "17:40",
      "17:50",
      "18:00",
      "18:10",
      "18:20",
      "18:30",
      "18:40",
      "18:50",
      "19:00",
      "19:10",
      "19:20",
      "19:30",
      "19:40",
      "19:50",
      "20:00",
      "20:10",
      "20:20",
      "20:30",
      "20:40",
      "20:50",
      "21:00",
      "21:10",
      "21:20",
      "21:30",
      "21:40",
      "21:50",
      "22:00",
      "22:10",
      "22:20",
      "22:30",
      "22:40",
      "22:50",
      "23:00",
      "23:10",
      "23:20",
      "23:30",
      "23:40",
      "23:50",
    ];
    const startDurationLocal = [
      "08:00",
      "08:10",
      "08:20",
      "08:30",
      "08:40",
      "08:50",
      "09:00",
      "09:10",
      "09:20",
      "09:30",
      "09:40",
      "09:50",
      "10:00",
      "10:10",
      "10:20",
      "10:30",
      "10:40",
      "10:50",
      "11:00",
      "11:10",
      "11:20",
      "11:30",
      "11:40",
      "11:50",
      "12:00",
      "12:10",
      "12:20",
      "12:30",
      "12:40",
      "12:50",
      "13:00",
      "13:10",
      "13:20",
      "13:30",
      "13:40",
      "13:50",
      "14:00",
      "14:10",
      "14:20",
      "14:30",
      "14:40",
      "14:50",
      "15:00",
      "15:10",
      "15:20",
      "15:30",
      "15:40",
      "15:50",
      "16:00",
      "16:10",
      "16:20",
      "16:30",
      "16:40",
      "16:50",
      "17:00",
      "17:10",
      "17:20",
      "17:30",
      "17:40",
      "17:50",
      "18:00",
      "18:10",
      "18:20",
      "18:30",
      "18:40",
      "18:50",
      "19:00",
      "19:10",
      "19:20",
      "19:30",
      "19:40",
      "19:50",
      "20:00",
      "20:10",
      "20:20",
      "20:30",
      "20:40",
      "20:50",
      "21:00",
      "21:10",
      "21:20",
      "21:30",
      "21:40",
      "21:50",
      "22:00",
      "22:10",
      "22:20",
      "22:30",
      "22:40",
      "22:50",
      "23:00",
    ];

    /*this.props.getCommonApi(`treatment/Duration/`).then((key) => {
            let { status, data } = key;
            if (status === 200) {
                for (let value of data) {
                    duration.push({ value: value, label: value })
                }
                this.setState({ duration })
            }
        })
        */

    for (let value of durationLocal) {
      duration.push({ value: value, label: value });
    }
    for (let value of startDurationLocal) {
      startDuration.push({ value: value, label: value });
    }
    this.setState({ duration, startDuration });
  };

  getCart = () => {
    let { roomList, sourceList, staffList, cartData, duration, tstaffList } =
      this.state;
    this.props
      .getCommonApi(`tmpitemhelper/?cartid=${this.props.cartId}`)
      .then((key) => {
        // let { status, data } = key;
        // if (status === 200) {
        cartData = key;
        tstaffList = key.data;
        this.setState({ cartData, tstaffList });
        this.getDataFromRes(key);
        // }
      });
  };
  getStaffList = () => {
    let { staffList } = this.state;
    this.props
      .getCommonApi(`empcartlist/?sales_staff=0&page=${this.state.page}`)
      .then((key) => {
        let { status, data } = key;
        if (status === 200) {
          staffList = data.dataList;
          this.setState({ staffList });
        }
      });
  };
  getDataFromRes = (data) => {
    let { formFields, cartData, updateFields, postFields } = this.state;
    formFields["Item"] = data.value.Item;
    formFields["Price"] = data.value.Price;
    formFields["Room"] = data.value.Room;
    updateFields["Room"] = data.value.Room;
    formFields["Source"] = data.value.Source;
    updateFields["Source"] = data.value.Source;
    formFields["add_duration"] = data.value.add_duration;
    formFields["new_remark"] = data.value.new_remark;
    updateFields["new_remark"] = data.value.new_remark;
    postFields["times"] = data.value.times;
    postFields["work_point"] = data.value.work_point;
    this.setState({
      formFields,
      updateFields,
      postFields,
    });
  };

  getDateTime = (data) => {
    let date = new Date(data);
    date = String(date).split(" ");
    let date1 = date[2] + "th " + date[1] + ", " + date[3];
    let time = date[4].split(":");
    let time1 =
      String(Number(time[0]) > 12 ? Number(time[0]) - 12 : time[0]) +
      ":" +
      time[1] +
      (Number(time[0]) > 12 ? "PM" : "AM");
    return time1 + ", " + date1;
  };

  handleSubmit = (id) => {
    //Validation
    let { tstaffList, formFields, cartData, postFields } = this.state;
    let xTotalWp1Amount = 0;
    for (var i = 0; i < this.state.tstaffList.length; i++) {
      xTotalWp1Amount += parseFloat(this.state.tstaffList[i].wp1);
    }
    if (parseFloat(xTotalWp1Amount) == parseFloat(postFields.work_point)) {
    } else {
      alert("User Entry should not greater or lesser than Work point");
      return;
    }

    this.props
      .getCommonApi(`tmpitemhelper/confirm/?cartid=${this.props.cartId}`)
      .then(async (key) => {
        if (key.status === 200) {
          this.props.handleModal();
        }
      });
  };

  handleDialog = () => {};

  handleSearch = (event) => {
    event.persist();

    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(() => {
        let searchString = event.target.value;
        this.props
          .getCommonApi(`custappt/?search=${searchString}`)
          .then((key) => {
            let { status, data } = key;
            if (status === 200) {
              // for (let value of data) {
              //     customerList.push({ value: value.id, label: value.emp_name })
              // }
              this.setState({ customerOption: data });
            }
          });
      }, 500);
    }
    this.debouncedFn();
  };

  handleSelectCustomer = async (data) => {
    let { formFields } = this.state;
    formFields["custId"] = data.id;
    formFields["custName"] = data.cust_name;
    this.setState({ formFields, isOpenCustomer: false, customerOption: [] });
    await this.props.updateForm("basicApptDetail", formFields);
    console.log(this.props.basicApptDetail, "sdfsadfasdf");
  };

  handleCartCreated = () => {};

  handleCheckout = () => {
    let { isOpenPayment } = this.state;
    isOpenPayment = true;
    this.setState({ isOpenPayment });
  };

  handleChange = async ({ target: { value, name } }) => {
    let { formFields } = this.state;
    formFields[name] = value;
    await this.setState({
      formFields,
    });
    // this.props.updateForm('customerDetail', formFields)
    // await this.props.updateForm('appointmentCustomerDetail', formFields)
  };

  handlePostChange = async ({ target: { value, name } }) => {
    let { postFields } = this.state;
    postFields[name] = value;
    await this.setState({
      postFields,
    });
  };

  handleUpdateChange = async ({ target: { value, name } }) => {
    let { updateFields } = this.state;
    updateFields[name] = value;
    await this.setState({
      updateFields,
    });
    let event = { target: { value: value, name: name } };
    // this.handleUpdatestaff(event);
  };

  handleNext = async () => {
    let { page } = this.state;
    page = page + 1;
    await this.setState({
      page,
    });
    if (page > 0) {
      this.getStaffList();
    }
  };

  handleBack = async () => {
    let { page } = this.state;
    page = page - 1;
    await this.setState({
      page,
    });
    if (page > 0) {
      this.getStaffList();
    }
  };

  handleAddstaff = (item) => {
    let { tstaffList, formFields, cartData, postFields } = this.state;
    let data = {
      helper_id: item.id,
    };
    if (postFields.work_point && postFields.times) {
      this.props
        .commonCreateApi(
          `tmpitemhelper/?cartid=${this.props.cartId}&workcommpoints=${postFields.work_point}&times=${postFields.times}`,
          data
        )
        .then(() => {
          this.getCart();
        });
    } else {
      this.setState({ showPostError: true });
    }
  };

  handleUpdatestaff = async (event, item, index) => {
    let { tstaffList, formFields, cartData, updateFields, postFields } =
      this.state;
    let workpoint = parseFloat(postFields.work_point);
    let userEnteredValue = parseFloat(event.target.value);
    if (userEnteredValue > workpoint) {
      return;
    }
    tstaffList[index][event.target.name] = event.target.value;
    this.setState({
      tstaffList,
    });
    let data = {};
    if (event.target.name === "appt_fr_time") {
      data = {
        appt_fr_time: event.target.value,
        add_duration: formFields["add_duration"],
        wp1: item.wp1,
      };
    }
    if (event.target.name === "add_duration") {
      data = {
        appt_fr_time: item.appt_fr_time,
        add_duration: event.target.value,
        wp1: item.wp1,
      };
    }
    if (event.target.name === "wp1") {
      data = {
        appt_fr_time: formFields["appt_fr_time"],
        add_duration: formFields["add_duration"],
        wp1: item.wp1,
      };
    }

    // if (updateFields.Source && updateFields.Room) {
    this.props
      .commonPatchApi(
        `tmpitemhelper/${item.id}/?Room_Codeid=${updateFields.Room}&Source_Codeid=${updateFields.Source}&new_remark=${updateFields.new_remark}`,
        data
      )
      .then(() => {
        this.getCart();
      });
    // } else {
    //     this.setState({ showUpdateError: true })
    // }
  };

  handleClearLine = () => {
    this.props
      .commonDeleteApi(
        `tmpitemhelper/delete/?clear_all=0&cartid=${this.props.cartId}`
      )
      .then(() => {
        this.getCart();
      });
  };

  handleClearAll = () => {
    this.props
      .commonDeleteApi(
        `tmpitemhelper/delete/?clear_all=1&cartid=${this.props.cartId}`
      )
      .then(() => {
        let { formFields, postFields } = this.state;
        formFields["work_point"] = "";
        postFields["times"] = "";
        this.setState({
          formFields,
          postFields,
        });
        this.getCart();
      });
  };
  handleChangeInput = async (event, item, index) => {
    let tstaffList = [];
    tstaffList = this.state.tstaffList;
    tstaffList[index].wp1 = event.target.value;
    // update state
    this.setState(
      {
        tstaffList,
      },
      () => {
        this.handleUpdatestaff(event, item, index);
      }
    );
  };

  handleSelect_Staff = async (staff) => {
    let { tstaffList, formFields, cartData, postFields } = this.state;
    let data = {
      helper_id: staff.id,
    };
    if (postFields.work_point && postFields.times) {
      this.props
        .commonCreateApi(
          `tmpitemhelper/?cartid=${this.props.cartId}&workcommpoints=${postFields.work_point}&times=${postFields.times}`,
          data
        )
        .then(() => {
          this.getCart1();
        });
    } else {
      this.setState({ showPostError: true });
    }
  };
  getCart1 = () => {
    let { roomList, sourceList, staffList, cartData, duration, tstaffList } =
      this.state;
    this.props
      .getCommonApi(`tmpitemhelper/?cartid=${this.props.cartId}`)
      .then((key) => {
        // let { status, data } = key;
        // if (status === 200) {
        cartData = key;
        tstaffList = key.data;
        this.setState({ cartData, tstaffList }, () => {
          this.checkFirstArrayAndUpdateTiming();
        });
        this.getDataFromRes(key);
        // }
      });
  };
  checkFirstArrayAndUpdateTiming = () => {
    let { tstaffList, cartData, updateFields } = this.state;
    var item = tstaffList[0];
    let { Room_Codeid, Source_Codeid, new_remark } = updateFields;
    var today = new Date(),
      time = today.getHours() + ":" + today.getMinutes();
    let data = {};

    data = {
      appt_fr_time: this.roundTime(time, 10),
      add_duration: cartData.value.add_duration,
      wp1: item.wp1,
    };

    this.props
      .commonPatchApi(
        `tmpitemhelper/${item.id}/?Room_Codeid=${updateFields.Room}&Source_Codeid=${updateFields.Source}&new_remark=${updateFields.new_remark}`,
        data
      )
      .then(() => {
        this.getCart();
      });
  };
  roundTime = (time, minutesToRound) => {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    // Convert hours and minutes to time in minutes
    time = hours * 60 + minutes;

    let rounded = Math.round(time / minutesToRound) * minutesToRound;
    let rHr = "" + Math.floor(rounded / 60);
    let rMin = "" + (rounded % 60);

    return rHr.padStart(2, "0") + ":" + rMin.padStart(2, "0");
  };
  render() {
    let {
      staffList = [],
      tstaffList = [],
      roomList,
      sourceList,
      formFields,
      headerDetails,
      cartData,
      postFields,
      updateFields,
      duration,
      startDuration,
    } = this.state;
    let { value = {}, data = {} } = cartData;
    let { Item, Price, work_point } = value;
    let { t } = this.props;
    return (
      <div className="row new-cart treatment-done">
        <div className="col-12">
          <p className="fs-18 font-700 mb-3 title">{t("Treatment Done")}</p>
        </div>
        <div className="col-6 mb-2">
          <label className="text-left text-black common-label-text ">
            {t("Item")}
          </label>
          <div className="input-group mb-2">{Item}</div>
          <label className="text-left text-black common-label-text ">
            {t("Price")}
          </label>
          <div className="input-group mb-2">{Price}</div>
          <label className="text-left text-black common-label-text ">
            {t("Work Point")}
          </label>
          <div className="input-group">
            <NormalInput
              value={postFields.work_point}
              name="work_point"
              onChange={this.handlePostChange}
              className={`customer-name ${
                !postFields.work_point ? "required" : ""
              }`}
              disabled={true}
            />
          </div>
          <label className="text-left text-black common-label-text ">
            {t("Sessions")}
          </label>
          <div className="input-group">
            <NormalInput
              value={postFields.times}
              name="times"
              onChange={this.handlePostChange}
              className={`customer-name ${!postFields.times ? "required" : ""}`}
              disabled
            />
          </div>
        </div>
        <div className="col-6 mb-2"></div>

        <div className={`col-12 cart-item emp-image`}>
          <div className={`staff-listing d-flex emp-list`}>
            <div
              className="forward-button cursor-pointer"
              onClick={this.handleBack}
            >
              <svg
                width="6"
                height="10"
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
            </div>
            {staffList.length > 0
              ? staffList.map((staff) => {
                  return (
                    <div
                      className="mx-1 staff-list cursor-pointer emp"
                      key={staff.id}
                      onClick={() => this.handleSelect_Staff(staff)}
                    >
                      <img className="img" src={staff.emp_pic} alt="" />
                      <p>{staff.display_name}</p>
                    </div>
                  );
                })
              : ""}

            <div
              className="back-button cursor-pointer"
              onClick={this.handleNext}
            >
              <svg
                width="5"
                height="10"
                viewBox="0 0 5 10"
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
            </div>
          </div>
        </div>
        <div className={`col-12 cart-item`}>
          <div className={`item-list`}>
            <div className="table">
              <TableWrapper
                headerDetails={headerDetails}
                queryHandler={this.handlePagination}
                // pageMeta={pageMeta}
                // isEmpty={tstaffList.length === 0 ? true:false}
              >
                {tstaffList.length > 0
                  ? tstaffList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="position-relative status-type">
                            <span className={``}></span>
                            <div className="d-flex align-items-center justify-content-center  fs-20">
                              {item.helper_name}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              <td>
                                <NormalInput
                                  onChange={(event) =>
                                    this.handleUpdatestaff(event, item, index)
                                  }
                                  name="wp1"
                                  type="number"
                                  min="0"
                                  max={postFields.work_point}
                                  value={item.wp1}
                                />
                              </td>
                            </div>
                          </td>

                          <td>
                            {this.state.hideNotNeededControls == "true" && (
                              <div
                                className={`${
                                  tstaffList.length > 0
                                    ? "d-flex"
                                    : "display-none"
                                } align-items-center justify-content-center`}
                              >
                                <div className="input-group">
                                  <NormalSelect
                                    // placeholder="Enter here"
                                    options={startDuration}
                                    value={item.appt_fr_time}
                                    name="appt_fr_time"
                                    onChange={(event) =>
                                      this.handleUpdatestaff(event, item, index)
                                    }
                                    className="customer-name py-0"
                                  />
                                </div>
                              </div>
                            )}
                          </td>
                          <td>
                            {this.state.hideNotNeededControls == "true" && (
                              <div className="d-flex align-items-center justify-content-center">
                                {item.appt_to_time}
                              </div>
                            )}
                          </td>

                          <td>
                            {tstaffList.length > 0 ? (
                              <div
                                className={`${
                                  tstaffList.length > 0
                                    ? "d-flex"
                                    : "display-none"
                                } align-items-center justify-content-center`}
                              >
                                {this.state.hideNotNeededControls == "true" && (
                                  <div className="input-group">
                                    <NormalSelect
                                      // placeholder="Enter here"
                                      options={duration}
                                      value={item.add_duration}
                                      name="add_duration"
                                      onChange={(event) =>
                                        this.handleUpdatestaff(
                                          event,
                                          item,
                                          index
                                        )
                                      }
                                      className="customer-name p-0"
                                    />
                                  </div>
                                )}
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </TableWrapper>
            </div>
          </div>
        </div>
        <div className="col-12 mb-2">
          {this.state.hideNotNeededControls == "true" && (
            <div className="row">
              <div className="col-4">
                <label className="text-left text-black common-label-text ">
                  {t("Room")}
                </label>

                <div className="input-group">
                  <NormalSelect
                    // placeholder="Enter here"
                    options={roomList}
                    value={updateFields.Room}
                    name="Room"
                    onChange={this.handleUpdateChange}
                    className="customer-name py-0"
                    // disabled={formFields.Room}
                  />
                </div>
              </div>
              <div className="col-4">
                <label className="text-left text-black common-label-text ">
                  {t("Source")}
                </label>

                <div className="input-group">
                  <NormalSelect
                    // placeholder="Enter here"
                    options={sourceList}
                    value={updateFields.Source}
                    name="Source"
                    onChange={this.handleUpdateChange}
                    className="customer-name py-0"
                    // disabled={formFields.Source}
                  />
                </div>
              </div>

              <div className="col-4">
                <label className="text-left text-black common-label-text ">
                  {t("New Remark")}
                </label>

                <div className="input-group">
                  <NormalInput
                    // placeholder="Enter here"
                    // options={siteList}
                    value={updateFields.new_remark}
                    name="new_remark"
                    onChange={this.handleUpdateChange}
                    className="customer-name"
                    // disabled={formFields.new_remark}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-12 pt-4 action-bar">
          <div className="row">
            <div className="col-6 d-flex">
              <NormalButton
                buttonClass={"mx-2"}
                mainbg={true}
                className="fs-15 clear-line"
                label="Clear Line"
                outline={false}
                onClick={this.handleClearLine}
              />
              <NormalButton
                buttonClass={"mx-2"}
                mainbg={true}
                className="fs-15 clear-all"
                label="Clear All"
                outline={false}
                onClick={this.handleClearAll}
              />
            </div>
            <div className="col-6 text-right">
              <NormalButton
                buttonClass={"mx-2"}
                mainbg={true}
                className=" fs-15 confirm"
                label="Confirm"
                outline={false}
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selected_cstomer: state.common.selected_cstomer,
  basicApptDetail: state.appointment.basicApptDetail,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // getCustomer,
      getCommonApi,
      updateForm,
      commonCreateApi,
      commonPatchApi,
      commonDeleteApi,
    },
    dispatch
  );
};

export const TreatmentDone = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(TreatmentDoneClass)
);
