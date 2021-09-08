/* Auth Layout */
export { Login, ForgotPassword, ChangePassword } from "./Auth";

/* Admin Layout */

export {
  ListAppointment,
  CreateAppointment,
  AppointmentDetail,
  SelectTreatment,
} from "./Appointment";
export { Dashboard } from "./Dashboard";
export { Billing } from "./Billing";
export { CustomerReceipt } from "./Customer";
export { TransactionReceipt } from "./TransactionHistory";

export { Cart, CartNew, CartHome, TreatmentDone, BillOps } from "./Cart";
export { Catalog } from "./Catalog";
export {
  AddCustomer,
  ListCustomer,
  CustomerDetails,
  AccountDetails,
  TreatmentDetails,
  TreatmentCourseDetails,
  HoldSections,
  InvoiceHistorys,
} from "./Customer";
export { Payment } from "./Payment";
export { ListStaff, AddStaff, StaffDetails, StaffAvailability } from "./Staff";

export { ListSalons, CreateSalon, SalonDetails } from "./Saloon";
export { ListService, CreateService, ServiceDetails } from "./Services";
export { ListProduct, CreateProduct, ProductDetails } from "./Product";
export { Review } from "../component/Admin/Review";

export {
  NewListAppointment,
  NewCreateAppointment,
  NewAppointmentDetail,
  NewSelectTreatment,
} from "./NewAppointment";

export { DayEndReport } from "./DayEndReport";

export { InventoryMainPage } from "./Inventory";

export { TransactionHistory } from "./TransactionHistory";

export {
  SmtpSettings,
  SmtpCreate,
  SmtpDetails,
  SetupTransDetails,
  SetupTransaction,
  SetupTransCreate,
} from "./Settings";

export {
  AddStaffPlus,
  ListStaffPlus,
  EmployeeInfo,
  StaffSchedule,
  SecurityAuthorization,
  StaffSkillList,
  AddStaffSkill,
  StaffPlusDetails,
  StaffPlusAvailability,
} from "./StaffPlus";

export {
  AddCustomerPlus,
  CustomerDetailsPlus,
  ListCustomerPlus,
  AccountDetailsPlus,
  TreatmentDetailsPlus,
  TreatmentCourseDetailsPlus,
  HoldSectionsPlus,
  InvoiceHistoryPlus,
  LoyaltyPointsManagement,
  AddRedeemPolicy,
  AddRewardPolicy,
  Settings,
  LoyaltyPointsManagementSettings,
  CustomerPlusEditLayout,
} from "./CustomerPlus";
export { KPIDashboard } from "./KPI";
export {
  Reports,
  UnearnedRevenueReport,
  BirthdayReport,
  CustomerLastVisitReport,
  CustomerNewJoinReport,
  DailyCollectionReport,
  DailyInvoiceReport,
  ProductSalesReport,
  SalesByDepartmentReport,
  SalesCollectionsReport,
  SpecialTransactionTypeReport,
  StaffPerformanceReport,
  StockBalanceReport,
  StockMovementDetailReport,
  StockMovementSummaryReport,
  TreamentDoneReport,
} from "./Reports";
