import React, { Component } from "react";
import "./style.scss";
// import { Appointments, TreatmentHistory, PurchaseHistory, PersonalDetails, Favourites } from './Details'
import classnames from "classnames";
import { history } from "helpers";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { NormalInput, NormalButton, TableWrapper } from "component/common";
import { withTranslation } from "react-i18next";

class CourseClass extends Component {
  state = {
    activeTab: "1",
    isOpenTreatmentDone: false,
    isActiveTab: "detail",
    headerDetails: [
      { label: "Date", sortKey: false, width: "80px" },
      { label: "Treatment ID", width: "32px" },
      { label: "Transac Ref #", sortKey: false, width: "125px" },
      { label: "Description", sortKey: false, width: "55px" },
      { label: "Type", sortKey: false, width: "70px" },
      { label: "Exp Date", sortKey: false, width: "92px" },
      { label: "Amount", sortKey: false, width: "72px" },
      { label: "Status", sortKey: false, width: "72px" },
      { label: "Trt #", sortKey: false, width: "72px" },
      { label: "Limit", sortKey: false, width: "72px" },
      { label: "Staff", sortKey: false, width: "72px" },
      { label: "Reverse", sortKey: false, width: "72px" },
    ],
    cartList: [{}, {}, {}, {}],
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    let { treatmentList, headerDetails, cartList } = this.state;
    let { t } = this.props;
    return (
      <div className="treatment-account row">
        <div className="col-6 mt-3 mb-4">
          <div className="row">
            <div className="col-5 mb-2">{t("Treatment List")}</div>
            <div className="col-5 mb-2">
              <NormalInput
                value={treatmentList}
                name="custName"
                onClick={() => this.setState({ isOpenCustomer: true })}
                onChange={() => {}}
                className="custome-name px-3 p-0"
              />
              {t("")}
            </div>
            {/* <div className="col-5">{t("Total treatment count")} </div>
            <div className="col-5">{t("4")}</div> */}
          </div>
          {t("")}
        </div>
        <div className="col-6 mt-3 mb-4">
          <div className="row">
            {/* <div className="col-6 mb-2">{t("Credit balance")}</div>
            <div className="col-6 mb-2">$4567</div>
            
            <div className="col-6">{t("Outstanding balance")}</div>
            <div className="col-6">$500</div> */}
          </div>
          {t("")}
        </div>
        <div className="col-12">
          <div className="table">
            <TableWrapper
              headerDetails={headerDetails}
              queryHandler={this.handlePagination}
              // pageMeta={pageMeta}
              // isEmpty={cartList.length === 0 ? true:false}
            >
              {cartList.length > 0
                ? cartList.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => this.props.handleShowDetail()}
                      >
                        <td className="position-relative status-type">
                          <div className="d-flex align-items-center justify-content-center">
                            {"12/12/2020"}
                          </div>
                          {t("")}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"CNRAFT11..."}
                          </div>
                          {t("")}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"RCPRAFT11..."}
                          </div>
                          {t("")}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"Biohairjet..."}
                          </div>
                          {t("")}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"N"}
                          </div>
                          {t("")}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"N/A"}
                          </div>
                          {t("")}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"$0.00"}
                          </div>
                          {t("")}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"Take"}
                          </div>
                          {t("")}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"03"}
                          </div>
                          {t("")}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"$210.00"}
                          </div>
                          {t("")}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"$210.00"}
                          </div>
                          {t("")}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <svg
                              width="24"
                              height="20"
                              viewBox="0 0 24 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.49 7C19.9828 5.56678 19.1209 4.2854 17.9845 3.27542C16.8482 2.26543 15.4745 1.55976 13.9917 1.22426C12.5089 0.88875 10.9652 0.93434 9.50481 1.35677C8.04437 1.77921 6.71475 2.56471 5.64 3.64L1 8M23 12L18.36 16.36C17.2853 17.4353 15.9556 18.2208 14.4952 18.6432C13.0348 19.0657 11.4911 19.1112 10.0083 18.7757C8.52547 18.4402 7.1518 17.7346 6.01547 16.7246C4.87913 15.7146 4.01717 14.4332 3.51 13"
                                stroke="black"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              {t("")}
                            </svg>
                            {t("")}
                          </div>
                          {t("")}
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
        <div className="col-12 action-bar mb-3 d-flex text-center">
          <NormalButton
            buttonClass={"action mr-4"}
            // mainbg={true}
            className="col-12 fs-15 mr-3"
            label="Next appointment"
            // outline={false}
            onClick={() => this.setState({ isOpenEditDisc: false })}
          />
          <NormalButton
            buttonClass={"action mr-4"}
            // mainbg={true}
            className="col-12 fs-15 mr-3"
            label="Reminder"
            // outline={false}
            onClick={() => this.setState({ isOpenEditDisc: false })}
          />
          <NormalButton
            buttonClass={"action"}
            // mainbg={true}
            className="col-12 fs-15 "
            label="Exchange"
            // outline={false}
            onClick={() => this.setState({ isOpenEditDisc: false })}
          />
          {t("")}
        </div>
        <div className="col-12 text-center">
          <NormalButton
            buttonClass={"print"}
            // mainbg={true}
            className="col-12 fs-15 "
            label="Print"
            // outline={false}
            onClick={() => this.setState({ isOpenEditDisc: false })}
          />
          {t("")}
        </div>
        {t("")}
      </div>
    );
  }
}
export const Course = withTranslation()(CourseClass);
