import React, { Component } from "react";
import {
  NormalInput,
  NormalButton,
  TableWrapper,
  NormalTextarea,
  NormalSelect,
  NormalCheckbox,
} from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCommonApi,
  commonPatchApi,
  commonCreateApi,
  commonUpdateApi,
} from "redux/actions/common";
import "./style.scss";
import { Toast } from "service/toast";
import SimpleReactValidator from "simple-react-validator";
import { withTranslation } from "react-i18next";

export class CoursePopupClass extends Component {
  state = {
    headerDetails: [
      { label: "No." },
      { label: "Program" },
      { label: "Next appt" },
      { label: "Amount" },
    ],
    data_list: {
      deposit: "",
      discount: "",
      discount_amt: "",
      discount_price: "",
      free_sessions: null,
      id: null,
      itemdesc: "",
      price: "",
      quantity: null,
      tmp_treatment: [],
      total_price: "",
      trans_amt: "",
      treatment_no: null,
      outstanding: null,
      disc_reason: "",
      discreason_txt: "",
      autoProportion: false,
    },
    discount_reason_options: [],
    is_percentage: "",
    discount_reasons: [],
    is_total: false,
    discount_price_txt: "",
    discType: [
      { value: 1, label: "%" },
      { value: 2, label: "$" },
    ],
  };

  componentDidMount = () => {
    this.getDiscountReasons();
    this.getCourseList();
  };

  getCourseList = () => {
    let { data_list, discount_reasons, is_total } = this.state;
    this.props
      .getCommonApi(`cartservicecourse/${this.props.cartId}/`)
      .then((key) => {
        let { status, data } = key;
        console.log(data, "cartcoursepopup");
        if (status == "200") {
          if (data) {
            data_list["deposit"] = data.deposit;
            data_list["discount"] = 0;
            data_list["discount_amt"] = 0;
            data_list["discount_price"] = data.discount_price;
            data_list["free_sessions"] = data.free_sessions;
            data_list["id"] = data.id;
            data_list["itemdesc"] = data.itemdesc;
            data_list["price"] = data.price;
            data_list["quantity"] = data.quantity;
            data_list["tmp_treatment"] = data.tmp_treatment;
            data_list["autoProportion"] = false;
            data_list["total_price"] = data.total_price;
            data_list["trans_amt"] = data.trans_amt;
            data_list["treatment_no"] = data.treatment_no;
            data_list["outstanding"] = data.trans_amt;
            is_total = data.is_total;
            discount_reasons = data.disc_lst;
            this.setState({ data_list, discount_reasons, is_total });
          }
        }
      });
  };

  getCourseTableList = async () => {
    let { data_list, discount_reasons, discount_price_txt, is_percentage } =
      this.state;
    this.props
      .getCommonApi(`cartservicecourse/${this.props.cartId}/`)
      .then(async (key) => {
        let { status, data } = key;
        console.log(key, "cartcoursepopupafterdiscount");
        if (status == "200") {
          if (data) {
            data_list["tmp_treatment"] = data.tmp_treatment;
            discount_reasons = data.disc_lst;
            this.setState({ data_list, discount_reasons });
            data_list["discount_price"] = data.discount_price;
            let Total = Number(
              Number(data.discount_price) * Number(data_list["treatment_no"])
            ).toFixed(2);
            data_list["total_price"] = Total;
            data_list["trans_amt"] = Total;
            data_list["outstanding"] = Total;
            data_list["deposit"] = Total;
            data_list["disc_reason"] = "";
            data_list["discreason_txt"] = "";
            data_list["discount"] = "";
            data_list["discount_amt"] = "";
            discount_price_txt = "";
            is_percentage = "";
            await this.setState({
              data_list,
              discount_reasons,
              discount_price_txt,
              is_percentage,
            });
          }
        }
      });
  };

  handleProportionChange = async ({ target: { value, name } }) => {
    let { data_list, deposit } = this.state;
    data_list[name] = value;
    let proportion = "";
    if (value) {
      proportion = "True";
    } else {
      proportion = "False";
    }
    let body = {
      cart_id: data_list.id,
      treatment_no: null,
      free_sessions: null,
      total_price: null,
      unit_price: null,
      disc_amount: null,
      disc_percent: null,
      auto_propation: proportion,
    };
    this.props.commonCreateApi(`coursetmp/`, body).then((key) => {
      let { status, data } = key;
      console.log(key, "Coursecountupdateresponse");
      if (status == "201" || status == "200") {
        if (data) {
          data_list["tmp_treatment"] = data;
          this.setState({ data_list });
          return true;
        }
      }
    });
  };

  handleChange = async ({ target: { value, name } }) => {
    let { data_list, deposit, is_percentage, discount_price_txt } = this.state;
    data_list[name] = value;
    if (name === "discount_price_txt") {
      discount_price_txt = value;
      this.setState({
        discount_price_txt,
      });
    }
    if (name == "is_percentage") {
      is_percentage = value;
      this.setState({
        is_percentage,
      });
    }
    if (name === "disc_reason" && Number(value) !== 182) {
      data_list["discreason_txt"] = "";
      this.setState({
        data_list,
      });
    }
    await this.setState({
      data_list,
    });
    if (name === "deposit") {
      deposit = value;

      this.setState({
        deposit,
      });
    }
  };
  handleTreatmentCountUpdate = () => {
    let { data_list } = this.state;
    if (data_list.treatment_no && Number(data_list.treatment_no) > 0) {
      let body = {
        cart_id: data_list.id,
        treatment_no: Number(data_list.treatment_no),
        free_sessions: Number(data_list.free_sessions),
      };
      this.handleTextChangeAPI(body);
      let Amount = Number(
        data_list.discount_price * data_list.treatment_no
      ).toFixed(2);
      data_list["deposit"] = Amount;
      data_list["trans_amt"] = Amount;
      data_list["total_price"] = Amount;
      data_list["outstanding"] = Amount;
      this.setState({
        data_list,
      });
    } else {
      Toast({
        type: "error",
        message: "No.of treatment should not be empty",
      });
    }
  };
  handleTotalPriceChange = () => {
    let { data_list, is_total } = this.state;
    if (data_list.treatment_no !== "" || Number(data_list.treatment_no) > 0) {
      if (data_list.trans_amt && Number(data_list.trans_amt) > 0) {
        let body = {
          cart_id: data_list.id,
          treatment_no: null,
          free_sessions: null,
          total_price: data_list.trans_amt,
          unit_price: null,
          disc_amount: null,
          disc_percent: null,
          auto_propation: null,
          auto: data_list.autoProportion,
        };
        this.handleTextChangeAPI(body);

        let Amount = Number(
          data_list.trans_amt / data_list.treatment_no
        ).toFixed(2);
        data_list["price"] = Amount;
        data_list["total_price"] = data_list.trans_amt;
        data_list["trans_amt"] = data_list.trans_amt;
        data_list["outstanding"] = data_list.trans_amt;
        data_list["deposit"] = data_list.trans_amt;
        data_list["discount_price"] = data_list.price;
        data_list["discount"] = "";
        data_list["discount_amt"] = "";
        is_total = true;
        this.setState({ data_list, is_total });
      }
    } else {
      Toast({
        type: "error",
        message: "Quantity should not be empty",
      });
    }
  };

  handleTextChangeAPI = (body) => {
    let { data_list } = this.state;
    this.props.commonCreateApi(`coursetmp/`, body).then((key) => {
      let { status, data } = key;
      console.log(key, "Coursecountupdateresponse");
      if (status == "201" || status == "200") {
        if (data) {
          data_list["tmp_treatment"] = data;
          this.setState({ data_list });
          return true;
        }
      }
    });
  };
  handleReset = () => {
    let { data_list, is_total, discount_reasons, discount_price_txt } =
      this.state;
    let body = {
      cart_id: data_list.id,
    };
    this.props
      .commonCreateApi(`cartservicecourse/reset/`, body)
      .then(async (key) => {
        let { status, data } = key;
        console.log(key, "resetresponse");
        if (status == "200") {
          data_list.tmp_treatment = [];
          discount_reasons = [];
          data_list["treatment_no"] = "";
          data_list["free_sessions"] = "";
          data_list["quantity"] = 1;
          data_list["discount_price"] = Number(data_list["price"]);
          data_list["trans_amt"] = Number(data_list["price"]);
          data_list["deposit"] = Number(data_list["price"]);
          data_list["outstanding"] = Number(data_list["price"]);
          data_list["autoProportion"] = false;
          discount_price_txt = "";
          is_total = false;
          this.setState({
            data_list,
            is_total,
            discount_reasons,
            discount_price_txt,
          });
        }
      });
  };
  handleQuantityCount = async () => {
    let { data_list } = this.state;
    let count = 0;

    count = Number(data_list.treatment_no) + Number(data_list.free_sessions);
    if (count > 0) {
      data_list["quantity"] = count;
    } else {
      data_list["quantity"] = 1;
    }
    await this.setState({
      data_list,
    });
  };
  handleSubmit = () => {
    let { data_list } = this.state;
    let discountAmt = null;
    let discount = null;
    if (data_list.discount && Number(data_list.discount) <= 0) {
      discount = 0;
      let discountCal = Number(
        data_list.discount_amt / data_list.treatment_no
      ).toFixed(2);
      discountAmt = discountCal;
    } else {
      let trans = Number(data_list.treatment_no) * Number(data_list.price);
      let discPercnt = Number(
        (trans * Number(data_list.discount)) / 100
      ).toFixed(2);

      let disccalcStage = Number(trans - discPercnt).toFixed(2);
      let disccalStage2 = Number(
        disccalcStage / data_list.treatment_no
      ).toFixed(2);
      let disccalcfinal = Number(data_list.price - disccalStage2);
      discountAmt = disccalcfinal;
      let Singledisc_percnt = Number(discountAmt / 100).toFixed(2);
      discount = Number(Singledisc_percnt * 100).toFixed(2);
    }
    let treatment_no = 0;
    if (data_list.treatment_no > 0) {
      treatment_no = data_list.treatment_no;
    } else {
      treatment_no = 1;
    }

    if (data_list.deposit > data_list.total_price) {
      Toast({
        type: "error",
        message: "Deposit should be less than or equal to Total price",
      });
      return false;
    } else if (discountAmt > 0 && data_list.disc_reason == "") {
      Toast({
        type: "error",
        message: "discount reason is mandatory for discount apply",
      });
      return false;
    } else {
      let body = {
        cart_id: data_list.id,
        quantity: Number(data_list.quantity),
        price: Number(data_list.price),
        discount_price: Number(data_list.discount_price),
        trans_amt: Number(data_list.trans_amt),
        deposit: Number(data_list.deposit),
        treatment_no: Number(data_list.treatment_no),
        free_sessions: Number(data_list.free_sessions),
        total_price: Number(
          Number(treatment_no) * Number(data_list.price)
        ).toFixed(2),
      };
      console.log(body, "Confirm button action input");
      this.props
        .commonPatchApi(`cartservicecourse/${this.props.cartId}/`, body)
        .then((key) => {
          let { status, data } = key;
          if (status == "200") {
            this.props.handleModal();
          }
        });
    }
  };

  getDiscountReasons = () => {
    let { discount_reason_options } = this.state;

    this.props.getCommonApi(`paymentremarks/`).then((key) => {
      let { status, data } = key;
      if (status === 200) {
        for (let value of data) {
          discount_reason_options.push({
            value: value.id,
            label: value.r_desc,
          });
        }
        this.setState({ discount_reason_options });
      }
    });
  };
  handleApplyDiscount = async () => {
    let { data_list, discount_price_txt, is_percentage } = this.state;

    if (Number(discount_price_txt) > 0) {
      if (Number(is_percentage) == 1) {
        if (data_list.disc_reason && data_list.disc_reason != "") {
          if (
            Number(data_list.disc_reason) != 182 ||
            (Number(data_list.disc_reason) == 182 &&
              data_list.discreason_txt != "")
          ) {
            data_list["discount_amt"] = Number(
              (Number(data_list["discount_price"]).toFixed(2) / 100) *
                Number(discount_price_txt)
            ).toFixed(2);

            data_list["discount"] = Number(
              (Number(data_list["discount_amt"]).toFixed(2) /
                Number(data_list["discount_price"]).toFixed(2)) *
                100
            ).toFixed(2);
            await this.setState({ data_list });
          } else {
            Toast({
              type: "error",
              message: "Please Enter Discount Reason Text",
            });
            return false;
          }
        } else {
          Toast({
            type: "error",
            message: "Please select Discount Reason",
          });
          return false;
        }
      } else if (Number(is_percentage) == 2) {
        if (data_list.disc_reason && data_list.disc_reason != "") {
          if (
            Number(data_list.disc_reason) != 182 ||
            (Number(data_list.disc_reason) == 182 &&
              data_list.discreason_txt != "")
          ) {
            data_list["discount_amt"] = Number(discount_price_txt).toFixed(2);
            data_list["discount"] = null;
            await this.setState({ data_list });
          } else {
            Toast({
              type: "error",
              message: "Please Enter Discount Reason Text",
            });
            return false;
          }
        } else {
          Toast({
            type: "error",
            message: "Please select Discount Reason",
          });
          return false;
        }
      } else {
        Toast({
          type: "error",
          message: "Please select Discount Type",
        });
        return false;
      }

      let body = {
        discount: Number(data_list.discount),
        discount_amt: Number(data_list.discount_amt),
        disc_reason: Number(data_list.disc_reason),
        discreason_txt: data_list.discreason_txt,
      };
      this.props
        .commonUpdateApi(
          `itemcart/${this.props.cartId}/?disc_add=1&disc_reset=0&auto=${
            data_list.autoProportion ? 1 : 0
          }`,
          body
        )
        .then((key) => {
          let { status, data } = key;
          console.log(key, "apply discount response");
          if (status == "200" || status == "201") {
            this.getCourseTableList();
            // if (data_list["autoProportion"]) {
            //   this.handleProportiononDiscountChange();
            // }
          }
        });
    } else {
      Toast({
        type: "error",
        message: "Discount should be greater than zero",
      });
      return false;
    }
  };

  handleResetDiscount = async () => {
    let { data_list } = this.state;
    let body = {
      discount: Number(data_list.discount),
      discount_amt: Number(data_list.discount_amt),
      disc_reason: Number(data_list.disc_reason),
      discreason_txt: data_list.discreason_txt,
    };

    this.props
      .commonUpdateApi(
        `itemcart/${this.props.cartId}/?disc_add=0&disc_reset=1&auto=${
          data_list.autoProportion ? 1 : 0
        }`,
        body
      )
      .then((key) => {
        console.log(key, "handleresetDiscount");
        this.getCourseTableList();
      });
  };
  render() {
    let {
      data_list,
      headerDetails,
      is_percentage,
      discount_reason_options,
      discount_reasons,
      is_total,
      discount_price_txt,
      discType,
    } = this.state;
    let {
      deposit,
      discount,
      discount_amt,
      discount_price,
      free_sessions,
      id,
      itemdesc,
      price,
      quantity,
      tmp_treatment,
      total_price,
      trans_amt,
      treatment_no,
      outstanding,
      disc_reason,
      discreason_txt,
      autoProportion,
    } = data_list;
    let { t } = this.props;
    return (
      <>
        <div className="container-fluid mb-4">
          <div className="row pl-3">
            <div className="col-md-10 col-12">
              <h4>{t("Course Page")}</h4>
            </div>

            <div className="col-md-2 col-12">
              <NormalButton
                mainbg={false}
                className="col-12 fs-15 submit-btn"
                label="Done "
                onClick={this.handleSubmit}
              />
            </div>
          </div>

          <div className="row pl-5 pr-5 mt-4">
            <div className="row mb-3">
              <div className="col-md-3 col-12">
                <label className="text-left text-black common-label-text pb-2">
                  {t("Course")}
                </label>
                <div className="input-group">
                  <NormalInput placeholder="" value={itemdesc} disabled />
                </div>
              </div>

              <div className="col-md col-12">
                <label className="text-left text-black common-label-text  pb-2">
                  {t("No.of.Treatments")}
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder=""
                    value={treatment_no ? treatment_no : ""}
                    type="number"
                    name="treatment_no"
                    onChange={this.handleChange}
                    onBlur={this.handleQuantityCount}
                  />
                </div>
              </div>
              <div className="col-md col-12">
                <label className="text-left text-black common-label-text  pb-2">
                  {t("Free Sessions")}
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder=""
                    value={free_sessions ? free_sessions : ""}
                    type="number"
                    name="free_sessions"
                    onChange={this.handleChange}
                    onBlur={this.handleQuantityCount}
                  />
                </div>
              </div>

              <div className="col-md col-12">
                <label className="text-left text-black common-label-text  pb-2">
                  {t("Quantity")}
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder=""
                    value={quantity ? quantity : ""}
                    type="number"
                    name="quantity"
                    onChange={() => {}}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md col-12">
                <label className="text-left text-black common-label-text pb-2">
                  {t("Unit Price")}
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder=""
                    value={price}
                    type="number"
                    name="price"
                    onChange={this.handleChange}
                    disabled
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center align-self-end">
                <NormalButton
                  mainbg={true}
                  label="Apply"
                  onClick={this.handleTreatmentCountUpdate}
                />
              </div>
              <div className="d-flex justify-content-center align-self-end">
                <NormalButton
                  mainbg={true}
                  className={`ml-1`}
                  label="Reset"
                  onClick={this.handleReset}
                />
              </div>
            </div>
            <div className="row w-100 mb-3">
              <div className="col-md-8 p-0">
                <div className="d-flex flex-wrap mb-2 border p-2">
                  <div className="col-md-2 col-12">
                    <label className="text-left text-black common-label-text pb-2">
                      {t("Discount")}
                    </label>
                    <div className="input-group">
                      <NormalInput
                        placeholder=""
                        value={discount_price_txt}
                        type="number"
                        name="discount_price_txt"
                        onChange={this.handleChange}
                        disabled={
                          tmp_treatment.length < 0 || !is_total ? false : true
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-2 col-12">
                    <div className="row">
                      <label className="text-left text-black common-label-text pb-2">
                        {t("Type")}
                      </label>
                      <div className="input-group">
                        <NormalSelect
                          className={`col`}
                          options={discType}
                          value={is_percentage}
                          name="is_percentage"
                          onChange={this.handleChange}
                          disabled={is_total ? true : false}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 col-12">
                    <label className="text-left text-black common-label-text pb-2">
                      {t("Disc. Reason")}
                    </label>
                    <div className="input-group">
                      <NormalSelect
                        options={discount_reason_options}
                        value={disc_reason}
                        name="disc_reason"
                        onChange={this.handleChange}
                        disabled={is_total ? true : false}
                      />
                    </div>
                  </div>
                  {disc_reason == "182" ? (
                    <div className="col-md-4 col-12">
                      <label className="text-left text-black common-label-text ">
                        {t("Discount reason")}
                      </label>
                      <div className="input-group mb-2">
                        <NormalTextarea
                          value={discreason_txt}
                          name="discreason_txt"
                          onChange={this.handleChange}
                          className="w-100"
                          disabled={is_total ? true : false}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col-md-4 mt-4 pt-2 col-12">
                    <NormalButton
                      mainbg={true}
                      className="col fs-10"
                      label="Apply Disc."
                      onClick={this.handleApplyDiscount}
                      disabled={
                        is_total || tmp_treatment.length < 0 ? true : false
                      }
                    />
                  </div>
                </div>
                <div className="d-flex flex-wrap mb-2 mt-2">
                  <div className="col-md-7 justify-content-start col-12 mr-5 mt-2">
                    <label className="fw-500">{t("Discount List")}</label>
                  </div>
                  {discount_reasons && discount_reasons.length > 0 ? (
                    <div className="col-md-4 pt-2 col-12 justify-content-end">
                      <NormalButton
                        mainbg={true}
                        className="col fs-10"
                        label="Reset Disc."
                        onClick={this.handleResetDiscount}
                        disabled={is_total ? true : false}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="d-flex flex-wrap">
                  <div className="col-md-12 w-100 bg-light p-3 border">
                    {discount_reasons &&
                      discount_reasons.length > 0 &&
                      discount_reasons.map((item, index) => {
                        return (
                          <div className="row" key={index}>
                            <div className="col-6">
                              <label className="text-left text-black common-label-text pb-2">
                                {item.remark}
                              </label>
                            </div>
                            <div className="col-2">
                              <label className="text-left text-black common-label-text pb-2">
                                {item.disc_per} %
                              </label>
                            </div>
                            <div className="col-2">
                              <label className="text-left text-black common-label-text pb-2">
                                $ {item.disc_amt}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    {!discount_reasons || discount_reasons.length <= 0 ? (
                      <div className="row">{t("No record found")}</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="row p-0 m-0">
                  <div className="col-md-6 d-flex justify-content-center align-self-end">
                    <NormalCheckbox
                      name="autoProportion"
                      label="Auto Proportion"
                      checked={autoProportion}
                      value={autoProportion}
                      onChange={(e) => this.handleProportionChange(e)}
                      disabled={
                        tmp_treatment && tmp_treatment.length > 0 ? false : true
                      }
                    />
                  </div>
                  <div className="col-md-6 col-12">
                    <label className="text-left text-black common-label-text pb-1 pt-1">
                      {t("Disc. Price")}
                    </label>
                    <div className="input-group">
                      <NormalInput
                        placeholder=""
                        value={discount_price}
                        name="discount_price"
                        onChange={() => {}}
                        disabled={true}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <label className="text-left text-black common-label-text pb-1 pt-1">
                      {t("Total Price")}
                    </label>
                    <div className="input-group">
                      <NormalInput
                        placeholder=""
                        value={trans_amt}
                        name="trans_amt"
                        type="number"
                        onChange={this.handleChange}
                        disabled={tmp_treatment.length > 0 ? false : true}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 col-12 d-flex justify-content-center align-self-end">
                    {discount_reasons && discount_reasons.length > 0 ? null : (
                      <div className="">
                        <NormalButton
                          mainbg={true}
                          label="Change"
                          onClick={this.handleTotalPriceChange}
                          disabled={tmp_treatment.length > 0 ? false : true}
                        />
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 col-12 pb-1 pt-1">
                    <label className="text-left text-black common-label-text">
                      {t("Deposit")}
                    </label>
                    <div className="input-group">
                      <NormalInput
                        placeholder=""
                        value={deposit}
                        type="number"
                        name="deposit"
                        onChange={this.handleChange}
                        onBlur={this.handleDepositAmount}
                        disabled={tmp_treatment.length > 0 ? false : true}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 col-12 pb-1 pt-1">
                    <label className="text-left text-black common-label-text">
                      {t("Outstanding")}
                    </label>
                    <div className="input-group">
                      <NormalInput
                        placeholder=""
                        value={outstanding ? outstanding : ""}
                        type="number"
                        name="outstanding"
                        onChange={() => {}}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="table mb-2">
              <TableWrapper headerDetails={headerDetails}>
                {tmp_treatment && tmp_treatment.length > 0 ? (
                  tmp_treatment.map((item, index) => {
                    let { slno, program, next_appt, unit_amount } = item;
                    return (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {slno}
                          </div>
                        </td>

                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {program}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {next_appt}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {unit_amount}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="12">
                      <div className="d-flex align-items-center justify-content-center">
                        {`No record found`}
                      </div>
                    </td>
                  </tr>
                )}
              </TableWrapper>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCommonApi,
      commonPatchApi,
      commonCreateApi,
      commonUpdateApi,
    },
    dispatch
  );
};
export const CoursePopup = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CoursePopupClass)
);
