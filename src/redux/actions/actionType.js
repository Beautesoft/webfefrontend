// action type and its name defined here as common
export const AuthActionType = {
  getUserLoginDetails: "GET_USER_LOGIN_DETAILS",
  getTokenDetails: "GET_TOKEN_DETAILS",
};

export const CommonActionType = {
  getBranchList: "GET_BRANCH_LIST",
  getJobtitleList: "GET_JOBTITLE_LIST",
  getShiftList: "GET_SHIFT_LIST",
  getCategoryList: "GET_CATEGORY_LIST",
  getSkillsList: "GET_SKILLS_LIST",
  getCustomerList: "GET_Customer_LIST",
};

export const AppointmentActionType = {
  customerDetail: "CUSTOMER_DETAIL",
  appointmentDetail: "APPOINTMENT_DETAIL",
  getTreatmentDetail: "GET_TREATMENT_DETAIL",
  getOutletDetail: "GET_OUTLET_DETAIL",
  getSelectedTreatmentList: "GET_SELECTED_TREATMENT_LIST",
  getConfirmedBookingList: "GET_CONFIRMED_BOOKING_LIST",
  getBookAppointmentList: "GET_BOOK_APPOINTMENT_LIST",
  getAppointmentCartList: "GET_APPOINTMENT_CART_LIST",
};

export const StaffActionType = {
  getStaffDetail: "GET_STAFF_DETAIL",
};

export const StaffPlusActionType = {
  getStaffPlusDetail: "GET_STAFF_PLUS_DETAIL",
  getStaffPlusWorkSchedule: "GET_STAFF_PLUS_WORK_SCHEDULE",
  getStaffPlusSchedule: "GET_STAFF_PLUS_SCHEDULE",
  getStaffPlusAllEmpSchedule: "GET_STAFF_PLUS_ALL_EMP_SCHEDULE",
  getStaffPlusSkillList: "GET_STAFF_PLUS_SKILL_LIST",
  getEmpEmpSkillList: "GET_EMP_SKILL_LIST",
  getAuthorizationSettings: "GET_AUTHORIZATION_SETTINGS",
};

export const SaloonActionType = {
  getSaloonDetail: "GET_SALOON_DETAIL",
};

export const ServicesActionType = {
  getServicesDetail: "GET_SERVICES_DETAIL",
};

export const PaymentActionType = {
  getPaymentDetail: "GET_PAYMENT_DETAIL",
};

export const CustomerActionType = {
  getCustomerDetail: "GET_CUSTOMER_DETAIL",
};

export const CustomerPlusActionType = {
  getCustomerPlusDetail: "GET_CUSTOMER_PLUS_DETAIL",
  getCustomerPlusSettings: "GET_CUSTOMER_PLUS_SETTINGS",
  getRewardPolicySettings: "GET_REWARD_POLICY_SETTINGS",
  getRedeemPolicySettings: "GET_REDEEM_POLICY_SETTINGS",
};

export const KPIActionType = {
  getDailyCollections : "GET_DAILY_COLLECTIONS",
  getMonthlyCollections : "GET_MONTHLY_COLLECTIONS",
  getConsultantCollections : "GET_CONSULTATNT_COLLECTIONS",
  getRankingByOutlet : "GET_RANKING_BY_OUTLET",
  getConsultantServiceRanking : "GET_CONSULTATNT_SERVICE_RANKING",
  getConsultantSalesRanking : "GET_CONSULTATNT_SALES_RANKING",
}