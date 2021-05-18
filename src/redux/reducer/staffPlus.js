import { StaffPlusActionType } from 'redux/actions/actionType';

const initialState = {
  staffPlusDetail: {},
  staffPlusWorkScheduleDetails: {},
};

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case StaffPlusActionType.getStaffPlusDetail:
      return {
        ...state,
        staffPlusDetail: payload,
      };
      case StaffPlusActionType.getStaffPlusWorkSchedule:
      return {
        ...state,
        staffPlusWorkScheduleDetails: payload,
      };
    default:
      return state;
  }
};
