import React, { Component } from "react";
import "./style.scss";
import {
  NormalButton,
  NormalInput,
  NormalSelect,
  InputSearch,
  NormalModal,
  TableWrapper,
} from "component/common";
import { dateFormat } from "service/helperFunctions";
import _ from "lodash";
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
import { FormGroup, Label, Input } from "reactstrap";
import { withTranslation } from "react-i18next";

export class TopupTreatmentClass extends Component {
  state = {
    treatmentList: [],
    cartData: {},
    formFields: {
      customer_name: "",
      new_outstanding: "",
      old_outstanding: "",
      topup_amount: "",
    },
    headerDetails: [
      { label: "Invoice No", sortKey: false, width: "120px" },
      { label: "Treatment Name", sortKey: false, width: "120px" },
      { label: "Qty", sortKey: false, width: "50px" },
      { label: "Treatment Code", width: "72px" },
      { label: "Deposit Balance", sortKey: false, width: "100px" },
      { label: "Outstanding", sortKey: false, width: "100px" },
      { label: "Pay amount", width: "100px" },
      { label: "Staff", width: "120px" },
    ],
  };

  componentWillMount = () => {
    this.validator = new SimpleReactValidator({
      element: (message) => (
        <span className="error-message text-danger validNo fs14">
          {message}
        </span>
      ),
      autoForceUpdate: this,
    });
    let { roomList, sourceList, staffList, cartData, duration, treatmentList } =
      this.state;
    this.getCart();
  };

  getCart = () => {
    let { roomList, sourceList, staffList, cartData, duration, treatmentList } =
      this.state;
    this.props
      .getCommonApi(`topuptreatment/?cust_id=${this.props.id}`)
      .then((key) => {
        // let { status, data } = key;
        // if (status === 200) {
        cartData = key;
        treatmentList = key.data;
        this.setState({ cartData, treatmentList });
        this.getDataFromRes(key);
        // }
      });
  };

  getDataFromRes = (data) => {
    let { header_data } = data;
    let { formFields } = this.state;
    formFields["customer_name"] = header_data ? header_data.customer_name : "";
    formFields["new_outstanding"] = header_data
      ? header_data.new_outstanding
      : "";
    formFields["old_outstanding"] = header_data
      ? header_data.old_outstanding
      : "";
    formFields["topup_amount"] = header_data ? header_data.topup_amount : "";
    this.setState({
      formFields,
    });
  };

  handleCreateCart = () => {
    let { basicApptDetail } = this.props;
    let { treatmentList } = this.state;
    let payload = [];
    if (this.validator.allValid()) {
      for (let key of treatmentList) {
        if (key.pay_amount > 0) {
          let obj = {
            cust_noid: basicApptDetail.custId,
            cart_date: dateFormat(new Date(), "yyyy-mm-dd"),
            itemcodeid: key.stock_id,
            price: key.pay_amount,
            item_uom: null,
            treatment_account: key.TreatmentAccountid,
            deposit_account: null,
            prepaid_account: null,
          };
          payload.push(obj);
        }
      }

      this.props
        .getCommonApi(
          `itemcart/Check/?cart_date=${dateFormat(
            new Date(),
            "yyyy-mm-dd"
          )}&cust_noid=${basicApptDetail.custId}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            this.props
              .commonCreateApi("itemcart/TopUpCartCreate/", payload)
              .then((res) => {
                // this.props.handleCartCreated()
                this.props.handleModal();
              });
          } else {
            this.props
              .commonCreateApi(
                `itemcart/TopUpCartCreate/?cart_id=${res.cart_id}`,
                payload
              )
              .then((res) => {
                this.props.handleModal();
              });
          }
        });
    } else {
      this.validator.showMessages();
    }
  };

  handleClearLine = () => {
    this.props
      .commonDeleteApi(
        `tmpitemhelper/delete/?clear_all=0&cartid=${this.props.cartId}`
      )
      .then(() => {
        this.getCart();
      });
  };

  handleClearAll = () => {
    this.props
      .commonDeleteApi(
        `tmpitemhelper/delete/?clear_all=1&cartid=${this.props.cartId}`
      )
      .then(() => {
        let { formFields, postFields } = this.state;
        this.setState({
          formFields,
          postFields,
        });
        this.getCart();
      });
  };

  handlePayAmount = (event, data, index) => {
    let { treatmentList } = this.state;
    treatmentList[index][event.target.name] = event.target.value;
    this.setState({
      treatmentList,
    });
  };

  render() {
    let {
      workpoint = "",
      treatmentList = [],
      headerDetails,
      formFields,
    } = this.state;
    let { customer_name, new_outstanding, old_outstanding, topup_amount } =
      formFields;
    let { t } = this.props;
    return (
      <div className="row new-cart treatment-done top-up">
        <div className="col-5">
          <div className="d-flex">
            <label className="text-left w-100 text-black common-label-text mr-2">
              {t(`Customer`)}
            </label>
            <div className="input-group">
              <NormalInput
                value={customer_name}
                name="customer_name"
                onChange={this.handlePostChange}
                className={`customer-name`}
                disabled
              />
            </div>
          </div>
          <div className="d-flex">
            <label className="text-left w-100 text-black common-label-text mr-2">
              {t("Outstanding")}
            </label>
            <div className="input-group">
              <NormalInput
                value={old_outstanding}
                name="old_outstanding"
                onChange={this.handlePostChange}
                className={`customer-name`}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="col-3">
          <FormGroup check className="m-0">
            <Label check>
              <Input
                type="checkbox"
                onChange={this.props.handleChangeBox}
                name="cust_maillist"
              />{" "}
              Auto
            </Label>
          </FormGroup>
        </div>
        <div className="col-4">
          <div className="d-flex">
            <label className="text-left w-100 text-black common-label-text mr-2">
              {t("Top Up Amount")}
            </label>
            <div className="input-group">
              <NormalInput
                value={topup_amount}
                name="topup_amount"
                onChange={this.handlePostChange}
                className={`customer-name`}
              />
            </div>
          </div>
          <div className="d-flex">
            <label className="text-left w-100 text-black common-label-text mr-2">
              {t("New Outstanding")}
            </label>
            <div className="input-group">
              <NormalInput
                value={new_outstanding}
                name="new_outstanding"
                onChange={this.handlePostChange}
                className={`customer-name`}
              />
            </div>
          </div>
        </div>

        <div className={`col-12 cart-item mt-2`}>
          <div className={`item-list`}>
            <div className="table">
              <TableWrapper
                headerDetails={headerDetails}
                queryHandler={this.handlePagination}
              >
                {treatmentList.length > 0
                  ? treatmentList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {item.sa_transacno}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-left justify-content-center">
                              {item.description}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {item.qty}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {item.treatment_parentcode}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {item.balance}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {item.outstanding}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center payment-input justify-content-center">
                              <NormalInput
                                value={item.pay_amount}
                                name="pay_amount"
                                onChange={(e) =>
                                  this.handlePayAmount(e, item, index)
                                }
                                className={`customer-name`}
                              />
                              {item.pay_amount
                                ? this.validator.message(
                                    "pay_amount",
                                    item.pay_amount,
                                    `required|max:${Number(
                                      item.outstanding
                                    )},num`
                                  )
                                : ""}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {item.sa_staffname}
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
            <div className="col-6 d-flex">
              {/* <NormalButton
                                buttonClass={"mx-2"}
                                mainbg={true}
                                className="fs-15 clear-line"
                                label="Clear Line"
                                outline={false}
                                onClick={this.handleClearLine}
                            />
                            <NormalButton
                                buttonClass={"mx-2"}
                                mainbg={true}
                                className="fs-15 clear-all"
                                label="Clear All"
                                outline={false}
                                onClick={this.handleClearAll}
                            /> */}
            </div>
            <div className="col-4 text-right"></div>
            <div className="col-2 text-right">
              <NormalButton
                buttonClass={"mx-2"}
                mainbg={true}
                className=" fs-15 confirm"
                label="Confirm"
                outline={false}
                onClick={this.handleCreateCart}
              />
            </div>
          </div>
        </div>
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

export const TopupTreatment = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(TopupTreatmentClass)
);
