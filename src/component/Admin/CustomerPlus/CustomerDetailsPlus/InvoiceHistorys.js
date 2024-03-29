import React, { Component } from "react";
import "./style.scss";
import Modal from "assets/images/modal-avatar.png";
import filter from "assets/images/filter.png";

import { history } from "helpers";

import { NormalButton, InputSearch } from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCustomer } from "redux/actions/customer";

import { InvoiceHistory } from "./InvoiceHistory";
import { withTranslation } from "react-i18next";

export class InvoiceHistoryPlusClass extends Component {
  state = {
    activeTab: "1",
    isOpenTreatmentDone: false,
    formFields: {
      auto: false,
      totalOutstanding: "",
      outstanding: "",
    },
    isActiveTab: "detail",
  };

  componentWillMount() {
    this.getCustomer();
  }

  getCustomer = () => {
    this.props.getCustomer(this.props.match.params.id).then((res) => {
      console.log(res, "asdasdfasdfasdf resssssss");
    });
  };

  handleChange = ({ target: { value, name } }) => {
    let formFields = Object.assign({}, this.state.formFields);
    console.log(value, name, "ghfhgfhjfkhjg");
    formFields[name] = value;

    this.setState({
      formFields,
    });
  };

  render() {
    let { customerDetail = {}, t } = this.props;
    console.log(customerDetail, "asdasdfasdfasdf === sdfasdfagf");
    let { id, cust_name } = customerDetail;
    let { isOpenTreatmentDone, formFields, isActiveTab } = this.state;
    return (
      <div className="view-detail container-fluid">
        <div className="row pb-md-4">
          <div className="col-md-6 head-label-nav">
            <p
              className="category"
              onClick={() => history.push("/admin/customerplus")}
            >
              {t("Customer")}
            </p>
            <i className="icon-right mx-md-3"></i>
            <p className="sub-category">{t("Customer Details")}</p>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-between">
              <div className="input-container">
                <InputSearch
                  className=""
                  placeholder="Search Customer"
                  onChange={this.handleChange}
                />
              </div>

              <div className="w-100 col-4 mx-2 p-0">
                <NormalButton
                  mainbg={true}
                  className="col-12 fs-15 float-right"
                  label="Add Customer"
                  onClick={() =>
                    this.props.history.push("/admin/customerplus/add")
                  }
                />
              </div>
              <div className="bg-white ">
                {/* <i className="icon-filter"></i> */}
                <img src={filter} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="view-detail-box p-4 d-flex flex-column">
          <div className="d-flex pb-3">
            <div className="col-4 d-flex align-items-center">
              <div>
                <img className="modal-avatar" src={Modal} alt="" />
              </div>
              <div className="pl-3">
                <p className="fs-28 fw-500 customer-detail-heading py-2">
                  {cust_name}
                </p>
              </div>
            </div>
            <div className="col-6 icon-change menu-list">
              <button
                className={`btn outline-btn col-2 mx-2 fs-14 float-left text-capitalize detail`}
                onClick={() =>
                  history.push(
                    `/admin/customerplus/${this.props.match.params.id}/details`
                  )
                }
              >
                {t("Detail")}
              </button>
              <button
                className={`btn outline-btn col-2 mx-2 fs-14 float-left text-capitalize account`}
                onClick={() =>
                  history.push(
                    `/admin/customerplus/${this.props.match.params.id}/account`
                  )
                }
              >
                {t("Account")}
              </button>
              <button
                className={`btn outline-btn col-2 mx-2 fs-14 float-left text-capitalize hold`}
                onClick={() =>
                  history.push(
                    `/admin/customerplus/${this.props.match.params.id}/hold`
                  )
                }
              >
                {t("Hold")}
              </button>
              <button
                className={`btn outline-btn col-3 mx-2 fs-14 active float-left text-capitalize hold`}
                onClick={() =>
                  history.push(
                    `/admin/customerplus/${this.props.match.params.id}/invoice`
                  )
                }
              >
                {t("Invoice History")}
              </button>
            </div>
            <div className="col-2 icon-change edit">
              <button
                className="btn outline-btn col-2 mx-2 fs-15 float-right text-capitalize"
                onClick={() =>
                  this.props.history.push(
                    `/admin/customerplus/${this.props.match.params.id}/editCustomer`
                  )
                }
              >
                <span className="icon-edit mr-2"></span>
                {t("Edit")}
              </button>
            </div>
          </div>
          <InvoiceHistory id={this.props.match.params.id}></InvoiceHistory>
        </div>
      </div>
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

export const InvoiceHistoryPlus = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(InvoiceHistoryPlusClass)
);
