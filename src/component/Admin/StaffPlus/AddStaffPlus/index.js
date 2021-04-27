import React, { Component } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import {
  NormalInput,
  NormalSelect,
  NormalButton,
  NormalDate,
  NormalMultiSelect,
  NormalDateTime,
} from "component/common";
import { displayImg, dateFormat } from "service/helperFunctions";
import { DragFileUpload } from "../../../common";
import { createStaff, getStaff, updateStaff } from "redux/actions/staff";
import {
  getBranch,
  getJobtitle,
  getShift,
  getCommonApi,
} from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormGroup, Label, Input } from "reactstrap";
import { ScheduleTable } from "./ScheduleTable";

export class AddStaffClass extends Component {
  state = {
    formFields: {
      emp_name: "",
      nric: "",
      username: "",
      emp_joindate: "",
      defaultSiteCodeid: "",
      shift: [],
      EMP_TYPEid: "",
      emp_pic: "",
      active: false,
      is_login: false,
      pw_password: "",
      emp_level: "",
      site_code: "",
      show_in_sales: false,
      show_in_appt: false,
      show_in_trmt: false,
      emp_discount: "15",
      work_schedule: "1110111",
    },
    imageArray: [],
    jobOption: [],
    shiftOptions: [],
    locationOption: [],
    levelList: [],
  };

  componentWillMount() {
    this.validator = new SimpleReactValidator({
      validators: {
        contactNumber: {
          message: "The :attribute must be a valid format.",
          rule: (val, params, validator) => {
            return (
              validator.helpers.testRegex(
                val,
                /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
              ) && params.indexOf(val) === -1
            );
          },
          messageReplace: (message, params) =>
            message.replace("", this.helpers.toSentence(params)),
          required: true,
        },
      },
      element: (message) => (
        <span className="error-message text-danger validNo fs14">
          {message}
        </span>
      ),
      autoForceUpdate: this,
    });

    // branch option api
    this.props.getCommonApi("branchlist/").then((res) => {
      let { locationOption } = this.state;
      for (let key of res.data) {
        locationOption.push({ value: key.id, label: key.itemsite_desc });
      }
      this.setState({ locationOption });
    });

    // level option api
    this.props.getCommonApi("securities/").then((res) => {
      let { levelList } = this.state;
      for (let key of res.data) {
        levelList.push({ value: key.id, label: key.level_name });
      }
      this.setState({ levelList });
    });

    // jobtitle option api
    this.props.getJobtitle().then(() => {
      this.getDatafromStore("jobtitle");
    });

    // branch api
    this.props.getBranch().then(() => {
      this.getDatafromStore("sites");
    });

    // get api for staff while
    if (this.props.match.params.id) {
      this.getStaffDetail();
    }
  }

  // get api for staff
  getStaffDetail = async () => {
    let { selectedSkills, formFields } = this.state;
    await this.props.getStaff(`${this.props.match.params.id}/`).then((res) => {
      this.setDataFromStore();
    });
    await this.props
      .getShift(`?employee=${this.props.match.params.id}`)
      .then(() => {
        this.getDatafromStore("shift");
        let { skillsList } = this.props;
        // for (let key of skillsList) {
        //     for (let value of formFields.skills_list) {
        //         if (key.id === value) {
        //             selectedSkills.push({ value: key.value, label: key.label })
        //         }
        //     }
        // }
      });
    this.setState({ selectedSkills });
  };

  // set dropdown data from response
  getDatafromStore = async (type) => {
    let { branchList, jobtitleList, shiftList, skillsList } = this.props;
    let { jobOption, shiftOptions, locationOption, skillsOptions } = this.state;
    if (type === "jobtitle") {
      for (let key of jobtitleList) {
        jobOption.push({ label: key.level_desc, value: key.id });
      }
    } else if (type === "branch") {
      for (let key of branchList) {
        locationOption.push({ label: key.itemsite_desc, value: key.id });
      }
    } else if (type === "shift") {
      for (let key of shiftList) {
        shiftOptions.push({ label: key.shift_name, value: key.id });
      }
    } else if (type === "skills") {
      for (let key of skillsList) {
        skillsOptions.push({ value: key.id, label: key.item_desc });
      }
    }
    await this.setState({
      locationOption,
      jobOption,
      shiftOptions,
      skillsOptions,
    });
  };

  // set data to formfield from response while edit
  setDataFromStore = () => {
    let { staffDetail } = this.props;
    let { formFields } = this.state;
    // console.log("ufjdfjssd staff", staffDetail, formFields)
    formFields["emp_name"] = staffDetail.emp_name;
    formFields["emp_joindate"] = new Date(staffDetail.emp_joindate);
    formFields["defaultSiteCodeid"] = staffDetail.defaultSiteCodeid;
    formFields["shift"] = staffDetail.shift;
    formFields["emp_dob"] = new Date(staffDetail.emp_dob);
    formFields["EMP_TYPEid"] = staffDetail.EMP_TYPEid;
    formFields["emp_pic"] = staffDetail.emp_pic;
    this.setState({ formFields });
  };

  handleChange = ({ target: { value, name } }) => {
    let formFields = Object.assign({}, this.state.formFields);

    formFields[name] = value;

    this.setState({
      formFields,
    });
  };

  handleDatePick = async (name, value) => {
    console.log(name, value, "sdfgdfhfshg", dateFormat(new Date()));
    // dateFormat(new Date())
    let { formFields } = this.state;
    formFields[name] = value;
    // formFields[name] = value;
    await this.setState({
      formFields,
    });
  };

  handleInput = ({ target: { name, value } }) => {
    let formFields = Object.assign({}, this.state.formFields);
    formFields[name] = value === true ? 1 : value;
    this.setState({
      formFields,
    });
  };

  // upload imag to formfield
  handleImageUpload = (file) => {
    let { formFields } = this.state;
    formFields["emp_pic"] = file;
    this.setState({
      formFields,
    });
  };

  // remove image to formfield
  removepostImage = (e, name) => {
    let { staffImage } = this.state.formFields;
    let index = staffImage.indexOf(name);
    if (index === 0) {
      staffImage.shift();
    } else {
      staffImage.pop();
    }
    this.setState({
      staffImage,
    });
  };

  // submit to create/update staff
  handleSubmit = () => {
    if (this.validator.allValid()) {
      let { formFields } = this.state;
      const formData = new FormData();
      formData.append("emp_name", formFields.emp_name);
      formData.append("emp_phone1", formFields.emp_phone1);
      formData.append("emp_joindate", dateFormat(formFields.emp_joindate));
      // if (formFields.defaultSiteCodeid === "") {
      formData.append("defaultSiteCodeid", formFields.defaultSiteCodeid);
      // }
      formData.append("EMP_TYPEid", formFields.EMP_TYPEid);
      formData.append("active", formFields.active);
      formData.append("pw_password", formFields.pw_password);
      formData.append("emp_pic", formFields.emp_pic);
      if (this.props.match.params.id) {
        this.props
          .updateStaff(`${this.props.match.params.id}/`, formData)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.props.history.push(
                `/admin/staff/${res.data.id}/staffDetails`
              );
            }
          });
      } else {
        this.props.createStaff(formData).then((res) => {
          console.log(res);
          if (res.status === 201) {
            this.props.history.push(`/admin/staff`);
          }
        });
      }
    } else {
      this.validator.showMessages();
    }
  };

  handleChangeBox = (event) => {
    let formFields = Object.assign({}, this.state.formFields);
    console.log(formFields, "oyokkjk", event.target.name, event.target);
    formFields[event.target.name] = event.target.checked;

    this.setState({
      formFields,
    });
  };

  render() {
    let {
      formFields,
      jobOption,
      shiftOptions,
      locationOption,
      sexOption,
      skillsOptions,
      selectedSkills,
      levelList,
    } = this.state;

    let {
      emp_name,
      nric,
      username,
      is_login,
      EMP_TYPEid,
      emp_joindate,
      emp_pic,
      active,
      pw_password,
      emp_level,
      show_in_sales,
      show_in_appt,
      show_in_trmt,
      site_code,
      emp_discount,
      work_schedule,
    } = formFields;
    return (
      <div className="px-5 container create-staff">
        {/* <p className="list-heading pb-4"> {id ? "Edit" : "Add"} Staff</p> */}
        <div className="head-label-nav">
          <p className="category">StaffPlus</p>
          <i className="icon-right mx-md-3"></i>
          <p className="sub-category">
            {this.props.match.params.id ? "Edit" : "New"} Staff
          </p>
        </div>
        <div className="staff-detail">
          <div className="form-group mb-4 pb-2">
            <div className="row">
              <div className="col-6">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Upload Staff Photo
                </label>
                <div className="col-md-12 p-0">
                  <DragFileUpload
                    className={`file-uploader size-sm ${
                      emp_pic ? "" : "no-img"
                    }`}
                    label="Upload Thumbnail"
                    handleFileUpload={this.handleImageUpload}
                  >
                    {emp_pic ? (
                      <>
                        {console.log(typeof emp_pic, "kjusytdifshwosdhfs")}
                        {typeof emp_pic == "string" ? (
                          <img src={emp_pic} alt="" />
                        ) : (
                          <img src={displayImg(emp_pic)} alt="" />
                        )}
                      </>
                    ) : (
                      <div className="uploader-content text-center">
                        <span>Upload Image</span>
                      </div>
                    )}
                  </DragFileUpload>
                </div>
              </div>
              {this.props.match.params.id ? (
                <div className="col-6">
                  <Link
                    to={
                      "/admin/staffplus/" +
                      this.props.match.params.id +
                      "/empinfo"
                    }
                  >
                    <NormalButton
                      label="Emp Info"
                      outline={true}
                      className="mr-2 col-12"
                    />
                  </Link>
                </div>
              ) : null}
              <div className="col-12 pb-4 pt-4">
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChangeBox}
                      checked={active}
                      name="active"
                    />{" "}
                    Active
                  </Label>
                </FormGroup>
              </div>

              <div className="col-12 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Employee Name
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={emp_name}
                    name="emp_name"
                    onChange={this.handleChange}
                  />
                </div>
                {this.validator.message("staff name", emp_name, "required")}
              </div>
              <div className="col-12 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  NRIC/WP
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={nric}
                    name="nric"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-12 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Username
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={username}
                    name="username"
                    onChange={this.handleChange}
                  />
                </div>
                {this.validator.message("username", username, "required")}
              </div>
              <div className="col-6 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Employee Type
                </label>
                <div className="input-group">
                  <NormalSelect
                    options={jobOption}
                    value={EMP_TYPEid}
                    name="EMP_TYPEid"
                    onChange={this.handleChange}
                  />
                </div>
                {this.validator.message(
                  "employee type",
                  EMP_TYPEid,
                  "required"
                )}
              </div>
              <div className="col-6 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Discount Limit
                </label>
                <div className="input-group">
                  <NormalInput
                    type="number"
                    placeholder="Enter here"
                    value={emp_discount}
                    name="emp_discount"
                    onChange={this.handleChange}
                  />
                </div>
                {this.validator.message(
                  "discount limit",
                  emp_discount,
                  "required"
                )}
              </div>
              <div className="col-6 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Join Date
                </label>
                <div className="input-group">
                  <NormalDateTime
                    onChange={this.handleDatePick}
                    inputcol="p-0 inTime"
                    value={emp_joindate}
                    name="emp_joindate"
                    className="dob-pick"
                    showYearDropdown={true}
                    dateFormat="MM/dd/yyyy"
                  />
                </div>
                {this.validator.message(
                  "date of birth",
                  emp_joindate,
                  "required"
                )}
              </div>
              <div className="col-6 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Site List
                </label>
                <div className="input-group">
                  <NormalSelect
                    options={locationOption}
                    value={site_code}
                    name="site_code"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-12 pb-4 pt-4">
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChangeBox}
                      checked={is_login}
                      name="is_login"
                    />
                    Security AC
                  </Label>
                </FormGroup>
              </div>
              {is_login ? (
                <div>
                  <div className="col-12 mb-4">
                    <label className="text-left text-black common-label-text fs-17 pb-3">
                      Password
                    </label>
                    <div className="input-group">
                      <NormalInput
                        placeholder="Enter here"
                        value={pw_password}
                        name="pw_password"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 mb-4">
                    <label className="text-left text-black common-label-text fs-17 pb-3">
                      Employee Level
                    </label>
                    <div className="input-group">
                      <NormalSelect
                        options={levelList}
                        value={emp_level}
                        name="emp_level"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.validator.message(
                      "employee level",
                      emp_level,
                      "required"
                    )}
                  </div>
                </div>
              ) : null}
              <div className="col-12 mb-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  To Show At
                </label>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChangeBox}
                      checked={show_in_sales}
                      name="show_in_sales"
                    />
                    Sales
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChangeBox}
                      checked={show_in_trmt}
                      name="show_in_trmt"
                    />
                    Treatment
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChangeBox}
                      checked={show_in_appt}
                      name="show_in_appt"
                    />
                    Appointment
                  </Label>
                </FormGroup>
              </div>
            </div>

            <div className="form-group mb-4 pb-2">
              <div className="row">
                <div className="col-12">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                      Work Schedule
                    </label>
                  <ScheduleTable
                    data={work_schedule}
                    onChange={(data) => {
                      let { formFields } = this.state;
                      formFields["work_schedule"] = data;
                      this.setState({
                        formFields,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="pt-5 d-flex justify-content-center">
              <div className="col-2">
                <Link to="/admin/staffplus">
                  <NormalButton
                    label="Cancel"
                    danger={true}
                    className="mr-2 col-12"
                  />
                </Link>
              </div>
              <div className="col-2">
                <NormalButton
                  onClick={() => this.handleSubmit()}
                  label="Save"
                  success={true}
                  className="mr-2 col-12"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  branchList: state.common.branchList,
  jobtitleList: state.common.jobtitleList,
  shiftList: state.common.shiftList,
  staffDetail: state.staff.staffDetail,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createStaff,
      getBranch,
      getJobtitle,
      getShift,
      getStaff,
      updateStaff,
      getCommonApi,
    },
    dispatch
  );
};

export const AddStaffPlus = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStaffClass);
