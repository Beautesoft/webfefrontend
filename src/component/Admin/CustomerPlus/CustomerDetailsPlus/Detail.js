import React, { Component } from "react";
import "./style.scss";
import {
  Appointments,
  TreatmentHistory,
  PurchaseHistory,
  PersonalDetails,
  Favourites,
  MGMDetails,
  Dianosis,
} from "./Details";
import classnames from "classnames";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";

class DetailsClass extends Component {
  state = {
    activeTab: "1",
    isOpenTreatmentDone: false,
    isActiveTab: "detail",
  };

  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    const menu = queryParams.get("menu");
    if (menu)
      if (parseInt(menu) >= 1 && parseInt(menu) <= 7)
        this.setState({ activeTab: menu });
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
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
                  Details
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2",
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Appointments
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "3",
                  })}
                  onClick={() => {
                    this.toggle("3");
                  }}
                >
                  Products
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "4",
                  })}
                  onClick={() => {
                    this.toggle("4");
                  }}
                >
                  Packages
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "5",
                  })}
                  onClick={() => {
                    this.toggle("5");
                  }}
                >
                  Favourites
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "6",
                  })}
                  onClick={() => {
                    this.toggle("6");
                  }}
                >
                  MGM Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "7",
                  })}
                  onClick={() => {
                    this.toggle("7");
                  }}
                >
                  Diagnosis
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              {this.state.activeTab === "1" ? (
                <PersonalDetails id={this.props.id} />
              ) : (
                ""
              )}
            </TabPane>

            <TabPane tabId="2">
              {this.state.activeTab === "2" ? (
                <TreatmentHistory id={this.props.id} />
              ) : (
                ""
              )}
            </TabPane>

            <TabPane tabId="3">
              {this.state.activeTab === "3" ? <PurchaseHistory /> : ""}
            </TabPane>
            <TabPane tabId="4">
              {this.state.activeTab === "4" ? <Appointments /> : ""}
            </TabPane>
            <TabPane tabId="5">
              {this.state.activeTab === "5" ? <Favourites /> : ""}
            </TabPane>
            <TabPane tabId="6">
              {this.state.activeTab === "6" ? (
                <MGMDetails id={this.props.id} />
              ) : (
                ""
              )}
            </TabPane>
            <TabPane tabId="7">
              {this.state.activeTab === "7" ? (
                <Dianosis id={this.props.id} />
              ) : (
                ""
              )}
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}
export const Details = withTranslation()(DetailsClass);
