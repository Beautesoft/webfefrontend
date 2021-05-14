import React, { Component } from "react";
import { NormalInput, NormalButton, NormalSelect } from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./style.scss";

export class itemStatusPopupClass extends Component {
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
        item_status: "",
        foc_reason: "",
        is_foc: false,
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
        item_status: "",
        foc_reason: "",
        is_foc: false,
      },
    ],
    item_status_options: [],
  };

  componentDidMount() {
    if (this.state.data_list.length != 0) {
      document
        .getElementById(this.state.data_list[0].id)
        .classList.toggle("d-none");
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
    console.log(elements);
  };

  render() {
    let { data_list, item_status_options } = this.state;
    return (
      <>
        <div className="container-fluid mb-4 mt-2 product-details">
          <div className="row">
            <div className="col-10">
              <h4>Item Status</h4>
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
                    <div className="col">
                      {item.item_status == "" ? "Status" : item.item_status}
                    </div>
                    <div className="col">{item.outlet}</div>
                  </div>
                  <div
                    className="row w-100 rounded bg-light p-3 d-none accordion"
                    id={item.id}
                  >
                    <div className="row w-100 pl-3 mb-3">
                      <div className="col-4">
                        <label className="text-left text-black common-label-text fs-17 pb-2">
                          Item Status
                        </label>
                        <div className="input-group">
                          <NormalSelect
                            options={item_status_options}
                            value={item.item_status}
                            name="item_status"
                            onChange={(e) => this.handleChange(e, index)}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <label className="text-left text-black common-label-text fs-17 pb-2">
                          FOC Reason
                        </label>
                        <div className="input-group">
                          <NormalInput
                            placeholder="Enter here"
                            value={item.foc_reason}
                            name="foc_reason"
                            onChange={(e) => this.handleChange(e, index)}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="input-group mt-4 pt-3">
                          <div className="p-2">
                            <input
                              type="checkbox"
                              checked={item.is_foc}
                              name="is_foc"
                              onClick={() => {
                                this.state.data_list[index].is_foc = !item.is_foc;
                                this.setState({});
                              }}
                            />
                          </div>
                          <label className="text-left text-black common-label-text fs-17 mt-1">
                            FOC
                          </label>
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

export const ItemStatusPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(itemStatusPopupClass);
