import React, { Component } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import {
  NormalInput,
  NormalSelect,
  NormalButton,
  NormalTextarea
} from "component/common";
import { displayImg, dateFormat } from "service/helperFunctions";
import { DragFileUpload } from "../../../common";
import { createStaff, getStaff, updateStaff } from "redux/actions/staff";
import {
  getBranch,
  getJobtitle,
  getShift,
  getSkills,
  getCommonApi,
} from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormGroup, Label, Input } from "reactstrap";

export class EmployeeInfoClass extends Component {
  state = {
    formFields: {
      emp_name: "",
      emp_phone1: "",
      emp_joindate: "",
      defaultSiteCodeid: "",
      skills_list: "",
      emp_address: "",
      Emp_sexesid: "",
      shift: [],
      emp_dob: "",
      EMP_TYPEid: "",
      emp_pic: "",
      is_login: false,
      pw_password: "",
      LEVEL_ItmIDid: "",
      emp_email: "",
      NRIC: "",
      username: "",
      race: "",
      nationality: "",
      country: "",
      maritial_status: "",
      religion: "",
      emer_person: "",
      emer_phone: "",
      remarks: "",
    },
    imageArray: [],
    jobOption: [],
    shiftOptions: [],
    locationOption: [],
    sexOption: [
      { value: 1, label: "Male" },
      { value: 2, label: "Female" },
    ],
    skillsOptions: [],
    selectedSkills: [],
    levelList: [],
    raceList: [],
    nationalityList: [],
    maritialStatusList: [],
    religionList: [],
    countryList: [],
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

    // get api for staff while
    if (this.props.match.params.id) {
      this.getStaffDetail();
    }

    // skills option api
    this.props.getSkills().then(() => {
      this.getDatafromStore("skills");
    });
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
        this.getDefaultSkills();
      });
    this.setState({ selectedSkills });
  };

  getDefaultSkills = () => {
    let { selectedSkills, formFields, skillsOptions } = this.state;
    selectedSkills = [];
    for (let value of formFields.skills_list) {
      console.log(selectedSkills, "dfssfgsdfgsdfg", value, skillsOptions);
      for (let key of skillsOptions) {
        if (key.value === value) {
          console.log(selectedSkills, "dfssfgsdfgsdfg =========", key, value);
          selectedSkills.push({ value: key.value, label: key.label });
        }
      }
    }
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
    this.getDefaultSkills();
  };

  // set data to formfield from response while edit
  setDataFromStore = () => {
    let { staffDetail } = this.props;
    let { formFields } = this.state;
    // console.log("ufjdfjssd staff", staffDetail, formFields)
    formFields["emp_name"] = staffDetail.emp_name;
    formFields["emp_phone1"] = staffDetail.emp_phone1;
    formFields["emp_joindate"] = new Date(staffDetail.emp_joindate);
    formFields["defaultSiteCodeid"] = staffDetail.defaultSiteCodeid;
    formFields["skills_list"] = staffDetail.skills;
    formFields["emp_address"] = staffDetail.emp_address;
    formFields["Emp_sexesid"] = staffDetail.Emp_sexesid;
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
      formData.append("skills_list", formFields.skills_list);
      formData.append("emp_address", formFields.emp_address);
      formData.append("Emp_sexesid", formFields.Emp_sexesid);
      // formData.append('shift', formFields.shift)
      formData.append("emp_dob", dateFormat(formFields.emp_dob));
      formData.append("EMP_TYPEid", formFields.EMP_TYPEid);
      formData.append("is_login", formFields.is_login);
      formData.append("pw_password", formFields.pw_password);
      formData.append("LEVEL_ItmIDid", formFields.LEVEL_ItmIDid);
      formData.append("emp_pic", formFields.emp_pic);
      formData.append("emp_email", formFields.emp_email);
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

  handleMultiSelect = (data) => {
    let { formFields } = this.state;
    let list = [];
    for (let key of data) {
      list.push(key.value);
    }
    formFields["skills_list"] = list;
    this.setState({ formFields });
    console.log(formFields, "oyokkjk");
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
      raceList,
      nationalityList,
      maritialStatusList,
      religionList,
      countryList,
    } = this.state;

    let {
      emp_name,
      NRIC,
      username,
      emp_phone1,
      emp_address,
      Emp_sexesid,
      race,
      nationality,
      country,
      maritial_status,
      religion,
      emer_person,
      emer_phone,
      remarks,
    } = formFields;
    return (
      <div className="px-5 container create-staff">
        {/* <p className="list-heading pb-4"> {id ? "Edit" : "Add"} Staff</p> */}
        <div className="head-label-nav">
          <p className="category">StaffPlus </p>
          <i className="icon-right mx-md-3"></i>
          <p className="sub-category">
            {this.props.match.params.id ? "Edit" : "New"} Employee Information
          </p>
        </div>
        <div className="staff-detail">
          <div className="form-group mb-4 pb-2">
            <div className="row">
              <div className="col-md-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Name
                </label>
              </div>
              <div className="col-md-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  :
                </label>
              </div>
              <div className="col-md-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  {emp_name}
                </label>
              </div>
              <div className="col-md-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  NRIC / WP
                </label>
              </div>
              <div className="col-md-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  :
                </label>
              </div>
              <div className="col-md-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  {NRIC}
                </label>
              </div>
              <div className="col-md-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Username
                </label>
              </div>
              <div className="col-md-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  :
                </label>
              </div>
              <div className="col-md-4">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  {username}
                </label>
              </div>
            </div>
          </div>
          <div className="form-group mb-4 pb-2">
            <div className="row">
              <div className="col-6">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Phone
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={emp_phone1}
                    name="emp_phone1"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-6">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Address
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={emp_address}
                    name="emp_phone1"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group mb-4 pb-2">
            <div className="row">
              <div className="col-6">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Gender
                </label>
                <div className="input-group">
                  <NormalSelect
                    // placeholder="Enter here"
                    options={sexOption}
                    value={Emp_sexesid}
                    name="Emp_sexesid"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-6">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Race
                </label>
                <div className="input-group">
                  <NormalSelect
                    // placeholder="Enter here"
                    options={raceList}
                    value={race}
                    name="race"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group mb-4 pb-2">
            <div className="row">
              <div className="col-6">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Nationality
                </label>
                <div className="input-group">
                  <NormalSelect
                    // placeholder="Enter here"
                    options={nationalityList}
                    value={nationality}
                    name="nationality"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-6">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Marital Status
                </label>
                <div className="input-group">
                  <NormalSelect
                    // placeholder="Enter here"
                    options={maritialStatusList}
                    value={maritial_status}
                    name="maritial_status"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group mb-4 pb-2">
            <div className="row">
              <div className="col-6">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Religion
                </label>
                <div className="input-group">
                  <NormalSelect
                    // placeholder="Enter here"
                    options={religionList}
                    value={religion}
                    name="religion"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-6">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Country
                </label>
                <div className="input-group">
                  <NormalSelect
                    // placeholder="Enter here"
                    options={countryList}
                    value={country}
                    name="country"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group mb-4 pb-2">
            <div className="row">
              <div className="col-6">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Emergency Person
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={emer_person}
                    name="emer_person"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-6">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Emergency Phone
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={emer_phone}
                    name="emer_phone"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group mb-4 pb-2">
            <div className="row">
              <div className="col-12">
                <label className="text-left text-black common-label-text fs-17 pb-3">
                  Remarks
                </label>
                <div className="input-group">
                  <NormalTextarea
                    value={remarks}
                    name="remarks"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-bottom-line"></div>
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
    );
  }
}

const mapStateToProps = (state) => ({
  branchList: state.common.branchList,
  jobtitleList: state.common.jobtitleList,
  shiftList: state.common.shiftList,
  skillsList: state.common.skillsList,
  staffDetail: state.staff.staffDetail,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createStaff,
      getBranch,
      getJobtitle,
      getShift,
      getSkills,
      getStaff,
      updateStaff,
      getCommonApi,
    },
    dispatch
  );
};

export const EmployeeInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeInfoClass);
