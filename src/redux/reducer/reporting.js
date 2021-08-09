import { ReportActionType } from "redux/actions/actionType";

const initialState = {
  reportLayout: {},
};

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case ReportActionType.getReportLayout:
      return {
        ...state,
        reportLayout: payload,
      };
    default:
      return state;
  }
};
