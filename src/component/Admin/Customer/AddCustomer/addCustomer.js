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
import { withTranslation } from "react-i18next";

class AddCustomerFormClass extends Component {
  state = {
    formFields: {},
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
      sourceList,
      stateList,
      countryList,
      languageList,
      t,
    } = this.props;

    let {
      cust_name,
      cust_address,
      cust_phone2,
      cust_email,
      cust_dob,
      Cust_sexesid,
      Site_Codeid,
      cust_state,
      cust_country,
      cust_postcode,
      cust_nric,
      cust_language,
      cust_source,
      emergencycontact,
      cardno1,
      cardno2,
      cardno3,
      cardno4,
      cardno5,
    } = formFields;
    return (
      <div className="form-group mb-4 pb-2">
        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("Customer Name")}
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cust_name}
              name="cust_name"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {this.validator.message("Name", cust_name, "required|max:50")}
        </div>
        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("Handphone")} (e.g 012-XXXXXXX)
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cust_phone2}
              name="cust_phone2"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {this.validator.message("Phone", cust_phone2, "required")}
        </div>

        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("IC")}
          </label>

          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cust_nric}
              name="cust_nric"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {this.validator.message("NRIC", cust_nric, "required")}
        </div>

        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("Address")}
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cust_address}
              name="cust_address"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {this.validator.message("Address", cust_address, "required")}
        </div>
        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("Post Code")}
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cust_postcode}
              name="cust_postcode"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {this.validator.message("postcode", cust_postcode, "required")}
        </div>
        <div className="gender mt-3">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("State")}
          </label>
          <div className="input-group">
            <NormalSelect
              // placeholder="Enter here"
              options={stateList}
              value={cust_state}
              name="cust_state"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {this.validator.message("State", cust_state, "required")}
        </div>
        <div className="gender mt-3">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("Country")}
          </label>
          <div className="input-group">
            <NormalSelect
              // placeholder="Enter here"
              options={countryList}
              value={cust_country}
              name="cust_country"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {this.validator.message("Country", cust_country, "required")}
        </div>

        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("Email Address")}
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cust_email}
              name="cust_email"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {t("")}
        </div>
        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("Emergency Contact")}
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={emergencycontact}
              name="emergencycontact"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {t("")}
        </div>
        <div className="gender mt-3">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("Preferred Language")}
          </label>
          <div className="input-group">
            <NormalSelect
              // placeholder="Enter here"
              options={languageList}
              value={cust_language}
              name="cust_language"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {this.validator.message("Language", cust_language, "required")}
        </div>

        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("DOB")}
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
            {/* <span className="icon-calendar icon font-lg icon">{t("")}</span> */}
          </div>
          {this.validator.message("Date Of Birth", cust_dob, "required")}
        </div>

        <div className="gender mt-3">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("Source")}
          </label>
          <div className="input-group">
            <NormalSelect
              // placeholder="Enter here"
              options={sourceList}
              value={cust_source}
              name="cust_source"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {this.validator.message("cust_source", cust_source, "required")}
        </div>

        <div className="gender">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("Gender")}
          </label>
          <div className="input-group">
            <NormalSelect
              // placeholder="Enter here"
              options={sexOption}
              value={Cust_sexesid}
              name="Cust_sexesid"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {this.validator.message("Gender", Cust_sexesid, "required")}
        </div>

        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("CardNo1")}
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cardno1}
              name="cardno1"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {t("")}
        </div>
        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("CardNo2")}
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cardno2}
              name="cardno2"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {t("")}
        </div>
        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("cardNo3")}
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cardno3}
              name="cardno3"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {t("")}
        </div>
        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("cardNo4")}
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cardno4}
              name="cardno4"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {t("")}
        </div>
        <div className="pb-md-4">
          <label className="text-left text-black common-label-text fs-17 pb-2">
            {t("cardNo5")}
          </label>
          <div className="input-group">
            <NormalInput
              placeholder="Enter here"
              value={cardno5}
              name="cardno5"
              onChange={this.props.handleChange}
            />
            {t("")}
          </div>
          {t("")}
        </div>
        <div className="gender mt-3">
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                onChange={this.props.handleChangeBox}
                name="custallowsendsms"
              />
              {t("Send SMS")}
            </Label>
            {t("")}
          </FormGroup>
          {t("")}
        </div>
        <div className="gender mt-3">
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                onChange={this.props.handleChangeBox}
                name="cust_maillist"
              />
              {t("Send Mail")}
            </Label>
            {t("")}
          </FormGroup>
          {t("")}
        </div>

        {/* <div className="form-group mb-4 pb-3">
                    <div className="input-group">
                        <NormalSelect
                            // placeholder="Enter here"
                            options={salonList}
                            value={Site_Codeid}
                            name="Site_Codeid"
                            onChange={this.handleChange}
                        />
                    {t("")}</div>
                    {this.validator.message('salon', Site_Codeid, 'required|string')}
                </div> */}
        <div className="border-bottom-line mt-5">{t("")}</div>
        <div className="pt-5 d-flex justify-content-center">
          <div className="col-3">
            <NormalButton
              onClick={handleCancel}
              label="CANCEL"
              danger={true}
              className="mr-2 col-12"
            />
            {t("")}
          </div>
          <div className="col-3">
            <NormalButton
              onClick={() => this.handleSubmit()}
              label="SAVE"
              success={true}
              className="mr-2 col-12"
            />
            {t("")}
          </div>
          <div className="col-3">
            <NormalButton
              onClick={() => this.handleSubmit("catalog")}
              label="SAVE & CATALOG"
              success={true}
              className="mr-2 col-12"
            />
            {t("")}
          </div>
          {t("")}
        </div>
        {t("")}
      </div>
    );
  }
}
export const AddCustomerForm = withTranslation()(AddCustomerFormClass);
