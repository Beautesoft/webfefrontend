import React, { Component } from "react";
import "./style.scss";
// import { Appointments, TreatmentHistory, PurchaseHistory, PersonalDetails, Favourites } from './Details'
// import { Treatmentaccount } from './account';
import classnames from "classnames";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Invoice } from "./Invoice/index";
import { withTranslation } from "react-i18next";

class InvoiceHistoryClass extends Component {
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
      <div className="beautesoft-navlink customer-detail">
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
                  {t("Invoice History")}
                </NavLink>
                {t("")}
              </NavItem>
              {t("")}
            </Nav>
            {t("")}
          </div>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              {this.state.activeTab === "1" ? (
                <Invoice id={this.props.id} />
              ) : (
                ""
              )}
            </TabPane>
            {t("")}
          </TabContent>
          {t("")}
        </div>
        {t("")}
      </div>
    );
  }
}
export const InvoiceHistory = withTranslation()(InvoiceHistoryClass);
