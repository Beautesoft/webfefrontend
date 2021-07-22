import React, { Component } from "react";
import {
  NormalInput,
  NormalTextarea,
  NormalButton,
  NormalSelect,
  NormalDate,
} from "component/common";
import { withTranslation } from "react-i18next";

class MakePaymentClass extends Component {
  state = {
    formFields: {
      name: "",
      contact: "",
      address: "",
      searchStaff: "",
    },
  };
  handleChange = ({ target: { value, name } }) => {
    let formFields = Object.assign({}, this.state.formFields);

    formFields[name] = value;

    this.setState({
      formFields,
    });
  };
  render() {
    let { formFields } = this.state;
    let { name, contact, address, searchStaff } = formFields;
    let { t } = this.props;
    return (
      <>
        <div className="make-payment-section mb-4">
          <div className="row">
            <div className="col-5">
              <h4>{t("Enter Customer Details")}</h4>
              <div className="pb-4">
                <label className="text-left text-black common-label-text fs-17 ">
                  {t("Name")}
                </label>
                <div className="input-group">
                  <NormalInput
                    value={name}
                    name="name"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="pb-4">
                <label className="text-left text-black common-label-text fs-17 ">
                  {t("Address")}
                </label>
                <div className="input-group">
                  <NormalTextarea
                    value={address}
                    name="address"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="pb-4">
                <label className="text-left text-black common-label-text fs-17 ">
                  {t("Phone Number")}
                </label>
                <div className="input-group">
                  <NormalInput
                    value={contact}
                    name="contact"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="d-flex pb-4">
                <label className="text-left text-black common-label-text fs-17 ">
                  {t("D.O.B")}
                </label>
                <p className="pl-5">{t("dd.mm.yyyy")}</p>
              </div>
              <div className="d-flex pb-4">
                <label className="text-left text-black common-label-text fs-17 ">
                  {t("Gender")}
                </label>
                <p className="pl-5">{t("male/female")}</p>
              </div>
            </div>
            <div className="col-5">
              <h4>{t("Enter Staff Details")}</h4>
              <div className="pb-4">
                <label className="text-left text-black common-label-text fs-17 "></label>
                <div className="input-group">
                  <NormalSelect
                    placeholder="Search Staff..."
                    // options={treatmentOption}
                    value={searchStaff}
                    name="searchStaff"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <button>{t("Add Another Staff")}</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export const MakePayment = withTranslation()(MakePaymentClass);
