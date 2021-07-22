import React, { Component } from "react";
import "./style.scss";
import {
  NormalButton,
  NormalInput,
  NormalSelect,
  NormalDateTime,
  TableWrapper,
  NormalModal,
} from "component/common";
import { dateFormat } from "service/helperFunctions";
import _ from "lodash";
import { history } from "helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCommonApi,
  updateForm,
  commonCreateApi,
  commonDeleteApi,
  commonPatchApi,
} from "redux/actions/common";
import SimpleReactValidator from "simple-react-validator";
// import { Treatment, Payment, EditCart } from './cart/index';
import service from "assets/images/make-up-brush.png";
// import Discount from './cart/discount';
import { FormGroup, Label, Input } from "reactstrap";
import closeIcon from "assets/images/close.png";
import { withTranslation } from "react-i18next";

class VoidPaidTransClass extends Component {
  state = {
    tstaffList: [],
    cartData: {},
    formFields: {
      custName: "",
      fromDate: new Date(),
      toDate: new Date(),
      transCode: "",
      custCode: "",
    },
    headerDetails: [
      { label: "Transaction #", sortKey: false, width: "120px" },
      { label: "Customer code", sortKey: false, width: "120px" },
      { label: "Customer Name", width: "120px" },
      { label: "Date", sortKey: false, width: "100px" },
      { label: "Status", sortKey: false, width: "100px" },
      { label: "Reference No", width: "180px" },
      { label: "Payment Remark", width: "220px" },
    ],
    detailHeaderDetails: [
      { label: "S.No", sortKey: false, width: "" },
      { label: "Name", sortKey: false, width: "120px" },
      { label: "Qty", sortKey: false, width: "80px" },
      { label: "Price", width: "120px" },
    ],
    isShowBalance: false,
    transactioRecord: [],
    reasonOption: [],
    page: 1,
    limit: 10,
    detailDataList: [],
    isOpenvoidCheckout: false,
    reason: "",
    cartList: [],
    isvoidCompleted: false,
    completedData: {},
  };

  componentWillMount = () => {
    // this.getCart();
    this.validator = new SimpleReactValidator({
      element: (message) => (
        <span className="error-message text-danger validNo fs14">
          {message}
        </span>
      ),
      autoForceUpdate: this,
    });
    // this.props.getCommonApi('reversereason/').then((key) => {
    //     let { data } = key;
    //     let { reasonOption } = this.state;
    //     for (let value of data) {
    //         reasonOption.push({ value: value.id, label: value.rev_desc })
    //     }
    //     this.setState({ reasonOption })
    // })
    this.handleCheckCart();
    this.getCart();
  };

  getCart = (data) => {
    let { page, limit, formFields, cartData, tstaffList } = this.state;
    let { custName, fromDate, toDate, transCode, custCode } = formFields;
    let { basicApptDetail } = this.props;
    this.props
      .getCommonApi(
        `void/?from_date=${dateFormat(
          fromDate,
          "yyyy-mm-dd"
        )}&to_date=${dateFormat(
          toDate,
          "yyyy-mm-dd"
        )}&transac_no=${transCode}&cust_code=${
          basicApptDetail.custId
        }&cust_name=${custName}&page=${page}&limit=${limit}`
      )
      .then((res) => {
        console.log(res, "dsfdfaafg");
        cartData = res;
        tstaffList = res.data;
        this.setState({ cartData, tstaffList });
      });
  };

  handleCheckCart = async () => {
    let { basicApptDetail } = this.props;
    await this.props
      .getCommonApi(`voidcheck/?cust_id=${basicApptDetail.custId}`)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          this.setState({
            isOpenvoidCheckout: true,
            cartList: res.data,
          });
          this.getvoidReason();
        }
      });
  };

  getvoidReason = () => {
    this.props.getCommonApi("voidreason/").then((key) => {
      let { data } = key;
      let { reasonOption } = this.state;
      reasonOption = [];
      for (let value of data) {
        reasonOption.push({ value: value.id, label: value.reason_desc });
      }
      this.setState({ reasonOption });
    });
  };

  getVoidDetail = () => {
    let { selectedData, cartData, tstaffList } = this.state;
    this.props
      .getCommonApi(`void/Details/?poshdr_id=${selectedData.id}`)
      .then((res) => {
        this.setState({ detailDataList: res.data });
      });
  };

  handlePagination = async (page) => {
    console.log(page, "dsfsdfsdfsdf");
    await this.setState({ page: page.page });
    this.getCart(page);
  };

  handleVoidCreate = () => {
    let { selectedData } = this.state;
    this.props
      .commonCreateApi(`void/?poshdr_id=${selectedData.id}`)
      .then((key) => {
        this.handleCheckCart();
      });
  };

  handleVoidCartSubmit = (id) => {
    let { selectedData, reason, cartList } = this.state;
    if (this.validator.allValid()) {
      this.props
        .commonCreateApi(
          `void/VoidReturn/?cart_id=${cartList[0].cart_id}&voidreason_id=${reason}`
        )
        .then(async (key) => {
          await this.setState({
            completedData: key.data,
          });
          this.setState({
            isvoidCompleted: true,
          });
        });
    } else {
      this.validator.showMessages();
    }
  };

  handleDialog = async () => {
    let { isOpenvoidDetail, isOpenvoidCheckout, isvoidCompleted } = this.state;
    isOpenvoidDetail = false;
    isOpenvoidCheckout = false;
    isvoidCompleted = false;
    await this.setState({
      isOpenvoidDetail,
      isOpenvoidCheckout,
      isvoidCompleted,
    });
    this.handleCheckCart();
    this.getCart();
  };

  handleChange = async ({ target: { value, name } }) => {
    let { formFields } = this.state;
    formFields[name] = value;
    await this.setState({
      formFields,
    });
  };

  handleSelectVoid = async (data, index) => {
    let { selectedData, selectedIndex } = this.state;
    selectedData = data;
    selectedIndex = index;
    await this.setState({
      selectedData,
      selectedIndex,
    });
    this.setState({
      isOpenvoidDetail: true,
    });
    this.getVoidDetail();
  };

  handleSearch = () => {
    this.getCart();
  };

  handleDatePick = async (name, value) => {
    console.log(name, value, "sdfgdfhfshg", dateFormat(value));
    // dateFormat(new Date())
    let { formFields } = this.state;
    formFields[name] = value;
    // formFields[name] = value;
    await this.setState({
      formFields,
    });
    // this.getCart()
  };

  handleReasonChange = ({ target: { name, value } }) => {
    let { reason } = this.state;
    reason = value;
    this.setState({
      reason,
    });
  };

  // for get Print response
  handlePrint = () => {
    let { completedData } = this.state;
    history.push(`/admin/billing/print/bill/${completedData.sa_transacno}`);
  };

  // for share reciept
  handleShare = (id) => {
    let { completedData } = this.state;
    this.props
      .commonCreateApi(
        `receiptpdfsend/?sa_transacno=${completedData.sa_transacno}`
      )
      .then((res) => {});
  };

  handleVoidCancelCart = (id) => {
    let { completedData, isOpenvoidCheckout, cartList } = this.state;
    let payload = {
      cart_id: cartList[0].cart_id,
    };
    this.props.commonCreateApi(`voidcancel/`, payload).then((res) => {
      if (res.status === 200) {
        isOpenvoidCheckout = false;
        this.setState({
          isOpenvoidCheckout,
        });
      }
    });
  };

  render() {
    let {
      tstaffList = [],
      headerDetails,
      formFields,
      isOpenvoidDetail,
      detailDataList,
      detailHeaderDetails,
      isOpenvoidCheckout,
      reason,
      reasonOption,
      isvoidCompleted,
    } = this.state;
    let { custName, fromDate, toDate, transCode, custCode } = formFields;
    let { t } = this.props;
    return (
      <div className="row new-cart treatment-done top-up">
        <div className="col-3">
          <div className="d-flex">
            <label className="text-left w-100 text-black common-label-text mr-2">
              {t("From Date")}
            </label>
            <div className="input-group">
              <NormalDateTime
                onChange={this.handleDatePick}
                inputcol="p-0 inTime"
                value={fromDate}
                name="fromDate"
                className="dob-pick"
                showYearDropdown={true}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <br />
          <div className="d-flex">
            <label className="text-left w-100 text-black common-label-text mr-2">
              {t("To Date")}
            </label>
            <div className="input-group">
              <NormalDateTime
                onChange={this.handleDatePick}
                inputcol="p-0 inTime"
                value={toDate}
                name="toDate"
                className="dob-pick"
                showYearDropdown={true}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        </div>
        <br />
        {/* <div className="col-3">
                    <div className="d-flex">
                        <label className="text-left w-100 text-black common-label-text mr-2">
                            Customer Name
                    </label>
                        <div className="input-group">
                            <NormalInput
                                value={custName}
                                name="custName"
                                onChange={this.handleChange}
                                className={`customer-name`}
                            />
                        </div>
                    </div>
                    <div className="d-flex">
                        <label className="text-left w-100 text-black common-label-text mr-2">
                            Customer Code
                    </label>
                        <div className="input-group">
                            <NormalInput
                                value={custCode}
                                name="custCode"
                                onChange={this.handleChange}
                                className={`customer-name`}
                            />
                        </div>
                    </div>
                </div> */}

        <div className="col-3">
          <div className="d-flex">
            <label className="text-left w-100 text-black common-label-text mr-2">
              {t("Transaction Code")}
            </label>
            <div className="input-group">
              <NormalInput
                value={transCode}
                name="transCode"
                onChange={this.handleChange}
                className={`customer-name`}
              />
            </div>
          </div>
        </div>

        <div className="col-3">
          <NormalButton
            buttonClass={"mx-2"}
            mainbg={true}
            className=" fs-15 confirm"
            label="Search"
            outline={false}
            onClick={this.handleSearch}
          />
        </div>

        <div className={`col-12 cart-item mt-2`}>
          <div className={`item-list`}>
            <div className="table">
              <TableWrapper
                headerDetails={headerDetails}
                queryHandler={this.handlePagination}
              >
                {tstaffList.dataList && tstaffList.dataList.length > 0
                  ? tstaffList.dataList.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          onClick={() => this.handleSelectVoid(item, index)}
                        >
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {item.sa_transacno_ref}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {item.sa_custno}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {item.sa_custname}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {item.sa_date}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {item.sa_status}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {item.sa_transacno_ref}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {item.payment_remarks}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </TableWrapper>
            </div>
          </div>
        </div>
        <div className="col-12 pt-4 action-bar">
          <div className="row">
            {/* <div className="col-12 d-flex justify-right">
                            <NormalButton
                                buttonClass={"mx-2"}
                                mainbg={true}
                                className="fs-15 clear-all"
                                label="Cancel"
                                outline={false}
                                onClick={this.handleClearAll}
                            />
                            <NormalButton
                                buttonClass={"mx-2"}
                                mainbg={true}
                                className=" fs-15 confirm"
                                label="Confirm"
                                outline={false}
                                onClick={this.handleCreateCart}
                            />
                        </div> */}
          </div>
        </div>
        <NormalModal
          className={"transaction-done-modal top-up-modal"}
          style={{ minWidth: "560px" }}
          modal={isOpenvoidDetail}
          handleModal={this.handleDialog}
        >
          <img
            onClick={this.handleDialog}
            className="close cursor-pointer"
            src={closeIcon}
            alt=""
          />
          <p className="fs-18 f-600">{t("Detail")}</p>
          <div className="mt-10">
            <TableWrapper
              headerDetails={detailHeaderDetails}
              queryHandler={this.handlePagination}
            >
              {detailDataList && detailDataList.length > 0
                ? detailDataList.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => this.handleSelectVoid(item, index)}
                      >
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {index + 1}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {item.desc}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {item.dt_qty}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {item.dt_amt}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </TableWrapper>
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-right">
              <NormalButton
                buttonClass={"mx-2"}
                mainbg={true}
                className="fs-15 clear-all"
                label="Cancel"
                outline={false}
                onClick={this.handleDialog}
              />
              <NormalButton
                buttonClass={"mx-2"}
                mainbg={true}
                className=" fs-15 confirm"
                label="Void"
                outline={false}
                onClick={this.handleVoidCreate}
              />
            </div>
          </div>
        </NormalModal>
        <NormalModal
          className={"transaction-done-modal top-up-modal"}
          style={{ minWidth: "560px" }}
          modal={isOpenvoidCheckout}
          handleModal={() => {}}
        >
          {/* <img onClick={this.handleDialog} className="close cursor-pointer" src={closeIcon} alt="" /> */}
          <p className="fs-18 f-600">{t("Void Checkout")}</p>
          <div className="mt-3">
            <label className="text-left w-100 text-black common-label-text mr-2">
              {t("Reason")}
            </label>
            <div className="input-group">
              <NormalSelect
                // placeholder="Enter here"
                options={reasonOption}
                value={reason}
                name={"reason"}
                onChange={this.handleReasonChange}
                className="py-0"
              />
              {this.validator.message("Reason", reason, "required")}
            </div>
          </div>
          <div className="row">
            <div className="col-6 d-flex mt-5 justify-left">
              <NormalButton
                buttonClass={"mx-2"}
                mainbg={true}
                className=" fs-15 confirm"
                label="Void Cancel"
                outline={false}
                onClick={this.handleVoidCancelCart}
              />
            </div>
            <div className="col-6 d-flex mt-5 justify-right">
              <NormalButton
                buttonClass={"mx-2"}
                mainbg={true}
                className=" fs-15 confirm"
                label="Confirm"
                outline={false}
                onClick={this.handleVoidCartSubmit}
              />
            </div>
          </div>
        </NormalModal>
        <NormalModal
          className={"void-checkout-complete top-up-modal"}
          style={{ minWidth: "560px" }}
          modal={isvoidCompleted}
          handleModal={() => this.handleDialog}
        >
          <img
            onClick={this.handleDialog}
            className="close cursor-pointer"
            src={closeIcon}
            alt=""
          />
          <p className="fs-18 f-600">{t("Void Checkout")}</p>

          <div className="row my-5">
            <div className="col-4 d-flex mt-5 justify-center">
              <NormalButton
                buttonClass={"mx-2"}
                mainbg={true}
                className=" fs-15 print"
                label="Print"
                outline={false}
                onClick={this.handlePrint}
              />
            </div>
            <div className="col-4 d-flex mt-5 justify-center">
              <NormalButton
                buttonClass={"mx-2"}
                mainbg={true}
                className=" fs-15 share"
                label="Share"
                outline={false}
                onClick={this.handleShare}
              />
            </div>
            <div className="col-4 d-flex mt-5 justify-center">
              <NormalButton
                buttonClass={"mx-2"}
                mainbg={true}
                className=" fs-15 cancel"
                label="Close"
                outline={false}
                onClick={this.handleDialog}
              />
            </div>
          </div>
        </NormalModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selected_cstomer: state.common.selected_cstomer,
  basicApptDetail: state.appointment.basicApptDetail,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // getCustomer,
      getCommonApi,
      updateForm,
      commonCreateApi,
      commonPatchApi,
      commonDeleteApi,
    },
    dispatch
  );
};

export const VoidPaidTrans = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(VoidPaidTransClass)
);
