const routers = [
  {
    path: "/",
    auth: false,
    exact: true,
    redirect: "/auth/login",
  },
  {
    component: "AuthLayout",
    path: "/auth",
    redirect: "/auth/login",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Login",
        path: "/login",
        auth: false,
        exact: false,
      },
      {
        component: "ForgotPassword",
        path: "/forgotPassword",
        auth: false,
        exact: false,
      },
      {
        component: "ChangePassword",
        path: "/resetPassword/:name",
        auth: false,
        exact: false,
      },
    ],
  },
  {
    component: "MainLayout",
    path: "/admin",
    // redirect: '/admin/dashboard',
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Dashboard",
        path: "/dashboard",
        auth: false,
        exact: true,
      },
      {
        component: "Billing",
        path: "/billing",
        auth: false,
        exact: true,
      },
      {
        component: "CustomerReceipt",
        path: "/billing/print",
        auth: false,
        exact: true,
      },

      {
        component: "CustomerReceipt",
        path: "/billing/print/bill/:id",
        auth: false,
        exact: true,
      },
      {
        component: "TransactionHistory",
        path: "/transactionhistory",
        auth: false,
        exact: true,
      },
      {
        component: "TransactionReceipt",
        path: "/transactionhistory/print",
        auth: false,
        exact: true,
      },

      {
        component: "TransactionReceipt",
        path: "/transactionhistory/print/bill/:id",
        auth: false,
        exact: true,
      },
      {
        component: "CartHome",
        path: "/cart/old",
        auth: false,
        exact: true,
      },
      {
        component: "CartNew",
        path: "/cart",
        auth: false,
        exact: true,
      },
      {
        component: "TreatmentDone",
        path: "/cart/treatment-done",
        auth: false,
        exact: true,
      },
      {
        component: "BillOps",
        path: "/cart/bill-ops",
        auth: false,
        exact: true,
      },
      {
        component: "Catalog",
        path: "/catalog",
        auth: false,
        exact: true,
      },
      {
        component: "Payment",
        path: "/payment",
        auth: false,
        exact: true,
      },
      {
        component: "Payment",
        path: "/payment/:id",
        auth: false,
        exact: true,
      },
      {
        component: "ListSalons",
        path: "/salons",
        auth: false,
        exact: true,
      },
      {
        component: "CreateSalon",
        path: "/salons/add",
        auth: false,
        exact: true,
      },
      {
        component: "CreateSalon",
        path: "/salons/:id/editSaloon",
        auth: false,
        exact: true,
      },
      {
        component: "SalonDetails",
        path: "/salons/:id/salonDetails",
        auth: false,
        exact: true,
      },
      {
        component: "ListStaff",
        path: "/staff",
        auth: false,
        exact: true,
      },
      {
        component: "AddStaff",
        path: "/staff/add",
        auth: false,
        exact: true,
      },
      {
        component: "AddStaff",
        path: "/staff/:id/editStaff",
        auth: false,
        exact: true,
      },
      {
        component: "StaffDetails",
        path: "/staff/:id/staffDetails",
        auth: false,
        exact: true,
      },
      {
        component: "StaffAvailability",
        path: "/staff/availability",
        auth: false,
        exact: true,
      },
      {
        component: "ListStaffPlus",
        path: "/staffplus",
        auth: false,
        exact: true,
      },
      {
        component: "StaffPlusDetails",
        path: "/staffPlus/:id/staffDetails",
        auth: false,
        exact: true,
      },
      {
        component: "StaffPlusAvailability",
        path: "/staffPlus/availability",
        auth: false,
        exact: true,
      },
      {
        component: "StaffSkillList",
        path: "/staffplus/skills",
        auth: false,
        exact: true,
      },
      {
        component: "AddStaffSkill",
        path: "/staffplus/skills/add",
        auth: false,
        exact: true,
      },
      {
        component: "AddStaffPlus",
        path: "/staffplus/add",
        auth: false,
        exact: true,
      },
      {
        component: "StaffSchedule",
        path: "/staffplus/schedule",
        auth: false,
        exact: true,
      },
      {
        component: "SecurityAuthorization",
        path: "/staffplus/authorization",
        auth: false,
        exact: true,
      },
      {
        component: "AddStaffPlus",
        path: "/staffplus/:id/editStaff",
        auth: false,
        exact: true,
      },
      {
        component: "EmployeeInfo",
        path: "/staffplus/:id/empInfo",
        auth: false,
        exact: true,
      },
      {
        component: "ListCustomerPlus",
        path: "/customerplus",
        auth: false,
        exact: true,
      },
      {
        component: "LoyaltyPointsManagement",
        path: "/customerplus/:id/lpmanagement",
        auth: false,
        exact: true,
      },
      {
        component: "AddRewardPolicy",
        path: "/customerplus/:id/lpmanagement/addreward",
        auth: false,
        exact: true,
      },
      {
        component: "AddRewardPolicy",
        path: "/customerplus/:id/lpmanagement/:id/editreward",
        auth: false,
        exact: true,
      },
      {
        component: "AddRedeemPolicy",
        path: "/customerplus/:id/lpmanagement/addredeem",
        auth: false,
        exact: true,
      },
      {
        component: "AddRedeemPolicy",
        path: "/customerplus/:id/lpmanagement/:id/editredeem",
        auth: false,
        exact: true,
      },
      {
        component: "AddCustomerPlus",
        path: "/customerplus/add",
        auth: false,
        exact: true,
      },
      {
        component: "AddCustomerPlus",
        path: "/customerplus/:id/editCustomer",
        auth: false,
        exact: true,
      },
      {
        component: "CustomerDetailsPlus",
        path: "/customerplus/:id/details",
        auth: false,
        exact: true,
      },
      {
        component: "AccountDetailsPlus",
        path: "/customerplus/:id/account",
        auth: false,
        exact: true,
      },
      {
        component: "HoldSectionsPlus",
        path: "/customerplus/:id/hold",
        auth: false,
        exact: true,
      },
      {
        component: "TreatmentDetailsPlus",
        path: "/customerplus/:id/treatment",
        auth: false,
        exact: true,
      },
      {
        component: "TreatmentCourseDetailsPlus",
        path: "/customerplus/:id/treatment/:treatmentId/detail",
        auth: false,
        exact: true,
      },
      {
        component: "ListCustomer",
        path: "/customer",
        auth: false,
        exact: true,
      },
      {
        component: "AddCustomer",
        path: "/customer/add",
        auth: false,
        exact: true,
      },
      {
        component: "AddCustomer",
        path: "/customer/:id/editCustomer",
        auth: false,
        exact: true,
      },
      {
        component: "CustomerDetails",
        path: "/customer/:id/details",
        auth: false,
        exact: true,
      },
      {
        component: "AccountDetails",
        path: "/customer/:id/account",
        auth: false,
        exact: true,
      },
      {
        component: "HoldSections",
        path: "/customer/:id/hold",
        auth: false,
        exact: true,
      },
      {
        component: "InvoiceHistorys",
        path: "/customer/:id/invoice",
        auth: false,
        exact: true,
      },
      {
        component: "TreatmentDetails",
        path: "/customer/:id/treatment",
        auth: false,
        exact: true,
      },
      {
        component: "TreatmentCourseDetails",
        path: "/customer/:id/treatment/:treatmentId/detail",
        auth: false,
        exact: true,
      },
      {
        component: "ListAppointment",
        path: "/appointment",
        auth: false,
        exact: true,
      },
      {
        component: "NewListAppointment",
        path: "/newappointment",
        auth: false,
        exact: true,
      },
      {
        component: "CreateAppointment",
        path: "/appointment/create",
        auth: false,
        exact: true,
      },
      {
        component: "NewCreateAppointment",
        path: "/newappointment/create",
        auth: false,
        exact: true,
      },
      {
        component: "InventoryMainPage",
        path: "/inventory",
        auth: false,
        exact: true,
      },
      {
        component: "Treatment",
        path: "/appointment/create/treatment",
        auth: false,
        exact: true,
      },
      {
        component: "SelectTreatment",
        path: "/appointment/create/select-treatment",
        auth: false,
        exact: true,
      },
      {
        component: "NewSelectTreatment",
        path: "/newappointment/create/select-treatment",
        auth: false,
        exact: true,
      },
      {
        component: "Payment",
        path: "/payment/appointment/:id",
        auth: false,
        exact: true,
      },
      {
        component: "AppointmentDetail",
        path: "/appointment/:id/detail",
        auth: false,
        exact: true,
      },
      {
        component: "NewAppointmentDetail",
        path: "/newappointment/:id/detail",
        auth: false,
        exact: true,
      },
      {
        component: "ListService",
        path: "/service",
        auth: false,
        exact: true,
      },
      {
        component: "CreateService",
        path: "/service/add",
        auth: false,
        exact: true,
      },
      {
        component: "CreateService",
        path: "/service/:id/editServices",
        auth: false,
        exact: true,
      },
      {
        component: "ServiceDetails",
        path: "/service/:id/serviceDetails",
        auth: false,
        exact: true,
      },
      {
        component: "ListProduct",
        path: "/product",
        auth: false,
        exact: true,
      },
      {
        component: "CreateProduct",
        path: "/product/add",
        auth: false,
        exact: true,
      },
      {
        component: "ProductDetails",
        path: "/product/productDetails",
        auth: false,
        exact: true,
      },
      {
        component: "Review",
        path: "/review",
        auth: false,
        exact: true,
      },
      {
        component: "DayEndReport",
        path: "/DayEndReport",
        auth: false,
        exact: true,
      },

      {
        component: "viewUserDetail",
        path: "/users/viewDetail",
        auth: false,
        exact: true,
      },
      {
        component: "Tournaments",
        path: "/tournaments",
        auth: false,
        exact: true,
      },
      {
        component: "ViewTournamentDetails",
        path: "/tournaments/tournamentDetail",
        Auth: false,
        exact: true,
      },
      {
        component: "CompletedTournamentDetail",
        path: "/tournaments/completedtournamentDetail",
        Auth: false,
        exact: true,
      },
      {
        component: "CreateTournament",
        path: "/tournaments/createtournament",
        Auth: false,
        exact: true,
      },
      {
        component: "Settings",
        path: "/settings",
        auth: false,
        exact: true,
      },
      {
        component: "BroadcastMessage",
        path: "/broadcastmessage",
        auth: false,
        exact: true,
      },
      {
        component: "Messages",
        path: "/broadcastmessage/messages",
        auth: false,
        exact: true,
      },
    ],
  },
];

export default routers;
