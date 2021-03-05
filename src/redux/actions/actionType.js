// action type and its name defined here as common
export const AuthActionType = {
  getUserLoginDetails: 'GET_USER_LOGIN_DETAILS',
  getTokenDetails: 'GET_TOKEN_DETAILS',
};

export const CommonActionType = {
  getBranchList: 'GET_BRANCH_LIST',
  getJobtitleList:"GET_JOBTITLE_LIST",
  getShiftList:"GET_SHIFT_LIST",
  getCategoryList:"GET_CATEGORY_LIST",
  getSkillsList:"GET_SKILLS_LIST",
  getCustomerList:"GET_Customer_LIST"
};

export const AppointmentActionType = {
  customerDetail: 'CUSTOMER_DETAIL',
  appointmentDetail: 'APPOINTMENT_DETAIL',
  getTreatmentDetail: 'GET_TREATMENT_DETAIL',
  getOutletDetail: 'GET_OUTLET_DETAIL',
  getSelectedTreatmentList: 'GET_SELECTED_TREATMENT_LIST',
  getConfirmedBookingList: 'GET_CONFIRMED_BOOKING_LIST',
  getBookAppointmentList: "GET_BOOK_APPOINTMENT_LIST",
  getAppointmentCartList: "GET_APPOINTMENT_CART_LIST"
};

export const StaffActionType = {
  getStaffDetail: 'GET_STAFF_DETAIL',
};

export const SaloonActionType = {
  getSaloonDetail: 'GET_SALOON_DETAIL',
};

export const ServicesActionType = {
  getServicesDetail: 'GET_SERVICES_DETAIL',
};

export const PaymentActionType = {
  getPaymentDetail: 'GET_PAYMENT_DETAIL',
};

export const CustomerActionType = {
  getCustomerDetail: 'GET_CUSTOMER_DETAIL',
};