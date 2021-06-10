import React, { Component } from "react";
import {
  NormalInput,
  NormalButton,
  NormalSelect,
  NormalModal,
} from "component/common";
import { getPayment, createPayment } from "redux/actions/payment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { history } from "helpers";
import { getCommonApi } from "redux/actions/common";
import { dateFormat } from "service/helperFunctions";
import "./style.scss";
import SimpleReactValidator from "simple-react-validator";
import Label from "reactstrap/lib/Label";
import closeIcon from "assets/images/close.png";
import deleteIcon from "assets/images/delete.jpg";
import helpers from "../../../../service/Helper";
const moment = require("moment");
export class MakePaymentClass extends Component {
  state = {
    formFields: {
      name: "",
      contact: "",
      address: "",
      searchStaff: "",
      payTableDropDownValue: "",
    },
    responseData: {},

    premisesOption: [],
    selectedCards: [],
    selectedCardsPayAmount: 0,
    cardOption: [],
    ewalletoptions: [],

    ewalletField: {
      pay_typeid: null,
      pay_amt: "",
      credit_debit: true,
    },
    cardField: {
      pay_typeid: null,
      pay_amt: "",
      credit_debit: true,
      pay_rem1: "",
      pay_rem2: "",
      pay_rem3: "",
      pay_rem4: "",
    },
    balance: 0,
    errorMessage: "123",
    prepaidCustomerData: [],
    voucherCustomerData: [],
    creditNoteCustomerData: [],
    accountHeader: [],
    isMakePaymentButtonClicked: "false",
    isTreatmentDoneButton: true,
    itemProductAmount: 0,
    itemServiceAmount: 0,
    itemProductServiceVoucherAmount: 0,
    displayTablePrepaid: [],
    displayTableCreditNote: [],
    displayTableVoucher: [],
    paytableData: [],
    paytableFullData: [],
    payGroupData: [],
    selectPaymentGroup: "",
    selectPaymentGroupId: "",
    isSelectedPaymentType: "",
    displayModelPaymentType:"",
    txtUserPayAmount: 0,
    isOpenSubPayment: false,
  };

  componentDidMount() {
    this.getPayment();
    this.getPayGroup();
    this.getFullPayTable();
    this.getPrepaidData();
    this.getCreditNoteAccountData("");
    this.getVoucherData("");
  }
  componentWillMount = () => {
    this.validator = new SimpleReactValidator({
      element: (message) => (
        <span className="error-message text-danger validNo fs14">
          {message}
        </span>
      ),
      autoForceUpdate: this,
    });
  };
  // get method for payment detail against appointment
  getPayment = () => {
    let { id, cartId, cartData } = this.props;
    //id = 82318;
    //cartId = "ICMD100226";
    //cartData={"status":200,"message":"Listed Succesfully","error":false,"data":[{"id":57500,"cust_noid":82318,"customer":"test17011","customercode":"021427HQ","cart_id":"ICHQ100234","cart_date":"2021-03-14","cart_status":"Inprogress","lineno":1,"check":"New","itemcodeid":10067,"itemdesc":"Short - Chin Length(Before Shoulder) 128","quantity":1,"price":"128.00","total_price":"128.00","sitecodeid":31,"sitecode_name":"HQ OFFICE (DEMO)","sitecode":"HQ","discount":"0.00","discount_amt":0,"discount_price":"128.00","additional_discount":0,"additional_discountamt":0,"deposit":"128.00","trans_amt":"128.00","tax":0,"itemstatus":null,"ratio":"100.000000000000000","helper_name":null,"done_sessions":null,"type":"Deposit","treatment_account":null,"treatment":null,"deposit_account":null,"prepaid_account":null,"item_uom":null,"recorddetail":"Service","itemtype":"SINGLE","item_class":"HERBAL TREATMENT","sales_staff":"SEQ ADMIN","service_staff":"","total_disc":"0.00","treatment_name":"Short - Chin Length(Before Shoulder) 128  (1)","item_name":"Short - Chin Length(Before Shoulder) 128"}],"subtotal":"128.00","discount":"0.00","trans_amt":"128.00","deposit_amt":"128.00","billable_amount":"128.00"}
    if (id) {
      this.props
        .getPayment(
          `?cart_date=${dateFormat(
            new Date(),
            "yyyy-mm-dd"
          )}&cust_noid=${id}&cart_id=${cartId}`
        )
        .then((res) => {
          this.setState({
            responseData: res.data,
            balance: Number(res.data.billable_amount),
            txtUserPayAmount: Number(res.data.billable_amount),
          });
        });
    } else {
      // history.push("/admin/cart");
    }

    //let {cartData} = this.props;
    let stringifiedCartData = cartData.data;
    let {
      itemProductAmount,
      itemServiceAmount,
      itemProductServiceVoucherAmount,
    } = this.state;
    if (stringifiedCartData) {
      stringifiedCartData.map((item) => {
        //alert(JSON.stringify(item));
        if (item.recorddetail === "Product") {
          itemProductAmount += parseFloat(item.total_price);
        }
        if (item.recorddetail === "Service") {
          itemServiceAmount += parseFloat(item.total_price);
        }
        if (
          item.recorddetail === "Product" ||
          item.recorddetail === "Service" ||
          item.recorddetail === "Voucher"
        ) {
          itemProductServiceVoucherAmount += parseFloat(item.total_price);
        }
      });
    }
    this.setState({
      itemProductAmount,
      itemServiceAmount,
      itemProductServiceVoucherAmount,
    });
  };
  getPrepaidData = () => {
    this.getPrepaidAccountData("");
  };

  getVoucherData = (api) => {
    this.props
      .getCommonApi(`voucher/?cust_id=${this.props.id}${api}`)
      .then((key) => {
        let { data } = key;
        let { voucherCustomerData } = this.state;
        voucherCustomerData = data;
        console.log("voucherCustomerData", data);
        // accountHeader = header_data;
        this.setState({ voucherCustomerData }, () => {
          console.log("test");
          this.HideVoucherTableData();
        });
      });
  };
  getPrepaidAccountData = (api) => {
    this.props
      .getCommonApi(`prepaidacclist/?cust_id=${this.props.id}${api}`)
      .then((key) => {
        let { data } = key;
        let { prepaidCustomerData } = this.state;
        prepaidCustomerData = data;
        console.log("prepaidCustomerData", data);
        // accountHeader = header_data;
        this.setState({ prepaidCustomerData }, () => {
          this.HidePrepaidTableData();
        });
      });
  };
  getCreditNoteAccountData = (api) => {
    this.props
      .getCommonApi(`creditnotelist/?cust_id=${this.props.id}${api}`)
      .then((key) => {
        let { data } = key;
        let { creditNoteCustomerData } = this.state;
        creditNoteCustomerData = data;
        // accountHeader = header_data;
        this.setState({ creditNoteCustomerData }, () => {
          this.HideCreditNoteTableData();
        });
      });
  };

  getPayGroup = () => {
    this.props.getCommonApi(`paygroup/`).then((res) => {
      let { payGroupData } = this.state;
      for (let key of res.data) {
        payGroupData.push({
          label: key.pay_group_code,
          value: key.id,
          picturelocation: key.picturelocation,
        });
      }
      this.setState({
        payGroupData,
      });
    });
  };
  getFullPayTable = () => {
    this.props.getCommonApi(`paytablenew/`).then((res) => {
      let { paytableFullData } = this.state;
      paytableFullData = res.data;
      this.setState({
        paytableFullData,
      });
    });
  };

  getPayTableNameBasedOnId = (payTableId) => {
    let { paytableFullData } = this.state;
    const test = paytableFullData.filter((res) => res.id == payTableId);
    return test[0].pay_description;
  };

  handleChangeTextBox(event) {
    this.setState({
      txtUserPayAmount: event.target.value,
    });
  }

  handleChange = ({ target: { value, name } }) => {
    let formFields = Object.assign({}, this.state.formFields);

    formFields[name] = value;
    this.setState({
      formFields,
    });
    let {
      balance,
      selectedCards,
      txtUserPayAmount,
      isOpenSubPayment,
    } = this.state;
    isOpenSubPayment = false;
    selectedCards.push({
      pay_typeid: value,
      pay_amt: parseFloat(txtUserPayAmount),
      credit_debit: false,
      pay_premise: true,
      prepaid: false,
    });
    balance = parseFloat(balance - txtUserPayAmount).toFixed(2);
    txtUserPayAmount = balance;
    this.setState({ txtUserPayAmount, balance, isOpenSubPayment });
  };
  handleCreditChange = ({ target: { value, name } }) => {
    let cardField = Object.assign({}, this.state.cardField);

    cardField[name] = value;
    this.setState({
      cardField,
    });
  };
  handleTreatmentDone = () => {
    let { selectedCards } = this.state;
    selectedCards.push({
      pay_typeid: 2,
      pay_amt: 0,
      credit_debit: false,
      pay_premise: true,
      prepaid: false,
    });
    let data = selectedCards;
    let { id, cartId } = this.props;
    this.props
      .createPayment(
        `?cart_date=${dateFormat(
          new Date(),
          "yyyy-mm-dd"
        )}&cust_noid=${id}&cart_id=${cartId}`,
        data
      )
      .then((res) => {
        history.push(`/admin/billing/print/bill/${res.data.sa_transacno}`);
      });
  };
  // create payment detail
  handleSubmit = () => {
    let { selectedCards } = this.state;

    this.setState({ isMakePaymentButtonClicked: "true" });
    let data = selectedCards;
    console.log("SubmitData", data);
      let { id, cartId } = this.props;
    this.props
      .createPayment(
        `?cart_date=${dateFormat(
          new Date(),
          "yyyy-mm-dd"
        )}&cust_noid=${id}&cart_id=${cartId}`,
        data
      )
      .then((res) => {
        history.push(`/admin/billing/print/bill/${res.data.sa_transacno}`);
      });
  };

  checkPayTypeIdAlreadyExists(val) {
    return this.state.selectedCards.some((item) => val === item.pay_typeid);
  }
  addCreditCard = async () => {
    if (!this.validator.fieldValid("cardFieldType")) {
      this.validator.showMessageFor("cardFieldType");
      return;
    }

    let {
      cardField,
      selectedCards,
      balance,
      responseData,
      txtUserPayAmount,
    } = this.state;
    let userPayAmount = parseFloat(txtUserPayAmount);
    if (parseFloat(this.state.responseData.billable_amount) > 0) {
      if (userPayAmount == 0) {
        return;
      }
    }
    if (this.checkPayTypeIdAlreadyExists(cardField.pay_typeid)) {
      alert(
        this.getPayTableNameBasedOnId(cardField.pay_typeid) + " already exists"
      );
      return;
    } else {
      selectedCards.push({
        pay_typeid: cardField.pay_typeid,
        pay_amt: userPayAmount,
        credit_debit: true,
        pay_premise: false,
        pay_rem1: cardField.pay_rem1,
        pay_rem2: cardField.pay_rem2,
        pay_rem3: cardField.pay_rem3,
        pay_rem4: cardField.pay_rem4,
        prepaid: false,
      });
    }

    balance = parseFloat(balance - userPayAmount).toFixed(2);
    this.setState({ isOpenSubPayment: false });
    this.setBalanceToAllTextBoxes(balance);
  };

  addPrepaid = (selectedPrepaid) => {
    const prepaidExpDate = moment(selectedPrepaid.exp_date).format(
      "YYYY-MM-DD"
    );
    const todaysDate = moment(new Date()).format("YYYY-MM-DD");
    const isValid = moment(todaysDate).isSameOrAfter(prepaidExpDate);
    let userPayAmount = 0;
    let {
      itemServiceAmount,
      itemProductAmount,
      itemProductServiceVoucherAmount,
      txtUserPayAmount,
    } = this.state;
    userPayAmount = parseFloat(txtUserPayAmount);
    if (isValid) {
      alert("Check Expiry Date");
      return;
    }
    if (userPayAmount <= 0) {
      // alert("hi");
      return;
    }

    const selectedRemainingPrepaidAmount = parseFloat(selectedPrepaid.remain);
    if (selectedRemainingPrepaidAmount < userPayAmount) {
      //return
    }
    /*
    if (!this.validator.fieldValid("PrepaidBalanceAmount")) {
      this.validator.showMessageFor("PrepaidBalanceAmount");
      return;
    }
    if (!this.validator.fieldValid("PrepaidBalanceAmount")) {
      this.validator.showMessageFor("PrepaidBalanceAmount");
      return;
    }
*/
    if (selectedPrepaid.conditiontype1 === "Service Only") {
      //For Service
      if (parseFloat(itemServiceAmount) == 0) {
        return;
      }
      if (parseFloat(itemServiceAmount) <= selectedRemainingPrepaidAmount) {
        userPayAmount =
          parseFloat(txtUserPayAmount) < parseFloat(itemServiceAmount)
            ? parseFloat(txtUserPayAmount)
            : parseFloat(itemServiceAmount);
      } else {
        userPayAmount = selectedRemainingPrepaidAmount;
      }
      itemServiceAmount = itemServiceAmount - userPayAmount;
      this.setState({ itemServiceAmount });
    } else if (selectedPrepaid.conditiontype1 === "Product Only") {
      //For Product
      if (parseFloat(itemProductAmount) == 0) {
        return;
      }
      if (parseFloat(itemProductAmount) <= selectedRemainingPrepaidAmount) {
        userPayAmount =
          parseFloat(txtUserPayAmount) < parseFloat(itemProductAmount)
            ? parseFloat(txtUserPayAmount)
            : parseFloat(itemProductAmount);
      } else {
        userPayAmount = selectedRemainingPrepaidAmount;
      }
      itemProductAmount = itemProductAmount - userPayAmount;
      this.setState({ itemProductAmount });
    } else {
      if (parseFloat(itemProductServiceVoucherAmount) == 0) {
        return;
      }
      if (
        parseFloat(itemProductServiceVoucherAmount) <=
        selectedRemainingPrepaidAmount
      ) {
        userPayAmount =
          parseFloat(txtUserPayAmount) <
          parseFloat(itemProductServiceVoucherAmount)
            ? parseFloat(txtUserPayAmount)
            : parseFloat(itemProductServiceVoucherAmount);
      } else {
        userPayAmount = selectedRemainingPrepaidAmount;
      }
      itemProductServiceVoucherAmount =
        itemProductServiceVoucherAmount - userPayAmount;
      this.setState({ itemProductServiceVoucherAmount });
    }
    if (userPayAmount == 0) {
      return;
    }
    const payTypeId = 23;
    let {
      cardField,
      ewalletField,
      balance,
      selectedCards,
      isOpenSubPayment,
    } = this.state;

    selectedCards.push({
      pay_typeid: payTypeId,
      prepaid: true,
      pay_amt: userPayAmount,
      credit_debit: false,
      pay_premise: false,
      pay_rem1:
        selectedPrepaid.pp_no +
        " - " +
        selectedPrepaid.line_no +
        " - " +
        selectedPrepaid.pp_desc,
      pay_rem2: selectedPrepaid.id,
      prepaid_ct: selectedPrepaid.conditiontype1,
    });
    console.log(
      "BeforeAdd-displayTablePrepaid",
      this.state.displayTablePrepaid
    );
    let setdisplayTablePrepaid = this.state.displayTablePrepaid;
    setdisplayTablePrepaid.push(selectedPrepaid.id);
    this.setState({ displayTablePrepaid: setdisplayTablePrepaid });
    console.log("AfterAdd-displayTablePrepaid", this.state.displayTablePrepaid);
    this.HidePrepaidTableData();

    balance = parseFloat(balance - userPayAmount).toFixed(2);
    this.setBalanceToAllTextBoxes(balance);
    this.setState({ isOpenSubPayment: false });
  };
  HidePrepaidTableData() {
    let { prepaidCustomerData, displayTablePrepaid } = this.state;
    displayTablePrepaid.map((item) => {
      var selectedPrepaid = prepaidCustomerData.filter(
        (prepaid) => prepaid.id != item
      );
      this.setState({ prepaidCustomerData: selectedPrepaid });
    });
  }
  HideCreditNoteTableData() {
    let { creditNoteCustomerData, displayTableCreditNote } = this.state;
    displayTableCreditNote.map((item) => {
      var selectedCreditNote = creditNoteCustomerData.filter(
        (creditNote) => creditNote.credit_code != item
      );
      this.setState({ creditNoteCustomerData: selectedCreditNote });
    });
  }
  HideVoucherTableData() {
    let { voucherCustomerData, displayTableVoucher } = this.state;
    displayTableVoucher.map((item) => {
      var selectedVoucher = voucherCustomerData.filter(
        (voucher) => voucher.voucher_no != item
      );
      this.setState({ voucherCustomerData: selectedVoucher });
    });
  }
  addVoucher = (selectedVoucher) => {
    let {
      cardField,
      ewalletField,
      balance,
      txtUserPayAmount,
      isOpenSubPayment,
      selectedCards,
    } = this.state;
    if (txtUserPayAmount == 0) {
      return;
    }
    const selectedVoucherAmount = parseFloat(selectedVoucher.value);
    let pay_amt_setup = 0;
    if (selectedVoucherAmount <= parseFloat(txtUserPayAmount)) {
      pay_amt_setup = selectedVoucherAmount;
    } else {
      alert("Partial Amount is not applicable in voucher");
      return;
    }
    const payTypeId = 9;

    selectedCards.push({
      pay_typeid: payTypeId,
      prepaid: false,
      pay_amt: parseFloat(pay_amt_setup),
      credit_debit: false,
      pay_premise: false,
      pay_rem1: selectedVoucher.voucher_no,
      pay_rem2: selectedVoucher.voucher_no,
    });
    console.log(
      "BeforeAdd-displayTableVoucher",
      this.state.displayTableVoucher
    );
    let setdisplayTableVoucher = this.state.displayTableVoucher;
    setdisplayTableVoucher.push(selectedVoucher.voucher_no);
    this.setState({ displayTableVoucher: setdisplayTableVoucher });
    console.log(
      "AfterAdd-displayTableCreditNote",
      this.state.displayTableVoucher
    );
    this.HideVoucherTableData();

    balance = parseFloat(balance - pay_amt_setup).toFixed(2);
    this.setState({ isOpenSubPayment: false });
    this.setBalanceToAllTextBoxes(balance);
  };
  addCreditNote = (selectedCreditNote) => {
    let {
      cardField,
      ewalletField,
      balance,
      txtUserPayAmount,
      selectedCards,
    } = this.state;
    if (txtUserPayAmount == 0) {
      return;
    }
    const selectedCreditNoteAmount = parseFloat(selectedCreditNote.balance);
    let pay_amt_setup = 0;
    if (selectedCreditNoteAmount <= parseFloat(txtUserPayAmount)) {
      pay_amt_setup = selectedCreditNoteAmount;
    } else {
      pay_amt_setup = txtUserPayAmount;
    }
    const payTypeId = 17;

    selectedCards.push({
      pay_typeid: payTypeId,
      prepaid: false,
      pay_amt: parseFloat(pay_amt_setup),
      credit_debit: false,
      pay_premise: false,
      pay_rem1: selectedCreditNote.credit_code,
      pay_rem2: selectedCreditNote.transaction,
    });
    console.log(
      "BeforeAdd-displayTableCreditNote",
      this.state.displayTableCreditNote
    );
    let setdisplayTableCreditNote = this.state.displayTableCreditNote;
    setdisplayTableCreditNote.push(selectedCreditNote.credit_code);
    this.setState({ displayTableCreditNote: setdisplayTableCreditNote });
    console.log(
      "AfterAdd-displayTableCreditNote",
      this.state.displayTableCreditNote
    );
    this.HideCreditNoteTableData();

    balance = parseFloat(balance - pay_amt_setup).toFixed(2);
    this.setState({ isOpenSubPayment: false });
    this.setBalanceToAllTextBoxes(balance);
  };

  setBalanceToAllTextBoxes(balance) {
    this.setState({
      balance: balance,
      txtUserPayAmount: balance,
    });
  }

  removeCards = (idx) => () => {
    let {
      selectedCards,
      balance,
      cardField,
      ewalletField,
      itemProductServiceVoucherAmount,
      itemProductAmount,
      itemServiceAmount,
    } = this.state;
    this.setState({ isMakePaymentButtonClicked: "false" });
    balance = parseFloat(balance) + parseFloat(idx.pay_amt);
    var array = [...selectedCards]; // make a separate copy of the array
    var index = array.indexOf(idx);
    if (idx.pay_typeid == 23) {
      if (idx.prepaid_ct == "Product Only") {
        itemProductAmount = itemProductAmount + idx.pay_amt;
      } else if (idx.prepaid_ct == "Service Only") {
        itemServiceAmount = itemServiceAmount + idx.pay_amt;
      } else {
        itemProductServiceVoucherAmount =
          itemProductServiceVoucherAmount + idx.pay_amt;
      }
      this.setState({
        itemProductServiceVoucherAmount,
        itemProductAmount,
        itemServiceAmount,
      });
    }
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ selectedCards: array, balance });
    }
    //console.log("idx", idx);
    var removedTerm = idx.pay_typeid;
    //console.log("removedTerm", removedTerm);
    //console.log("idx.pay_rem2", idx.pay_rem2);
    if (removedTerm == "23") {
      const items = this.state.displayTablePrepaid;
      console.log("BeforeRemove-displayTablePrepaid", items);
      const valueToRemove = idx.pay_rem2; //For Prepaid Ony we have added unique id here
      console.log("BeforeRemove-valueToRemove", valueToRemove);
      const filteredItems = items.filter((item) => item !== valueToRemove);
      this.setState({ displayTablePrepaid: filteredItems }, () => {
        console.log(
          "AfterRemove-displayTablePrepaid",
          this.state.displayTablePrepaid
        );
      });
      this.getPrepaidAccountData("");
      // this.HidePrepaidTableData();
    }
    if (removedTerm == "17") {
      const items = this.state.displayTableCreditNote;
      console.log("BeforeRemove-displayTableCreditNote", items);
      const valueToRemove = idx.pay_rem1; //For Credit Note Ony we have added unique id here
      console.log("BeforeRemove-valueToRemove", valueToRemove);
      const filteredItems = items.filter((item) => item !== valueToRemove);
      this.setState({ displayTableCreditNote: filteredItems }, () => {
        console.log(
          "AfterRemove-displayTableCreditNote",
          this.state.displayTableCreditNote
        );
      });
      this.getCreditNoteAccountData("");
      // this.HidePrepaidTableData();
    }

    if (removedTerm == "9") {
      const items = this.state.displayTableVoucher;
      console.log("BeforeRemove-displayTableVoucher", items);
      const valueToRemove = idx.pay_rem1; //For Credit Note Ony we have added unique id here
      console.log("BeforeRemove-valueToRemove", valueToRemove);
      const filteredItems = items.filter((item) => item !== valueToRemove);
      this.setState({ displayTableVoucher: filteredItems }, () => {
        console.log(
          "AfterRemove-displayTableVoucher",
          this.state.displayTableVoucher
        );
      });
      this.getVoucherData("");
    }
    cardField["pay_amt"] = balance;
    ewalletField["pay_amt"] = balance;
    this.setBalanceToAllTextBoxes(balance);
  };
  checkTypeOfCartItemContainsDeposit(cartData) {
    let stringifiedCartData = cartData.data;
    if (stringifiedCartData) {
      stringifiedCartData.map((item) => {
        if (item.type === "Deposit" || item.type === "Top Up") {
          this.state.isTreatmentDoneButton = false;
        }
      });
    }
  }
  // Function New code from 17/March/2020
  addNewPaymentData = async (selPayTypeId, selPayTypeName) => {
    if (!this.validator.fieldValid("Amount")) {
      this.validator.showMessageFor("Amount");
      return;
    }
    if (!this.validator.fieldValid("Amount")) {
      this.validator.showMessageFor("Amount");
      return;
    }

    this.props
      .getCommonApi(`paytablenew/?paygroupid=${selPayTypeId}`)
      .then((res) => {
        this.setState({
          paytableData: [],
        });
        let { paytableData, isSelectedPaymentType,displayModelPaymentType } = this.state;
        isSelectedPaymentType = selPayTypeName.trim();
        displayModelPaymentType=selPayTypeName.trim();
        for (let key of res.data) {
          paytableData.push({ label: key.pay_description, value: key.id });
        }
        this.setState(
          {
            paytableData,
          },
          () => {
            let { isOpenSubPayment } = this.state;
            if (paytableData.length == 0) {
              alert("Pay Table Not Exists");
              return;
            } else if (selPayTypeName.trim() === "VOUCHER") {
              isOpenSubPayment = true;
            } else if (selPayTypeName.trim() === "PREPAID") {
              isOpenSubPayment = true;
            } else if (selPayTypeName.trim() === "Credit") {
              isOpenSubPayment = true;
            } else if (selPayTypeName.trim() === "CARD") {
              isOpenSubPayment = true;
            } else if (paytableData.length == 1) {
              isOpenSubPayment = false;
              let payTypeId = paytableData[0].value;
              let { balance, selectedCards, txtUserPayAmount } = this.state;
              if (parseFloat(this.state.responseData.billable_amount) > 0) {
                if (parseFloat(txtUserPayAmount) == 0) {
                  return;
                }
              }
              if (this.checkPayTypeIdAlreadyExists(payTypeId)) {
                alert(
                  this.getPayTableNameBasedOnId(payTypeId) + " already exists"
                );
                //alert("Already Exists");
                return;
              } else {
                selectedCards.push({
                  pay_typeid: payTypeId,
                  pay_amt: parseFloat(txtUserPayAmount),
                  credit_debit: false,
                  pay_premise: true,
                  prepaid: false,
                });
                balance = parseFloat(balance - txtUserPayAmount).toFixed(2);
                txtUserPayAmount = balance;
                this.setState({ txtUserPayAmount, balance });
                return;
              }
            } else if (paytableData.length >= 1) {
              isOpenSubPayment = true;
              isSelectedPaymentType = "Multiple";
            }
            this.setState({ isOpenSubPayment, isSelectedPaymentType,displayModelPaymentType });
          }
        );
      });
  };

  handleDialog = async () => {
    let { isOpenSubPayment } = this.state;
    isOpenSubPayment = false;
    await this.setState({
      isOpenSubPayment,
    });
  };

  handleChangeCard = async ({ target: { value, name } }) => {
    let cardField = Object.assign({}, this.state.cardField);

    cardField[name] = value;

    await this.setState({
      cardField,
    });
  };
  render() {
    let {
      responseData,
      balance,
      isTreatmentDoneButton,
      payGroupData,
      paytableData,
      isOpenSubPayment,
      isSelectedPaymentType,
      displayModelPaymentType,
      cardField,
    } = this.state;
    let { payTableDropDownValue } = this.state.formFields;
    let insideRadioButtonData;

    if (isSelectedPaymentType == "VOUCHER") {
      insideRadioButtonData = (
        <div>
          <table className="table table-bordered">
            <tr>
              <td>Vocucher No</td>
              <td>Value</td>
              <td>Exp.Date</td>
            </tr>
            {this.state.voucherCustomerData.map((selectedVoucher, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={this.addVoucher.bind(this, selectedVoucher)}
              >
                <td>{selectedVoucher.voucher_no}</td>
                <td>{selectedVoucher.value}</td>
                <td>{selectedVoucher.issued_expiry_date}</td>
              </tr>
            ))}
          </table>
        </div>
      );
    } else if (isSelectedPaymentType == "PREPAID") {
      insideRadioButtonData = (
        <div>
          <table className="table table-striped">
            <tr>
              <td>Category</td>
              <td>Amount</td>
              <td>Remaining</td>
              <td>InvoiceNo</td>
              <td>ExpDate</td>
              <td>ConditionType</td>
            </tr>
            {this.state.prepaidCustomerData.map((selectedPrepaid, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={this.addPrepaid.bind(this, selectedPrepaid)}
              >
                <td>{selectedPrepaid.pp_desc}</td>
                <td>{selectedPrepaid.pp_total}</td>
                <td>{selectedPrepaid.remain}</td>
                <td>{selectedPrepaid.prepaid}</td>
                <td>{selectedPrepaid.exp_date}</td>
                <td>{selectedPrepaid.conditiontype1}</td>
              </tr>
            ))}
          </table>
        </div>
      );
    } else if (isSelectedPaymentType == "Credit") {
      insideRadioButtonData = (
        <div>
          {" "}
          <table className="table table-striped">
            <tr>
              <td>Credit #</td>
              <td>Date</td>
              <td>Amount</td>
              <td>Balance</td>
              <td>Status</td>
            </tr>
            {this.state.creditNoteCustomerData.map((creditNote, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={this.addCreditNote.bind(this, creditNote)}
              >
                <td>{creditNote.credit_code}</td>
                <td>{creditNote.sa_date}</td>
                <td>{creditNote.amount}</td>
                <td>{creditNote.balance}</td>
                <td>{creditNote.status}</td>
              </tr>
            ))}
          </table>
        </div>
      );
    } else if (isSelectedPaymentType == "CARD") {
      insideRadioButtonData = (
        <div>
          <div className="row">
            <div className="col-5">
              <div className="input-group">
                Select Card
                <NormalSelect
                  placeholder="Search type..."
                  options={paytableData}
                  value={cardField.pay_typeid}
                  name="pay_typeid"
                  onChange={this.handleCreditChange}
                />
              </div>
              {this.validator.message(
                "cardFieldType",
                cardField.pay_typeid,
                "required"
              )}
            </div>

            <div className="col-5">
              <div className="input-group">
                Card No
                <NormalInput
                  value={cardField.pay_rem1}
                  name="pay_rem1"
                  onChange={this.handleChangeCard}
                />
              </div>
            </div>
            <div className="col-5">
              <div className="input-group">
                Name
                <NormalInput
                  value={cardField.pay_rem2}
                  name="pay_rem2"
                  onChange={this.handleChangeCard}
                />
              </div>
            </div>
            <div className="col-5">
              <div className="input-group">
                Exp Month
                <NormalInput
                  value={cardField.pay_rem3}
                  name="pay_rem3"
                  onChange={this.handleChangeCard}
                />
              </div>
            </div>
            <div className="col-5">
              <div className="input-group">
                Exp Year
                <NormalInput
                  value={cardField.pay_rem4}
                  name="pay_rem4"
                  onChange={this.handleChangeCard}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <div className="input-group">
                <NormalButton
                  mainbg={true}
                  className="col-12 mt-4 ml-2"
                  label="CONFIRM"
                  onClick={() => this.addCreditCard()}
                />
              </div>
            </div>
            <div className="col-2">
              <div className="input-group">
                <NormalButton
                  mainbg={true}
                  className="col-12 mt-4 ml-2"
                  label="CANCEL"
                  onClick={() => this.setState({ isOpenSubPayment: false })}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (isSelectedPaymentType == "Multiple") {
      insideRadioButtonData = (
        <div>
          <div className="row">
            <div className="col-5">
              <div className="input-group">
                <Label className="col-12 fs-15">Choose Option</Label>
                <NormalSelect
                  placeholder="Search type..."
                  options={paytableData}
                  value={payTableDropDownValue}
                  name="payTableDropDownValue"
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      insideRadioButtonData = <div></div>;
    }
    let payGroupDataContent = [];
    payGroupData.forEach((item, i) => {
      payGroupDataContent.push(
        <div className="col-md-1" style={{ width: "100px", margin: "50px" }}>
          <img
            src={helpers.getUrl() + "media/" + item.picturelocation}
            label={item.label}
            onClick={() => this.addNewPaymentData(item.value, item.label)}
            style={{cursor:'pointer'}}
          />
          <br />
          <center>
            <p
              style={{ width: "100px",textAlign: 'center'}}
            >
              {item.label}
            </p>
          </center>
        </div>
      );
    });

    let { cartData, tokenDetails } = this.props;
    this.checkTypeOfCartItemContainsDeposit(cartData);

    let userAddedPayTableData = (
      <table className="table table-bordered">
        {this.state.selectedCards.map((selectedCards, index) => (
          <tr key={index}>
            <td className="fs-18">
              {this.getPayTableNameBasedOnId(selectedCards.pay_typeid)}
            </td>
            <td className="fs-18" style={{ textAlign: "right" }}>
              {selectedCards.pay_amt.toFixed(2)}
            </td>
            <td>
              <img
                onClick={this.removeCards(selectedCards)}
                width="30px"
                height="30px"
                src={deleteIcon}
                alt=""
              />
            </td>
          </tr>
        ))}
      </table>
    );

    return (
      <>
        <div className="row">
          <NormalModal
            className={"payment-modal"}
            style={{ minWidth: "800px" }}
            modal={isOpenSubPayment}
            handleModal={this.handleDialog}
          >
            <img
              onClick={this.handleDialog}
              className="close cursor-pointer"
              src={closeIcon}
              alt=""
            />
            <center><p className="fs-18 f-600">{displayModelPaymentType}</p></center><br/>
            {insideRadioButtonData}
          </NormalModal>
          <div className="col-12 ">
            <div className="row ">
              <Label className="col-2 fs-18">Enter Amount</Label>
              <div className="col-2">
                <NormalInput
                  value={this.state.txtUserPayAmount}
                  onChange={this.handleChangeTextBox.bind(this)}
                />

                {this.validator.message(
                  "Amount",
                  this.state.txtUserPayAmount,
                  "required|numeric|min:0,num"
                )}
                {this.validator.message(
                  "Amount",
                  this.state.txtUserPayAmount,
                  "required|numeric|max:" + this.state.balance + ",num"
                )}
              </div>
            </div>
          </div>
          <div className="col-12 ">
            <h4>Select Payment Method</h4>
          </div>
          <div className="row col-12 paymentGroup">{payGroupDataContent}</div>
        </div>
        <div className="make-payment-section mb-4">
          <div className="row pl-3">
            {/* <div className="text-right f-600">Balance: {Number(balance).toFixed(2)}</div> */}
            <div className="row ">
              <div className="col-8 ">
                <div className="p-2 ml-1 payment fs-12">
                  {userAddedPayTableData}
                </div>
              </div>

              <div className="col-4 ">
                <div className="p-2 ml-1 payment">
                  <p>List of selection's</p>

                  <div className="row fs-14">
                    <div className="col-7">Subtotal</div>
                    <div className="col-5">
                      {tokenDetails.currency} {responseData.subtotal}
                    </div>
                    <div className="col-7">
                      Discount ({tokenDetails.currency})
                    </div>
                    <div className="col-5">
                      {tokenDetails.currency} {responseData.discount}
                    </div>
                    <div className="col-7">Transac amount</div>
                    <div className="col-5">
                      {tokenDetails.currency} {responseData.trans_amt}
                    </div>
                    <div className="col-7">Deposit</div>
                    <div className="col-5">
                      {tokenDetails.currency} {responseData.deposit_amt}
                    </div>
                    <div className="col-7">{responseData.tax_lable}</div>
                    <div className="col-5">
                      {tokenDetails.currency} {responseData.tax_amt}
                    </div>
                    <div className="col-12 fs-22 text-center mt-5">
                      Billing Amount
                    </div>
                    <div className="col-12 fs-22 f-700 text-center text-orenge">
                      {tokenDetails.currency} {responseData.billable_amount}
                    </div>
                    <div className="col-12 f-600 text-center mt-5">
                      Balance Amount: {Number(balance).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isTreatmentDoneButton ? (
            <div className="make-payment mt-3 text-center">
              <NormalButton
                mainbg={true}
                className="col-12 fs-15 "
                label="TREATMENT DONE"
                onClick={() => this.handleTreatmentDone()}
              />
            </div>
          ) : null}
          <div className="make-payment mt-3 text-center">
            {this.state.isMakePaymentButtonClicked == "true" ? (
              <NormalButton
                mainbg={true}
                className="col-12 fs-15 "
                label="Make payment"
                disabled={true}
              />
            ) : (
              <NormalButton
                mainbg={true}
                className="col-12 fs-15 "
                label="Make payment "
                onClick={() => this.handleSubmit()}
                disabled={this.state.selectedCards.length <= 0 || balance > 0}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  appointmentDetail: state.appointment.appointmentDetail,
  selected_cstomer: state.common.selected_cstomer,
  tokenDetails: state.authStore.tokenDetails,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getPayment,
      getCommonApi,
      createPayment,
    },
    dispatch
  );
};

export const Payment = connect(
  mapStateToProps,
  mapDispatchToProps
)(MakePaymentClass);
