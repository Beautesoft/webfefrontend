import React, { Component } from 'react';
import { NormalInput, NormalTextarea, NormalButton, NormalSelect, NormalDate } from 'component/common';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { getPayment, createPayment } from 'redux/actions/payment';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { history } from 'helpers';
import { getCommonApi } from 'redux/actions/common';
import { dateFormat } from 'service/helperFunctions';
import './style.scss';

export class MakePaymentClass extends Component {
  state = {
    formFields: {
      name: '',
      contact: '',
      address: '',
      searchStaff: ''
    },
    responseData: {},
    selectType: {
      creditOrDebit: false,
      point: false,
      payOnPremise: false,
      upi: false,
      prepaid: false
    },
    premisesOption: [],
    cardOption: [],
    premiseField: {
      pay_typeid: "2",
      pay_amt: "",
      pay_premise: true
    },
    cardField: {
      pay_typeid: null,
      pay_amt: "",
      credit_debit: true,
      pay_rem1: "",
      pay_rem2: "",
      pay_rem3: "",
      pay_rem4: ""
    },
    balance: 0,
    isLoading: false
  }

  componentDidMount() {
    this.getPayment();
    this.getPaytableList();
  }

  // get method for payment detail against appointment
  getPayment = () => {
    let { selected_cstomer, id, cartId } = this.props;
    if (id) {
      this.props.getPayment(`?cart_date=${dateFormat(new Date(), "yyyy-mm-dd")}&cust_noid=${id}&cart_id=${cartId}`).then((res) => {
        this.setState({ responseData: res.data, balance: Number(res.data.billable_amount) })
      })
    } else {
      // history.push("/admin/cart");
    }

  }

  // get response for payment options dropdown
  getPaytableList = () => {
    this.props.getCommonApi(`paytable/`).then((res) => {
      this.getDataFromResponses(res.data);
    })
  }

  // set data to dropdown fields
  getDataFromResponses = (data) => {
    let { cardOption, premisesOption } = this.state;
    for (let key of data.CARD) {
      cardOption.push({ label: key.pay_description, value: key.id })
    }
    for (let key of data.CASH) {
      premisesOption.push({ label: key.pay_description, value: key.id })
    }
    this.setState({
      cardOption,
      premisesOption
    })
  }

  handleMultiple = ({ target: { value, name } }) => {
    console.log("handleMultiple", value, name);
    let formFields = Object.assign({}, this.state.formFields);

    formFields[name] = value;

    this.setState({
      formFields,
    });
  };

  handleChange = ({ target: { value, name } }) => {
    let formFields = Object.assign({}, this.state.formFields);

    formFields[name] = value;

    this.setState({
      formFields,
    });
  };

  handleSelectOption = async (e) => {

    let selectType = Object.assign({}, this.state.selectType);
    console.log(e.target.name, "sdfgdsfgsdfg", this.state)
    let { cardField, balance, premiseField } = this.state;
    selectType[e.target.name] = !selectType[e.target.name];

    if(e.target.name === "creditOrDebit"){
      cardField['pay_amt'] = balance
      await this.setState({
        cardField
      });
    } else if(e.target.name === "payOnPremise"){
      premiseField['pay_amt'] = balance
      await this.setState({
        premiseField
      });
      
    }
    await this.setState({
      selectType,
    });
    await this.getBalance()
  }

  handleChangePremise = async ({ target: { value, name } }) => {
    let premiseField = Object.assign({}, this.state.premiseField);
    
    premiseField[name] = value;

    await this.setState({
      premiseField,
    });
    await this.getBalance()
  }

  handleChangeCard = async ({ target: { value, name } }) => {
    let cardField = Object.assign({}, this.state.cardField);
    
    cardField[name] = value;
   
    await this.setState({
      cardField,
    });
    await this.getBalance()
  }

  // create payment detail
  handleSubmit = () => {
    let { cardField, premiseField, selectType } = this.state;
    let data = []
    if (selectType.creditOrDebit === true) {
      data.push({
        pay_typeid: cardField.pay_typeid,
        pay_amt: cardField.pay_amt,
        credit_debit: true,
        pay_rem1: cardField.pay_rem1,
        pay_rem2: cardField.pay_rem2,
        pay_rem3: cardField.pay_rem3,
        pay_rem4: cardField.pay_rem4
      });
    }
    if (selectType.payOnPremise === true) {
      data.push({
        pay_typeid: premiseField.pay_typeid,
        pay_amt: premiseField.pay_amt,
        pay_premise: true
      });
    }
    if (selectType.point === true) {
      // data.push(premiseField);
    }
    if (selectType.upi === true) {
      // data.push(premiseField);
    }
    if (selectType.prepaid === true) {
      // data.push(premiseField);
    }
    let { selected_cstomer, id, cartId } = this.props
    this.setState({
      isLoading: true
    })
    this.props.createPayment(`?cart_date=${dateFormat(new Date(), "yyyy-mm-dd")}&cust_noid=${id}&cart_id=${cartId}`, data).then((res) => {
      history.push(`/admin/billing/print/bill/${res.data.sa_transacno}`)
      this.setState({
        isLoading: false
      })
    }).catch(()=>{
      this.setState({
        isLoading: false
      })
    })
  }

  getBalance = async () => {
    let { balance, cardField, premiseField, selectType, responseData } = this.state;
    // await this.setState({
      balance = responseData.billable_amount
    // })
    if(selectType.creditOrDebit===true){
      balance = balance - cardField.pay_amt;
    }
    if(selectType.payOnPremise===true){
      balance = balance - premiseField.pay_amt;
    }
  
    this.setState({
      balance
    })
  }

  render() {
    let { formFields, responseData, selectType, premisesOption, cardOption, premiseField, cardField, balance, isLoading } = this.state;
    let { name, contact, address, searchStaff } = formFields;
    let { creditOrDebit, point, payOnPremise, upi, prepaid } = selectType;

    return (
      <>
        <div className="make-payment-section mb-4">
          <div className="row pl-3">

            <div className="col-10 mb-4">
              <h4>Select Payment Method</h4>
            </div>
            {/* <div className="text-right f-600">Balance: {Number(balance).toFixed(2)}</div> */}
            <div className="row">
              <div className="col-8 fs-14 p-5 payment">
                <div className="row">
                  <div className="col-5">
                    <div class="radio-item">
                      <input type="radio" id="creditOrDebit" name="creditOrDebit" checked={creditOrDebit} onClick={this.handleSelectOption} />
                      <label for="creditOrDebit">Credit / Debit card</label>
                    </div>
                    {creditOrDebit ? <>
                      <div className="row mt-3 credit-card">

                        <div className="col-5">
                          <div className="input-group">
                            Select Card
                            <NormalSelect
                              placeholder="Search type..."
                              options={cardOption}
                              value={cardField.pay_typeid}
                              name="pay_typeid"
                              onChange={this.handleChangeCard}
                            />
                          </div>
                        </div>
                        <div className="col-5">
                          <div className="input-group">
                            Amount
                            <NormalInput
                              value={cardField.pay_amt}
                              name="pay_amt"
                              onChange={this.handleChangeCard}
                            />
                          </div>
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

                    </> : ""}

                  </div>
                  <div className="col-5">
                    <div className="radio-item">
                      <input type="radio" id="point" name="point" checked={point} onClick={this.handleSelectOption} />
                      <label for="point">Point (Available point:201)</label>
                    </div>
                    {point ? <>
                      <div className="input-group my-3">
                        <NormalInput
                          value={address}
                          name="point"
                          onChange={this.handleChange}
                        />
                      </div>
                    </> : ""}

                  </div>
                  <div className="col-5">
                    <div className="radio-item">
                      <input type="radio" id="upi" name="upi" checked={upi} onClick={this.handleSelectOption} />
                      <label for="upi">UPI</label>
                    </div>
                    {upi ? <>
                      <div className="input-group my-3">
                        <NormalInput
                          value={address}
                          name="upi"
                          onChange={this.handleChange}
                        />
                      </div>
                    </> : ""}

                  </div>
                  <div className="col-5">
                    <div className="radio-item">
                      <input type="radio" id="prepaid" name="prepaid" checked={prepaid} onClick={this.handleSelectOption} />
                      <label for="prepaid">Prepaid</label>
                    </div>
                    {prepaid ? <>
                      <div className="input-group my-3">
                        <NormalInput
                          value={address}
                          name="prepaid"
                          onChange={this.handleChange}
                        />
                      </div>
                    </> : ""}

                  </div>
                  <div className="col-5">
                    <div className="radio-item">
                      <input type="radio" id="payOnPremise" name="payOnPremise" checked={payOnPremise} onClick={this.handleSelectOption} />
                      <label for="payOnPremise">Pay on premise</label>
                    </div>
                    {payOnPremise ? <>
                      <div className="input-group my-3">
                        <div className="input-group">
                          Select Option
                                        <NormalSelect
                            placeholder="Search type..."
                            options={premisesOption}
                            value={premiseField.pay_typeid}
                            name="pay_typeid"
                            onChange={this.handleChangePremise}
                          />
                        </div>
                        <div className="input-group my-3">
                          Amount
                                        <NormalInput
                            value={premiseField.pay_amt}
                            name="pay_amt"
                            onChange={this.handleChangePremise}
                          />
                        </div>
                      </div></> : ""}

                  </div>
                  <div className="col-5">
                  </div>
                  <div className="col-10 mb-3">
                  </div>

                  {/* <div className="col-5">
                            <h4 className="mb-4">Add Discount/Vouchers</h4>
                            <div className="input-group">
                                <NormalInput
                                    value={address}
                                    name="address"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div> */}

                  {/* <div className="col-5">
                            <h4>Enter Staff Details</h4>
                            <div className="pb-4">
                                <label className="text-left text-black common-label-text fs-17 ">
                                </label>
                                <div className="input-group">
                                    <NormalSelect
                                        placeholder="Search Staff..."
                                        // options={treatmentOption}
                                        value={searchStaff}
                                        name="searchStaff"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <button>Add Another Staff</button>

                        </div> */}
                </div>
              </div>
              <div className="col-4 ">
                <div className="p-5 ml-2 subtotal">
                  <div className="row fs-14">
                    <div className="col-7">Subtotal</div>
                    <div className="col-5">$ {responseData.subtotal}</div>
                    <div className="col-7">Discount ($)</div>
                    <div className="col-5">$ {responseData.discount}</div>
                    <div className="col-7">Transac amount</div>
                    <div className="col-5">$ {responseData.trans_amt}</div>
                    <div className="col-7">Deposit</div>
                    <div className="col-5">$ {responseData.deposit_amt}</div>
                    <div className="col-7">{responseData.tax_lable}</div>
                    <div className="col-5">$ {responseData.tax_amt}</div>
                    <div className="col-12 fs-22 text-center mt-5">Billing Amount</div>
                    <div className="col-12 fs-22 f-700 text-center text-orenge">$ {responseData.billable_amount}</div>
                    <div className="col-12 f-600 text-center mt-5">Balance Amount: {Number(balance).toFixed(2)}</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="make-payment mt-3 text-center">
            <NormalButton
              mainbg={true}
              className="col-12 fs-15 "
              label="Make payment "
              onClick={() => this.handleSubmit()}
              disabled={balance > 0 < balance || (balance === 0 && isLoading===true)}
            />
          </div>
        </div>
      </>
    );
  }
}



const mapStateToProps = (state) => ({
  appointmentDetail: state.appointment.appointmentDetail,
  selected_cstomer: state.common.selected_cstomer,
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getPayment,
    getCommonApi,
    createPayment
  }, dispatch)
}

export const Payment = connect(mapStateToProps, mapDispatchToProps)(MakePaymentClass)