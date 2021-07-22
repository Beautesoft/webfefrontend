import React, { Component } from "react";
import { getCustomer } from "redux/actions/customer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";

export class PersonalDetailsClass extends Component {
  state = {};

  componentDidMount() {}

  render() {
    let { customerDetail = {} } = this.props;
    console.log(customerDetail, "asdasdfasdfasdf === sdfasdfagf");
    let {
      id,
      cust_name,
      cust_address,
      last_visit,
      upcoming_appointments,
      cust_dob,
      cust_phone2,
      Cust_sexesid,
      cust_email,
    } = customerDetail;
    let { t } = this.props;
    return (
      <>
        <div className="customer-details">
          <div className="row pt-5">
            <div className="col-3">
              <p className="customer-detail-desc pb-4">{t("Contact Number")}</p>
              {t("")}
            </div>
            <div className="col-9">
              <p className="customer-detail-text pb-4">{cust_phone2}</p>
              {t("")}
            </div>
            <div className="col-3">
              <p className="customer-detail-desc pb-4">{t("Email Address")}</p>
              {t("")}
            </div>
            <div className="col-9">
              <p className="customer-detail-text pb-4">{cust_email}</p>
              {t("")}
            </div>
            <div className="col-3">
              <p className="customer-detail-desc pb-4">{t("Address")}</p>
              {t("")}
            </div>
            <div className="col-9">
              <p className="customer-detail-text pb-4">{cust_address}</p>
              {t("")}
            </div>
            <div className="col-3">
              <p className="customer-detail-desc pb-4">{t("Gender")}</p>
              {t("")}
            </div>
            <div className="col-9">
              <p className="customer-detail-text pb-4">
                {Cust_sexesid === 1 ? "Male" : "Female"}
              </p>
              {t("")}
            </div>

            <div className="col-3">
              <p className="customer-detail-desc pb-4">{t("DOB")}</p>
              {t("")}
            </div>
            <div className="col-9">
              <p className="customer-detail-text pb-4">{cust_dob}</p>
              {t("")}
            </div>
            {t("")}
          </div>
          {t("")}
        </div>
        {t("")}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  customerDetail: state.customer.customerDetail,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCustomer,
    },
    dispatch
  );
};

export const PersonalDetails = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(PersonalDetailsClass)
);
