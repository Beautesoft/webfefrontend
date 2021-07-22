import React, { Component } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { SmtpList } from "./SmtpList";
import { SetupTransList } from "../SetupTransaction/SetupTransList";
import { withTranslation } from "react-i18next";

class SmtpSettingsClass extends Component {
  state = {
    activeMenu: "smtpSettings",
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
            <TabPane tabId="smtpSettings">
              {activeMenu === "smtpSettings" ? (
                <div className="smtp-Setting-section">
                  <div className="">
                    <SmtpList />
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

export const SmtpSettings = withTranslation()(SmtpSettingsClass);
