import React, { Component } from "react";
import {
  NormalSelect,
  NormalButton,
  NormalModal,
  NormalInput,
  NormalDateTime,
  NormalCheckbox,
  NormalDate,
} from "component/common";
import "./style.scss";
import {
  updateForm,
  getSelectedTreatmentList,
} from "redux/actions/appointment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import closeIcon from "assets/images/close.png";
import req_therapist from "assets/images/app-icons/1.png";
import {
  getCommonApi,
  commonCreateApi,
  commonPatchApi,
} from "redux/actions/common";
import { dateFormat } from "service/helperFunctions";
import { history } from "helpers";
import _ from "lodash";
import { TableWrapper } from "component/common";
import { TreatmentPackage } from "./modal/index";
import { Toast } from "service/toast";

export class NewSelectTreatmentClass extends Component {
  state = {
    treatmentDetail: [],
    formFields: {
      start_time: "",
      end_time: "",
      Item_Codeid: null,
      add_duration: "",
      emp_no: 0,
      requesttherapist: false,
      Item_CodeName: "",
      edit_remark: "",
      recur_days: null,
      recur_qty: null,
      item_text: null,
    },
    selectedList: [
      {
        start_time: "",
        end_time: "",
        Item_Codeid: null,
        add_duration: "",
        emp_no: 0,
        requesttherapist: false,
        Item_CodeName: "",
        edit_remark: "",
        recur_days: null,
        recur_qty: null,
        item_text: null,
      },
    ],
    outletOption: [],
    staffOption: [],
    roomOption: [],
    list: [],
    isOpenModal: false,
    categoryList: [],
    treatmentList: [],
    siteList: [],
    treatmentField: {
      category: "",
      treatment: "",
    },
    timeDropdown: [],
    duration: [],
    index: null,
    search: "",
    selectTreatmentId: "",
    treatmentListHeader: [
      { label: "Category", className: "w-50" },
      { label: "Service", className: "w-75" },
      { label: "Duration", className: "w-25" },
      { label: "price", className: "w-50" },
    ],
    meta: {},
    isTreatementModal: false,
    appointmentId: null,
    PackageIndex: 0,
    selectedRec_days: null,
    selectedRec_qty: null,
    recurringList: [],
    recurringSelectedItems: [],
    recurringSelectAll: false,
  };
  componentDidMount() {
    this.search({});

    this.validator = new SimpleReactValidator({
      element: message => (
        <span className="error-message text-danger validNo fs14">
          {message}
        </span>
      ),
      autoForceUpdate: this,
    });
    let {
      categoryList,
      staffOption,
      selectedList,
      formFields,
      duration,
      recurringList,
    } = this.state;

    let { basicApptDetail } = this.props;

    if (basicApptDetail.appt_id) {
      this.setState({ appointmentId: basicApptDetail.appt_id });
      this.props
        .getCommonApi(`appointmentresources/${basicApptDetail.appt_id}/`)
        .then(key => {
          let { status, data } = key;
          console.log(data.recur_lst, "RecurringAppointmentrelatedList");
          if (status === 200) {
            console.log(data, "selectedCustomer");
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

            selectedList[0]["start_time"] = data ? data.start_time : "";
            selectedList[0]["end_time"] = data ? data.end_time : "";
            selectedList[0]["Item_Codeid"] = data.Item_Codeid;
            selectedList[0]["Item_CodeName"] = data.item_name;
            selectedList[0]["emp_no"] = data.emp_id;
            selectedList[0]["add_duration"] = data.add_duration;
            selectedList[0]["edit_remark"] = "";
            selectedList[0]["requesttherapist"] = data.requesttherapist;
            selectedList[0]["recur_days"] = data.recur_days;
            selectedList[0]["recur_qty"] = data.recur_qty;
            selectedList[0]["item_text"] = data.item_name;
            this.setState({
              selectedRec_days: data.recur_days,
              selectedRec_qty: data.recur_qty,
            });
            for (let value of data.recur_lst) {
              recurringList.push({
                id: value.id,
                date: value.date,
                appt_status: value.appt_status,
                start_time: value.start_time,
                end_time: value.end_time,
                item_name: value.item_name,
                Item_Codeid: value.Item_Codeid,
                emp_name: value.emp_name,
                emp_id: value.emp_id,
                requesttherapist: value.requesttherapist,
                add_duration: value.add_duration,
                selected: false,
              });
            }
            this.setState({
              formFields,
              selectedList,
            });

            this.props.updateForm("treatmentList", selectedList);
          }
        });
    } else {
      formFields["start_time"] = basicApptDetail ? basicApptDetail.time : "";
      formFields["emp_no"] = basicApptDetail ? basicApptDetail.staff_id : 0;
      selectedList[0]["start_time"] = basicApptDetail
        ? basicApptDetail.time
        : "";
      selectedList[0]["emp_no"] = basicApptDetail
        ? basicApptDetail.staff_id
        : 0;
      this.setState({
        formFields,
        selectedList,
      });
      this.props.updateForm("treatmentList", selectedList);
    }
    this.props.getCommonApi(`itemdept/`).then(key => {
      let { status, data } = key;
      if (status === 200) {
        for (let value of data) {
          categoryList.push({ value: value.id, label: value.itm_desc });
        }
        this.setState({ categoryList });
      }
    });
    this.props
      .getCommonApi(
        `appointment/Staffs/?Outlet=${
          basicApptDetail.branchId
        }&date=${dateFormat(new Date())}`
      )
      .then(key => {
        let { status, data } = key;
        if (status === 200) {
          for (let value of data) {
            staffOption.push({ value: value.id, label: value.emp_name });
          }
          this.setState({ staffOption });
        }
      });
    this.props.getCommonApi(`treatment/Duration/`).then(key => {
      let { status, data } = key;
      if (status === 200) {
        for (let value of data) {
          duration.push({ value: value, label: value });
        }
        this.setState({ duration });
      }
    });
    this.getStaffAvailability();
  }
  componentWillMount() {}

  getStaffAvailability = () => {
    this.props
      .getCommonApi(
        `staffsavailable/?Appt_date=${dateFormat(new Date(), "yyyy-mm-dd")}`
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

  handleSearch = event => {
    event.persist();
    console.log(event.target.value, event.target, event, "dfhdfjghkjfghj");
    let { treatmentField } = this.state;
    treatmentField["treatment"] = event.target.value;
    this.setState({ search: event.target.value, treatmentField });
    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(() => {
        let searchString = event.target.value;
        let data = { search: searchString };
        // this.queryHandler(data)
        let { customerList } = this.state;
        let { basicApptDetail } = this.props;
        this.search(data);
      }, 500);
    }
    this.debouncedFn();
  };

  search = data => {
    let { page = 1, limit = 10, search = "" } = data;
    let { selectTreatmentId } = this.state;
    this.props
      .getCommonApi(
        `stocklist/?Item_Deptid=${selectTreatmentId}&search=${search}&page=${page}&limit=${limit}`
      )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({
            treatmentList: res.data.dataList,
            meta: res.data.meta.pagination,
          });
        }
      });
  };

  handlePagination = page => {
    this.search(page);
  };

  handleChangeTreatment = async ({ target: { value, name } }) => {
    let { treatmentField, treatmentList, search, selectTreatmentId } =
      this.state;
    console.log("uihwkjrwkej", name, value);
    treatmentField[name] = value;
    if (name === "category") {
      selectTreatmentId = value;
    } else if (name === "treatment") {
      search = value;
    }
    await this.setState({
      treatmentField,
      selectTreatmentId,
      search,
    });

    let page = 1,
      limit = 10;
    this.props
      .getCommonApi(
        `stocklist/?Item_Deptid=${selectTreatmentId}&search=${search}&page=${page}&limit=${limit}`
      )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({
            treatmentList: res.data.dataList,
            meta: res.data.meta.pagination,
          });
        }
      });
  };

  handleChange = async ({ target: { value, name } }, index) => {
    let { formFields, selectedList } = this.state;

    if (name === "add_duration") {
      selectedList[index]["end_time"] = this.addTimes(
        selectedList[index]["start_time"],
        value
      );
      selectedList[index]["add_duration"] = value;
      if (selectedList.length - 1 > index) {
        selectedList[index + 1]["start_time"] = selectedList[index]["end_time"];
        if (selectedList[index + 1]["add_duration"] !== "") {
          selectedList[index + 1]["end_time"] = this.addTimes(
            selectedList[index]["end_time"],
            selectedList[index + 1]["add_duration"]
          );
        }
      }
    } else if (name == "Item_CodeName") {
      selectedList[index]["Item_Codeid"] = 6213;
      selectedList[index]["Item_CodeName"] = value;
      selectedList[index]["item_text"] = value;
    } else if (name == "recur_days" || name == "recur_qty") {
      if (value <= 0 || value == "") {
        selectedList[index][name] = null;
      } else {
        selectedList[index][name] = Number(value);
      }
    } else {
      selectedList[index][name] = value;
    }

    await this.setState({
      selectedList,
    });
    await this.props.updateForm("treatmentList", selectedList);
  };

  handleMultiSelect = data => {
    let { formFields } = this.state;
    let list = [];
    for (let key of data) {
      list.push(key.value);
    }
    formFields["emp_no"] = list;
    this.setState({ formFields });
    console.log(formFields, "oyokkjk");
  };

  handleDatePick = async (name, value) => {
    let { formFields, selectedList } = this.state;
    let time = this.getHoursFromDate(value);
    formFields["start_time"] = time;
    selectedList[0]["start_time"] = time ? time : formFields["start_time"];
    if (time) {
      formFields["end_time"] = this.addTimes(
        formFields["start_time"],
        formFields["add_duration"]
      );
      selectedList[0]["end_time"] = this.addTimes(
        selectedList[0]["start_time"],
        formFields["add_duration"]
      );
    }
    await this.setState({
      formFields,
      selectedList,
    });
    await this.props.updateForm("treatmentList", selectedList);
  };

  getHoursFromDate = date => {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let hours = hour > 9 ? hour : "0" + hour;
    let minutes = minute > 9 ? minute : "0" + minute;
    return hours + ":" + minutes;
  };

  stafflistvalidation = appointmentTreatmentList => {
    if (appointmentTreatmentList.length > 0) {
      for (let item of appointmentTreatmentList) {
        if (!item.emp_no || item.emp_no == "" || item.emp_no == null) {
          Toast({ type: "error", message: "Please select Staff" });
          return false;
        } else {
          return true;
        }
      }
    }
  };
  handleUpdate = () => {
    let { appointmentCustomerDetail, appointmentTreatmentList } = this.props;
    let { appointmentId, selectedRec_days, selectedRec_qty } = this.state;

    if (
      appointmentCustomerDetail.customerName &&
      appointmentCustomerDetail.bookingStatus
    ) {
      if (this.stafflistvalidation(appointmentTreatmentList)) {
        let data = {
          appt_date: dateFormat(
            new Date(appointmentCustomerDetail.appointmentDate),
            "yyyy-mm-dd"
          ),
          Room_Codeid: appointmentCustomerDetail.Room_Codeid,
          appt_status: appointmentCustomerDetail.bookingStatus,
          sec_status: appointmentCustomerDetail.sec_status,
          edit_remark: appointmentTreatmentList[0].edit_remark,
          start_time: appointmentTreatmentList[0].start_time,
          end_time: appointmentTreatmentList[0].end_time,
          item_id: appointmentTreatmentList[0].Item_Codeid,
          add_duration: appointmentTreatmentList[0].add_duration,
          emp_id: appointmentTreatmentList[0].emp_no,
          requesttherapist: appointmentTreatmentList[0].requesttherapist,
          item_text: appointmentTreatmentList[0].item_text,
          recur_days:
            selectedRec_days === appointmentTreatmentList[0].recur_days ||
            appointmentTreatmentList[0].recur_days === "" ||
            appointmentTreatmentList[0].recur_days <= 0
              ? null
              : appointmentTreatmentList[0].recur_days,
          recur_qty:
            Number(selectedRec_qty) ===
              Number(appointmentTreatmentList[0].recur_qty) ||
            Number(appointmentTreatmentList[0].recur_qty) === "" ||
            Number(appointmentTreatmentList[0].recur_qty) <= 0
              ? null
              : Number(appointmentTreatmentList[0].recur_qty),
        };
        console.log(data, "UpdatedappointmentTreatmentListWhenupdate");

        this.props
          .commonPatchApi(`appointmentresources/${appointmentId}/`, data)
          .then(async res => {
            console.log(res, "type all clicked result");
            if (res.status === 200) {
              this.handleCloseDialog();
              this.handleSaveorUpdate();
            }
          });
      }
    } else {
      this.props.showErrorMessage();
    }
  };
  handleRecurringUpdate = () => {
    let { appointmentCustomerDetail, appointmentTreatmentList } = this.props;
    let {
      appointmentId,
      selectedRec_days,
      selectedRec_qty,
      recurringList,
      recurringSelectAll,
    } = this.state;
    let finalRecurring = [];
    for (var recurringItem of recurringList) {
      if (recurringItem.selected) {
        let value = recurringItem.id;
        finalRecurring.push(value);
      }
    }
    console.log(finalRecurring, "finalrecurringList");
    if (
      appointmentCustomerDetail.customerName &&
      appointmentCustomerDetail.bookingStatus
    ) {
      if (this.stafflistvalidation(appointmentTreatmentList)) {
        let data = {
          appt_date: dateFormat(
            new Date(appointmentCustomerDetail.appointmentDate),
            "yyyy-mm-dd"
          ),
          Room_Codeid: appointmentCustomerDetail.Room_Codeid,
          appt_status: appointmentCustomerDetail.bookingStatus,
          sec_status: appointmentCustomerDetail.sec_status,
          edit_remark: appointmentTreatmentList[0].edit_remark,
          start_time: appointmentTreatmentList[0].start_time,
          end_time: appointmentTreatmentList[0].end_time,
          item_id: appointmentTreatmentList[0].Item_Codeid,
          add_duration: appointmentTreatmentList[0].add_duration,
          emp_id: appointmentTreatmentList[0].emp_no,
          requesttherapist: appointmentTreatmentList[0].requesttherapist,
          item_text: appointmentTreatmentList[0].item_text,
          recur_days:
            selectedRec_days === appointmentTreatmentList[0].recur_days ||
            appointmentTreatmentList[0].recur_days === "" ||
            appointmentTreatmentList[0].recur_days <= 0
              ? null
              : appointmentTreatmentList[0].recur_days,
          recur_qty:
            Number(selectedRec_qty) ===
              Number(appointmentTreatmentList[0].recur_qty) ||
            Number(appointmentTreatmentList[0].recur_qty) === "" ||
            Number(appointmentTreatmentList[0].recur_qty) <= 0
              ? null
              : Number(appointmentTreatmentList[0].recur_qty),
          recur_ids: finalRecurring,
        };
        console.log(data, "UpdatedappointmentTreatmentListWhenupdate");
        if (recurringSelectAll) {
          this.props
            .commonPatchApi(
              `appointmentrecur/${appointmentId}/?type=${`all`} `,
              data
            )
            .then(async res => {
              if (res.status === 200) {
                this.handleCloseDialog();
                this.handleSaveorUpdate();
              }
            });
        } else {
          this.props
            .commonPatchApi(`appointmentrecur/${appointmentId}/`, data)
            .then(async res => {
              console.log(res, "type all clicked result");
              if (res.status === 200) {
                this.handleCloseDialog();
                this.handleSaveorUpdate();
              }
            });
        }
      }
    } else {
      this.props.showErrorMessage();
    }
  };
  handleSubmit = () => {
    // this.props.handleConfirmBooking()
    let { appointmentCustomerDetail, appointmentTreatmentList } = this.props;
    console.log(
      appointmentCustomerDetail,
      appointmentTreatmentList,
      "sdfgdfsdggf"
    );
    console.log(
      appointmentTreatmentList,
      "UpdatedappointmentTreatmentListWhenSave"
    );
    if (
      appointmentCustomerDetail.customerName &&
      appointmentCustomerDetail.bookingStatus
    ) {
      if (this.stafflistvalidation(appointmentTreatmentList)) {
        debugger;
        let data = {
          Appointment: {
            appt_date: dateFormat(
              new Date(appointmentCustomerDetail.appointmentDate),
              "yyyy-mm-dd"
            ),
            Appt_typeid: appointmentCustomerDetail.Appt_typeid,
            cust_noid: appointmentCustomerDetail.customerName,
            new_remark: appointmentCustomerDetail.new_remark,
            // emp_noid: appointmentCustomerDetail.emp_id,
            Source_Codeid: appointmentCustomerDetail.Source_Codeid,
            Room_Codeid: appointmentCustomerDetail.Room_Codeid,
            appt_status: appointmentCustomerDetail.bookingStatus,
            sec_status: appointmentCustomerDetail.sec_status,
            ItemSite_Codeid: appointmentCustomerDetail.ItemSite_Codeid,
            walkin: appointmentCustomerDetail.walkin,
          },
          Treatment: appointmentTreatmentList,
        };

        this.props.commonCreateApi(`appointment/`, data).then(async res => {
          if (res.status === 201) {
            this.handleCloseDialog();
            this.handleSaveorUpdate();
          }
        });
      }
    } else {
      this.props.showErrorMessage();
    }
  };

  getDateTime = data => {
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

  handleDialog = () => {
    this.setState({ isOpenModal: false, index: null });
  };

  handleMultipleCustomer = () => {
    this.setState({ isOpenModal: false });
  };

  handleSelectPackage = async data => {
    let { formFields, selectedList, PackageIndex } = this.state;

    if (PackageIndex === 0 && selectedList[0]["Item_CodeName"] === "") {
      selectedList[0]["start_time"] = selectedList[0]["start_time"];
      selectedList[0]["end_time"] = this.addTimes(
        selectedList[0]["start_time"],
        data.add_duration
      );
      selectedList[0]["Item_Codeid"] = data.id;
      selectedList[0]["Item_CodeName"] = data.item_desc;
      selectedList[0]["item_text"] = null;
      selectedList[0]["add_duration"] = data.add_duration;

      await this.setState({
        selectedList,
        PackageIndex: PackageIndex + 1,
      });
      await this.props.updateForm("treatmentList", selectedList);
    } else if (selectedList[selectedList.length - 1]["Item_CodeName"] === "") {
      selectedList[selectedList.length - 1]["start_time"] =
        selectedList[selectedList.length - 1]["start_time"];
      selectedList[selectedList.length - 1]["end_time"] = this.addTimes(
        selectedList[selectedList.length - 1]["start_time"],
        data.add_duration
      );
      selectedList[selectedList.length - 1]["Item_Codeid"] = data.id;
      selectedList[selectedList.length - 1]["Item_CodeName"] = data.item_desc;
      selectedList[selectedList.length - 1]["item_text"] = null;
      selectedList[selectedList.length - 1]["add_duration"] = data.add_duration;

      await this.setState({
        selectedList,
        PackageIndex: PackageIndex + 1,
      });
      await this.props.updateForm("treatmentList", selectedList);
    } else {
      var listCount = selectedList.length - 1;
      let treatment = {};
      treatment["start_time"] = selectedList[listCount]["end_time"];
      treatment["end_time"] = this.addTimes(
        selectedList[listCount]["end_time"],
        data.add_duration
      );
      treatment["Item_Codeid"] = data.id;
      treatment["Item_CodeName"] = data.item_desc;
      treatment["item_text"] = null;
      treatment["add_duration"] = data.add_duration;
      selectedList.push(treatment);
      await this.setState({
        selectedList,
      });
      await this.props.updateForm("treatmentList", selectedList);
    }

    this.setState({ isOpenModal: false });
  };

  handleSelectTreatment = async data => {
    let { selectedList, index } = this.state;

    if (index == 0 && selectedList.length == 1) {
      selectedList[0]["start_time"] = selectedList[0]["start_time"];
      selectedList[0]["end_time"] = this.addTimes(
        selectedList[0]["start_time"],
        data.add_duration
      );
      selectedList[0]["Item_Codeid"] = data.id;
      selectedList[0]["Item_CodeName"] = data.item_desc;
      selectedList[0]["add_duration"] = data.add_duration;

      await this.setState({
        selectedList,
      });
      await this.props.updateForm("treatmentList", selectedList);
    } else {
      selectedList[index]["start_time"] = selectedList[index]["start_time"];
      selectedList[index]["end_time"] = this.addTimes(
        selectedList[index]["start_time"],
        data.add_duration
      );
      selectedList[index]["Item_Codeid"] = data.id;
      selectedList[index]["Item_CodeName"] = data.item_desc;
      selectedList[index]["add_duration"] = data.add_duration;
      if (selectedList.length - 1 > index) {
        selectedList[index + 1]["start_time"] = selectedList[index]["end_time"];
        if (selectedList[index + 1]["add_duration"] !== "") {
          selectedList[index + 1]["end_time"] = this.addTimes(
            selectedList[index]["end_time"],
            selectedList[index + 1]["add_duration"]
          );
        }
      }
      await this.setState({
        selectedList,
      });
      await this.props.updateForm("treatmentList", selectedList);
    }
    this.setState({ isOpenModal: false });
  };

  timeToMins = time => {
    var b = time.split(":");
    return b[0] * 60 + +b[1];
  };

  // Convert minutes to a time in format hh:mm
  // Returned value is in range 00  to 24 hrs
  timeFromMins = mins => {
    function z(n) {
      return (n < 10 ? "0" : "") + n;
    }
    var h = ((mins / 60) | 0) % 24;
    var m = mins % 60;
    return z(h) + ":" + z(m);
  };

  // Add two times in hh:mm format
  addTimes = (t0, t1) => {
    return this.timeFromMins(this.timeToMins(t0) + this.timeToMins(t1));
  };

  handleNewTimeChange = selectedTime => {
    let time = new Date(dateFormat(selectedTime));
    let selectedTimeNew = time.getTime();
    console.log(selectedTimeNew);
    let { selectedList, formFields } = this.state;
    formFields = {
      start_time: selectedTimeNew,
      end_time: "",
      add_duration: "",
    };
  };

  handleAddtreatment = async index => {
    let { selectedList, formFields } = this.state;
    if (selectedList[index]["end_time"]) {
      formFields = {
        start_time: selectedList[selectedList.length - 1].end_time,
        end_time: "",
        Item_Codeid: 6213,
        add_duration: "",
        emp_no: 0,
        requesttherapist: false,
        recur_days: null,
        recur_qty: null,
        item_text: null,
      };
      selectedList.push({
        start_time: selectedList[selectedList.length - 1].end_time,
        end_time: "",
        Item_Codeid: 6213,
        Item_CodeName: "",
        add_duration: "",
        emp_no: 0,
        requesttherapist: false,
        recur_days: null,
        recur_qty: null,
        item_text: null,
      });

      await this.setState({ selectedList, formFields });

      await this.props.updateForm("treatmentList", selectedList);
    } else {
      Toast({ type: "error", message: "End time shouldn't be empty" });
    }
  };

  deleteTreatment = async index => {
    let { selectedList } = this.state;
    selectedList.splice(index, 1);
    this.setState({ selectedList });
    await this.props.updateForm("treatmentList", selectedList);
  };

  handleTreatementmodal = () => {
    this.setState(prevState => ({
      isTreatementModal: !prevState.isTreatementModal,
    }));
  };
  handleChangeremark = async ({ target: { value, name } }) => {
    let { formFields, selectedList } = this.state;
    formFields[name] = value;
    selectedList[0][name] = value;
    await this.setState({
      formFields,
      selectedList,
    });
    await this.props.updateForm("treatmentList", selectedList);
  };

  handleCheckbox = async ({ target: { value, name } }, index) => {
    let { treatmentList } = this.state;
    let { selectedList } = this.state;
    selectedList[index]["requesttherapist"] = value;
    await this.setState({
      selectedList,
    });
    await this.props.updateForm("treatmentList", selectedList);
  };

  handleCloseDialog = async () => {
    this.props.handleCloseDialog();
  };
  handleSaveorUpdate = async () => {
    this.props.handleSaveorUpdate();
  };
  handleRecurringlistCheckbox = async ({ target: { value, name } }, item) => {
    let { recurringList } = this.state;
    let listCheckbox = recurringList.find(acc => acc.id === item.id);
    if (listCheckbox) {
      listCheckbox["selected"] = value;
      await this.setState({ ...this.state.recurringList, listCheckbox });
    }
    let Checkbox = recurringList.filter(acc => acc.selected === true).length;
    if (Checkbox == this.state.recurringList.length) {
      await this.setState({ recurringSelectAll: true });
    } else {
      await this.setState({ recurringSelectAll: false });
    }
  };

  handleRecurringSelectAllCheckbox = async ({ target: { value, name } }) => {
    let { recurringList } = this.state;
    await this.setState({ recurringSelectAll: value });
    for (let item of recurringList) {
      item["selected"] = value;
      await this.setState({ ...this.state.recurringList, item });
    }
  };
  render() {
    let {
      outletOption,
      staffOption,
      roomOption,
      selectedList,
      siteList,
      list,
      formFields,
      timeDropdown,
      duration,
      isOpenModal,
      treatmentField,
      treatmentList = [],
      categoryList,
      treatmentListHeader,
      meta,
      isTreatementModal,
      appointmentId,
      selectedRec_days,
      selectedRec_qty,
      recurringList,
      recurringSelectAll,
    } = this.state;
    let { customerDetail, selectedTreatmentList, customerId } = this.props;
    let { outlet, staff, rooms } = customerDetail;
    return (
      <div className="create-appointment select-treatment-appointment">
        <div className="row">
          <div className=" col-md-12">
            <div className="appointment">
              <div className="row">
                {appointmentId ? (
                  <div className="col-3 mt-3 mb-3">
                    <label className="text-left">New Time</label>
                    <div className="input-group">
                      <NormalDateTime
                        onChange={this.handleDatePick}
                        label="newStartTime"
                        name="newStartTime"
                        timeOnly={true}
                        dateFormat="hh:mm"
                        showTime={true}
                        selected={false}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {appointmentId ? (
                  <div className="col-6 mt-3 mb-3">
                    <label className="text-left">Remark</label>

                    <div className="input-group">
                      <NormalInput
                        // placeholder="Enter here"
                        // options={siteList}
                        value={formFields.edit_remark}
                        name="edit_remark"
                        onChange={this.handleChangeremark}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="appointment-holder">
                <div className="treatment-section">
                  <div className="select-treatment select-list w-100">
                    <div className="row selected selected-header mb-4">
                      <div className="col-1 p-0">Start</div>
                      <div className="col-1 p-0">End</div>
                      <div className="col-3 p-0 header-detail">Services</div>

                      <div className="col-1 p-0 header-detail">Duration</div>
                      <div className="col-2 p-0">Treatment staff</div>
                      <div className="col-1 p-0 d-flex justify-content-center">
                        <img
                          src={req_therapist}
                          alt=""
                          height="25"
                          width="25"
                        />
                      </div>
                      <div className="col-1 p-0 header-detail">Recur. Days</div>
                      <div className="col-1 p-0 header-detail">Recur. Qty</div>
                    </div>
                    {selectedList.length > 0
                      ? selectedList.map((item, index) => {
                          return (
                            <div className="row selected  mb-4" key={index}>
                              <div className="col-1 mr-1 p-0">
                                <NormalInput
                                  placeholder="start"
                                  // options={timeDropdown}
                                  value={item.start_time}
                                  name="start_time"
                                  onChange={this.handleChange}
                                  className="customer-name p-0"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-1 mr-1 p-0">
                                <NormalInput
                                  placeholder="end"
                                  // options={timeDropdown}
                                  value={item.end_time}
                                  name="end_time"
                                  onChange={this.handleChange}
                                  className="customer-name p-0"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-3 mr-1 p-0">
                                <div className="header-detail"></div>
                                <NormalInput
                                  placeholder="service"
                                  // options={siteList}
                                  value={item.Item_CodeName}
                                  name="Item_CodeName"
                                  onClick={() =>
                                    this.setState({
                                      isOpenModal: true,
                                      index: index,
                                    })
                                  }
                                  onChange={e => this.handleChange(e, index)}
                                  className="customer-name p-0 px-2"
                                />
                              </div>
                              <div className="col-1 mr-1 p-0 header-detail">
                                <NormalSelect
                                  // placeholder="Enter here"
                                  options={duration}
                                  value={item.add_duration}
                                  name="add_duration"
                                  onChange={e => this.handleChange(e, index)}
                                  className="customer-name p-0"
                                />
                              </div>
                              <div className="col-2 p-0">
                                <NormalSelect
                                  // placeholder="Enter here"
                                  options={staffOption}
                                  value={item.emp_no}
                                  name="emp_no"
                                  onChange={e => this.handleChange(e, index)}
                                  className="customer-name p-0"
                                />
                              </div>
                              <div className="col-1 p-0 d-flex justify-content-center">
                                {item.requesttherapist ? (
                                  <NormalCheckbox
                                    onChange={e =>
                                      this.handleCheckbox(e, index)
                                    }
                                    value={item.requesttherapist}
                                    name="requesttherapist"
                                    checked={true}
                                  />
                                ) : (
                                  <NormalCheckbox
                                    onChange={e =>
                                      this.handleCheckbox(e, index)
                                    }
                                    value={item.requesttherapist}
                                    name="requesttherapist"
                                    checked={false}
                                  />
                                )}
                              </div>
                              <div className="col-1 p-0 d-flex justify-content-start">
                                <NormalInput
                                  type="number"
                                  name="recur_days"
                                  value={item.recur_days ? item.recur_days : ""}
                                  onChange={e => this.handleChange(e, index)}
                                />
                              </div>
                              <div className="col-1 p-0 d-flex justify-content-start">
                                <NormalInput
                                  type="number"
                                  name="recur_qty"
                                  value={item.recur_qty ? item.recur_qty : ""}
                                  onChange={e => this.handleChange(e, index)}
                                />
                              </div>
                              {appointmentId ? (
                                <></>
                              ) : (
                                <>
                                  {selectedList.length === index + 1 ? (
                                    <div
                                      className="ml-3"
                                      onClick={() =>
                                        this.handleAddtreatment(index)
                                      }
                                    >
                                      <svg
                                        width="31"
                                        height="30"
                                        viewBox="0 0 31 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          width="31"
                                          height="30"
                                          fill="#F9F9F9"
                                        />
                                        <path
                                          d="M15 8V22"
                                          stroke="#848484"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M8 15H22"
                                          stroke="#848484"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                  ) : (
                                    <img
                                      width="25"
                                      height="25"
                                      onClick={() =>
                                        this.deleteTreatment(index)
                                      }
                                      className="ml-3"
                                      src={closeIcon}
                                      alt=""
                                    />
                                  )}
                                </>
                              )}
                            </div>
                          );
                        })
                      : ""}
                    <div className="mt-5">
                      <div className="row">
                        <div className="col-md-8">
                          <div className="d-flex justify-content-start">
                            <NormalButton
                              buttonClass={"treatment"}
                              mainbg={true}
                              className="col-12 fs-15 "
                              label="Treatment Package"
                              onClick={this.handleTreatementmodal}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex justify-content-around">
                            <NormalButton
                              buttonClass={"treatment"}
                              mainbg={true}
                              className="col-12"
                              label="Cancel"
                              onClick={this.handleCloseDialog}
                            />
                            {appointmentId ? (
                              <NormalButton
                                buttonClass={"submit-btn"}
                                mainbg={false}
                                className="col-12 submit-btn"
                                label="Update Booking"
                                onClick={this.handleUpdate}
                              />
                            ) : (
                              <NormalButton
                                buttonClass={"submit-btn"}
                                mainbg={false}
                                className="col-12 submit-btn "
                                label="Confirm Booking"
                                onClick={this.handleSubmit}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {recurringList && recurringList.length > 0 ? (
                      <div className="mt-5 mb-3">
                        <div>
                          <p>Recurring Related Appointments</p>
                        </div>

                        <div className="row selected selected-header mb-2">
                          <div className="col-1">
                            <NormalCheckbox
                              label={`All`}
                              onChange={e =>
                                this.handleRecurringSelectAllCheckbox(e)
                              }
                              value={recurringSelectAll}
                              name="recurringSelectAll"
                              checked={recurringSelectAll}
                            />
                          </div>
                          <div className="col-2 p-0">Date</div>
                          <div className="col-1 p-0">Start</div>
                          <div className="col-1 p-0">End</div>
                          <div className="col-3 p-0 header-detail">
                            Services
                          </div>

                          <div className="col-1 p-0 header-detail">
                            Duration
                          </div>
                          <div className="col-2 p-0">Treatment staff</div>
                          <div className="col-1 p-0 d-flex justify-content-center">
                            <img
                              src={req_therapist}
                              alt=""
                              height="25"
                              width="25"
                            />
                          </div>
                        </div>
                        {recurringList && recurringList.length > 0 ? (
                          recurringList.map((item, index) => {
                            return (
                              <div className="row selected  mb-4" key={index}>
                                <div className="col-1 text-center">
                                  <NormalCheckbox
                                    onChange={e =>
                                      this.handleRecurringlistCheckbox(e, item)
                                    }
                                    value={item.selected}
                                    name="recurringItem"
                                    checked={item.selected}
                                  />
                                </div>
                                <div className="col-2 p-0">{item.date}</div>
                                <div className="col-1 p-0">
                                  {item.start_time}
                                </div>
                                <div className="col-1 p-0">{item.end_time}</div>
                                <div className="col-3 p-0 header-detail">
                                  {item.item_name}
                                </div>

                                <div className="col-1 p-0 header-detail">
                                  {item.add_duration}
                                </div>
                                <div className="col-2 p-0">{item.emp_name}</div>
                                <div className="col-1 p-0 d-flex justify-content-center">
                                  <NormalCheckbox
                                    onChange={e =>
                                      this.handleRecurringlistCheckbox(e, item)
                                    }
                                    value={item.requesttherapist}
                                    name="requesttherapist"
                                    checked={item.requesttherapist}
                                    disabled
                                  />
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center w-100">No data</div>
                        )}
                        <div className="d-flex justify-content-end">
                          <div className="mt-5">
                            <div className="d-flex justify-content-between">
                              <div>
                                <NormalButton
                                  buttonClass={"treatment"}
                                  mainbg={true}
                                  className="col-12"
                                  label="Cancel"
                                  onClick={this.handleCloseDialog}
                                />
                              </div>
                              <div>
                                {appointmentId ? (
                                  <NormalButton
                                    buttonClass={"submit-btn"}
                                    mainbg={false}
                                    className="col-12 submit-btn ml-4"
                                    label="Update Recurring"
                                    onClick={this.handleRecurringUpdate}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <NormalModal
          className={"multiple-appointment select-category"}
          style={{ minWidth: "800px" }}
          modal={isOpenModal}
          handleModal={this.handleDialog}
        >
          <img
            onClick={this.handleDialog}
            className="close"
            src={closeIcon}
            alt=""
          />
          <div className="customer-list container">
            <div className="col-12 pl-0 mb-3 fs-18 py-2">Select Treatment</div>
            <div className="col-12">
              <div className="row">
                <div className="col-6">
                  Category
                  <NormalSelect
                    // placeholder="Enter here"
                    options={categoryList}
                    value={treatmentField.category}
                    name="category"
                    onChange={this.handleChangeTreatment}
                    className="customer-name p-0"
                  />
                </div>
                <div className="col-6">
                  Service
                  <input
                    // placeholder="Enter here"
                    // options={siteList}
                    value={treatmentField.treatment}
                    name="treatment"
                    onChange={this.handleSearch}
                    className="search px-3 p-0"
                  />
                </div>
              </div>
            </div>

            <div className="table-container table-responsive mt-3">
              <TableWrapper
                headerDetails={treatmentListHeader}
                queryHandler={this.handlePagination}
                pageMeta={meta}
              >
                {treatmentList.length > 0 ? (
                  treatmentList.map((item, index) => {
                    return (
                      <tr
                        className="w-100"
                        onClick={() => this.handleSelectTreatment(item)}
                        key={index}
                      >
                        <td>
                          {" "}
                          <div className="d-flex align-items-center justify-content-center">
                            {item.Item_Class}
                          </div>
                        </td>
                        <td>
                          {" "}
                          <div className="d-flex align-items-center justify-content-center">
                            {item.item_desc}
                          </div>
                        </td>
                        <td>
                          {" "}
                          <div className="d-flex align-items-center justify-content-center">
                            {item.add_duration}
                          </div>
                        </td>
                        <td>
                          {" "}
                          <div className="d-flex align-items-center justify-content-center">
                            {item.item_price}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      No data available
                    </div>
                  </td>
                )}
              </TableWrapper>
            </div>

            <div className="row text-center justify-center w-100">
              <NormalButton
                buttonClass={"col-3"}
                mainbg={true}
                className="col-12 ml-4"
                label="Cancel"
                onClick={this.handleDialog}
              />
            </div>
          </div>
        </NormalModal>

        <div className="col-12">
          {isTreatementModal ? (
            <TreatmentPackage
              isTreatementModal={isTreatementModal}
              handleTreatementmodal={this.handleTreatementmodal}
              handleSelectPackage={this.handleSelectPackage}
              customerId={customerId}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  customerDetail: state.appointment.customerDetail,
  appointmentDetail: state.appointment.appointmentDetail,
  selectedTreatmentList: state.appointment.selectedTreatmentList,
  basicApptDetail: state.appointment.basicApptDetail,
  appointmentCustomerDetail: state.appointment.appointmentCustomerDetail,
  appointmentTreatmentList: state.appointment.appointmentTreatmentList,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateForm,
      getSelectedTreatmentList,
      getCommonApi,
      commonCreateApi,
      commonPatchApi,
    },
    dispatch
  );
};

export const NewSelectTreatment = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewSelectTreatmentClass);
