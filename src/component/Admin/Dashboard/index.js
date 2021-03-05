import React, { Component } from 'react';
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import './style.scss'
import { AdminStats, SalesStats } from "./Statistic"
export class Dashboard extends Component {
    state = {
        activeTab: '1',
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div className="dashboard container">
                {/* <h3 className="head-label">Statistics</h3>
                    <div className="tab-view">
                        <Nav tabs>
                            <div className="col-md-2 p-0">
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}
                                    >
                                        <div className="d-flex flex-column align-items-center">
                                            <span>Admin</span>
                                        </div>
                                    </NavLink>
                                </NavItem>
                            </div>
                            <div className="col-md-2 p-0">
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}
                                    >
                                        <div className="d-flex flex-column align-items-center">
                                            <span>Sales</span>
                                        </div>
                                    </NavLink>
                                </NavItem>
                            </div>

                        </Nav>
                    </div>
                    <div className="border-bottom-line"></div>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            {this.state.activeTab === "1" ?
                                <AdminStats />
                                : ""}
                        </TabPane>
                        <TabPane tabId="2">
                            {this.state.activeTab === "2" ?
                                <SalesStats />
                                : ""}
                        </TabPane>

                    </TabContent> */}
                    <AdminStats />
            </div>

        );
    }
}