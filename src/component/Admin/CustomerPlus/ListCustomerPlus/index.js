import React from "react";
import { NormalButton } from "component/common";
import { InputSearch, TableWrapper } from "component/common";
import { Link } from "react-router-dom";
import "./style.scss";
import { getCustomerPlus } from "redux/actions/customerPlus";
import { updateForm } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { Navigation } from "react-minimal-side-navigation";
import { withTranslation } from "react-i18next";

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
    search: "",
    meta: {},
    active: false,
    currentIndex: -1,
    isLoading: true,
    isMounted: true,
  };
  componentWillUnmount() {
    this.state.isMounted = false;
  }

  updateState = (data) => {
    if (this.state.isMounted) this.setState(data);
  };

  componentDidMount = () => {
    this.getCustomerPlus({});
  };

  handleClick = (key) => {
    if (!this.state.active) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.updateState((prevState) => ({
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
    this.updateState({ isLoading: true });
    let { search } = this.state;
    let { page = 1, limit = 10 } = data;
    await this.props.getCustomerPlus(
      `?page=${page}&limit=${limit}&search=${search}`
    );
    let { customerDetails } = this.props;
    this.updateState({
      customerList: customerDetails.dataList,
      meta: customerDetails.meta?.pagination,
      isLoading: false,
    });
  };

  handlePagination = (page) => {
    console.log(page, "dsfsdfsdfsdf");
    this.getCustomerPlus(page);
  };

  handlesearch = (event) => {
    event.persist();
    let { search } = this.state;
    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(async () => {
        search = event.target.value;
        await this.setState({ search });
        this.getCustomerPlus({});
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

  render() {
    let { headerDetails, customerList, meta, currentIndex, isLoading } =
      this.state;
    let { t } = this.props;
    return (
      <div className="customer-list container-fluid">
        <div className="row mb-4">
          <div className="col-md-4 col-lg-2 mb-2">
            <Link to="/admin/customerplus/settings">
              <NormalButton
                normal={true}
                className="col-12 fs-15 float-right"
                label="Settings"
              />
            </Link>
          </div>
          <div className="col-md-4 col-lg-3 mb-2">
            <Link to="/admin/customerplus/lpmanagement">
              <NormalButton
                normal={true}
                className="col-12 fs-15 float-right"
                label="LP Management"
              />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col-12 mb-2">
                <h3 className="head-label">{t("Customer Plus List")}</h3>
              </div>
              <div className="col-md-8 col-sm-12 mb-2">
                <InputSearch
                  className=""
                  placeholder="Search Customer"
                  onEnter={this.handlesearch}
                />
              </div>
              <div className="col-md-4 col-sm-12">
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
            <div className="tab-table-content">
              <div className="py-4">
                <div className="table-container">
                  <TableWrapper
                    headerDetails={headerDetails}
                    queryHandler={this.handlePagination}
                    pageMeta={meta}
                    showFilterColumn={true}
                    parentHeaderChange={(value) =>
                      this.updateState(() => (headerDetails = value))
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
                          class_name,
                        } = item;
                        let date = new Date(cust_dob);
                        cust_dob = date.toLocaleDateString();
                        return (
                          <tr key={index}>
                            <td
                              className={
                                headerDetails[0].enabled ?? true ? "" : "d-none"
                              }
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {cust_code}
                              </div>
                            </td>
                            <td
                              className={
                                headerDetails[1].enabled ?? true ? "" : "d-none"
                              }
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {cust_refer}
                              </div>
                            </td>
                            <td
                              className={
                                headerDetails[2].enabled ?? true ? "" : "d-none"
                              }
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {""}
                              </div>
                            </td>
                            <td
                              className={
                                headerDetails[3].enabled ?? true ? "" : "d-none"
                              }
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {cust_name}
                              </div>
                            </td>
                            <td
                              className={
                                headerDetails[4].enabled ?? true ? "" : "d-none"
                              }
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {cust_phone2}
                              </div>
                            </td>
                            <td
                              className={
                                headerDetails[5].enabled ?? true ? "" : "d-none"
                              }
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {cust_dob}
                              </div>
                            </td>
                            <td
                              className={
                                headerDetails[6].enabled ?? true ? "" : "d-none"
                              }
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {class_name}
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
                                      <span className="icon-eye-grey px-3"></span>
                                      {t("View")}
                                    </div>
                                    <div
                                      className="d-flex align-items-center fs-16"
                                      onClick={() =>
                                        this.props.history.push(
                                          `/admin/customerplus/${id}/lpmanagement`
                                        )
                                      }
                                    >
                                      <span className="px-2">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="31"
                                          height="30"
                                          fill="currentColor"
                                          viewBox="0 0 15 30"
                                        >
                                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                        </svg>
                                      </span>
                                      {t("Loyalty Points Management")}
                                    </div>
                                    <div className="d-flex align-items-center fs-16">
                                      <span className="icon-schedule px-3"></span>
                                      {t("Reschedule Appointment")}
                                    </div>
                                    <div
                                      className="d-flex align-items-center fs-16"
                                      onClick={() => this.bookAppointment(item)}
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
                                      {t("Book Appointment")}
                                    </div>
                                    <div className="d-flex align-items-center fs-16 pb-3">
                                      <span className="icon-cancel-schedule px-3"></span>
                                      {t("Cancel Appointment")}
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

export const ListCustomerPlus = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ListCustomerPlusClass)
);
