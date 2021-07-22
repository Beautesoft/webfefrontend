import React, { Component } from "react";
import "./style.scss";
import {
  NormalButton,
  NormalInput,
  NormalTextarea,
  NormalRadio,
  NormalSelect,
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
import { withTranslation } from "react-i18next";

export class ReversalClass extends Component {
  state = {
    tstaffList: [],
    cartData: {},
    formFields: {
      type: "",
      adj_value: "",
      reason: "",
      remark: "",
    },
    headerDetails: {},
    isShowBalance: false,
    transactioRecord: [],
    reasonOption: [],
    afterAdjustment: "",
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
    this.props.getCommonApi("reversereason/").then((key) => {
      let { data } = key;
      let { reasonOption } = this.state;
      for (let value of data) {
        reasonOption.push({ value: value.id, label: value.rev_desc });
      }
      this.setState({ reasonOption });
    });
    this.getCart();
  };

  getCart = () => {
    let { cartData, tstaffList, headerDetails, afterAdjustment } = this.state;
    this.props
      .getCommonApi(`reversal/?treatment_id=${this.props.reversalId}`)
      .then((key) => {
        cartData = key;
        tstaffList = key.data;
        headerDetails = key.header_data;
        afterAdjustment = key.header_data.total;
        this.setState({ cartData, tstaffList, headerDetails, afterAdjustment });
      });
  };

  handleShowBalance = () => {
    let { transactioRecord } = this.state;

    this.props
      .getCommonApi(`showbalance/?treatment_id=${this.props.reversalId}`)
      .then((key) => {
        transactioRecord = key.data;
        this.setState({ transactioRecord });
      });
  };

  handleSubmit = (id) => {};

  handleDialog = () => {};

  handleAddReversal = (item) => {
    //debugger;
    let { formFields } = this.state;
    if (this.validator.allValid()) {
      this.props
        .commonCreateApi(
          `reversal/?treatment_id=${this.props.reversalId}&adjustment_value=${
            formFields.type + formFields.adj_value
          }&reason_id=${formFields.reason}&remark=${formFields.remark}`
        )
        .then((res) => {
          window.open(res.data);
          this.props.handleModal();
        });
    } else {
      this.validator.showMessages();
    }
  };

  handleChange = async ({ target: { value, name } }) => {
    let { formFields } = this.state;
    formFields[name] = value;
    await this.setState({
      formFields,
    });
    this.getAfterAdjustment();
  };

  handleClearLine = () => {};

  handleClearAll = () => {};

  getAfterAdjustment = () => {
    let { afterAdjustment, formFields, headerDetails } = this.state;
    if (formFields.type === "-") {
      afterAdjustment =
        Number(headerDetails.total) - Number(formFields.adj_value);
    }
    if (formFields.type === "+") {
      afterAdjustment =
        Number(headerDetails.total) + Number(formFields.adj_value);
    }
    afterAdjustment = afterAdjustment.toFixed(2);
    console.log(
      "adsfasdfasdfasdf",
      afterAdjustment,
      headerDetails.total,
      typeof afterAdjustment
    );
    this.setState({
      afterAdjustment,
    });
  };

  render() {
    let {
      tstaffList = [],
      Room,
      new_remark,
      headerDetails,
      transactioRecord,
      reasonOption,
      reason,
      formFields,
      afterAdjustment,
    } = this.state;
    let { t } = this.props;
    return (
      <div className="row new-cart treatment-done">
        <div className="col-12">
          <p className="fs-18 font-700 mb-3 title">{t("Treatment Reversal")}</p>
        </div>

        <div className="col-6 fs-14">
          <p className="fs-14">{t("Reverse Treatment List")}</p>
          <p className="fs-14">
            {t("Reverse No")}:{" "}
            <b>{headerDetails ? headerDetails.reverse_no : ""}</b>
          </p>
          <div className="row">
            <div className="col-1">{t("S.No")}</div>
            <div className="col-3">{t("Treatment")} #</div>
            <div className="col-4">{t("Content")}</div>
            <div className="col-3 text-center">{t("Value")}</div>
          </div>
          {tstaffList.length > 0
            ? tstaffList.map((item, index) => {
                return (
                  <div className="row">
                    <div className="col-1">{index + 1}</div>
                    <div className="col-3">{item.treatment_code}</div>
                    <div className="col-4">{item.course}</div>
                    <div className="col-3 text-center">{item.unit_amount}</div>
                  </div>
                );
              })
            : ""}
          <div className="row">
            <div className="col-8 text-right">{t("Total")}</div>
            <div className="col-3 text-center">
              {headerDetails ? headerDetails.total : ""}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-8 text-right">
              {t("Total deposit or Balance")}
            </div>
            <div className="col-3 text-center">
              {headerDetails ? headerDetails.total_depobalance : ""}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-8 text-right">{t("Adjustment Value")}</div>
            <div className="col-3 text-center">{formFields.adj_value}</div>
          </div>
          <div className="row mb-3">
            <div className="col-8 text-right">
              {t("Total credit Note after adjustment")}
            </div>
            <div className="col-3 text-center">{Number(afterAdjustment)}</div>
          </div>
          <NormalButton
            buttonClass={"mx-2 mb-2"}
            mainbg={true}
            className="fs-15"
            label="Show Balance"
            outline={false}
            onClick={this.handleShowBalance}
          />
        </div>
        <div className="col-6 fs-14">
          <p>{t("Transaction Record")}</p>
          <div className="row">
            <div className="col-3">{t("Treatment")} #</div>
            <div className="col-3">
              {t("Balance")}/{t("Deposit")}
            </div>
            <div className="col-3 d-flex align-items-center justify-content-center">
              {t("Total Reverse Price")}
            </div>
            <div className="col-3">{t("Outstanding")}</div>
          </div>

          {transactioRecord.length > 0
            ? transactioRecord.map((item, index) => {
                return (
                  <div className="row">
                    <div className="col-3">{item.treatment_parentcode}</div>
                    <div className="col-3">{item.balance}</div>
                    <div className="col-3">{item.reverse_price}</div>
                    <div className="col-3 text-center">{item.outstanding}</div>
                  </div>
                );
              })
            : ""}
        </div>

        <div className="col-6 fs-14 adjustment">
          <p>{t("Adjustment Proceedure")}</p>
          <div className="row mb-1">
            <div className="col-2">{t("Adjustmet")}</div>
            <div className="col-3 pr-0 ">
              <div>
                <NormalSelect
                  // placeholder="Enter here"
                  options={[
                    { value: "-", label: "-" },
                    { value: "+", label: "+" },
                  ]}
                  value={formFields.type}
                  name="type"
                  onChange={this.handleChange}
                  className="customer-name py-0"
                  disabled={Room}
                />
              </div>
              {/* {this.validator.message('Adjustment type', formFields.type, 'required')} */}
            </div>
            <div className="col-6">
              <div>
                <NormalInput
                  value={formFields.adj_value}
                  name="adj_value"
                  onChange={this.handleChange}
                  className="customer-name"
                />
              </div>
              {/* {this.validator.message('Adjustment value', formFields.adj_value, 'required')} */}
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-2">{t("Reason")}</div>

            <div className="col-6 ">
              <NormalSelect
                options={reasonOption}
                value={formFields.reason}
                name="reason"
                onChange={this.handleChange}
                className="customer-name py-0"
              />
              {/* {this.validator.message('reason', formFields.reason, 'required')} */}
            </div>
          </div>
          <div className="row">
            <div className="col-2">{t("Remark")}</div>

            <div className="col-6">
              <NormalTextarea
                placeholder=""
                value={formFields.remark}
                name="remark"
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>

        <div className="col-12 fs-14 pt-4 action-bar">
          <div className="row">
            <div className="col-6 d-flex">
              {/* <NormalButton
                                buttonClass={"mx-2"}
                                mainbg={true}
                                className="fs-15 clear-line"
                                label="Update"
                                outline={false}
                                onClick={this.handleClearLine}
                            />
                            <NormalButton
                                buttonClass={"mx-2"}
                                mainbg={true}
                                className="fs-15 clear-all"
                                label="Undo"
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
                onClick={this.handleAddReversal}
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

export const Reversal = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ReversalClass)
);
