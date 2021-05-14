import React, { Component } from "react";
import {
  NormalInput,
  NormalButton,
  TableWrapper,
  NormalSelect,
} from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./style.scss";

export class ItemDiscountPopupClass extends Component {
  state = {
    item_data: {
      item_name: "short length 98",
    },
    quantity: 0,
    discount_reason_options: [],
    discount_reason: "",
    discount_reasons: [
      { label: "Birthday Discount", discount: "10%", value: "70.00" },
      { label: "Other", discount: "5%", value: "31.50" },
    ],
    unit_price: 0,
    unit_price_after_discount: 0,
    total_after_discount: 0,
    deposit: 0,
    discount: 0,
    is_presentage: true,
  };

  handleSubmit = () => {};

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let {
      item_data,
      discount,
      quantity,
      unit_price,
      is_presentage,
      deposit,
      discount_reason,
      discount_reason_options,
      discount_reasons,
      total_after_discount,
      unit_price_after_discount,
    } = this.state;
    return (
      <>
        <div className="container-fluid mb-4">
          <div className="row pl-3">
            <div className="col-8">
              <h6 className="text-secondary">Item Discount</h6>

              <h4>{item_data.item_name}</h4>
            </div>
            <div className="col-2">
              <NormalButton
                className="col-12 fs-15 "
                label="Cancel"
                onClick={() => {}}
              />
            </div>
            <div className="col-2">
              <NormalButton
                mainbg={true}
                className="col-12 fs-15 "
                label="Submit"
                onClick={() => this.handleSubmit()}
              />
            </div>
          </div>
          <div className="row pl-5 pr-5 mt-4">
            <div className="row mb-3">
              <div className="col-4">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Quantity
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={quantity}
                    type="number"
                    name="quantity"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-4">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Unit Price
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    value={unit_price}
                    type="number"
                    name="unit_price"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="col-4">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Discount
                </label>
                <div className="input-group">
                  <NormalInput
                    placeholder="Enter here"
                    className="col"
                    value={discount}
                    type="number"
                    name="free_sessions"
                    onChange={this.handleChange}
                  />
                  <NormalButton
                    mainbg={is_presentage}
                    className="col"
                    label="%"
                    onClick={() =>
                      this.setState({ is_presentage: !is_presentage })
                    }
                  />
                  <NormalButton
                    mainbg={!is_presentage}
                    className="col"
                    label="$"
                    onClick={() =>
                      this.setState({ is_presentage: !is_presentage })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row w-100 mb-3">
              <div className="col-8">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Discount Reason
                </label>
                <div className="input-group">
                  <NormalSelect
                    options={discount_reason_options}
                    value={discount_reason}
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div className="col-4 mt-4 pt-2">
                <NormalButton
                  mainbg={true}
                  className="col"
                  label="Apply"
                  onClick={() => {}}
                />
              </div>
            </div>
            <div className="row w-100 mt-4">
              <div className="col-12">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Discount
                </label>
                <div className="w-100 bg-light p-3">
                  {discount_reasons.map((item) => {
                    return (
                      <div className="row">
                        <div className="col-4">
                          <label className="text-left text-black common-label-text fs-17 pb-2">
                            {item.label}
                          </label>
                        </div>
                        <div className="col-4">
                          <label className="text-left text-black common-label-text fs-17 pb-2">
                            {item.discount}
                          </label>
                        </div>
                        <div className="col-4">
                          <label className="text-left text-black common-label-text fs-17 pb-2">
                            {item.value}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="row w-100 mt-5">
              <div className="col-8">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Unit Price After Discount
                </label>
              </div>
              <div className="col-4">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  {unit_price_after_discount}
                </label>
              </div>
            </div>
            <div className="row w-100 mt-2">
              <div className="col-4">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  Total After Discount
                </label>
              </div>
              <div className="col-4">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  {quantity} * {unit_price_after_discount}
                </label>
              </div>
              <div className="col-4">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  {total_after_discount}
                </label>
              </div>
            </div>
            <div className="row w-100 mt-4">
              <div className="col-8">
                <h6>Deposit</h6>
              </div>
              <div className="col-4">
                <label className="text-left text-black common-label-text fs-17 pb-2">
                  {deposit}
                </label>
              </div>
            </div>
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

export const ItemDiscountPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDiscountPopupClass);
