import React from "react";
import { NormalButton, NormalSelect } from "component/common";
import { InputSearch, TableWrapper } from "component/common";
import { connect } from "react-redux";
import _ from "lodash";
import { withTranslation } from "react-i18next";

export class RedeemPolicyTableClass extends React.Component {
  state = {
    headerDetails: [
      { label: "Code", sortKey: "customerCode" },
      { label: "Cust Class", sortKey: "customerClass", enabled: true },
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
    let { t } = this.props;
    return (
      <>
        <div className="customer-list container-fluid">
          <div className="row align-items-center">
            <div className="col-md-4">
              <h3 className="head-label">{t("Redeem Policy")}</h3>
              {t("")}
            </div>
            <div className="col-md-8">
              <InputSearch
                className=""
                placeholder="Search Policy"
                onChange={this.handlesearch}
              />
              {t("")}
            </div>
            {t("")}
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
                              {t("")}
                            </td>
                            <td
                              className={
                                headerDetails[1].enabled ?? true ? "" : "d-none"
                              }
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {cust_refer}
                              </div>
                              {t("")}
                            </td>
                            <td
                              className={
                                headerDetails[2].enabled ?? true ? "" : "d-none"
                              }
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {""}
                              </div>
                              {t("")}
                            </td>
                            <td
                              className={
                                headerDetails[3].enabled ?? true ? "" : "d-none"
                              }
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {cust_name}
                              </div>
                              {t("")}
                            </td>
                            <td
                              className={
                                headerDetails[4].enabled ?? true ? "" : "d-none"
                              }
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {cust_phone2}
                              </div>
                              {t("")}
                            </td>
                            <td
                              className={
                                headerDetails[5].enabled ?? true ? "" : "d-none"
                              }
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {cust_dob}
                              </div>
                              {t("")}
                            </td>
                            <td
                              className={
                                headerDetails[6].enabled ?? true ? "" : "d-none"
                              }
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {"123"}
                              </div>
                              {t("")}
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
                                    <i className="icon-more">{t("")}</i>
                                    {t("")}
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
                                      <span className="icon-eye-grey px-3">
                                        {t("")}
                                      </span>
                                      {t("Edit")}
                                    </div>
                                    {t("")}
                                  </div>
                                  {t("")}
                                </>
                              ) : (
                                <div className="d-flex align-items-center justify-content-center horizontal-more">
                                  <i className="icon-more">{t("")}</i>
                                  {t("")}
                                </div>
                              )}
                            </td>
                            {t("")}
                          </tr>
                        );
                      })
                    : ""}
                </TableWrapper>
                {t("")}
              </div>
              {t("")}
            </div>
            {t("")}
          </div>
          {t("")}
        </div>
        {t("")}
      </>
    );
  }
}

export const RedeemPolicyTable = withTranslation()(
  connect()(RedeemPolicyTableClass)
);
