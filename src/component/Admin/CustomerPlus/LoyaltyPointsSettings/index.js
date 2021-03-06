import React from "react";
import { Navigation } from "react-minimal-side-navigation";
import { RedeemPolicyTable } from "./RedeemPolicyTable";
import { RewardPolicyTable } from "./RewardPolicyTable";
import { ManualReward } from "./ManualReward";
import { ManualRedeem } from "./ManualRedeem";

export class LoyaltyPointsManagementSettings extends React.Component {
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
