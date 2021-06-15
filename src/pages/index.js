/* Auth Layout */
export { Login, ForgotPassword, ChangePassword } from './Auth';

/* Admin Layout */

export { 
  ListAppointment, 
  CreateAppointment, 
  AppointmentDetail,
  SelectTreatment
} from './Appointment'
export { Dashboard } from './Dashboard';
export { Billing } from './Billing';
export { CustomerReceipt } from './Customer'
export { Cart, CartNew, CartHome, TreatmentDone, BillOps } from './Cart';
export { Catalog } from './Catalog';
export { AddCustomer, ListCustomer, CustomerDetails, AccountDetails, TreatmentDetails, TreatmentCourseDetails, HoldSections } from './Customer';
export { AddCustomerPlus, CustomerDetailsPlus, ListCustomerPlus, AccountDetailsPlus, TreatmentDetailsPlus, TreatmentCourseDetailsPlus, HoldSectionsPlus, LoyaltyPointsManagementSettings, Settings, AddRedeemPolicy, AddRewardPolicy, LoyaltyPointsManagement } from './CustomerPlus';
export { Payment } from './Payment';
export { ListStaff, AddStaff, StaffDetails, StaffAvailability } from './Staff';
export { AddStaffPlus,ListStaffPlus, EmployeeInfo, StaffSchedule, SecurityAuthorization, StaffSkillList, AddStaffSkill, StaffPlusDetails, StaffPlusAvailability } from './StaffPlus';



export { ListSalons, CreateSalon, SalonDetails } from './Saloon';
export { ListService, CreateService, ServiceDetails } from './Services';
export { ListProduct, CreateProduct, ProductDetails } from './Product';
export { Review } from '../component/Admin/Review';

export { 
  NewListAppointment, 
  NewCreateAppointment, 
  NewAppointmentDetail,
  NewSelectTreatment
} from './NewAppointment'