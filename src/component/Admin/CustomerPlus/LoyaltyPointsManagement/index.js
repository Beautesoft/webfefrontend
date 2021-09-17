import React from "react";
import { NormalButton, NormalInput } from "component/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigation } from "react-minimal-side-navigation";
import { RedeemPolicyTable } from "./RedeemPolicyTable";
import { RewardPolicyTable } from "./RewardPolicyTable";
import { getCommonApi } from "redux/actions/common";
import { withTranslation } from "react-i18next";

class LoyaltyPointsManagementClass extends React.Component {
  state = {
    currentMenu: "/",
    isMounted: true,
    cust_name: "",
    cust_bal_point: "",
    reference: "",
  };

  componentDidMount() {
    this.props
      .getCommonApi(`CustomerPlus/${this.props.match.params.id}/Rewards`)
      .then((e) => {
        this.updateState({ ...e.data });
      });
  }

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
    let { t } = this.props;
    return (
      <>
        <div className="customer-list container-fluid">
          <h3 className="head-label mb-5">{t("Loyalty Program")}</h3>
          <div className="row">
            <div className="col-md-2 mb-5">
              <Navigation
                activeItemId={this.state.currentMenu}
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
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <h3 className="head-label">{t("Customer Details")}</h3>
                  </div>
                </div>
                <div className="row mt-2 mb-5">
                  <div className="col-md-6  mt-2">
                    <label className="label">{t("Name")}</label>
                    <NormalInput value={this.state.cust_name} disabled />
                  </div>
                  <div className="col-md-6 mt-2">
                    <label className="label">{t("Code Referance")}</label>
                    <NormalInput value={this.state.reference} disabled />
                  </div>

                  <div className="col-md-6  mt-2">
                    <label className="label">{t("Available Points")}</label>
                    <NormalInput value={this.state.cust_point} disabled />
                  </div>
                </div>
              </div>

              {currentMenu == "/" ? (
                <div>
                  <div className="d-flex flex-row-reverse p-3">
                    <NormalButton
                      label="Add Manual Reward"
                      mainbg={true}
                      onClick={() =>
                        this.props.history.push(
                          `/admin/customerplus/${this.props.match.params.id}/lpmanagement/reward`
                        )
                      }
                    />
                  </div>
                  <RewardPolicyTable
                    history={this.props.history}
                    id={this.props.match.params.id}
                  />
                </div>
              ) : (
                <div>
                  <div className="d-flex flex-row-reverse p-3">
                    <NormalButton
                      label="Add Manual Redeem"
                      mainbg={true}
                      onClick={() =>
                        this.props.history.push(
                          `/admin/customerplus/${this.props.match.params.id}/lpmanagement/redeem`
                        )
                      }
                    />
                  </div>
                  <RedeemPolicyTable
                    history={this.props.history}
                    id={this.props.match.params.id}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCommonApi }, dispatch);
};

export const LoyaltyPointsManagement = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(LoyaltyPointsManagementClass)
);
