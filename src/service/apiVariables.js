import { generateQuery } from "./helperFunctions";
import { getStaffBranchwise } from "redux/actions/staff";

export const authApi = {
  login: {
    api: "login",
    method: "post",
    baseURL: "normal",
  },
  logout: {
    api: "logout",
    method: "post",
    baseURL: "token",
  },
  getSaloon: {
    api: "branchlogin/",
    method: "get",
    baseURL: "nomal",
  },
  // login: {
  //   api: 'user/login',
  //   method: 'post',
  //   baseURL: 'normal',
  // },
  forgotPassword: {
    api: "otp/",
    method: "post",
    baseURL: "normal",
  },
  verifyOtp: {
    url: "otpvalidate/",
    id: "",
    method: "post",
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "normal",
  },
  resetPassword: {
    url: "passwordreset/",
    method: "post",
    id: "",
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "normal",
  },
  getTokenDetails: {
    api: "userlist",
    method: "get",
    baseURL: "token",
  },
  // changePassword: {
  //   url: 'user/reset_password',
  //   method: 'post',
  //   query: {
  //     token: null,
  //   },
  //   get api() {
  //     return this.url + generateQuery(this.query);
  //   },
  //   set addQuery({ key, payload }) {
  //     this.query[key] = payload;
  //   },
  //   baseURL: 'token',
  // },
};

export const appointment = {
  addAppointment: {
    api: "appointment/",
    method: "post",
    baseURL: "token",
  },
  addTreatment: {
    api: "treatmentdetails/",
    method: "post",
    baseURL: "token",
  },
  addBooking: {
    url: "treatment/",
    method: "patch",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updateTreatment: {
    url: "itemcart/",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  holdTreatment: {
    url: "itemcart/",
    method: "patch",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },

  deleteTreatment: {
    url: "itemcart/",
    method: "delete",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },

  getTreatment: {
    url: "itemdept/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getTreatmentDetailList: {
    url: "stocklist/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getTreatmentDetail: {
    url: "treatmentstock/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getOutletDetail: {
    url: "treatmentdetails/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },

  getCartList: {
    url: "itemcart/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },

  updateAppointment: {
    url: "appointment/",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  deleteAppointment: {
    url: "appointment/",
    method: "delete",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getAppointment: {
    url: "appointment/",
    method: "get",
    id: "",
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
};

export const saloon = {
  addSaloon: {
    api: "salon/",
    method: "post",
    baseURL: "token",
  },
  updateSaloon: {
    url: "salon/",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  deleteSaloon: {
    url: "salon/",
    method: "delete",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getSaloon: {
    url: "salon/",
    method: "get",
    id: "",
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
};

export const staff = {
  addStaff: {
    api: "staffs/",
    method: "post",
    baseURL: "normal",
  },
  updateStaff: {
    url: "staffs/",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  deleteStaff: {
    url: "staffs/",
    method: "delete",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getStaff: {
    url: "staffs/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getStaffAvailability: {
    url: "shiftdatewise/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getStaffBranchwise: {
    url: "employeebranchwise/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
};

export const staffPlus = {
  addStaff: {
    api: "staffPlus/",
    method: "post",
    baseURL: "normal",
  },
  updateEmpInfo: {
    url: "/EmpInfo/",
    method: "put",
    id: null,
    get api() {
      return "staffPlus/" + this.id + this.url;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updateStaff: {
    url: "staffPlus/",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  deleteStaff: {
    url: "staffPlus/",
    method: "delete",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getWorkSchedule: {
    url: "/WorkSchedule/",
    method: "get",
    id: null,
    get api() {
      return "staffPlus/" + this.id + this.url;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updateWorkSchedule: {
    url: "/WorkSchedule/",
    method: "put",
    id: null,
    get api() {
      return "staffPlus/" + this.id + this.url;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getSchedule: {
    url: "WorkScheduleMonth/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updateSchedule: {
    url: "WorkScheduleMonth/",
    method: "post",
    get api() {
      return this.url;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getAllEmpSchedule: {
    url: "MonthlyAllSchedule/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getStaff: {
    url: "staffPlus/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getStaffPlus: {
    url: "staffPlus/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getSkillList: {
    url: "EmployeeSkills/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getEmpSkillList: {
    url: "staffPlus/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id + "/StaffSkills/";
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updateEmpSkillList: {
    url: "staffPlus/",
    method: "post",
    id: null,
    get api() {
      return this.url + this.id + "/StaffSkills/";
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getSecurityAuthorizationSettings: {
    url: "EmployeeSecuritySettings/",
    method: "get",
    get api() {
      return this.url;
    },
    baseURL: "token",
  },
  updateSecurityAuthorizationSettings: {
    url: "EmployeeSecuritySettings/",
    method: "post",
    get api() {
      return this.url;
    },
    baseURL: "token",
  },
  getIndividualAuthorizationSettings: {
    url: "IndividualEmpSettings/",
    id: null,
    method: "get",
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updateIndividualAuthorizationSettings: {
    url: "IndividualEmpSettings/",
    id: null,
    method: "post",
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
};

export const customer = {
  addCustomer: {
    api: "customer/",
    method: "post",
    baseURL: "token",
  },
  updateCustomer: {
    url: "customer/",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getCustomer: {
    url: "customer/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  addHoldItem: {
    api: "holditem/issued/",
    method: "post",
    baseURL: "token",
  },
};

export const customerPlus = {
  getMGMdetails: {
    url: "CustomerPlus/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id + "/MGM";
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  addCustomerPlus: {
    api: "CustomerPlus/",
    method: "post",
    baseURL: "token",
  },
  updateCustomerPlus: {
    url: "CustomerPlus/",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getCustomerPlus: {
    url: "CustomerPlus/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getCustomerPlusSettings: {
    url: "CustomerFormSettings/",
    method: "get",
    id: null,
    get api() {
      if (this.id == null) return this.url;
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updateCustomerPlusSettings: {
    url: "CustomerFormSettings/",
    method: "put",
    get api() {
      return this.url;
    },
    baseURL: "token",
  },
  getDiagnosisPhotos: {
    url: "CustomerPlus/",
    method: "get",
    id: null,
    params: "",
    get api() {
      return this.url + this.id + "/photoDiagnosis/" + this.params;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  addDiagnosisPhoto: {
    url: "PhotoDiagnosis/",
    method: "post",
    get api() {
      return this.url;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updateDiagnosisPhoto: {
    url: "PhotoDiagnosis/",
    id: null,
    method: "put",
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getDiagnosisHistory: {
    url: "CustomerPlus/",
    method: "get",
    id: null,
    params: "",
    get api() {
      return this.url + this.id + "/photoDiagnosisCompare/" + this.params;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  addDiagnosisHistory: {
    url: "DiagnosisCompare/",
    method: "post",
    get api() {
      return this.url;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updateDiagnosisHistory: {
    url: "DiagnosisCompare/",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
};

export const lpManagement = {
  getCustomerPoints: {
    url: "CustomerPlus/",
    method: "get",
    id: null,
    params: "",
    get api() {
      return this.url + this.id + "/CustomerPoints" + this.params;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  addManualPoints: {
    url: "CustomerPlus/",
    method: "post",
    id: null,
    params: "",
    get api() {
      return this.url + this.id + "/Rewards/" + this.params;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getRewardPolicy: {
    url: "RewardPolicy",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  addRewardPolicy: {
    url: "RewardPolicy/",
    method: "post",
    get api() {
      return this.url;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updateRewardPolicy: {
    url: "RewardPolicy/",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getRedeemPolicy: {
    url: "RedeemPolicy",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  addRedeemPolicy: {
    url: "RedeemPolicy/",
    method: "post",
    get api() {
      return this.url;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updateRedeemPolicy: {
    url: "RedeemPolicy/",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
};

export const services = {
  addServices: {
    api: "services/",
    method: "post",
    baseURL: "token",
  },
  updateServices: {
    url: "services/",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  deleteServices: {
    url: "services/",
    method: "delete",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getServices: {
    url: "services/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getComboServices: {
    url: "comboservices/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
};

export const payment = {
  addPayment: {
    url: "postaud/",
    method: "post",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updatePayment: {
    url: "postaud/",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  deletePayment: {
    url: "postaud/",
    method: "delete",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getPayment: {
    url: "postaud/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
};

export const Products = {
  addProduct: {
    api: "add_product",
    method: "post",
    baseURL: "normal",
  },
};

export const common = {
  addBranch: {
    api: "branch/",
    method: "post",
    baseURL: "normal",
  },
  updateBranch: {
    url: "branch/",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  commonPatch: {
    url: "",
    method: "patch",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getCommon: {
    url: "",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  addCommon: {
    url: "",
    method: "post",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updateCommon: {
    url: "",
    method: "put",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  deleteCommon: {
    url: "",
    method: "delete",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getBranch: {
    url: "branch/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getJobtitle: {
    api: "jobtitle/",
    method: "get",
    baseURL: "token",
  },
  getShift: {
    url: "shiftlist",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getCategory: {
    api: "category/",
    method: "get",
    baseURL: "token",
  },
  getSkills: {
    api: "skills",
    method: "get",
    baseURL: "token",
  },
  getCustomer: {
    api: "customers/all/",
    method: "get",
    baseURL: "token",
  },
};

export const KPI = {
  getDailyCollections: {
    url: "DailySalesBySite",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getMonthlyCollections: {
    url: "MonthlySalesBySite",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getConsultantCollections: {
    url: "DailySalesByConsultant",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getRankingByOutlet: {
    url: "RankingByOutlet",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getServicesRankingByConsultant: {
    url: "ServicesByConsultant",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  getSalesRankingByConsultant: {
    url: "SalesByConsultant",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
};
export const multiLanguage = {
  getMultiLanguage: {
    api: "MultiLanguage",
    method: "get",
    baseURL: "normal",
  },
};
export const Reporting = {
  getReportLayout: {
    url: "ReportSettings/",
    method: "get",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
  updateReportLayout: {
    url: "ReportSettings/",
    method: "post",
    id: null,
    get api() {
      return this.url + this.id;
    },
    set addQuery({ key, payload }) {
      this[key] = payload;
    },
    baseURL: "token",
  },
};
