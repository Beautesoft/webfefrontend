import React, { Component } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

import { SetupTransList } from "./SetupTransList";
import { SmtpList } from "../SmtpSettings/SmtpList";
import { withTranslation } from "react-i18next";

class SetupTransactionClass extends Component {
  state = {
    activeMenu: "setupTransaction",
  };
  toggle = (tab) => {
    if (this.state.activeMenu !== tab) {
      this.setState({
        activeMenu: tab,
      });
    }
  };
  render() {
    let { activeMenu } = this.state;
    let { t } = this.props;
    return (
      <>
        <div className="smtp-Setting-section col-12">
          <div className="row">
            <div className="beautesoft-navlink customer-detail mt-3">
              <div className="filled-tabs">
                <div className="tabs-block">
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeMenu === "smtpSettings",
                        })}
                        onClick={() =>
                          this.props.history.push(
                            `/admin/settings/smtpsettings`
                          )
                        }
                      >
                        {t("SMTP Settings")}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeMenu === "setupTransaction",
                        })}
                        onClick={() =>
                          this.props.history.push(
                            `/admin/settings/setuptransaction`
                          )
                        }
                      >
                        {t("Setup Transaction")}
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
            </div>
          </div>
          <TabContent activeTab={this.state.activeMenu}>
            <TabPane tabId="setupTransaction">
              {activeMenu === "setupTransaction" ? (
                <div className="setupTrans-section">
                  <div className="">
                    <SetupTransList />
                  </div>
                </div>
              ) : null}
            </TabPane>
          </TabContent>
        </div>
      </>
    );
  }
}

export const SetupTransaction = withTranslation()(SetupTransactionClass);
