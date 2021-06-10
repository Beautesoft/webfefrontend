import React from "react";
import { NormalButton, NormalSelect } from "component/common";
import { InputSearch, TableWrapper } from "component/common";
import { connect } from "react-redux";
import _ from "lodash";

export class RewardPolicyTableClass extends React.Component {
  state = {
    headerDetails: [
      { label: "Code", sortKey: "customerCode" },
      { label: "Cust Type", sortKey: "customerType", enabled: true },
      { label: "Reward Stock Type", sortKey: "rewardStockType", enabled: true },
      { label: "Currency Value", sortKey: "currencyValue", enabled: true },
      { label: "Point Value", sortKey: "pointsValue", enabled: true },
      { label: "Active", sortKey: "active", enabled: true },
      { label: "" },
    ],
    dataList: [],
    meta: {},
    currentIndex: -1,
    isMounted: true,
  };

  componentWillUnmount() {
    this.state.isMounted = false;
  }

  updateState = (data) => {
    if (this.state.isMounted) this.setState(data);
  };

  handlePagination = (page) => {
    console.log(page, "dsfsdfsdfsdf");
    //this.getCustomer(page);
  };

  handlesearch = (event) => {
    console.log("sadfasdfasdf", event.target.value);
    event.persist();

    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(() => {
        let searchString = event.target.value;
        let data = { search: searchString };
        //this.getCustomer(data);
      }, 500);
    }
    this.debouncedFn();
  };

  render() {
    let { headerDetails, dataList, meta, currentIndex } = this.state;
    return (
      <>
        <div className="customer-list container-fluid">
          <div className="row align-items-center">
            <div className="col-md-4">
              <h3 className="head-label">Redward Policy</h3>
            </div>
            <div className="col-md-8">
              <div className="d-flex">
                <div className="w-100 mr-5">
                  <InputSearch
                    className=""
                    placeholder="Search Policy"
                    onChange={this.handlesearch}
                  />
                </div>
                <div className="w-100 col-6 p-0">
                  <NormalButton
                    mainbg={true}
                    className="col-12 fs-15 float-right"
                    label="Add Reward Policy"
                    onClick={() =>
                      this.props.history.push("lpmanagement/addreward")
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
                    this.updateState(() => (headerDetails = value))
                  }
                >
                  {dataList
                    ? dataList.map((item, index) => {
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
                                          `lpmanagement/${id}/editredeem`
                                        )
                                      }
                                    >
                                      <span className="icon-eye-grey px-3"></span>{" "}
                                      Edit
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
                    : ""}
                </TableWrapper>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export const RewardPolicyTable = connect()(RewardPolicyTableClass);
