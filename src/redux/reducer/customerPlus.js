import { CustomerPlusActionType } from "redux/actions/actionType";

const initialState = {
  customerPlusDetail: {},
  customerPlusSettings: {},
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
    default:
      return state;
  }
};
