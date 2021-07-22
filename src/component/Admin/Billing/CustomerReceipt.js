import React, { Component } from "react";
import { NormalButton, NormalSelect } from "component/common";
import "./style.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { history } from "helpers";
import { getCommonApi, commonCreateApi } from "redux/actions/common";
import { withTranslation } from "react-i18next";
// import logo from 'assets/images/logo.png'

export class CustomerReceiptClass extends Component {
  state = {
    responseData: {},
    downloadlLink: "",
  };

  componentDidMount() {
    this.props
      .getCommonApi(
        `customerreceiptprint/?sa_transacno=${this.props.match.params.id}`
      )
      .then((res) => {
        this.setState({ responseData: res });
      });
    this.handlePrint();
  }

  // for get Print response
  handlePrint = () => {
    this.props
      .getCommonApi(`receiptpdf/?sa_transacno=${this.props.match.params.id}`)
      .then((res) => {
        this.setState({ downloadlLink: res.data });
      });
  };

  // for share reciept
  handleShare = () => {
    this.props
      .commonCreateApi(
        `receiptpdfsend/?sa_transacno=${this.props.match.params.id}`
      )
      .then((res) => {
        this.setState({ responseData: res });
      });
  };

  // for send sms reciept
  handleSendSMS = () => {
    this.props
      .commonCreateApi(
        `receiptpdfsendsms/?sa_transacno=${this.props.match.params.id}`
      )
      .then((res) => {
        this.setState({ responseData: res });
      });
  };

  render() {
    let { responseData = {}, downloadlLink } = this.state;
    let {
      hdr_data = [],
      dtl_data = [],
      sub_data = {},
      taud_data = [],
      footer = {},
      company_hdr = {},
      taud_sub = {},
    } = responseData;
    let { t } = this.props;
    return (
      <>
        <div className="print-section container">
          <div className="print-bill">
            <div className="receipt card">
              <div className="logo-header">
                <div className="row">
                  <div className="col-10">
                    <div className="row">
                      <div className="col-3">
                        <img
                          src={company_hdr ? company_hdr.logo : ""}
                          alt=""
                        ></img>
                      </div>
                      <div className="col-9">
                        <h3 className="bill-head">
                          {company_hdr ? company_hdr.name : ""}
                        </h3>
                        <p className="receipt-detail">
                          {company_hdr ? company_hdr.address : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bill-header">
                <div className="row ">
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3 f-600">{t("Code")}:</div>
                      <div className="col-9">
                        : {hdr_data ? hdr_data.sa_custno : ""}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3  f-600">{t("Name")}:</div>
                      <div className="col-9">
                        : {hdr_data ? hdr_data.sa_custname : ""}
                      </div>
                    </div>
                    {/* <div className="row">
                                            <div className="col-3  f-600">Member:</div>
                                            <div className="col-9">: {hdr_data ? hdr_data.member : ""}</div>
                                        </div> */}
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3  f-600">{t("Trans")}:</div>
                      <div className="col-9">
                        : {hdr_data ? hdr_data.trans : ""}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3  f-600">{t("Date")}:</div>
                      <div className="col-9">
                        : {hdr_data ? hdr_data.sa_date : ""}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3  f-600">{t("Time")}:</div>
                      <div className="col-9">
                        : {hdr_data ? hdr_data.sa_time : ""}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3  f-600">{t("Issued")}</div>
                      <div className="col-9">
                        : {hdr_data ? hdr_data.issued : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bill-detail mt-4 py-1">
                <div className="row m-0 table-header  f-600">
                  <div className="col-1">{t("No")}.</div>
                  <div className="col-3 text-left">{t("Description")}</div>
                  <div className="col-1">{t("Qty")}</div>
                  <div className="col-2">{t("Net price")}</div>
                  <div className="col-1">{t("Paid")}</div>
                  <div className="col-2">{t("Balance")}</div>
                  <div className="col-2">{t("Sold/Service By")}</div>
                </div>
                {dtl_data.length > 0
                  ? dtl_data.map((item, index) => {
                      return (
                        <div className="row m-0 mt-2">
                          <div className="col-1">{index + 1}</div>
                          <div className="col-3 text-left">
                            {item.dt_itemdesc}
                          </div>
                          <div className="col-1">{item.dt_qty}</div>
                          <div className="col-2">{item.dt_transacamt}</div>
                          <div className="col-1">{item.dt_deposit}</div>
                          <div className="col-2">{item.balance}</div>
                          <div className="col-2">{item.staffs}</div>
                        </div>
                      );
                    })
                  : ""}

                <div className="row table-header sub-total m-0 fs-14 f-600 mt-5">
                  {/* <div className="col-4 text-right">{sub_data.sub_total}</div> */}
                  <div className="col-4 text-right"></div>
                  <div className="col-1">{sub_data.tot_qty}</div>
                  <div className="col-2">{sub_data.tot_net}</div>
                  <div className="col-1">{sub_data.tot_paid}</div>
                  <div className="col-2">{sub_data.tot_bal}</div>
                </div>
              </div>
              <div className="payment-detail my-4 fs-14 f-600 mb-5">
                <div className="row m-0">
                  <div className="col-7">
                    <div className="row payment-header">
                      <div className="col-4">{t("No")}</div>
                      <div className="col-4">{t("Type")}</div>
                      <div className="col-4">{t("Amount")}</div>
                    </div>
                    {taud_data.length > 0
                      ? taud_data.map((item, index) => {
                          return (
                            <div className="row payment-header">
                              <div className="col-4">{item.pay_rem1}</div>
                              <div className="col-4">{item.pay_type_name}</div>
                              <div className="col-4">$ {item.pay_amt}</div>
                            </div>
                          );
                        })
                      : ""}
                    <div className="row payment-footer">
                      <div className="col-4 fs-11">{taud_sub.gst_label}</div>
                      <div className="col-4">{t("Total")}</div>
                      <div className="col-4">{taud_sub.total}</div>
                    </div>
                  </div>
                  <div className="col-5 text-right">
                    <div className="row">
                      <div className="col-6">{t("Sub Total")} :</div>
                      <div className="col-6">{sub_data.sub_total}</div>
                    </div>
                    <div className="row">
                      <div className="col-6">{t("GST")} :</div>
                      <div className="col-6">{taud_sub.gst}</div>
                    </div>
                    <div className="row">
                      <div className="col-6">{t("Rounding")} :</div>
                      <div className="col-6">{taud_sub.rounding}</div>
                    </div>
                    <div className="row">
                      <div className="col-6">{t("Grand Total")} :</div>
                      <div className="col-6">{taud_sub.grand_tot}</div>
                    </div>
                  </div>
                </div>
                {/* used payment list */}
              </div>
              <div className="invoice-footer mt-5">
                <p className="">
                  {t("Remark")}: {footer.remark}
                </p>

                {footer.footer1 ? <p>1. {footer.footer1}</p> : ""}
                {footer.footer2 ? <p>2. {footer.footer2}</p> : ""}
                {footer.footer3 ? <p>3. {footer.footer3}</p> : ""}
                {footer.footer4 ? <p>4. {footer.footer4}</p> : ""}
                <div className="row m-0">
                  <div className="col-8"></div>
                  <div className="col-4">
                    <div className="customer-signature  f-600">
                      {t("Customer Signature")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 d-flex text-center action-buttons">
              <div className="w-100 mr-2">
                <NormalButton
                  onClick={() => window.open(downloadlLink)}
                  label="Print"
                  success={true}
                  className="print"
                />
              </div>
              <div className="w-100 ml-2">
                <NormalButton
                  onClick={this.handleShare}
                  label="Share"
                  className="share"
                />
              </div>
              <div className="w-100 ml-2">
                <NormalButton
                  onClick={this.handleSendSMS}
                  label="Send SMS"
                  className="share"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  appointmentDetail: state.appointment.appointmentDetail,
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

export const CustomerReceipt = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CustomerReceiptClass)
);
