import { CustomerPlusActionType } from "redux/actions/actionType";

const initialState = {
  customerPlusDetail: {},
  customerPlusSettings: {},
  rewardPolicyList: {},
  redeemPolicyList: {},
};

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case CustomerPlusActionType.getCustomerPlusDetail:
      return {
        ...state,
        customerPlusDetail: payload,
      };
    case CustomerPlusActionType.getCustomerPlusSettings:
      return {
        ...state,
        customerPlusSettings: payload,
      };
    case CustomerPlusActionType.getRewardPolicySettings:
      return {
        ...state,
        rewardPolicyList: payload,
      };
    case CustomerPlusActionType.getRedeemPolicySettings:
      return {
        ...state,
        redeemPolicyList: payload,
      };
    default:
      return state;
  }
};
