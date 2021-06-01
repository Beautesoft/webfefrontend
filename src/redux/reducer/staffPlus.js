import { StaffPlusActionType } from 'redux/actions/actionType';

const initialState = {
  staffPlusDetail: {},
  staffPlusWorkScheduleDetails: {},
  staffPlusSchedule: {},
  staffPlusSkillList : {},
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
      case StaffPlusActionType.getStaffPlusSchedule:
      return {
        ...state,
        staffPlusSchedule: payload,
      };
      case StaffPlusActionType.getStaffPlusSkillList:
      return {
        ...state,
        staffPlusSkillList: payload,
      };
    default:
      return state;
  }
};
