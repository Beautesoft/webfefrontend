import React, { Component } from "react";
import "./style.scss";
import { InputSearch } from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { history } from "helpers";
import { getCommonApi, commonCreateApi } from "redux/actions/common";
import Woman from "assets/images/woman.png";
import Box from "assets/images/box.png";
import Coupon from "assets/images/coupon.png";
import Like from "assets/images/like.png";
import Rise from "assets/images/rise.png";
import TotalCollection from "assets/images/TotalCollection.png";
import TreatmentDone from "assets/images/TreatmentDone.png";
import { withTranslation } from "react-i18next";

export class NewQuickStatsClass extends Component {
  state = {
    customer: { daily_custcnt: 0, monthly_custcnt: 0, total_cust: 0 },
    product_sold: {
      dailyproduct_qty: 0,
      monthlyproduct_qty: 0,
      daily_product: "0.00",
      monthly_product: "0.00",
      daily_product_ar: "0.00",
      monthly_product_ar: "0.00",
    },
    service_sold: {
      dailyservice_qty: 0,
      monthlyservice_qty: 0,
      daily_service: "0.00",
      monthly_service: "0.00",
      daily_service_ar: "0.00",
      monthly_service_ar: "0.00",
    },
    voucher_sold: {
      dailyvoucher_qty: 0,
      monthlyvoucher_qty: 0,
      daily_voucher: "0.00",
      monthly_voucher: "0.00",
    },
    prepaid_sold: {
      dailyprepaid_qty: 0,
      monthlyprepaid_qty: 0,
      daily_prepaid: "0.00",
      monthly_prepaid: "0.00",
      daily_prepaid_ar: "0.00",
      monthly_prepaid_ar: "0.00",
    },
    treatment_done: {
      daily_tdqty: 0,
      monthly_tdqty: 0,
      daily_tdamt: "0.00",
      monthly_tdamt: "0.00",
    },
    total_collection: {
      daily_sales: "0.00",
      monthly_sales: "0.00",
      daily_nonsales: "0.00",
      monthly_nonsales: "0.00",
      total_daily: "0.00",
      total_monthly: "0.00",
    },
  };

  componentDidMount() {
    this.getCustomerProductandService();
    this.getVoucherandPrepaid();
    this.getTreatmentandTotal();
  }

  getCustomerProductandService = () => {
    let { customer, product_sold, service_sold } = this.state;
    this.props.getCommonApi(`dashboardcust/`).then((res) => {
      console.log(res, "custdashbordpart");
      customer = res.customer;
      product_sold = res.product_sold;
      service_sold = res.service_sold;
      this.setState({
        customer,
        product_sold,
        service_sold,
      });
    });
  };
  getVoucherandPrepaid = () => {
    let { voucher_sold, prepaid_sold } = this.state;
    this.props.getCommonApi(`dashboardvoucher/`).then((res) => {
      console.log(res, "voucherandprepaid");
      voucher_sold = res.voucher_sold;
      prepaid_sold = res.prepaid_sold;
      this.setState({
        voucher_sold,
        prepaid_sold,
      });
    });
  };
  getTreatmentandTotal = () => {
    let { treatment_done, total_collection } = this.state;
    this.props.getCommonApi(`dashboardtd/`).then((res) => {
      console.log(res, "treatment and total");
      treatment_done = res.treatment_done;
      total_collection = res.total_collection;
      this.setState({
        treatment_done,
        total_collection,
      });
    });
  };
  render() {
    let {
      customer,
      product_sold,
      service_sold,
      voucher_sold,
      prepaid_sold,
      treatment_done,
      total_collection,
    } = this.state;
    let { tokenDetail, t } = this.props;
    return (
      <div className="quickStats">
        <div className="palette">
          <div className="d-flex">
            <div className="color-detail col-md-7">
              <div className="color"></div>
              <div className="detail">{t("Daily value")}</div>
            </div>
            <div className="color-detail col-md-7">
              <div className="color not-available"></div>
              <div className="detail">{t("Monthly value")}</div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          <div className="d-flex flex-wrap justify-content position-relative">
            <div className={`product-card card`}>
              <div className="d-flex justify-content-between px-2 pt-3">
                <p className="customer-label">{customer.total_cust}</p>
              </div>
              <div className="d-flex justify-content-between px-2 title-border">
                <p className="label-title">{`Customers`}</p>
                <div className="cart-img">
                  <img src={Woman} alt="" />
                </div>
              </div>
              <div className="d-flex flex-column justify-content-between px-2 count-label">
                <div>
                  <span>{customer.daily_custcnt} / </span>
                  <span>{customer.monthly_custcnt}</span>
                  <span className="fs-12">{` Qty`}</span>
                </div>
                <p className="label-title">{`New Customers`}</p>
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content position-relative">
            <div className={`product-card card`}>
              <div className="d-flex justify-content-start px-2 count-label">
                <div>
                  <span>{product_sold.dailyproduct_qty} / </span>
                  <span>{product_sold.monthlyproduct_qty}</span>
                  <span className="fs-12">{` Qty`}</span>
                </div>
              </div>
              <div className="d-flex justify-content-between px-2 title-border">
                <p className="label-title">{`Product Sold`}</p>
                <div className="cart-img">
                  <img src={Box} alt="" />
                </div>
              </div>

              <div className="d-flex flex-column justify-content-between px-2 count-label">
                <div>
                  <span>{product_sold.daily_product} / </span>
                  <span>{product_sold.monthly_product}</span>
                </div>
                <p className="label-title">{t("Amount (RM)")}</p>
              </div>
              <div className="d-flex flex-column justify-content-between px-2 count-label">
                <div>
                  <span>{product_sold.daily_product_ar} / </span>
                  <span>{product_sold.monthly_product_ar}</span>
                </div>
                <p className="label-title">{t("AR Amount (RM)")}</p>
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content position-relative">
            <div className={`product-card card`}>
              <div className="d-flex justify-content-start px-2 count-label">
                <div>
                  <span>{voucher_sold.dailyvoucher_qty} / </span>
                  <span>{voucher_sold.monthlyvoucher_qty}</span>
                  <span className="fs-12">{` Qty`}</span>
                </div>
              </div>
              <div className="d-flex justify-content-between px-2 title-border">
                <p className="label-title">{`Voucher Sold`}</p>
                <div className="cart-img">
                  <img src={Coupon} alt="" />
                </div>
              </div>

              <div className="d-flex flex-column justify-content-between px-2 count-label">
                <div>
                  <span>{voucher_sold.daily_voucher} / </span>
                  <span>{voucher_sold.monthly_voucher}</span>
                </div>
                <p className="label-title">{t("Amount (RM)")}</p>
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content position-relative">
            <div className={`product-card card`}>
              <div className="d-flex justify-content-start px-2 count-label">
                <div>
                  <span>{service_sold.dailyservice_qty} / </span>
                  <span>{service_sold.monthlyservice_qty}</span>
                  <span className="fs-12">{` Qty`}</span>
                </div>
              </div>
              <div className="d-flex justify-content-between px-2 title-border">
                <p className="label-title">{`Service Sold`}</p>
                <div className="cart-img">
                  <img src={Like} alt="" />
                </div>
              </div>

              <div className="d-flex flex-column justify-content-between px-2 count-label">
                <div>
                  <span>{service_sold.daily_service} / </span>
                  <span>{service_sold.monthly_service}</span>
                </div>
                <p className="label-title">{t("Amount (RM)")}</p>
              </div>
              <div className="d-flex flex-column justify-content-between px-2 count-label">
                <div>
                  <span>{service_sold.daily_service_ar} / </span>
                  <span>{service_sold.monthly_service_ar}</span>
                </div>
                <p className="label-title">{t("AR Amount (RM)")}</p>
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content position-relative">
            <div className={`product-card card`}>
              <div className="d-flex justify-content-start px-2 count-label">
                <div>
                  <span>{prepaid_sold.dailyprepaid_qty} / </span>
                  <span>{prepaid_sold.monthlyprepaid_qty}</span>
                  <span className="fs-12">{` Qty`}</span>
                </div>
              </div>
              <div className="d-flex justify-content-between px-2 title-border">
                <p className="label-title">{`Prepaid Sold`}</p>
                <div className="cart-img">
                  <img src={Rise} alt="" />
                </div>
              </div>

              <div className="d-flex flex-column justify-content-between px-2 count-label">
                <div>
                  <span>{prepaid_sold.daily_prepaid} / </span>
                  <span>{prepaid_sold.monthly_prepaid}</span>
                </div>
                <p className="label-title">{t("Amount (RM)")}</p>
              </div>
              <div className="d-flex flex-column justify-content-between px-2 count-label">
                <div>
                  <span>{prepaid_sold.daily_prepaid_ar} / </span>
                  <span>{prepaid_sold.monthly_prepaid_ar}</span>
                </div>
                <p className="label-title">{t("AR Amount (RM)")}</p>
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content position-relative">
            <div className={`product-card card`}>
              <div className="d-flex justify-content-start px-2 count-label">
                <div>
                  <span>{treatment_done.daily_tdqty} / </span>
                  <span>{treatment_done.monthly_tdqty}</span>
                  <span className="fs-12">{` Qty`}</span>
                </div>
              </div>
              <div className="d-flex justify-content-between px-2 title-border">
                <p className="label-title">{`Treatment Done`}</p>
                <div className="cart-img">
                  <img src={TreatmentDone} alt="" />
                </div>
              </div>

              <div className="d-flex flex-column justify-content-between px-2 count-label">
                <div>
                  <span>{treatment_done.daily_tdamt} / </span>
                  <span>{treatment_done.monthly_tdamt}</span>
                </div>
                <p className="label-title">{t("Amount (RM)")}</p>
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content position-relative">
            <div className={`product-card card`}>
              <div className="d-flex justify-content-start px-2 count-label">
                <div>
                  <span>{total_collection.total_daily} / </span>
                  <span>{total_collection.total_monthly}</span>
                </div>
              </div>

              <div className="d-flex justify-content-between px-2 title-border">
                <p className="label-title">{`Total Collections`}</p>
                <div className="cart-img">
                  <img src={TotalCollection} alt="" />
                </div>
              </div>

              <div className="d-flex flex-column justify-content-between px-2 count-label">
                <div>
                  <span>{total_collection.daily_sales} / </span>
                  <span>{total_collection.monthly_sales}</span>
                </div>
                <p className="label-title">{t("Sales (RM)")}</p>
              </div>
              <div className="d-flex flex-column justify-content-between px-2 count-label">
                <div>
                  <span>{total_collection.daily_nonsales} / </span>
                  <span>{total_collection.monthly_nonsales}</span>
                </div>
                <p className="label-title">{t("Non Sales (RM)")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  //tokenDetail: state.authStore.tokenDetails,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCommonApi,
      commonCreateApi,
    },
    dispatch
  );
};

export const NewQuickStats = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(NewQuickStatsClass)
);
