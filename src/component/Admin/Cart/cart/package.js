import React, { Component } from "react";
import "./style.scss";
import { NormalCheckbox, NormalInput, NormalButton } from "component/common";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCommonApi,
  updateForm,
  commonUpdateApi,
  commonCreateApi,
} from "redux/actions/common";
import SimpleReactValidator from "simple-react-validator";
// import { Treatment, Payment, EditCart } from './cart/index';
import { Label } from "reactstrap";
import { withTranslation } from "react-i18next";

class PackageCartClass extends Component {
  state = {
    cartPackageList: [],
    auto_deposit: "",
    auto_deposit_new: "",
    deposit: "",
    net_deposit: "",
    checked: true,
  };

  componentWillMount = () => {
    this.getCartData();
  };

  getCartData = () => {
    this.props
      .getCommonApi(`pospackagedeposit/?cartid=${this.props.id}`)
      .then(async (key) => {
        let {
          cartPackageList,
          auto_deposit,
          auto_deposit_new,
          deposit,
          net_deposit,
        } = this.state;
        let { data } = key;
        cartPackageList = data;
        auto_deposit = key.auto_deposit;
        auto_deposit_new = key.auto_deposit;
        deposit = key.deposit;
        net_deposit = key.net_deposit;
        this.setState({
          cartPackageList,
          auto_deposit,
          auto_deposit_new,
          deposit,
          net_deposit,
        });
      });
  };
  autoMatch = () => {
    const testData = [];
    const original_number = this.state.net_deposit;
    const net_deposit = this.state.net_deposit;
    const new_number = this.state.auto_deposit_new;
    if (parseFloat(new_number) > parseFloat(net_deposit)) {
      alert("Entered amount should not greater than Net Amount");
      return;
    }
    let decrease = original_number - new_number;
    let percentageOfDecrease = ((decrease / original_number) * 100).toFixed(2);
    var depositAmount = 0;
    var totalDepositAmount = 0;
    for (var i = 0; i < this.state.cartPackageList.length; i++) {
      var xRowNetAmount = this.state.cartPackageList[i].net_amt;
      var xDecreasedRowAmount = (
        (xRowNetAmount * percentageOfDecrease) /
        100
      ).toFixed(2);
      depositAmount = (xRowNetAmount - xDecreasedRowAmount).toFixed(2);
      totalDepositAmount += parseFloat(depositAmount);
      if (i == this.state.cartPackageList.length - 1) {
        //Assign Difference value into last row
        var difference = new_number - totalDepositAmount;
        totalDepositAmount += difference;
        depositAmount = parseFloat(depositAmount) + parseFloat(difference);
      }
      testData.push({
        id: this.state.cartPackageList[i].id,
        description: this.state.cartPackageList[i].description,
        qty: this.state.cartPackageList[i].qty,
        deposit_amt: parseFloat(depositAmount).toFixed(2),
        net_amt: this.state.cartPackageList[i].net_amt,
        auto: this.state.cartPackageList[i].auto,
        hold_qty: 0,
        itemcart: this.state.cartPackageList[i].itemcart,
      });
    }
    //console.log("data")
    this.setState({
      cartPackageList: testData,
      deposit: totalDepositAmount.toFixed(2),
    });
  };
  clear = () => {
    this.fillCartDepositModifyData("Clear");
  };
  fullPayment = () => {
    this.fillCartDepositModifyData("Full");
  };
  handleCancel = () => {
    this.props.handleModal();
  };

  handleConfirm = () => {
    let data = this.state.cartPackageList;
    this.props
      .commonCreateApi(
        `pospackagedeposit/confirm/?cartid=${this.props.id}`,
        data
      )
      .then(() => {
        //console.log("succ")
        this.props.handleModal();
      });
  };

  fillCartDepositModifyData(xMode) {
    let depositAmount;
    var totalDepositAmount = 0;
    const testData = [];
    for (var i = 0; i < this.state.cartPackageList.length; i++) {
      if (xMode == "Clear") {
        depositAmount = 0;
        totalDepositAmount += parseFloat(depositAmount);
      } else if (xMode == "Full") {
        depositAmount = this.state.cartPackageList[i].net_amt;
        totalDepositAmount += parseFloat(depositAmount);
      }
      testData.push({
        id: this.state.cartPackageList[i].id,
        description: this.state.cartPackageList[i].description,
        qty: this.state.cartPackageList[i].qty,
        deposit_amt: depositAmount,
        net_amt: this.state.cartPackageList[i].net_amt,
        auto: this.state.cartPackageList[i].auto,
        hold_qty: 0,
        itemcart: this.state.cartPackageList[i].itemcart,
      });
    }
    this.setState({ cartPackageList: testData, deposit: totalDepositAmount });
  }
  handleChange_auto_deposit_new = async ({ target: { value } }) => {
    let { auto_deposit_new } = this.state;
    auto_deposit_new = value;
    await this.setState({
      auto_deposit_new,
    });
  };
  handleCheck = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  handleChangeForEachRow(userId, event) {
    //var inputElement = event.target;
    var userEnteredValue = parseFloat(event.target.value);
    var userEnteredKeyUnique = event.target.name;
    var totalDepositAmount = 0;
    //console.log(inputElement.name + ': ' + inputElement.value);
    const testData = [];
    for (var i = 0; i < this.state.cartPackageList.length; i++) {
      let deposit = 0;
      var xRowNetAmount = parseFloat(this.state.cartPackageList[i].net_amt);

      if (i == userEnteredKeyUnique) {
        if (userEnteredValue > xRowNetAmount) {
          return;
        }
        deposit = userEnteredValue;
        totalDepositAmount += parseFloat(deposit);
      } else {
        deposit = this.state.cartPackageList[i].deposit_amt;
        totalDepositAmount += parseFloat(deposit);
      }
      testData.push({
        id: this.state.cartPackageList[i].id,
        description: this.state.cartPackageList[i].description,
        qty: this.state.cartPackageList[i].qty,
        deposit_amt: deposit,
        net_amt: this.state.cartPackageList[i].net_amt,
        auto: this.state.cartPackageList[i].auto,
        hold_qty: 0,
        itemcart: this.state.cartPackageList[i].itemcart,
      });
    }
    this.setState({
      cartPackageList: testData,
      deposit: totalDepositAmount.toFixed(2),
    });
  }

  render() {
    let { cartPackageList, auto_deposit_new, deposit, net_deposit } =
      this.state;
    let { t } = this.props;
    return (
      <div className="row new-cart treatment-done">
        <div className="col-12">
          <p className="fs-18 font-700 mb-3 title">{t("Package Details")}</p>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-2">
              <NormalCheckbox
                type="checkbox"
                checked={this.state.checked}
                onChange={() => this.handleCheck()}
                label="Auto Deposit"
              />
            </div>
            <div className="col-2">
              <NormalInput
                value={auto_deposit_new}
                name="auto_deposit_new"
                className="customer-name w-100 h-100 text-right  fs-24"
                onChange={this.handleChange_auto_deposit_new}
              />
            </div>
            <div className="col-3">
              <NormalButton
                buttonClass={"treatment"}
                mainbg={true}
                className="col-12 fs-15 "
                label="Start AutoMatch"
                disabled={!this.state.checked}
                onClick={() => this.autoMatch()}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <table className="table table-striped">
          <tr>
            <td>{t("Description")}</td>
            <td>{t("Qty")}</td>
            <td>{t("Deposit")}</td>
            <td>{t("Net Amount")}</td>
          </tr>
          {cartPackageList.map((cartPackage, index) => (
            <tr key={index} style={{ cursor: "pointer" }}>
              <td>{cartPackage.description}</td>
              <td>{cartPackage.qty}</td>
              <td>
                <input
                  onChange={this.handleChangeForEachRow.bind(
                    this,
                    cartPackage.id
                  )}
                  name={index}
                  type="number"
                  min="0"
                  className="w-50"
                  value={cartPackage.deposit_amt}
                  disabled={this.state.checked}
                />
              </td>

              <td className="d-flex align-items-center justify-content-center">
                {cartPackage.net_amt}
              </td>
            </tr>
          ))}
        </table>

        <div className="col-12">
          <div className="row">
            <div className="col-8"></div>
            <div className="col-2">
              <Label>{t("Deposit")}:</Label>
              <NormalInput value={deposit} disabled={true} />
            </div>
            <div className="col-2">
              <Label>{t("Net Total")}:</Label>
              <NormalInput value={net_deposit} disabled={true} />
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-2">
              <NormalButton
                buttonClass={"treatment"}
                mainbg={true}
                className="col-12 fs-15 "
                label="Full Payment"
                onClick={() => this.fullPayment()}
              />
            </div>
            <div className="col-2">
              <NormalButton
                buttonClass={"treatment"}
                mainbg={true}
                className="col-12 fs-15 "
                label="Clear Deposit"
                onClick={() => this.clear()}
              />
            </div>

            <div className="col-2">
              <NormalButton
                buttonClass={"treatment"}
                mainbg={true}
                className="col-12 fs-15 "
                label="Cancel"
                onClick={() => this.handleCancel()}
              />
            </div>
            <div className="col-2">
              <NormalButton
                buttonClass={"treatment"}
                mainbg={true}
                className="col-12 fs-15 "
                label="Confirm"
                onClick={() => this.handleConfirm()}
              />
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selected_cstomer: state.common.selected_cstomer,
  basicApptDetail: state.appointment.basicApptDetail,
  tokenDetails: state.authStore.tokenDetails,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // getCustomer,
      getCommonApi,
      updateForm,
      commonUpdateApi,
      commonCreateApi,
    },
    dispatch
  );
};

export const PackageCart = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(PackageCartClass)
);
