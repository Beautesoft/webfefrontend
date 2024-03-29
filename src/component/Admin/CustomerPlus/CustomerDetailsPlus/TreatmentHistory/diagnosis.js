import React, { Component } from "react";
import "./style.scss";
// import { Appointments, TreatmentHistory, PurchaseHistory, PersonalDetails, Favourites } from './Details'
import classnames from "classnames";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import {
  NormalInput,
  NormalButton,
  TableWrapper,
  NormalRadio,
} from "component/common";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export class DiagnosisPlus extends Component {
  state = {
    activeTab: "1",
    isOpenTreatmentDone: false,
    isActiveTab: "detail",
    headerDetails: [
      { label: "Date", sortKey: false, width: "180px" },
      { label: "Transaction #", width: "32px" },
      { label: "Treatment #", sortKey: false, width: "75px" },
      { label: "Discription", sortKey: false, width: "55px" },
      { label: "Payment", sortKey: false, width: "70px" },
      { label: "Credit balance", sortKey: false, width: "72px" },
      { label: "Outstanding", sortKey: false, width: "72px" },
    ],
    cartList: [{}, {}, {}, {}],
    showActive: false,
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    let { treatmentList, headerDetails, cartList, showActive } = this.state;
    return (
      <div className="treatment-account row">
        {/* <div className="col-6 mt-3 mb-4">
          <div className="row">
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '} Show active credit notes only
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '} Show all credit notes
              </Label>
            </FormGroup>
          </div>
        </div> */}

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
                      <tr key={index}>
                        <td className="position-relative status-type">
                          <span className={``}></span>
                          <div className="d-flex align-items-center justify-content-center">
                            {"12/12/2020"}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"ASDFSAD34534"}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"TRTTRA1134"}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"Facial Fire"}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"$1500"}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"$1500"}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            {"$1500"}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </TableWrapper>
          </div>
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
        </div>
      </div>
    );
  }
}
