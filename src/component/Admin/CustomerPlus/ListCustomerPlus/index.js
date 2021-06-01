import React from "react";
import { NormalButton, NormalSelect } from "component/common";
import { InputSearch, TableWrapper } from "component/common";
import filter from "../../../../assets/images/filter.png";
import "./style.scss";
import { getCustomerPlus } from "redux/actions/customerPlus";
import { updateForm } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { Navigation } from "react-minimal-side-navigation";
import { Settings } from "./settings";

export class ListCustomerPlusClass extends React.Component {
  state = {
    headerDetails: [
      { label: "Customer Code", sortKey: "customerCode" },
      { label: "Referance Code", sortKey: "referenceCode", enabled: true },
      { label: "Salutation", sortKey: "salutation", enabled: true },
      { label: "Customer Name", sortKey: "customerName", enabled: true },
      { label: "Mobile Phone", sortKey: "mobilePhone", enabled: true },
      { label: "Birthday", sortKey: "birthday", enabled: true },
      { label: "Customer Class", sortKey: "customerClass", enabled: true },
      { label: "" },
    ],
    customerList: [],
    currentMenu: "/",
    meta: {},
    active: false,
    currentIndex: -1,
    isLoading: true,
  };
  // handleClick = (key,active) => {
  //     let currentIndex;
  //     if (this.state.active == true) {
  //         this.setState({
  //             active: false,
  //             currentIndex: '-1'
  //         })
  //     }
  //     else {
  //         this.setState({
  //             active: active,
  //             currentIndex: key
  //         })
  //     }
  // }

  componentDidMount = () => {
    this.getCustomerPlus({});
  };

  handleClick = (key) => {
    if (!this.state.active) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState((prevState) => ({
      active: !prevState.active,
      currentIndex: key,
    }));
  };

  handleOutsideClick = (e) => {
    if (this.node != null) {
      if (this.node.contains(e.target)) {
        return;
      }
    }
    this.handleClick();
  };

  getCustomerPlus = async (data) => {
    this.setState({ isLoading: true });
    let { page = 1, limit = 10, search = "" } = data;
    await this.props.getCustomerPlus(
      `?page=${page}&limit=${limit}&search=${search}`
    );
    let {customerDetails} = this.props;
    this.setState({
      customerList: customerDetails.dataList,
      meta: customerDetails.meta.pagination,
      isLoading: false,
    });
  };

  handlePagination = (page) => {
    console.log(page, "dsfsdfsdfsdf");
    this.getCustomerPlus(page);
  };

  handlesearch = (event) => {
    console.log("sadfasdfasdf", event.target.value);
    event.persist();

    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(() => {
        let searchString = event.target.value;
        let data = { search: searchString };
        this.getCustomerPlus(data);
      }, 500);
    }
    this.debouncedFn();
  };

  bookAppointment = async (data) => {
    let formFields = {};
    formFields["custId"] = data.id;
    formFields["custName"] = data.cust_name;
    await this.props.updateForm("basicApptDetail", formFields);
    this.props.history.push(`/admin/appointment`);
  };

  handleMenuSelection = (itemId) => {
    this.setState({ currentMenu: itemId });
  };

  render() {
    let {
      headerDetails,
      customerList,
      meta,
      currentIndex,
      currentMenu,
      isLoading,
    } = this.state;
    return (
      <div className="customer-list container-fluid">
        <div className="col-md-12 mb-4">
          <h3 className="head-label">Customer Plus</h3>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-2 mb-4">
            <Navigation
              activeItemId={currentMenu}
              onSelect={({ itemId }) => this.handleMenuSelection(itemId)}
              items={[
                {
                  title: "List",
                  itemId: "/",
                },
                {
                  title: "Settings",
                  itemId: "/settings",
                },
              ]}
            />
          </div>
          {currentMenu == "/" ? (
            <div className="col">
              <div className="row align-items-center">
                <div className="col">
                  <div className="d-flex">
                    <div className="w-100 mr-5">
                      <InputSearch
                        className=""
                        placeholder="Search Customer"
                        onChange={this.handlesearch}
                      />
                    </div>
                    <div className="w-100 col-6 p-0">
                      <NormalButton
                        mainbg={true}
                        className="col-12 fs-15 float-right"
                        label="Add Customer"
                        onClick={() =>
                          this.props.history.push("/admin/customerplus/add")
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-table-content">
                <div className="py-4">
                  <div className="table-container">
                    <TableWrapper
                      headerDetails={headerDetails}
                      queryHandler={this.handlePagination}
                      pageMeta={meta}
                      showFilterColumn={true}
                      parentHeaderChange={(value) =>
                        this.setState(() => (headerDetails = value))
                      }
                    >
                      {isLoading ? (
                        <tr>
                          <td colSpan="7">
                            <div class="d-flex mt-5 align-items-center justify-content-center">
                              <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : customerList ? (
                        customerList.map((item, index) => {
                          let {
                            id,
                            cust_code,
                            cust_refer,
                            cust_name,
                            cust_phone2,
                            cust_dob,
                          } = item;
                          console.log(headerDetails[0]);
                          return (
                            <tr key={index}>
                              <td
                                className={
                                  headerDetails[0].enabled ?? true
                                    ? ""
                                    : "d-none"
                                }
                              >
                                <div className="d-flex align-items-center justify-content-center">
                                  {cust_code}
                                </div>
                              </td>
                              <td
                                className={
                                  headerDetails[1].enabled ?? true
                                    ? ""
                                    : "d-none"
                                }
                              >
                                <div className="d-flex align-items-center justify-content-center">
                                  {cust_refer}
                                </div>
                              </td>
                              <td
                                className={
                                  headerDetails[2].enabled ?? true
                                    ? ""
                                    : "d-none"
                                }
                              >
                                <div className="d-flex align-items-center justify-content-center">
                                  {""}
                                </div>
                              </td>
                              <td
                                className={
                                  headerDetails[3].enabled ?? true
                                    ? ""
                                    : "d-none"
                                }
                              >
                                <div className="d-flex align-items-center justify-content-center">
                                  {cust_name}
                                </div>
                              </td>
                              <td
                                className={
                                  headerDetails[4].enabled ?? true
                                    ? ""
                                    : "d-none"
                                }
                              >
                                <div className="d-flex align-items-center justify-content-center">
                                  {cust_phone2}
                                </div>
                              </td>
                              <td
                                className={
                                  headerDetails[5].enabled ?? true
                                    ? ""
                                    : "d-none"
                                }
                              >
                                <div className="d-flex align-items-center justify-content-center">
                                  {cust_dob}
                                </div>
                              </td>
                              <td
                                className={
                                  headerDetails[6].enabled ?? true
                                    ? ""
                                    : "d-none"
                                }
                              >
                                <div className="d-flex align-items-center justify-content-center">
                                  {"123"}
                                </div>
                              </td>
                              <td
                                className="position-relative"
                                ref={(node) => {
                                  this.node = node;
                                }}
                                onClick={() => this.handleClick(index)}
                              >
                                {currentIndex === index ? (
                                  <>
                                    <div className="d-flex align-items-center justify-content-center horizontal-more-active">
                                      <i className="icon-more"></i>
                                    </div>
                                    <div className="option card">
                                      <div
                                        className="d-flex align-items-center fs-16 pt-3"
                                        onClick={() =>
                                          this.props.history.push(
                                            `/admin/customerplus/${id}/details`
                                          )
                                        }
                                      >
                                        <span className="icon-eye-grey px-3"></span>{" "}
                                        View{" "}
                                      </div>
                                      <div
                                        className="d-flex align-items-center fs-16 pt-3"
                                        onClick={() =>
                                          this.props.history.push(
                                            `/admin/customerplus/${id}/lpmanagement`
                                          )
                                        }
                                      >
                                        <span className="icon-eye-grey px-3"></span>
                                        Loyalty Points Management
                                      </div>
                                      <div className="d-flex align-items-center fs-16">
                                        <span className="icon-schedule px-3"></span>{" "}
                                        Reschedule Appointment{" "}
                                      </div>
                                      <div
                                        className="d-flex align-items-center fs-16"
                                        onClick={() =>
                                          this.bookAppointment(item)
                                        }
                                      >
                                        <span className="px-2">
                                          <svg
                                            width="31"
                                            height="30"
                                            viewBox="0 0 31 30"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <rect
                                              width="31"
                                              height="30"
                                              fill="#F9F9F9"
                                            />
                                            <path
                                              d="M15 8V22"
                                              stroke="#848484"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M8 15H22"
                                              stroke="#848484"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                          </svg>
                                        </span>
                                        Book Appointment
                                      </div>
                                      <div className="d-flex align-items-center fs-16 pb-3">
                                        <span className="icon-cancel-schedule px-3"></span>{" "}
                                        Cancel Appointment{" "}
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="d-flex align-items-center justify-content-center horizontal-more">
                                    <i className="icon-more"></i>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        ""
                      )}
                    </TableWrapper>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Settings />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customerDetails: state.customerPlus.customerPlusDetail,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCustomerPlus,
      updateForm,
    },
    dispatch
  );
};

export const ListCustomerPlus = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCustomerPlusClass);
