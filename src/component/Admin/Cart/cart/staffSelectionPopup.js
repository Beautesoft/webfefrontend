import React, { Component } from "react";
import { NormalInput, NormalButton, InputSearch } from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./style.scss";

export class StaffSelectionPopupClass extends Component {
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
        staff_data: [
          {
            work: false,
            sales: false,
            staff: "Din",
            sales_presentage: 0,
            sales_amount: 0,
            sp: 0,
            work_pesentage: 0,
            work_amount: 0,
            wp: 0,
          },
          {
            work: false,
            sales: false,
            staff: "Nick",
            sales_presentage: 0,
            sales_amount: 0,
            sp: 0,
            work_pesentage: 0,
            work_amount: 0,
            wp: 0,
          },
          {
            work: false,
            sales: false,
            staff: "Xyz",
            sales_presentage: 0,
            sales_amount: 0,
            sp: 0,
            work_pesentage: 0,
            work_amount: 0,
            wp: 0,
          },
        ],
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
        staff_data: [
          {
            work: false,
            sales: false,
            staff: "Din",
            sales_presentage: 0,
            sales_amount: 0,
            sp: 0,
            work_pesentage: 0,
            work_amount: 0,
            wp: 0,
          },
        ],
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

  handleStaffChange = (e, index1, index2) => {
    let data = this.state.data_list[index1].staff_data[index2];
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

  handlesearch = () => {};

  render() {
    let { data_list } = this.state;
    return (
      <>
        <div className="container-fluid mb-4 mt-2 product-details">
          <div className="row">
            <div className="col-10">
              <h4>Staff Selection</h4>
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
                      <div className="col-10">
                        <InputSearch
                          className=""
                          placeholder="Search Customer"
                          onChange={this.handlesearch}
                        />
                      </div>
                      <div className="col-2">
                        <NormalButton
                          mainbg={true}
                          className="col-12 fs-15 "
                          label="+"
                          onClick={() => this.handleSubmit()}
                        />
                      </div>
                    </div>
                    <div className="row w-100 pl-3 mb-3">
                      <table class="table">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="border-top-0 border-bottom-0"
                            ></th>
                            <th
                              scope="col"
                              className="border-top-0 border-bottom-0"
                            ></th>
                            <th
                              scope="col"
                              className="border-top-0 border-bottom-0"
                            ></th>
                            <th
                              scope="col"
                              className="text-center border-right border-left border-top-0 border-bottom-0"
                              colSpan="3"
                            >
                              Sales staff
                            </th>
                            <th
                              scope="col"
                              className="text-center border-top-0 border-bottom-0"
                              colSpan="3"
                            >
                              Work staff
                            </th>
                          </tr>
                          <tr>
                            <th
                              scope="col"
                              className="text-center border-top-0 border-bottom-0"
                            >
                              Work
                            </th>
                            <th
                              scope="col"
                              className="text-center border-top-0 border-bottom-0"
                            >
                              Sales
                            </th>
                            <th
                              scope="col"
                              className="text-center border-right border-top-0 border-bottom-0"
                            >
                              Staff
                            </th>
                            <th
                              scope="col"
                              className="text-center border-right border-top-0 border-bottom-0"
                            >
                              %
                            </th>
                            <th
                              scope="col"
                              className="text-center border-right border-top-0 border-bottom-0"
                            >
                              $
                            </th>
                            <th
                              scope="col"
                              className="text-center border-right border-top-0 border-bottom-0"
                            >
                              SP
                            </th>
                            <th
                              scope="col"
                              className="text-center border-right border-top-0 border-bottom-0"
                            >
                              %
                            </th>
                            <th
                              scope="col"
                              className="text-center border-right border-top-0 border-bottom-0"
                            >
                              $
                            </th>
                            <th
                              scope="col"
                              className="text-center border-top-0 border-bottom-0"
                            >
                              WP
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data_list[index].staff_data.map((data, index2) => {
                            return (
                              <tr>
                                <th scope="col" className="text-center">
                                  <input
                                    type="checkbox"
                                    checked={data.work}
                                    onClick={(e) => {
                                      this.state.data_list[index].staff_data[
                                        index2
                                      ].work = !data.work;
                                      this.setState({});
                                    }}
                                  />
                                </th>
                                <th scope="col" className="text-center">
                                  <input
                                    type="checkbox"
                                    checked={data.sales}
                                    onClick={(e) => {
                                      this.state.data_list[index].staff_data[
                                        index2
                                      ].sales = !data.sales;
                                      this.setState({});
                                    }}
                                  />
                                </th>
                                <th
                                  scope="col"
                                  className="text-center border-right"
                                >
                                  <label className="text-left text-black common-label-text fs-17 pb-2">
                                    {data.staff}
                                  </label>
                                </th>
                                <th
                                  scope="col"
                                  className="text-center border-right"
                                >
                                  <NormalInput
                                    name="sales_presentage"
                                    type="number"
                                    value={data.sales_presentage}
                                    onChange={(e) =>
                                      this.handleStaffChange(e, index, index2)
                                    }
                                  />
                                </th>
                                <th
                                  scope="col"
                                  className="text-center border-right"
                                >
                                  <NormalInput
                                    name="sales_amount"
                                    type="number"
                                    value={data.sales_amount}
                                    onChange={(e) =>
                                      this.handleStaffChange(e, index, index2)
                                    }
                                  />
                                </th>
                                <th
                                  scope="col"
                                  className="text-center border-right"
                                >
                                  <NormalInput
                                    name="sp"
                                    type="number"
                                    value={data.sp}
                                    onChange={(e) =>
                                      this.handleStaffChange(e, index, index2)
                                    }
                                  />
                                </th>
                                <th
                                  scope="col"
                                  className="text-center border-right"
                                >
                                  <NormalInput
                                    name="work_pesentage"
                                    type="number"
                                    value={data.work_pesentage}
                                    onChange={(e) =>
                                      this.handleStaffChange(e, index, index2)
                                    }
                                  />
                                </th>
                                <th
                                  scope="col"
                                  className="text-center border-right"
                                >
                                  <NormalInput
                                    name="work_amount"
                                    type="number"
                                    value={data.work_amount}
                                    onChange={(e) =>
                                      this.handleStaffChange(e, index, index2)
                                    }
                                  />
                                </th>
                                <th scope="col" className="text-center">
                                  <NormalInput
                                    name="wp"
                                    type="number"
                                    value={data.wp}
                                    onChange={(e) =>
                                      this.handleStaffChange(e, index, index2)
                                    }
                                  />
                                </th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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

export const StaffSelectionPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffSelectionPopupClass);
