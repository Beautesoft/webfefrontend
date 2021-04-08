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
export { Payment } from './Payment';
export { ListStaff, AddStaff, StaffDetails, StaffAvailability } from './Staff';
export { AddStaffPlus,ListStaffPlus, EmployeeInfo, StaffSchedule} from './StaffPlus';



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