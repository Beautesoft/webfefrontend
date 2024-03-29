import React, { Component } from "react";
import "./style.scss";
// import { Appointments, TreatmentHistory, PurchaseHistory, PersonalDetails, Favourites } from './Details'
// import { Treatmentaccount } from './account';
import classnames from "classnames";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import {
  TreatmentCoursePlus,
  DiagnosisPlus,
  treatmentHistoryPlus,
} from "./TreatmentHistory/index.js";
import { withTranslation } from "react-i18next";

class TreatmentHistoryClass extends Component {
  state = {
    activeTab: "1",
    isOpenTreatmentDone: false,
    isActiveTab: "detail",
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    let { t } = this.props;
    return (
      <div className="beautesoft-navlink">
        <div className="filled-tabs">
          <div className="tabs-block">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1",
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  {t("Treatment History")}
                </NavLink>
              </NavItem>

              {/* <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    {t("Diagnosis")}
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggle('3'); }}
                                >
                                    {t("Treatment History")}
                                </NavLink>
                            </NavItem> */}
            </Nav>
          </div>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              {this.state.activeTab === "1" ? (
                <TreatmentCoursePlus id={this.props.id} />
              ) : (
                ""
              )}
            </TabPane>

            {/* <TabPane tabId="2">
                            {this.state.activeTab === "2" ?
                                // <TreatmentHistory />
                                <Diagnosis id={this.props.id} />
                                : ""}
                        </TabPane>

                        <TabPane tabId="3">
                            {this.state.activeTab === "3" ?
                                // <PurchaseHistory />
                                <treatmentHistory id={this.props.id} />
                                : ""}
                        </TabPane> */}
          </TabContent>
        </div>
      </div>
    );
  }
}
export const TreatmentHistory = withTranslation()(TreatmentHistoryClass);
