import React, { Component } from "react";
import { NormalInput, NormalButton, NormalSelect } from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./style.scss";

export class ProductDetailsPopupClass extends Component {
  state = {
    data_list: [
      {
        id: 0,
        item: "Short length 98",
        quantity: 1,
        unit_price: 218.0,
        discount: 0.0,
        discount_price: 218.0,
        amount: 218.0,
        deposit: 218.0,
        outlet: "Hilltop",
        hold_item_reason: "",
        hold_item_quantity: 0,
      },
      {
        id: 1,
        item: "Short length 98",
        quantity: 1,
        unit_price: 218.0,
        discount: 0.0,
        discount_price: 218.0,
        amount: 218.0,
        deposit: 218.0,
        outlet: "Hilltop",
        hold_item_reason: "",
        hold_item_quantity: 0,
      },
    ],
    hold_item_reasons_options: [],
  };

  componentDidMount() {
    if (this.state.data_list.length != 0) {
      document.getElementById(this.state.data_list[0].id).classList.toggle(
        "d-none"
      );
    }
  }

  handleSubmit = () => {};

  handleChange = (e, index) => {
    let data = this.state.data_list[index];
    data[[e.target.name]] = e.target.value;
    this.setState({});
  };

  handleAccordion = (id) => {
    let elements = document.getElementsByClassName("accordion");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("d-none");
    }
    document.getElementById(id).classList.toggle("d-none");
  };

  render() {
    let { data_list, hold_item_reasons_options } = this.state;
    return (
      <>
        <div className="container-fluid mb-4 mt-2 product-details">
          <div className="row">
            <div className="col-10">
              <h4>Product Details</h4>
            </div>
            <div className="col-2">
              <NormalButton
                mainbg={true}
                className="col-12 fs-15 "
                label="Done "
                onClick={() => this.handleSubmit()}
              />
            </div>
          </div>
          <div className="row pl-5 pr-5 mt-4">
            {data_list.map((item, index) => {
              return (
                <div className="row w-100 mb-2">
                  <div
                    className="row w-100 border rounded p-3 accordion-menu"
                    onClick={() => this.handleAccordion(item.id)}
                  >
                    <div className="col">{item.item}</div>
                    <div className="col">
                      <NormalInput
                        name="quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => this.handleChange(e, index)}
                      />
                    </div>
                    <div className="col">{item.unit_price}</div>
                    <div className="col">{item.discount}</div>
                    <div className="col">{item.discount_price}</div>
                    <div className="col">{item.discount}</div>
                    <div className="col">{item.amount}</div>
                    <div className="col">{item.outlet}</div>
                  </div>
                  <div
                    className="row w-100 rounded bg-light p-3 d-none accordion"
                    id={item.id}
                  >
                    <div className="row w-100 pl-3 mb-3">
                      <div className="col-3">
                        <label className="text-left text-black common-label-text fs-17 pb-2">
                          Quantity
                        </label>
                        <div className="input-group">
                          <NormalInput
                            placeholder="Enter here"
                            value={item.quantity}
                            type="number"
                            name="quantity"
                            onChange={(e) => this.handleChange(e, index)}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <label className="text-left text-black common-label-text fs-17 pb-2">
                          Deposit
                        </label>
                        <div className="input-group">
                          <NormalInput
                            placeholder="Enter here"
                            value={item.deposit}
                            type="number"
                            name="deposit"
                            onChange={(e) => this.handleChange(e, index)}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <label className="text-left text-black common-label-text fs-17 pb-2">
                          Unit Price
                        </label>
                        <div className="input-group">
                          <NormalInput
                            placeholder="Enter here"
                            value={item.unit_price}
                            type="number"
                            name="unit_price"
                            onChange={(e) => this.handleChange(e, index)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row w-100 pl-3 mb-3">
                      <div className="col-4">
                        <label className="text-left text-black common-label-text fs-17 pb-2">
                          Hold Item Reason
                        </label>
                        <div className="input-group">
                          <NormalSelect
                            options={hold_item_reasons_options}
                            value={item.hold_item_reason}
                            name="hold_item_reason"
                            onChange={(e) => this.handleChange(e, index)}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <label className="text-left text-black common-label-text fs-17 pb-2">
                          Hold Item Quantity
                        </label>
                        <div className="input-group">
                          <NormalInput
                            placeholder="Enter here"
                            value={item.hold_item_quantity}
                            type="number"
                            name="hold_item_quantity"
                            onChange={(e) => this.handleChange(e, index)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export const ProductDetailsPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsPopupClass);
