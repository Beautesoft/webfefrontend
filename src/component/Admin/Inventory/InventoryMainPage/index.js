import React, { Component } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { InventoryList } from "./InventoryList";

export class InventoryMainPage extends Component {
  state = {
    activeMenu: "stockUsageMemo",
  };
  toggle = tab => {
    if (this.state.activeMenu !== tab) {
      this.setState({
        activeMenu: tab,
      });
    }
  };
  render() {
    let { activeMenu } = this.state;
    return (
      <>
        <div className="col-12">
          <div className="row">
            <div className="beautesoft-navlink customer-detail mt-3">
              <div className="filled-tabs">
                <div className="tabs-block">
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeMenu === "stockUsageMemo",
                        })}
                        onClick={() => {
                          this.toggle("stockUsageMemo");
                        }}
                      >
                        Stock Usage Memo
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
            </div>
          </div>
          <TabContent activeTab={this.state.activeMenu}>
            <TabPane tabId="stockUsageMemo">
              {activeMenu === "stockUsageMemo" ? (
                <div>
                  <InventoryList />
                </div>
              ) : null}
            </TabPane>
          </TabContent>
        </div>
      </>
    );
  }
}
