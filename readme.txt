Integrations Done
    - StaffPlus
        - listing with filter option 
        - add staff
        - edit staff
        - inactivate staff
        - schedule individual : weekly
        - skill listing
        - add skills
    - CustomerPlus
        - listing
        - add/edit customer
        - profile Settings
        - view customer


UI Implemented (without api integrations)
    - StaffPlus
        - Authorization
    - Customer+
        - View
            - Dianosis
            - MGM on profile
        - Loyalty Point management 
            - Manual Reward/Redeem
            - Redeem/Reward policy

Files Changed

    public/index.html
    public/manifest.json
    readme.txt
    src/assets/New folder/Chesswyze-header-logo.svg
    src/assets/New folder/Chesswyze.svg
    src/assets/New folder/H-more-blue.svg
    src/assets/New folder/H-more.svg
    src/assets/New folder/bell.svg
    src/assets/New folder/bookmark.svg
    src/assets/New folder/customer.svg
    src/assets/New folder/down-arrow.svg
    src/assets/New folder/hospitality.svg
    src/assets/New folder/money.svg
    src/assets/New folder/newCustomer.svg
    src/assets/New folder/plus.svg
    src/assets/New folder/profits.svg
    src/assets/New folder/shopping-bag.svg
    src/assets/New folder/uploader-img.svg
    src/assets/images/TotalCollection.png
    src/assets/images/TreatmentDone.png
    src/assets/images/box.png
    src/assets/images/coupon.png
    src/assets/images/delete.jpg
    src/assets/images/headerLogo.svg
    src/assets/images/headerLogo_old.svg
    src/assets/images/like.png
    src/assets/images/logicon.png
    src/assets/images/logiconsmall.png
    src/assets/images/logo.svg
    src/assets/images/logo_old.svg
    src/assets/images/packing-icon.png
    src/assets/images/rise.png
    src/assets/images/woman.png
    src/assets/scss/abstracts/abstracts-dir.scss
    src/assets/scss/abstracts/fonts.scss
    src/assets/scss/abstracts/functions.scss
    src/assets/scss/abstracts/mixins.scss
    src/assets/scss/abstracts/variables.scss
    src/assets/scss/base/base-dir.scss
    src/assets/scss/base/reset.scss
    src/assets/scss/base/typography.scss
    src/assets/scss/common.scss
    src/assets/scss/components/admin.scss
    src/assets/scss/components/components-dir.scss
    src/assets/scss/components/navbar.scss
    src/assets/scss/components/sidebar.scss
    src/assets/scss/components/table.scss
    src/assets/scss/icons/icomoon/fonts/icomoon.svg
    src/assets/scss/icons/icomoon/style.css
    src/assets/scss/index.scss
    src/assets/scss/layouts/mainlayout.scss
    src/assets/scss/pages/login.scss
    src/assets/scss/pages/pages-dir.scss
    src/assets/scss/vendors/notification.scss
    src/assets/scss/vendors/vendors-dir.scss
    src/component/Admin/Cart/cart.js
    src/component/Admin/Cart/cart/CoursePopup.js
    src/component/Admin/Cart/cart/ItemDiscountPopup.js
    src/component/Admin/Cart/cart/index.js
    src/component/Admin/Cart/cart/itemStatusPopup.js
    src/component/Admin/Cart/cart/productDetailsPopup.js
    src/component/Admin/Cart/cart/staffSelectionPopup.js
    src/component/Admin/Cart/cart/style.scss
    src/component/Admin/CustomerPlus/AddCustomerPlus/index.js
    src/component/Admin/CustomerPlus/AddCustomerPlus/style.scss
    src/component/Admin/CustomerPlus/AddRedeemPolicy/index.js
    src/component/Admin/CustomerPlus/AddRewardPolicy/index.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Account.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/AccountDetail.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Accounts/creditNote.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Accounts/index.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Accounts/prepaidAccount.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Accounts/productAccount.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Accounts/style.scss
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Accounts/treatmentAccount.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/CustomerDetail.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Detail.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Details/AddPhotoPopup.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Details/Appointments.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Details/ComparePhotoPopup.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Details/Dianosis.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Details/Favourites.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Details/MGMDetails.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Details/PersonalDetails.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Details/PurchaseHistory.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Details/TreatmentHistory.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/Details/index.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/HoldSection.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/HoldSection/Hold.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/HoldSection/index.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/HoldSection/modal/index.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/HoldSection/modal/issuedStaff.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/HoldSection/modal/style.scss
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/HoldSection/style.scss
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/HoldSections.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/TreatmentDetail.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/TreatmentHistory.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/TreatmentHistory/course.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/TreatmentHistory/diagnosis.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/TreatmentHistory/index.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/TreatmentHistory/style.scss
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/TreatmentHistory/treatmentCourse.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/TreatmentHistory/treatmentCourseDetails.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/TreatmentHistory/treatmentHistory.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/index.js
    src/component/Admin/CustomerPlus/CustomerDetailsPlus/style.scss
    src/component/Admin/CustomerPlus/ListCustomerPlus/index.js
    src/component/Admin/CustomerPlus/ListCustomerPlus/settings.js
    src/component/Admin/CustomerPlus/ListCustomerPlus/style.scss
    src/component/Admin/CustomerPlus/LoyaltyPointsManagement/ManualRedeem/index.js
    src/component/Admin/CustomerPlus/LoyaltyPointsManagement/ManualReward/index.js
    src/component/Admin/CustomerPlus/LoyaltyPointsManagement/RedeemPolicyTable/index.js
    src/component/Admin/CustomerPlus/LoyaltyPointsManagement/RewardPolicyTable/index.js
    src/component/Admin/CustomerPlus/LoyaltyPointsManagement/index.js
    src/component/Admin/CustomerPlus/LoyaltyPointsManagement/style.scss
    src/component/Admin/CustomerPlus/LoyaltyPointsSettings/ManualRedeem/index.js
    src/component/Admin/CustomerPlus/LoyaltyPointsSettings/ManualReward/index.js
    src/component/Admin/CustomerPlus/LoyaltyPointsSettings/RedeemPolicyTable/index.js
    src/component/Admin/CustomerPlus/LoyaltyPointsSettings/RewardPolicyTable/index.js
    src/component/Admin/CustomerPlus/LoyaltyPointsSettings/index.js
    src/component/Admin/CustomerPlus/LoyaltyPointsSettings/style.scss
    src/component/Admin/StaffPlus/AddStaffPlus/ScheduleTable/index.js
    src/component/Admin/StaffPlus/AddStaffPlus/index.js
    src/component/Admin/StaffPlus/AddStaffPlus/style.scss
    src/component/Admin/StaffPlus/AddStaffSkill/index.js
    src/component/Admin/StaffPlus/EmployeeInfo/index.js
    src/component/Admin/StaffPlus/EmployeeInfo/style.scss
    src/component/Admin/StaffPlus/ListStaffPlus/index.js
    src/component/Admin/StaffPlus/ListStaffPlus/style.scss
    src/component/Admin/StaffPlus/SecurityAuthorization/GroupAuthorizationTable/index.js
    src/component/Admin/StaffPlus/SecurityAuthorization/GroupAuthorizationTable/style.scss
    src/component/Admin/StaffPlus/SecurityAuthorization/IndividualAuthorizationTable/index.js
    src/component/Admin/StaffPlus/SecurityAuthorization/IndividualAuthorizationTable/style.scss
    src/component/Admin/StaffPlus/SecurityAuthorization/index.js
    src/component/Admin/StaffPlus/SecurityAuthorization/style.scss
    src/component/Admin/StaffPlus/StaffPlusAvailability/index.js
    src/component/Admin/StaffPlus/StaffPlusAvailability/style.scss
    src/component/Admin/StaffPlus/StaffPlusDetails/Details/customerList.js
    src/component/Admin/StaffPlus/StaffPlusDetails/Details/dashboard.js
    src/component/Admin/StaffPlus/StaffPlusDetails/Details/details.js
    src/component/Admin/StaffPlus/StaffPlusDetails/Details/index.js
    src/component/Admin/StaffPlus/StaffPlusDetails/Details/performance.js
    src/component/Admin/StaffPlus/StaffPlusDetails/index.js
    src/component/Admin/StaffPlus/StaffPlusDetails/style.scss
    src/component/Admin/StaffPlus/StaffSchedule/BigCalander/index.js
    src/component/Admin/StaffPlus/StaffSchedule/BigCalander/style.scss
    src/component/Admin/StaffPlus/StaffSchedule/CalenderTable/index.js
    src/component/Admin/StaffPlus/StaffSchedule/CalenderTable/style.scss
    src/component/Admin/StaffPlus/StaffSchedule/SheduleTable/index.js
    src/component/Admin/StaffPlus/StaffSchedule/index.js
    src/component/Admin/StaffPlus/StaffSchedule/style.scss
    src/component/Admin/StaffPlus/StaffSkillList/index.js
    src/component/Admin/StaffPlus/StaffSkillList/styles.scss
    src/component/Header/navbar.js
    src/component/Sidebar/index.js
    src/component/common/InputSearch/index.js
    src/component/common/NormalInput/index.js
    src/component/common/NormalRadio/index.js
    src/component/common/Table/TableWrapper.js
    src/component/common/Table/style.scss
    src/layout/AuthLayout.js
    src/layout/MainLayout.js
    src/layout/index.js
    src/pages/CustomerPlus/index.js
    src/pages/StaffPlus/index.js
    src/pages/index.js
    src/redux/actions/actionType.js
    src/redux/actions/customerPlus.js
    src/redux/actions/staffPlus.js
    src/redux/reducer/customerPlus.js
    src/redux/reducer/index.js
    src/redux/reducer/staffPlus.js
    src/routes/routes.js
    src/service/api.js
    src/service/apiVariables.js