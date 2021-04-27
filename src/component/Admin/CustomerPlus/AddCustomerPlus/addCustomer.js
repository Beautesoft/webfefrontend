import React, { Component } from "react";
import "./style.scss";
import SimpleReactValidator from "simple-react-validator";
import {
  NormalInput,
  NormalSelect,
  NormalDate,
  NormalButton,
  NormalDateTime,
} from "component/common";
import { Link } from "react-router-dom";
import { dateFormat } from "service/helperFunctions";
import { FormGroup, Label, Input } from "reactstrap";

export class AddCustomerForm extends Component {
  state = {
    formFields: {},
    namePrefix: [
      { value: "Mr", label: "Mr" },
      { value: "Mrs", label: "Mrs" },
      { value: "Miss", label: "Miss" },
      { value: "Master", label: "Master" },
    ],
    selectedNamePrefix: "Mr",
  };

  componentWillMount() {
    this.validator = new SimpleReactValidator({
      validators: {},
      element: (message) => (
        <span className="error-message text-danger validNo fs14">
          {message}
        </span>
      ),
      autoForceUpdate: this,
    });
  }

  handleSubmit = (event) => {
    // console.log("====", event, "sdfasdfasdf")
    // this.props.handleSubmit(event)
    if (this.validator.allValid()) {
      this.props.handleSubmit(event);
    } else {
      this.validator.showMessages();
    }
  };

  render() {
    let {
      formFields,
      sexOption,
      handleCancel,
      handleDatePick,
      salonList,
    } = this.props;
    let { namePrefix, selectedNamePrefix } = this.state;
    let {
      cust_name,
      cust_address,
      cust_phone2,
      cust_email,
      cust_dob,
      Cust_sexesid,
      Site_Codeid,
    } = formFields;
    return (
      <div className="form-group mb-4 pb-2">
        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            Join Date
          </label>
          <div className="input-group py-3">
            {/* <NormalDate
                            value={cust_dob}
                            name="cust_dob"
                            type="date"
                            onChange={this.props.handleChange}
                        /> */}
            <NormalDateTime
              onChange={handleDatePick}
              inputcol="p-0 inTime"
              // value={outTime}
              value={cust_dob ? new Date(cust_dob) : new Date()}
              // label="inTime"
              name="cust_dob"
              className="dob-pick"
              showYearDropdown={true}
              dateFormat="MM/dd/yyyy"
            />
            {/* <span className="icon-calendar icon font-lg icon"></span> */}
          </div>
          {this.validator.message("Date Of Birth", cust_dob, "required")}
        </div>
        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            Customer Name
          </label>
          <div className="input-group">
            <div className="col-2 p-0">
              <NormalSelect
                // placeholder="Enter here"
                options={namePrefix}
                value={selectedNamePrefix}
                name="Site_Codeid"
                onChange={this.props.handleChange}
              />
            </div>
            <div className="col-6">
              <NormalInput
                placeholder="Enter here"
                value={cust_name}
                name="cust_name"
                onChange={this.props.handleChange}
              />
            </div>
          </div>
          {this.validator.message("Name", cust_name, "required|max:50")}
        </div>
        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            Customer Class
          </label>
          <div className="input-group">
            <NormalSelect
              placeholder="Enter here"
              name="cust_email"
              onChange={this.props.handleChange}
            />
          </div>
          {this.validator.message("Customer Class", cust_address, "required")}
        </div>

        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            Referance Code
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cust_address}
              name="cust_address"
              onChange={this.props.handleChange}
            />
          </div>
        </div>

        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            NRIC
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cust_phone2}
              name="cust_phone2"
              onChange={this.props.handleChange}
            />
          </div>
          {this.validator.message("NRIC", cust_phone2, "required")}
        </div>
        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            Mobile Number
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cust_phone2}
              name="cust_phone2"
              onChange={this.props.handleChange}
            />
          </div>
          {this.validator.message("Mobile Number", cust_phone2, "required")}
        </div>

        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            Email Address
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cust_phone2}
              name="cust_phone2"
              onChange={this.props.handleChange}
            />
          </div>
          {this.validator.message("Email Address", cust_phone2, "required")}
        </div>
        
        <div className="pt-5 d-flex justify-content-center">
          <div className="col-3">
            <NormalButton
              onClick={handleCancel}
              label="CANCEL"
              danger={true}
              className="mr-2 col-12"
            />
          </div>
          <div className="col-3">
            <NormalButton
              onClick={() => this.handleSubmit()}
              label="SAVE"
              success={true}
              className="mr-2 col-12"
            />
          </div>
          <div className="col-3">
            <NormalButton
              onClick={() => this.handleSubmit("catalog")}
              label="SAVE & CATALOG"
              success={true}
              className="mr-2 col-12"
            />
          </div>
        </div>
      </div>
    );
  }
}
