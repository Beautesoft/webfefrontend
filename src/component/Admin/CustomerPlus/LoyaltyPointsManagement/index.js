import React from "react";
import { NormalButton, NormalSelect } from "component/common";
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
import _ from "lodash";

export class LoyaltyPointsManagement extends React.Component {
  state = {
    currentMenu: "/",
  };

  handleMenuChange = (itemId) => {
    this.setState({
      currentMenu: itemId,
    });
  };

  render() {
    let { currentMenu } = this.state;
    return (
      <>
        <div className="customer-list container-fluid">
          <h3 className="head-label mb-4">Loyalty Program</h3>
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
                ]}
              />
            </div>
            <div className="col-md-10">
              {currentMenu == "/" ? (
                <RewardPolicyTable history={this.props.history}/>
              ) : (
                <RedeemPolicyTable history={this.props.history}/>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
