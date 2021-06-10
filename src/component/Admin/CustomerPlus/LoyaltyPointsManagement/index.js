import React from "react";
import { NormalButton, NormalInput } from "component/common";
import { InputSearch, TableWrapper } from "component/common";
import filter from "../../../../assets/images/filter.png";
import "./style.scss";
import { getCustomer } from "redux/actions/customer";
import { updateForm } from "redux/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigation } from "react-minimal-side-navigation";
import { RedeemPolicyTable } from "./RedeemPolicyTable";
import { RewardPolicyTable } from "./RewardPolicyTable";
import { ManualReward } from "./ManualReward";
import { ManualRedeem } from "./ManualRedeem";
import _ from "lodash";

export class LoyaltyPointsManagement extends React.Component {
  state = {
    currentMenu: "/",
    isMounted: true,
  };

  componentWillUnmount() {
    this.state.isMounted = false;
  }

  updateState = (data) => {
    if (this.state.isMounted) this.setState(data);
  };

  handleMenuChange = (itemId) => {
    this.updateState({
      currentMenu: itemId,
    });
  };

  render() {
    let { currentMenu } = this.state;
    return (
      <>
        <div className="customer-list container-fluid">
          <h3 className="head-label mb-5">Loyalty Program</h3>
          <div className="row">
            <div className="col-md-2 mb-5">
              <Navigation
                activeItemId="/"
                onSelect={({ itemId }) => this.handleMenuChange(itemId)}
                items={[
                  {
                    title: "Reward Poilicy",
                    itemId: "/",
                  },
                  {
                    title: "Redeem Poilicy",
                    itemId: "/redeem",
                  },
                  {
                    title: "Manual Reward",
                    itemId: "/manualReward",
                  },
                  {
                    title: "Manual Redeem",
                    itemId: "/manualRedeem",
                  },
                ]}
              />
            </div>
            <div className="col-md-10">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <h3 className="head-label">Customer Details</h3>
                  </div>
                </div>
                <div className="row mt-2 mb-5">
                  <div className="col-md-6  mt-2">
                    <label className="label">Name</label>
                    <NormalInput disabled />
                  </div>
                  <div className="col-md-6 mt-2">
                    <label className="label">Code Referance</label>
                    <NormalInput disabled />
                  </div>

                  <div className="col-md-6  mt-2">
                    <label className="label">Available Points</label>
                    <NormalInput disabled />
                  </div>
                </div>
              </div>

              {currentMenu == "/" ? (
                <RewardPolicyTable history={this.props.history} />
              ) : currentMenu == "/redeem" ? (
                <RedeemPolicyTable history={this.props.history} />
              ) : currentMenu == "/manualReward" ? (
                <ManualReward />
              ) : (
                <ManualRedeem />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
