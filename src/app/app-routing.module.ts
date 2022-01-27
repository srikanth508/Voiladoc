import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component';
import { SidebarComponent } from '../app/pages/sidebar/sidebar.component';
import { HospitalClinicregistrationComponent } from '../app/pages/Registration/hospital-clinicregistration/hospital-clinicregistration.component';
import { DoctorregistrationComponent } from '../app/pages/Registration/doctorregistration/doctorregistration.component';
import { DocworkingdetailsComponent } from '../app/pages/Registration/docworkingdetails/docworkingdetails.component';
import { DiagnosticsregistrationComponent } from '../app/pages/Registration/diagnosticsregistration/diagnosticsregistration.component';
import { DiagnosticcenterslotsComponent } from '../app/pages/Registration/diagnosticcenterslots/diagnosticcenterslots.component';
import { PharmacyregistrationComponent } from '../app/pages/Registration/pharmacyregistration/pharmacyregistration.component';
import { DiagnostictestComponent } from '../app/pages/Map Services/diagnostictest/diagnostictest.component';
import { DiagnosticpackageComponent } from '../app/pages/Map Services/diagnosticpackage/diagnosticpackage.component';
import { DoctorComponent } from '../app/pages/Register logins/doctor/doctor.component';
import { DiagnosticComponent } from '../app/pages/Register logins/diagnostic/diagnostic.component';
import { PharmacyComponent } from '../app/pages/Register logins/pharmacy/pharmacy.component';
import { HospitalClinicComponent } from '../app/pages/Register logins/hospital-clinic/hospital-clinic.component';
import { SponserhospitalclinicComponent } from '../app/pages/Sponsered/sponserhospitalclinic/sponserhospitalclinic.component';
import { DiagnosticcenterComponent } from '../app/pages/Sponsered/diagnosticcenter/diagnosticcenter.component';
import { SponserpharmacyComponent } from '../app/pages/Sponsered/sponserpharmacy/sponserpharmacy.component';
import { DoctordashComponent } from '../app/pages/Register logins/doctordash/doctordash.component';
import { HspdashComponent } from '../app/pages/Register logins/hspdash/hspdash.component';
import { DiagnosticdashComponent } from '../app/pages/Register logins/diagnosticdash/diagnosticdash.component';
import { PharmacydashComponent } from '../app/pages/Register logins/pharmacydash/pharmacydash.component';
import { HspclidashComponent } from '../app/pages/Sponsered/hspclidash/hspclidash.component';
import { DiagdashComponent } from '../app/pages/Sponsered/diagdash/diagdash.component';
import { PharmdashComponent } from '../app/pages/Sponsered/pharmdash/pharmdash.component';
import { PharmacydashboardComponent } from '../app/pages/Registration/pharmacydashboard/pharmacydashboard.component';
import { HspClidashComponent } from '../app/pages/Registration/hsp-clidash/hsp-clidash.component';
import { DocdashComponent } from '../app/pages/Registration/docdash/docdash.component';
import { DiagnesticDashboardComponent } from '../app/pages/Registration/diagnestic-dashboard/diagnestic-dashboard.component';
import { ProfileComponent } from '../app/pages/Hospital/profile/profile.component';
import { AppointmentsComponent } from '../app/pages/Hospital/appointments/appointments.component';
import { FeedbacksComponent } from '../app/pages/Hospital/feedbacks/feedbacks.component';
import { DoctorsComponent } from '../app/pages/Hospital/doctors/doctors.component';
import { MyprofileComponent } from '../app/pages/Doctor/myprofile/myprofile.component';
import { MyappointmentsComponent } from '../app/pages/Doctor/myappointments/myappointments.component';
import { AppointmentsreportComponent } from '../app/pages/Doctor/appointmentsreport/appointmentsreport.component';
import { MyarticlesComponent } from '../app/pages/Doctor/myarticles/myarticles.component';
import { MyfeedbacksComponent } from '../app/pages/Doctor/myfeedbacks/myfeedbacks.component';
import { ProfilesComponent } from '../app/pages/Diagnostic Center/profiles/profiles.component';
import { OrdersComponent } from '../app/pages/Diagnostic Center/orders/orders.component';
import { OffersComponent } from '../app/pages/Diagnostic Center/offers/offers.component';
import { PharmacyprofileComponent } from '../app/pages/Pharmacy/pharmacyprofile/pharmacyprofile.component';
import { PharmacyoffersComponent } from '../app/pages/Pharmacy/pharmacyoffers/pharmacyoffers.component';
import { WritearticleComponent } from '../app/pages/Doctor/writearticle/writearticle.component';
import { OffersdashComponent } from '../app/pages/Diagnostic Center/offersdash/offersdash.component';
import { OffersDashboardComponent } from '../app/pages/Pharmacy/offers-dashboard/offers-dashboard.component';
import { EditHospitalClinicComponent } from '../app/pages/Registration/edit-hospital-clinic/edit-hospital-clinic.component';
import { EditDoctorRegistrationComponent } from '../app/pages/Registration/edit-doctor-registration/edit-doctor-registration.component';
import { EditDiagnosticRegistrationComponent } from '../app/pages/Registration/edit-diagnostic-registration/edit-diagnostic-registration.component';
import { EditPharmacyRegComponent } from '../app/pages/Registration/edit-pharmacy-reg/edit-pharmacy-reg.component';
import { DiagnosticTestDashComponent } from '../app/pages/Map Services/diagnostic-test-dash/diagnostic-test-dash.component';
import { DiagnosticPackageDashComponent } from '../app/pages/Map Services/diagnostic-package-dash/diagnostic-package-dash.component';
import { VediocallComponent } from './pages/Doctor/vediocall/vediocall.component';
import { NurseComponent } from './pages/Registration/nurse/nurse.component';
import { NurseDashboardComponent } from './pages/Registration/nurse-dashboard/nurse-dashboard.component';
import { PhysiotherapistComponent } from './pages/Registration/physiotherapist/physiotherapist.component';
import { PhysiotherapistDashboardComponent } from './pages/Registration/physiotherapist-dashboard/physiotherapist-dashboard.component';
import { MidwifeComponent } from './pages/Registration/midwife/midwife.component';
import { MidwifeDashboardComponent } from './pages/Registration/midwife-dashboard/midwife-dashboard.component';
import { DeliveryPartnerComponent } from './pages/Registration/delivery-partner/delivery-partner.component';
import { DeliveryPartnerDashboardComponent } from './pages/Registration/delivery-partner-dashboard/delivery-partner-dashboard.component';
import { NurseProfileComponent } from './pages/Nurse/nurse-profile/nurse-profile.component';
import { PhysiotherapistProfileComponent } from './pages/physiotherapist/physiotherapist-profile/physiotherapist-profile.component';
import { MidwifeProfileComponent } from './pages/Midewife/midwife-profile/midwife-profile.component';
import { DeliverPartnerProfileComponent } from './pages/DeliveryPartner/deliver-partner-profile/deliver-partner-profile.component';
import { PhysiotherapistAppointmentsComponent } from './pages/physiotherapist/physiotherapist-appointments/physiotherapist-appointments.component';
import { MidwifeAppointmentsComponent } from './pages/Midewife/midwife-appointments/midwife-appointments.component';
import { DeliveryPartnerAppointmentsComponent } from './pages/DeliveryPartner/delivery-partner-appointments/delivery-partner-appointments.component';
import { EditNurseComponent } from './pages/Registration/edit-nurse/edit-nurse.component';
import { NurseWorkingDetailsComponent } from './pages/Registration/nurse-working-details/nurse-working-details.component';
import { PhysiotherapistWorkingDetailsComponent } from './pages/Registration/physiotherapist-working-details/physiotherapist-working-details.component';
import { NurseLoginComponent } from './pages/Register logins/nurse-login/nurse-login.component';
import { NurseLoginDashboardComponent } from './pages/Register logins/nurse-login-dashboard/nurse-login-dashboard.component';
import { PhysiotherapistLoginComponent } from './pages/Register logins/physiotherapist-login/physiotherapist-login.component';
import { PhysiotherapistLoginDashboardComponent } from './pages/Register logins/physiotherapist-login-dashboard/physiotherapist-login-dashboard.component';
import { MidwifeLoginComponent } from './pages/Register logins/midwife-login/midwife-login.component';
import { MidwifeLoginDashboardComponent } from './pages/Register logins/midwife-login-dashboard/midwife-login-dashboard.component';
import { NurseAppointmentsComponent } from './pages/Nurse/nurse-appointments/nurse-appointments.component';
import { DeliveryCompanyLoginComponent } from './pages/Register logins/delivery-company-login/delivery-company-login.component';
import { DeliveryCompanyLoginDashboardComponent } from './pages/Register logins/delivery-company-login-dashboard/delivery-company-login-dashboard.component';
import { PartnerRegistrationComponent } from './pages/DeliveryPartner/partner-registration/partner-registration.component';
import { PartnersDashboardComponent } from './pages/DeliveryPartner/partners-dashboard/partners-dashboard.component';
import { MidwifeWorkingDetailsComponent } from './pages/Registration/midwife-working-details/midwife-working-details.component';
import { EditphysiotherapistComponent } from './pages/Registration/editphysiotherapist/editphysiotherapist.component';
import { EditMidwifeComponent } from './pages/Registration/edit-midwife/edit-midwife.component';
import { EditDeliveryCompanyComponent } from './pages/Registration/edit-delivery-company/edit-delivery-company.component';
import { MedicalHistoryComponent } from './pages/Doctor/medical-history/medical-history.component';
import { PatientHistoryComponent } from './pages/Doctor/patient-history/patient-history.component';
import { NewPatientHistoryComponent } from './pages/Doctor/new-patient-history/new-patient-history.component';
import { DiagnosticReportsComponent } from './pages/Diagnostic Center/diagnostic-reports/diagnostic-reports.component';
import { NurseReportsComponent } from './pages/Nurse/nurse-reports/nurse-reports.component';
import { PhysiotherapistReportsComponent } from './pages/physiotherapist/physiotherapist-reports/physiotherapist-reports.component';
import { MideWifeReportsComponent } from './pages/Midewife/mide-wife-reports/mide-wife-reports.component';
import { NurseTimingsComponent } from './pages/Nurse/nurse-timings/nurse-timings.component';
import { PhysiotherapistTimingsComponent } from './pages/physiotherapist/physiotherapist-timings/physiotherapist-timings.component';
import { MidWifeTimingsComponent } from './pages/Midewife/mid-wife-timings/mid-wife-timings.component';

import { DoctorPrescriptionComponent } from './pages/Pharmacy/doctor-prescription/doctor-prescription.component';
import { PrescriptionReportsComponent } from './pages/Pharmacy/prescription-reports/prescription-reports.component';
import { PreviousVideosComponent } from './pages/Doctor/previous-videos/previous-videos.component';
import { HospitalDashboardComponent } from './pages/Hospital/hospital-dashboard/hospital-dashboard.component';
import { DocREportsComponent } from './pages/Hospital/doc-reports/doc-reports.component';
import { CountrtMasterComponent } from './pages/Masters/countrt-master/countrt-master.component';
import { CountryDashComponent } from './pages/Masters/country-dash/country-dash.component';
import { ProvinceMasterComponent } from './pages/Masters/province-master/province-master.component';
import { ProvincedashComponent } from './pages/Masters/provincedash/provincedash.component';
import { CityMasterComponent } from './pages/Masters/city-master/city-master.component';
import { CityMasterDashComponent } from './pages/Masters/city-master-dash/city-master-dash.component';
import { DepartmentmasterComponent } from './pages/Masters/departmentmaster/departmentmaster.component';
import { DepartmentDashComponent } from './pages/Masters/department-dash/department-dash.component';
import { ComplaintMasterComponent } from './pages/Masters/complaint-master/complaint-master.component';
import { CompaintDashComponent } from './pages/Masters/compaint-dash/compaint-dash.component';
import { SpecilizationMasterComponent } from './pages/Masters/specilization-master/specilization-master.component';
import { SpecilizationDashComponent } from './pages/Masters/specilization-dash/specilization-dash.component';
import { ServiceMasterComponent } from './pages/Masters/service-master/service-master.component';
import { ServiceMasterDashComponent } from './pages/Masters/service-master-dash/service-master-dash.component';
import { FacilityMasterComponent } from './pages/Masters/facility-master/facility-master.component';
import { FacilityMasterDashComponent } from './pages/Masters/facility-master-dash/facility-master-dash.component';
import { MedicineTypeMasterComponent } from './pages/Masters/medicine-type-master/medicine-type-master.component';
import { MedicineTypeMasterDashComponent } from './pages/Masters/medicine-type-master-dash/medicine-type-master-dash.component';
import { DiagnosticTestTypeComponent } from './pages/Masters/diagnostic-test-type/diagnostic-test-type.component';
import { DiagnosticTestTypeDashComponent } from './pages/Masters/diagnostic-test-type-dash/diagnostic-test-type-dash.component';
import { DiagnosticTestMasterComponent } from './pages/Masters/diagnostic-test-master/diagnostic-test-master.component';
import { DiaTestDashComponent } from './pages/Masters/dia-test-dash/dia-test-dash.component';
import { BloodGroupMasterComponent } from './pages/Masters/blood-group-master/blood-group-master.component';
import { BloodGroupMasterDashComponent } from './pages/Masters/blood-group-master-dash/blood-group-master-dash.component';
import { WhenToConsumeComponent } from './pages/Masters/when-to-consume/when-to-consume.component';
import { WhenToConsumeMasterComponent } from './pages/Masters/when-to-consume-master/when-to-consume-master.component';
import { RelationshipTypeComponent } from './pages/Masters/relationship-type/relationship-type.component';
import { RelationshipTypeDashComponent } from './pages/Masters/relationship-type-dash/relationship-type-dash.component';
import { InsuranceMasterComponent } from './pages/Masters/insurance-master/insurance-master.component';
import { InsuranceMasterDashComponent } from './pages/Masters/insurance-master-dash/insurance-master-dash.component';
import { DegreeMasterComponent } from './pages/Masters/degree-master/degree-master.component';
import { DegreeMasterDashComponent } from './pages/Masters/degree-master-dash/degree-master-dash.component';
import { RegisterPatientsComponent } from './pages/Map Services/register-patients/register-patients.component';
import { DoctorDashboardComponent } from './pages/Doctor/doctor-dashboard/doctor-dashboard.component';
import { DocDashboardDetailsComponent } from './pages/Doctor/doc-dashboard-details/doc-dashboard-details.component';
import { AdminDashComponent } from './pages/Registration/admin-dash/admin-dash.component';
import { AdminAllAppointmentsComponent } from './pages/AdminDashboard/admin-all-appointments/admin-all-appointments.component';
import { AdminRevenueComponent } from './pages/AdminDashboard/admin-revenue/admin-revenue.component';
import { NurseAdminDashComponent } from './pages/Nurse/nurse-admin-dash/nurse-admin-dash.component';
import { NurseAdminDashboardComponent } from './pages/Nurse/nurse-admin-dashboard/nurse-admin-dashboard.component';
import { PhysioAdminDashComponent } from './pages/physiotherapist/physio-admin-dash/physio-admin-dash.component';
import { PhysioDashboardDetailsComponent } from './pages/physiotherapist/physio-dashboard-details/physio-dashboard-details.component';
import { AdminMidWifeDashComponent } from './pages/Midewife/admin-mid-wife-dash/admin-mid-wife-dash.component';
import { MidWifeAdminDashDetailsComponent } from './pages/Midewife/mid-wife-admin-dash-details/mid-wife-admin-dash-details.component';

import { LocalDoctorRegistrationComponent } from './pages/Registration/local-doctor-registration/local-doctor-registration.component';
import { LocalDocDashComponent } from './pages/Registration/local-doc-dash/local-doc-dash.component';
import { MyPatientPrescriptionsComponent } from './pages/LocalDoctor/my-patient-prescriptions/my-patient-prescriptions.component';
import { MyProfilesComponent } from './pages/LocalDoctor/my-profiles/my-profiles.component';
import { AnnounsementsComponent } from './pages/Announsements/announsements/announsements.component';
import { AnnounseDashComponent } from './pages/Announsements/announse-dash/announse-dash.component';
import { NurseFeesComponent } from './pages/HomeVisitsFees/nurse-fees/nurse-fees.component';
import { NurseFeeDashComponent } from './pages/HomeVisitsFees/nurse-fee-dash/nurse-fee-dash.component';
import { PhysioFeesComponent } from './pages/HomeVisitsFees/physio-fees/physio-fees.component';
import { PhysiFeedashComponent } from './pages/HomeVisitsFees/physi-feedash/physi-feedash.component';
import { MidwifeFeesComponent } from './pages/HomeVisitsFees/midwife-fees/midwife-fees.component';
import { MidwifeFeesDashComponent } from './pages/HomeVisitsFees/midwife-fees-dash/midwife-fees-dash.component';
import { PatientWalletComponent } from './pages/Wallet/patient-wallet/patient-wallet.component';
import { SupportDashComponent } from './pages/Support/support-dash/support-dash.component';
import { MyRevenueComponent } from './pages/Doctor/my-revenue/my-revenue.component';
import { NurserevenueComponent } from './pages/Nurse/nurserevenue/nurserevenue.component';
import { MidwiferevenueComponent } from './pages/Midewife/midwiferevenue/midwiferevenue.component';
import { PhysioRevenueComponent } from './pages/Midewife/physio-revenue/physio-revenue.component';
import { SupportRegComponent } from './pages/Support/support-reg/support-reg.component';
import { SupportRegDashComponent } from './pages/Support/support-reg-dash/support-reg-dash.component';
import { SupportProfileComponent } from './pages/Support/support-profile/support-profile.component';
import { DocAppReportsComponent } from './pages/AdminDashboard/doc-app-reports/doc-app-reports.component';
import { NurseAdminReportsComponent } from './pages/AdminDashboard/nurse-admin-reports/nurse-admin-reports.component';
import { MidWifeAdminReportsComponent } from './pages/AdminDashboard/mid-wife-admin-reports/mid-wife-admin-reports.component';
import { PhysioreportsComponent } from './pages/AdminDashboard/physioreports/physioreports.component';

import { ClinicDashComponent } from './pages/Registration/clinic-dash/clinic-dash.component';

import { DiagnosticSlotsDashComponent } from './pages/Registration/diagnostic-slots-dash/diagnostic-slots-dash.component';
import { ReferredPatientsComponent } from './pages/Doctor/referred-patients/referred-patients.component';
import { PatientRegComponent } from './pages/Hospital/patient-reg/patient-reg.component';
import { PtientregdashComponent } from './pages/Hospital/ptientregdash/ptientregdash.component';
import { ArticleDashComponent } from './pages/AdminDashboard/article-dash/article-dash.component';
import { HospitalRevenueComponent } from './pages/Hospital/hospital-revenue/hospital-revenue.component';
import { RevenueDetailsComponent } from './pages/Hospital/revenue-details/revenue-details.component';
import { DocWorkingDashComponent } from './pages/WorkingDashboards/doc-working-dash/doc-working-dash.component';
import { NurseworkingdashComponent } from './pages/WorkingDashboards/nurseworkingdash/nurseworkingdash.component';
import { PhysioworkingDashComponent } from './pages/WorkingDashboards/physioworking-dash/physioworking-dash.component';
import { MidwifeWorkingDashComponent } from './pages/WorkingDashboards/midwife-working-dash/midwife-working-dash.component';
import { ReceptionstloginComponent } from './pages/Hospital/receptionstlogin/receptionstlogin.component';
import { ReceptionstloginDashComponent } from './pages/Hospital/receptionstlogin-dash/receptionstlogin-dash.component';
import { BookDoctorsComponent } from './pages/Hospital/book-doctors/book-doctors.component';
import { BookappmentsComponent } from './pages/Hospital/bookappments/bookappments.component';
import { BookappointmentComponent } from './pages/Hospital/bookappointment/bookappointment.component';
import { DoctorslotsComponent } from './pages/Hospital/doctorslots/doctorslots.component';
import { DoctorRevenueComponent } from './pages/Hospital/doctor-revenue/doctor-revenue.component';
import { CancelledAppointmentsComponent } from './pages/Hospital/cancelled-appointments/cancelled-appointments.component';
import { DoctorRevComponent } from './pages/Doctor/doctor-rev/doctor-rev.component';
import { SubCategoryComponent } from './pages/Ecommerce/sub-category/sub-category.component';
import { SubCategoryDashComponent } from './pages/Ecommerce/sub-category-dash/sub-category-dash.component';
import { InventoryComponent } from './pages/Ecommerce/inventory/inventory.component';
import { InventoryDashComponent } from './pages/Ecommerce/inventory-dash/inventory-dash.component';
import { ProductsComponent } from './pages/Ecommerce/products/products.component';
import { ProductsDashComponent } from './pages/Ecommerce/products-dash/products-dash.component';
import { CategorydashboardComponent } from './pages/Ecommerce/categorydashboard/categorydashboard.component';
import { CategoryComponent } from './pages/Ecommerce/category/category.component';
import { ItemsComponent } from './pages/Ecommerce/items/items.component';
import { ItemMasterComponent } from './pages/Ecommerce/item-master/item-master.component';
import { HomePageSponsrshipComponent } from './pages/Sponsered/home-page-sponsrship/home-page-sponsrship.component';
import { HomePageSponsrshipDashBoardComponent } from './pages/Sponsered/home-page-sponsrship-dash-board/home-page-sponsrship-dash-board.component';
import { OrdersDashboardComponent } from './pages/Sponsered/orders-dashboard/orders-dashboard.component';
import { AppPageSponsorshipComponent } from './pages/Sponsered/app-page-sponsorship/app-page-sponsorship.component';
import { AppPageSponsorshipDashboardComponent } from './pages/Sponsered/app-page-sponsorship-dashboard/app-page-sponsorship-dashboard.component';
import { CompletedOrdersComponent } from './pages/DeliveryPartner/completed-orders/completed-orders.component';
import { InclinicRevenuComponent } from './pages/Hospital/inclinic-revenu/inclinic-revenu.component';
import { InclinicAppointementsComponent } from './pages/Hospital/inclinic-appointements/inclinic-appointements.component';
import { VideocallrevenueComponent } from './pages/Hospital/videocallrevenue/videocallrevenue.component';
import { VideocallappointementsComponent } from './pages/Hospital/videocallappointements/videocallappointements.component';
import { HomecareAppointementsComponent } from './pages/Hospital/homecare-appointements/homecare-appointements.component';
import { HomecareRevenueComponent } from './pages/Hospital/homecare-revenue/homecare-revenue.component';
import { SentrefferalsComponent } from './pages/Doctor/sentrefferals/sentrefferals.component';
import { DocCalenderComponent } from './pages/Doctor/doc-calender/doc-calender.component';
import { DoctorsCalenderComponent } from './pages/Hospital/doctors-calender/doctors-calender.component';
import { ReturnOrdersComponent } from './pages/DeliveryPartner/return-orders/return-orders.component';
import { ReturnOrdersReportComponent } from './pages/DeliveryPartner/return-orders-report/return-orders-report.component';
import { NurseMonthWiseScheduleComponent } from './pages/Nurse/nurse-month-wise-schedule/nurse-month-wise-schedule.component';
import { PhysiomonthWiseScheduleComponent } from './pages/physiotherapist/physiomonth-wise-schedule/physiomonth-wise-schedule.component';
import { MidwifeMonthWiseComponent } from './pages/Midewife/midwife-month-wise/midwife-month-wise.component';
import { NurseScheduleComponent } from './pages/Hospital/nurse-schedule/nurse-schedule.component';
import { MidWifeMonthWiseSchComponent } from './pages/Hospital/mid-wife-month-wise-sch/mid-wife-month-wise-sch.component';
import { PhysioMonthWiseSchComponent } from './pages/Hospital/physio-month-wise-sch/physio-month-wise-sch.component';
import { TotalHospitalApointmentsComponent } from './pages/Hospital/total-hospital-apointments/total-hospital-apointments.component';
import { PharmacyOrdersComponent } from './pages/DeliveryPartner/pharmacy-orders/pharmacy-orders.component';
import { PharmacyReturnordersComponent } from './pages/DeliveryPartner/pharmacy-returnorders/pharmacy-returnorders.component';
import { HospitalDocCommissionComponent } from './pages/Registration/hospital-doc-commission/hospital-doc-commission.component';
import { HospitalDocDashComponent } from './pages/Registration/hospital-doc-dash/hospital-doc-dash.component';
import { DoctorSupportComponent } from './pages/Doctor/doctor-support/doctor-support.component';
import { DoctorSupportDashComponent } from './pages/Doctor/doctor-support-dash/doctor-support-dash.component';
import { NurseSupportComponent } from './pages/Nurse/nurse-support/nurse-support.component';
import { NurseSupportDashComponent } from './pages/Nurse/nurse-support-dash/nurse-support-dash.component';
import { PhyioSupportComponent } from './pages/physiotherapist/phyio-support/phyio-support.component';
import { PhyioSupportDashComponent } from './pages/physiotherapist/phyio-support-dash/phyio-support-dash.component';
import { MidwifsupportComponent } from './pages/Midewife/midwifsupport/midwifsupport.component';
import { MidwifsupportDashComponent } from './pages/Midewife/midwifsupport-dash/midwifsupport-dash.component';
import { HospitalSupportComponent } from './pages/Hospital/hospital-support/hospital-support.component';
import { HospitalSupportDashComponent } from './pages/Hospital/hospital-support-dash/hospital-support-dash.component';
import { RecpsupportComponent } from './pages/Hospital/recpsupport/recpsupport.component';
import { RecpsupportDashComponent } from './pages/Hospital/recpsupport-dash/recpsupport-dash.component';
import { SupportWebComponent } from './pages/Support/support-web/support-web.component';
import { SupportCometedTicketsComponent } from './pages/Support/support-cometed-tickets/support-cometed-tickets.component';
import { DoctorNotificationsComponent } from './pages/Doctor/doctor-notifications/doctor-notifications.component';
import { NurseNotificationsComponent } from './pages/Nurse/nurse-notifications/nurse-notifications.component';
import { MidwifenotificationsComponent } from './pages/Midewife/midwifenotifications/midwifenotifications.component';
import { PhysioNotificationComponent } from './pages/physiotherapist/physio-notification/physio-notification.component';
import { MergePatientdataComponent } from './pages/Sales/merge-patientdata/merge-patientdata.component';
import { EditDiagnosticTestComponent } from './pages/Diagnostic Center/edit-diagnostic-test/edit-diagnostic-test.component';
import { SendemailsComponent } from './pages/Sales/sendemails/sendemails.component';
import { EmailDashComponent } from './pages/Sales/email-dash/email-dash.component';
import { SendSmsComponent } from './pages/Sales/send-sms/send-sms.component';
import { SmsDashComponent } from './pages/Sales/sms-dash/sms-dash.component';
import { RoleMenuMappingComponent } from './pages/MenuMapping/role-menu-mapping/role-menu-mapping.component';
import { RolemenuDashComponent } from './pages/MenuMapping/rolemenu-dash/rolemenu-dash.component';
import { UserrolemappingComponent } from './pages/MenuMapping/userrolemapping/userrolemapping.component';
import { UserRoleMappingdashComponent } from './pages/MenuMapping/user-role-mappingdash/user-role-mappingdash.component';
import { AdminSiderevenueComponent } from './pages/AdminDashboard/admin-siderevenue/admin-siderevenue.component';
import { LinkForregComponent } from './pages/Sales/link-forreg/link-forreg.component';
import { LinkforregdashComponent } from './pages/Sales/linkforregdash/linkforregdash.component';
import { VoiladocRegisteredUsersComponent } from './pages/Sales/voiladoc-registered-users/voiladoc-registered-users.component';
import { ApprovedUsersComponent } from './pages/Sales/approved-users/approved-users.component';
import { RejectedusersComponent } from './pages/Sales/rejectedusers/rejectedusers.component';
import { HomeCareAppointmentsComponent } from './pages/Home care/home-care-appointments/home-care-appointments.component';
import { HomecareAppdashComponent } from './pages/Home care/homecare-appdash/homecare-appdash.component';
import { IndependentSubscriptionsComponent } from './pages/HomeVisitsFees/independent-subscriptions/independent-subscriptions.component';
import { IndependentsubdashComponent } from './pages/HomeVisitsFees/independentsubdash/independentsubdash.component';
import { CancelationTimingsComponent } from './pages/Masters/cancelation-timings/cancelation-timings.component';
import { NurseCancelledAppComponent } from './pages/Nurse/nurse-cancelled-app/nurse-cancelled-app.component';
import { CancelledmidwifeAppsComponent } from './pages/Midewife/cancelledmidwife-apps/cancelledmidwife-apps.component';
import { CancelledPhysioappointmentsComponent } from './pages/physiotherapist/cancelled-physioappointments/cancelled-physioappointments.component';
import { AllCancelledAppointmentsComponent } from './pages/AdminDashboard/all-cancelled-appointments/all-cancelled-appointments.component';
import { MyTeamDashboardComponent } from './pages/Diagnostic Center/my-team-dashboard/my-team-dashboard.component';
import { MyTeamComponent } from './pages/Diagnostic Center/my-team/my-team.component';
import { ReceptionistLoginDashboardComponent } from './pages/Diagnostic Center/receptionist-login-dashboard/receptionist-login-dashboard.component';
import { ReceptionistLoginComponent } from './pages/Diagnostic Center/receptionist-login/receptionist-login.component';
import { DiagnosticAppointmentDashboardComponent } from './pages/Diagnostic Center/diagnostic-appointment-dashboard/diagnostic-appointment-dashboard.component';
import { NewAppointmentComponent } from './pages/Diagnostic Center/new-appointment/new-appointment.component';
import { NewBillingComponent } from './pages/Billing/new-billing/new-billing.component';
import { SentInvoicesComponent } from './pages/Billing/sent-invoices/sent-invoices.component';
import { PaidInvoicesComponent } from './pages/Billing/paid-invoices/paid-invoices.component';
import { DiagfnosticCalenderComponent } from './pages/Diagnostic Center/diagfnostic-calender/diagfnostic-calender.component';
import { BillingDashboardComponent } from './pages/Billing/billing-dashboard/billing-dashboard.component';
import { NewPaymentLinkComponent } from './pages/Diagnostic Center/new-payment-link/new-payment-link.component';
import { PaymentLinkDashboardComponent } from './pages/Diagnostic Center/payment-link-dashboard/payment-link-dashboard.component';
import { UserPlanningComponent } from './pages/Diagnostic Center/user-planning/user-planning.component';
import { PharmacySupportComponent } from './pages/Pharmacy/pharmacy-support/pharmacy-support.component';
import { PharmacySupportDashComponent } from './pages/Pharmacy/pharmacy-support-dash/pharmacy-support-dash.component';
import { DiagnosticSupportComponent } from './pages/Diagnostic Center/diagnostic-support/diagnostic-support.component';
import { DiagnosticSupportDashComponent } from './pages/Diagnostic Center/diagnostic-support-dash/diagnostic-support-dash.component';
import { RefundSupportComponent } from './pages/Support/refund-support/refund-support.component';
import { RefundCompletedTicketsComponent } from './pages/Support/refund-completed-tickets/refund-completed-tickets.component';
import { AllDiagnosticCalenderComponent } from './pages/Diagnostic Center/all-diagnostic-calender/all-diagnostic-calender.component';
import { MeridionalSupportComponent } from './pages/Support/meridional-support/meridional-support.component';
import { DiagnosticPatientsComponent } from './pages/Diagnostic Center/diagnostic-patients/diagnostic-patients.component';
import { FaqComponent } from './pages/Faq/faq/faq.component';
import { FaqDashComponent } from './pages/Faq/faq-dash/faq-dash.component';
import { FAQuestionsComponent } from './pages/Faq/faquestions/faquestions.component';
import { AddQuickGuideComponent } from './pages/Quick Guide/add-quick-guide/add-quick-guide.component';
import { QuickGuideDashComponent } from './pages/Quick Guide/quick-guide-dash/quick-guide-dash.component';
import { EditQuickGuideComponent } from './pages/Quick Guide/edit-quick-guide/edit-quick-guide.component';
import { TopicMasterComponent } from './pages/Masters/topic-master/topic-master.component';
import { TopicMasterDashComponent } from './pages/Masters/topic-master-dash/topic-master-dash.component';
import { EnableLocalDoctorComponent } from './pages/Masters/enable-local-doctor/enable-local-doctor.component';
import { QuickguideComponent } from './pages/Quick Guide/quickguide/quickguide.component';
import { DocChangePwdComponent } from './pages/Doctor/doc-change-pwd/doc-change-pwd.component';
import { NurseChangePwdComponent } from './pages/Nurse/nurse-change-pwd/nurse-change-pwd.component';
import { ChangeMidPwdComponent } from './pages/Midewife/change-mid-pwd/change-mid-pwd.component';
import { ChangePhysiopwdComponent } from './pages/physiotherapist/change-physiopwd/change-physiopwd.component';
import { ChangePhaPwdComponent } from './pages/Pharmacy/change-pha-pwd/change-pha-pwd.component';
import { ChangediaPwdComponent } from './pages/Diagnostic Center/changedia-pwd/changedia-pwd.component';
import { HosrecpChangepwdComponent } from './pages/Hospital/hosrecp-changepwd/hosrecp-changepwd.component';
import { ChangeDiaRecpPwdComponent } from './pages/Diagnostic Center/change-dia-recp-pwd/change-dia-recp-pwd.component';
import { ChangeDeliveryPwdComponent } from './pages/DeliveryPartner/change-delivery-pwd/change-delivery-pwd.component';
import { IndRecpComponent } from './pages/Doctor/ind-recp/ind-recp.component';
import { IndRecpdashComponent } from './pages/Doctor/ind-recpdash/ind-recpdash.component';
import { DocRecpAppointmentsComponent } from './pages/Doctor/doc-recp-appointments/doc-recp-appointments.component';
import { IndBookAppointmentComponent } from './pages/IndependentDocRecep/ind-book-appointment/ind-book-appointment.component';
import { IndDocPaymentsComponent } from './pages/IndependentDocRecep/ind-doc-payments/ind-doc-payments.component';
import { DatecheckComponent } from './pages/Doctor/datecheck/datecheck.component';
import { PatientInvitesDashComponent } from './pages/AdminDashboard/patient-invites-dash/patient-invites-dash.component';
import { InvitationMasterComponent } from './pages/AdminDashboard/invitation-master/invitation-master.component';
import { InvitationDashComponent } from './pages/AdminDashboard/invitation-dash/invitation-dash.component';
import { ProviderpayComponent } from './pages/Billing/providerpay/providerpay.component';
import { ForgotPasswordComponent } from './pages/Sales/forgot-password/forgot-password.component';
import { HomedeliveryFeesComponent } from './pages/Masters/homedelivery-fees/homedelivery-fees.component';
import { PharmacyReportComponent } from './pages/AdminDashboard/pharmacy-report/pharmacy-report.component';
import { DiagnosticHomeReportComponent } from './pages/AdminDashboard/diagnostic-home-report/diagnostic-home-report.component';
import { PharmacyChargesReportComponent } from './pages/Pharmacy/pharmacy-charges-report/pharmacy-charges-report.component';
import { DiaChargesReportComponent } from './pages/Diagnostic Center/dia-charges-report/dia-charges-report.component';
import { DiaPharmaPayComponent } from './pages/Billing/dia-pharma-pay/dia-pharma-pay.component';
import { NpmEmrComponent } from './pages/Nurse/npm-emr/npm-emr.component';
import { NurseEmrComponent } from './pages/Nurse/nurse-emr/nurse-emr.component';
import { PatientPdfsComponent } from './pages/GenaratePDFs/patient-pdfs/patient-pdfs.component';
import { PatientPdfComponent } from './pages/GenaratePDFs/patient-pdf/patient-pdf.component';
import { DeliveryRevenueComponent } from './pages/DeliveryPartner/delivery-revenue/delivery-revenue.component';
import { DeliveryPatnerReportsComponent } from './pages/DeliveryPartner/delivery-patner-reports/delivery-patner-reports.component';
import { PatientsregComponent } from './pages/Sales/patientsreg/patientsreg.component';
import { NoshowAppointmentsComponent } from './pages/Doctor/noshow-appointments/noshow-appointments.component';
import { AllAdminReportsComponent } from './pages/AdminDashboard/all-admin-reports/all-admin-reports.component';
import { PatientInviteReportComponent } from './pages/AdminDashboard/patient-invite-report/patient-invite-report.component';
import { PatientRecordsComponent } from './pages/AdminDashboard/patient-records/patient-records.component';
import { AdminReportsComponent } from './pages/adminsReports/admin-reports/admin-reports.component';
import { AllProviderPaymentsComponent } from './pages/adminsReports/all-provider-payments/all-provider-payments.component';
import { ResolvedPatientTicketsComponent } from './pages/Support/resolved-patient-tickets/resolved-patient-tickets.component';
import { PatientEscalatesTicketsComponent } from './pages/Support/patient-escalates-tickets/patient-escalates-tickets.component';
import { PaidReportsComponent } from './pages/adminsReports/paid-reports/paid-reports.component';
import { NurseServicesComponent } from './pages/Nurse/nurse-services/nurse-services.component';
import { NurseServicesDashComponent } from './pages/Nurse/nurse-services-dash/nurse-services-dash.component';
import { PhysioServicesComponent } from './pages/physiotherapist/physio-services/physio-services.component';
import { PhysioServicesDashComponent } from './pages/physiotherapist/physio-services-dash/physio-services-dash.component';
import { MidwifeservicesComponent } from './pages/Midewife/midwifeservices/midwifeservices.component';
import { MidwifeservicesdashComponent } from './pages/Midewife/midwifeservicesdash/midwifeservicesdash.component';
import { HomedeliverMasterComponent } from './pages/Masters/homedeliver-master/homedeliver-master.component';
import { LoaderComponent } from './pages/loader/loader.component';
import { CreateFoldersComponent } from './pages/PersonalFolders/create-folders/create-folders.component';
import { FoldersDashComponent } from './pages/PersonalFolders/folders-dash/folders-dash.component';
import { MyFilesComponent } from './pages/PersonalFolders/my-files/my-files.component';
import { SubFolderFilesComponent } from './pages/PersonalFolders/sub-folder-files/sub-folder-files.component';
import { MysubfolderfilesComponent } from './pages/PersonalFolders/mysubfolderfiles/mysubfolderfiles.component';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Sidebar', component: SidebarComponent },
  { path: 'HospitalClinicregistration', component: HospitalClinicregistrationComponent },
  { path: 'Doctorregistration', component: DoctorregistrationComponent },
  { path: 'Docworkingdetails', component: DocworkingdetailsComponent },
  { path: 'Docworkingdetails/:id', component: DocworkingdetailsComponent },
  { path: 'Diagnosticcenterslots', component: DiagnosticcenterslotsComponent },
  { path: 'Pharmacyregistration', component: PharmacyregistrationComponent },
  { path: 'Diagnostictest', component: DiagnostictestComponent },
  { path: 'Diagnosticpackage', component: DiagnosticpackageComponent },
  { path: 'Diagnosticsregistration', component: DiagnosticsregistrationComponent },
  { path: 'Doctor', component: DoctorComponent },
  { path: 'Diagnostic', component: DiagnosticComponent },
  { path: 'Pharmacy', component: PharmacyComponent },
  { path: 'HospitalClinic', component: HospitalClinicComponent },
  { path: 'Sponserhospitalclinic', component: SponserhospitalclinicComponent },
  { path: 'Sponserhospitalclinic/:id', component: SponserhospitalclinicComponent },
  { path: 'Diagnosticcenter', component: DiagnosticcenterComponent },
  { path: 'Diagnosticcenter/:id', component: DiagnosticcenterComponent },
  { path: 'Sponserpharmacy', component: SponserpharmacyComponent },
  { path: 'Sponserpharmacy/:id', component: SponserpharmacyComponent },
  { path: 'Doctordash', component: DoctordashComponent },
  { path: 'Hspdash', component: HspdashComponent },
  { path: 'Diagnosticdash', component: DiagnosticdashComponent },
  { path: 'Pharmacydash', component: PharmacydashComponent },
  { path: 'Hspclidash', component: HspclidashComponent },
  { path: 'Diagdash', component: DiagdashComponent },
  { path: 'Pharmdash', component: PharmdashComponent },
  { path: 'Pharmacydashboard', component: PharmacydashboardComponent },
  { path: 'Pharmacydashboard/:id', component: PharmacydashboardComponent },
  { path: 'HspClidash', component: HspClidashComponent },
  { path: 'HspClidash/:id/:hospitalcount', component: HspClidashComponent },
  { path: 'Docdash', component: DocdashComponent },
  { path: 'Docdash/:id', component: DocdashComponent },
  { path: 'DiagnesticDashboard', component: DiagnesticDashboardComponent },
  { path: 'DiagnesticDashboard/:id', component: DiagnesticDashboardComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'Appointments', component: AppointmentsComponent },
  { path: 'Feedbacks', component: FeedbacksComponent },
  { path: 'Doctors', component: DoctorsComponent },
  { path: 'Myprofile', component: MyprofileComponent },
  { path: 'Myappointments', component: MyappointmentsComponent },
  { path: 'Appointmentsreport', component: AppointmentsreportComponent },
  { path: 'Appointmentsreport/:id', component: AppointmentsreportComponent },
  { path: 'Myarticles', component: MyarticlesComponent },
  { path: 'Myfeedbacks', component: MyfeedbacksComponent },
  { path: 'Profiles', component: ProfilesComponent },
  { path: 'Orders', component: OrdersComponent },
  { path: 'Offers', component: OffersComponent },
  { path: 'Offers/:id', component: OffersComponent },
  { path: 'Pharmacyprofile', component: PharmacyprofileComponent },
  { path: 'Pharmacyoffers', component: PharmacyoffersComponent },
  { path: 'Writearticle', component: WritearticleComponent },
  { path: 'Writearticle/:id', component: WritearticleComponent },
  { path: 'Offersdash', component: OffersdashComponent },
  { path: 'OffersDashboard', component: OffersDashboardComponent },
  { path: 'EditHospitalClinic/:id', component: EditHospitalClinicComponent },
  { path: 'EditDoctorRegistration/:id', component: EditDoctorRegistrationComponent },
  { path: 'EditDiagnosticRegistration/:id', component: EditDiagnosticRegistrationComponent },
  { path: 'EditPharmacyReg/:id', component: EditPharmacyRegComponent },
  { path: 'DiagnosticTestDash', component: DiagnosticTestDashComponent },
  { path: 'DiagnosticPackageDash', component: DiagnosticPackageDashComponent },
  { path: 'Vediocall', component: VediocallComponent },
  { path: 'Nurse', component: NurseComponent },
  { path: 'NurseDashboard', component: NurseDashboardComponent },
  { path: 'NurseDashboard/:id', component: NurseDashboardComponent },
  { path: 'Physiotherapist', component: PhysiotherapistComponent },
  { path: 'PhysiotherapistDashboard', component: PhysiotherapistDashboardComponent },
  { path: 'PhysiotherapistDashboard/:id', component: PhysiotherapistDashboardComponent },
  { path: 'Midwife', component: MidwifeComponent },
  { path: 'MidwifeDashboard', component: MidwifeDashboardComponent },
  { path: 'MidwifeDashboard/:id', component: MidwifeDashboardComponent },
  { path: 'DeliveryPartner', component: DeliveryPartnerComponent },
  { path: 'DeliveryPartnerDashboard', component: DeliveryPartnerDashboardComponent },
  { path: 'NurseProfile', component: NurseProfileComponent },
  { path: 'PhysiotherapistProfile', component: PhysiotherapistProfileComponent },
  { path: 'MidwifeProfile', component: MidwifeProfileComponent },
  { path: 'DeliverPartnerProfile', component: DeliverPartnerProfileComponent },
  { path: 'PhysiotherapistAppointments', component: PhysiotherapistAppointmentsComponent },
  { path: 'MidwifeAppointments', component: MidwifeAppointmentsComponent },
  { path: 'DeliveryPartnerAppointments', component: DeliveryPartnerAppointmentsComponent },
  { path: 'EditNurseComponent/:id', component: EditNurseComponent },
  { path: 'NurseWorkingDetails', component: NurseWorkingDetailsComponent },
  { path: 'PhysiotherapistWorkingDetails', component: PhysiotherapistWorkingDetailsComponent },
  { path: 'NurseLogin', component: NurseLoginComponent },
  { path: 'NurseLoginDashboard', component: NurseLoginDashboardComponent },
  { path: 'PhysiotherapistLogin', component: PhysiotherapistLoginComponent },
  { path: 'PhysiotherapistLoginDashboard', component: PhysiotherapistLoginDashboardComponent },
  { path: 'MidwifeLogin', component: MidwifeLoginComponent },
  { path: 'MidwifeLoginDashboard', component: MidwifeLoginDashboardComponent },
  { path: 'NurseAppointments', component: NurseAppointmentsComponent },
  { path: 'DeliveryCompanyLogin', component: DeliveryCompanyLoginComponent },
  { path: 'DeliveryCompanyLoginDashboard', component: DeliveryCompanyLoginDashboardComponent },
  { path: 'PartnerRegistration', component: PartnerRegistrationComponent },
  { path: 'PartnersDashboard', component: PartnersDashboardComponent },
  { path: 'MidwifeWorkingDetails', component: MidwifeWorkingDetailsComponent },
  { path: 'Editphysiotherapist/:id', component: EditphysiotherapistComponent },
  { path: 'EditMidwifeComponent/:id', component: EditMidwifeComponent },
  { path: 'EditDeliveryCompany/:id', component: EditDeliveryCompanyComponent },
  { path: 'MedicalHistory', component: MedicalHistoryComponent },
  { path: 'PatientHistory/:patientID', component: PatientHistoryComponent },
  { path: 'NewPatientHistory/:patientID', component: NewPatientHistoryComponent },
  { path: 'DiagnosticReports', component: DiagnosticReportsComponent },
  { path: 'DiagnosticReports/:id', component: DiagnosticReportsComponent },
  { path: 'NurseReports', component: NurseReportsComponent },
  { path: 'NurseReports/:id', component: NurseReportsComponent },
  { path: 'PhysiotherapistReports', component: PhysiotherapistReportsComponent },
  { path: 'PhysiotherapistReports/:id', component: PhysiotherapistReportsComponent },
  { path: 'MideWifeReports', component: MideWifeReportsComponent },
  { path: 'MideWifeReports/:id', component: MideWifeReportsComponent },
  { path: 'NurseTimings', component: NurseTimingsComponent },
  { path: 'PhysiotherapistTimings', component: PhysiotherapistTimingsComponent },
  { path: 'MidWifeTimings', component: MidWifeTimingsComponent },

  { path: 'DoctorPrescription', component: DoctorPrescriptionComponent },
  { path: 'PrescriptionReports', component: PrescriptionReportsComponent },
  { path: 'PrescriptionReports/:id', component: PrescriptionReportsComponent },
  { path: 'PreviousVideos/:archiveID/:patientID', component: PreviousVideosComponent },
  { path: 'HospitalDashboard', component: HospitalDashboardComponent },
  { path: 'DocREports', component: DocREportsComponent },
  { path: 'DocREports/:id', component: DocREportsComponent },
  { path: 'CountrtMaster', component: CountrtMasterComponent },
  { path: 'CountrtMaster/:id', component: CountrtMasterComponent },
  { path: 'CountryDash', component: CountryDashComponent },
  { path: 'ProvinceMaster', component: ProvinceMasterComponent },
  { path: 'ProvinceMaster/:id', component: ProvinceMasterComponent },
  { path: 'Provincedash', component: ProvincedashComponent },
  { path: 'CityMaster', component: CityMasterComponent },
  { path: 'CityMaster/:id', component: CityMasterComponent },
  { path: 'CityMasterDash', component: CityMasterDashComponent },
  { path: 'Departmentmaster', component: DepartmentmasterComponent },
  { path: 'Departmentmaster/:id', component: DepartmentmasterComponent },
  { path: 'DepartmentDash', component: DepartmentDashComponent },
  { path: 'ComplaintMaster', component: ComplaintMasterComponent },
  { path: 'ComplaintMaster/:id', component: ComplaintMasterComponent },
  { path: 'CompaintDash', component: CompaintDashComponent },
  { path: 'SpecilizationMaster/:id', component: SpecilizationMasterComponent },
  { path: 'SpecilizationMaster', component: SpecilizationMasterComponent },
  { path: 'SpecilizationDash', component: SpecilizationDashComponent },
  { path: 'ServiceMaster', component: ServiceMasterComponent },
  { path: 'ServiceMaster/:id', component: ServiceMasterComponent },
  { path: 'ServiceMasterDash', component: ServiceMasterDashComponent },
  { path: 'FacilityMaster', component: FacilityMasterComponent },
  { path: 'FacilityMaster/:id', component: FacilityMasterComponent },
  { path: 'FacilityMasterDash', component: FacilityMasterDashComponent },
  { path: 'MedicineTypeMaster', component: MedicineTypeMasterComponent },
  { path: 'MedicineTypeMaster/:id', component: MedicineTypeMasterComponent },
  { path: 'MedicineTypeMasterDash', component: MedicineTypeMasterDashComponent },
  { path: 'DiagnosticTestType', component: DiagnosticTestTypeComponent },
  { path: 'DiagnosticTestTypeDash', component: DiagnosticTestTypeDashComponent },
  { path: 'DiagnosticTestType/:id', component: DiagnosticTestTypeComponent },
  { path: 'DiagnosticTestMaster', component: DiagnosticTestMasterComponent },
  { path: 'DiagnosticTestMaster/:id', component: DiagnosticTestMasterComponent },
  { path: 'DiaTestDash', component: DiaTestDashComponent },
  { path: 'BloodGroupMaster', component: BloodGroupMasterComponent },
  { path: 'BloodGroupMaster/:id', component: BloodGroupMasterComponent },
  { path: 'BloodGroupMasterDash', component: BloodGroupMasterDashComponent },
  { path: 'WhenToConsume', component: WhenToConsumeComponent },
  { path: 'WhenToConsume/:id', component: WhenToConsumeComponent },
  { path: 'WhenToConsumeMaster', component: WhenToConsumeMasterComponent },
  { path: 'RelationshipType', component: RelationshipTypeComponent },
  { path: 'RelationshipTypeDash', component: RelationshipTypeDashComponent },
  { path: 'InsuranceMaster', component: InsuranceMasterComponent },
  { path: 'InsuranceMaster/:id', component: InsuranceMasterComponent },
  { path: 'InsuranceMasterDash', component: InsuranceMasterDashComponent },
  { path: 'DegreeMaster', component: DegreeMasterComponent },
  { path: 'DegreeMaster/:id', component: DegreeMasterComponent },
  { path: 'DegreeMasterDash', component: DegreeMasterDashComponent },
  { path: 'RegisterPatients', component: RegisterPatientsComponent },
  { path: 'DoctorDashboard', component: DoctorDashboardComponent },
  { path: 'DocDashboardDetails/:id', component: DocDashboardDetailsComponent },
  { path: 'AdminDash', component: AdminDashComponent },
  { path: 'AdminAllAppointments', component: AdminAllAppointmentsComponent },
  { path: 'AdminRevenue', component: AdminRevenueComponent },
  { path: 'NurseAdminDash', component: NurseAdminDashComponent },
  { path: 'NurseAdminDashboard/:id', component: NurseAdminDashboardComponent },
  { path: 'PhysioAdminDash', component: PhysioAdminDashComponent },
  { path: 'PhysioDashboardDetails/:id', component: PhysioDashboardDetailsComponent },
  { path: 'AdminMidWifeDash', component: AdminMidWifeDashComponent },
  { path: 'MidWifeAdminDashDetails/:id', component: MidWifeAdminDashDetailsComponent },
  { path: 'LocalDoctorRegistration', component: LocalDoctorRegistrationComponent },

  { path: 'LocalDoctorRegistration/:id', component: LocalDoctorRegistrationComponent },

  { path: 'LocalDocDash', component: LocalDocDashComponent },
  { path: 'MyPatientPrescriptions', component: MyPatientPrescriptionsComponent },
  { path: 'MyProfiles', component: MyProfilesComponent },
  { path: 'Announsements', component: AnnounsementsComponent },
  { path: 'Announsements/:id', component: AnnounsementsComponent },
  { path: 'AnnounseDash', component: AnnounseDashComponent },
  { path: 'NurseFees', component: NurseFeesComponent },
  { path: 'NurseFees/:id', component: NurseFeesComponent },
  { path: 'NurseFeeDash', component: NurseFeeDashComponent },
  { path: 'PhysioFees', component: PhysioFeesComponent },
  { path: 'PhysioFees/:id', component: PhysioFeesComponent },
  { path: 'PhysiFeedash', component: PhysiFeedashComponent },
  { path: 'MidwifeFees', component: MidwifeFeesComponent },
  { path: 'MidwifeFees/:id', component: MidwifeFeesComponent },
  { path: 'MidwifeFeesDash', component: MidwifeFeesDashComponent },
  { path: 'PatientWallet', component: PatientWalletComponent },
  { path: 'SupportDash', component: SupportDashComponent },
  { path: 'MyRevenue', component: MyRevenueComponent },
  { path: 'Nurserevenue', component: NurserevenueComponent },
  { path: 'Midwiferevenue', component: MidwiferevenueComponent },
  { path: 'PhysioRevenue', component: PhysioRevenueComponent },
  { path: 'SupportReg', component: SupportRegComponent },
  { path: 'SupportRegDash', component: SupportRegDashComponent },
  { path: 'SupportProfile', component: SupportProfileComponent },
  { path: 'DocAppReports', component: DocAppReportsComponent },
  { path: 'NurseAdminReports', component: NurseAdminReportsComponent },
  { path: 'MidWifeAdminReports', component: MidWifeAdminReportsComponent },
  { path: 'Physioreports', component: PhysioreportsComponent },
  { path: 'ClinicDash', component: ClinicDashComponent },
  { path: 'ClinicDash/:id/:cliniccount', component: ClinicDashComponent },
  { path: 'DiagnosticSlotsDash', component: DiagnosticSlotsDashComponent },
  { path: 'ReferredPatients', component: ReferredPatientsComponent },
  { path: 'PatientReg', component: PatientRegComponent },
  { path: 'Ptientregdash', component: PtientregdashComponent },
  { path: 'PatientReg/:id', component: PatientRegComponent },

  { path: 'ArticleDash', component: ArticleDashComponent },
  { path: 'HospitalRevenue', component: HospitalRevenueComponent },
  { path: 'RevenueDetails/:id', component: RevenueDetailsComponent },
  { path: 'DocWorkingDash', component: DocWorkingDashComponent },
  { path: 'Nurseworkingdash', component: NurseworkingdashComponent },
  { path: 'PhysioworkingDash', component: PhysioworkingDashComponent },
  { path: 'MidwifeWorkingDash', component: MidwifeWorkingDashComponent },
  { path: 'Receptionstlogin', component: ReceptionstloginComponent },
  { path: 'ReceptionstloginDash', component: ReceptionstloginDashComponent },
  { path: 'BookDoctors', component: BookDoctorsComponent },
  { path: 'Bookappointment', component: BookappointmentComponent },
  { path: 'Doctorslots/:doctorID/:id/:hospital_ClinicID/:appointmentTypeID/:bookingTypeID/:slotDurationID', component: DoctorslotsComponent },
  { path: 'Bookappments/:doctorSlotID/:slotName/:doctorFees', component: BookappmentsComponent },
  { path: 'MidwifeWorkingDetails/:id', component: MidwifeWorkingDetailsComponent },
  { path: 'Docworkingdetails/:id/:hospitalid', component: DocworkingdetailsComponent },
  { path: 'NurseWorkingDetails/:id', component: NurseWorkingDetailsComponent },
  { path: 'PhysiotherapistWorkingDetails/:id', component: PhysiotherapistWorkingDetailsComponent },
  { path: 'DoctorRevenue', component: DoctorRevenueComponent },
  { path: 'CancelledAppointments', component: CancelledAppointmentsComponent },
  { path: 'DoctorRev/:id', component: DoctorRevComponent },
  { path: 'SubCategory', component: SubCategoryComponent },
  { path: 'SubCategoryDash', component: SubCategoryDashComponent },
  { path: 'Inventory', component: InventoryComponent },
  { path: 'InventoryDash', component: InventoryDashComponent },
  { path: 'Products', component: ProductsComponent },
  { path: 'ProductsDash', component: ProductsDashComponent },
  { path: 'Categorydashboard', component: CategorydashboardComponent },
  { path: 'Category', component: CategoryComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'ItemMaster', component: ItemMasterComponent },
  { path: 'HomePageSponsrship', component: HomePageSponsrshipComponent },
  { path: 'HomePageSponsrship/:id', component: HomePageSponsrshipComponent },
  { path: 'HomePageSponsrshipDashBoard', component: HomePageSponsrshipDashBoardComponent },
  { path: 'OrdersDashboard', component: OrdersDashboardComponent },
  { path: 'SubCategory/:id', component: SubCategoryComponent },
  { path: 'Category/:id', component: CategoryComponent },
  { path: 'items/:id', component: ItemsComponent },
  { path: 'AppPageSponsorship', component: AppPageSponsorshipComponent },
  { path: 'AppPageSponsorship/:id', component: AppPageSponsorshipComponent },
  { path: 'AppPageSponsorshipDashBoard', component: AppPageSponsorshipDashboardComponent },
  { path: 'Inventory/:id', component: InventoryComponent },
  { path: 'CompletedOrders', component: CompletedOrdersComponent },
  { path: 'InclinicRevenue', component: InclinicRevenuComponent },
  { path: 'InclinicAppointements', component: InclinicAppointementsComponent },
  { path: 'Videocallrevenue', component: VideocallrevenueComponent },
  { path: 'Videocallappointements', component: VideocallappointementsComponent },
  { path: 'HomecareAppointements', component: HomecareAppointementsComponent },
  { path: 'HomecareRevenue', component: HomecareRevenueComponent },
  { path: 'Sentrefferals', component: SentrefferalsComponent },
  { path: 'DocCalender', component: DocCalenderComponent },
  { path: 'DoctorsCalender', component: DoctorsCalenderComponent },
  { path: 'ReturnOrders', component: ReturnOrdersComponent },
  { path: 'ReturnOrdersReport', component: ReturnOrdersReportComponent },
  { path: 'NurseMonthWiseSchedule', component: NurseMonthWiseScheduleComponent },
  { path: 'PhysiomonthWiseSchedule', component: PhysiomonthWiseScheduleComponent },
  { path: 'MidwifeMonthWise', component: MidwifeMonthWiseComponent },
  { path: 'NurseSchedule', component: NurseScheduleComponent },
  { path: 'MidWifeMonthWiseSch', component: MidWifeMonthWiseSchComponent },
  { path: 'PhysioMonthWiseSch', component: PhysioMonthWiseSchComponent },
  { path: 'TotalHospitalApointments/:id', component: TotalHospitalApointmentsComponent },
  { path: 'PharmacyOrders', component: PharmacyOrdersComponent },
  { path: 'PharmacyReturnorders', component: PharmacyReturnordersComponent },
  { path: 'HospitalDocCommission', component: HospitalDocCommissionComponent },
  { path: 'HospitalDocDash', component: HospitalDocDashComponent },
  { path: 'HospitalDocCommission/:id/:hospital_ClinicName', component: HospitalDocCommissionComponent },
  { path: 'DoctorSupport', component: DoctorSupportComponent },
  { path: 'DoctorSupportDash', component: DoctorSupportDashComponent },
  { path: 'NurseSupport', component: NurseSupportComponent },
  { path: 'NurseSupportDash', component: NurseSupportDashComponent },
  { path: 'PhyioSupport', component: PhyioSupportComponent },
  { path: 'PhyioSupportDash', component: PhyioSupportDashComponent },
  { path: 'Midwifsupport', component: MidwifsupportComponent },
  { path: 'MidwifsupportDash', component: MidwifsupportDashComponent },
  { path: 'HospitalSupport', component: HospitalSupportComponent },
  { path: 'HospitalSupportDash', component: HospitalSupportDashComponent },
  { path: 'Recpsupport', component: RecpsupportComponent },
  { path: 'RecpsupportDash', component: RecpsupportDashComponent },
  { path: 'SupportWeb', component: SupportWebComponent },

  { path: 'SupportCometedTickets', component: SupportCometedTicketsComponent },
  { path: 'DoctorNotifications', component: DoctorNotificationsComponent },
  { path: 'NurseNotifications', component: NurseNotificationsComponent },
  { path: 'Midwifenotifications', component: MidwifenotificationsComponent },
  { path: 'PhysioNotification', component: PhysioNotificationComponent },
  { path: 'MergePatientdata', component: MergePatientdataComponent },
  { path: 'EditDiagnosticTest/:id', component: EditDiagnosticTestComponent },
  { path: 'Sendemails', component: SendemailsComponent },
  { path: 'EmailDash', component: EmailDashComponent },
  { path: 'SendSms', component: SendSmsComponent },
  { path: 'SmsDash', component: SmsDashComponent },
  { path: 'RoleMenuMapping', component: RoleMenuMappingComponent },
  { path: 'RolemenuDash', component: RolemenuDashComponent },
  { path: 'RoleMenuMapping/:id', component: RoleMenuMappingComponent },
  { path: 'Userrolemapping', component: UserrolemappingComponent },
  { path: 'UserRoleMappingdash', component: UserRoleMappingdashComponent },
  { path: 'Userrolemapping/:id', component: UserrolemappingComponent },
  { path: 'AdminSiderevenue', component: AdminSiderevenueComponent },
  { path: 'LinkForreg', component: LinkForregComponent },
  { path: 'Linkforregdash', component: LinkforregdashComponent },
  { path: 'VoiladocRegisteredUsers', component: VoiladocRegisteredUsersComponent },
  { path: 'ApprovedUsers', component: ApprovedUsersComponent },
  { path: 'Rejectedusers', component: RejectedusersComponent },
  { path: 'HomeCareAppointments', component: HomeCareAppointmentsComponent },
  { path: 'HomecareAppdash', component: HomecareAppdashComponent },
  { path: 'IndependentSubscriptions', component: IndependentSubscriptionsComponent },
  { path: 'Independentsubdash', component: IndependentsubdashComponent },
  { path: 'CancelationTimings', component: CancelationTimingsComponent },
  { path: 'CancelationTimings', component: CancelationTimingsComponent },
  { path: 'NurseCancelledApp', component: NurseCancelledAppComponent },
  { path: 'CancelledmidwifeApps', component: CancelledmidwifeAppsComponent },
  { path: 'CancelledPhysioappointments', component: CancelledPhysioappointmentsComponent },
  { path: 'AllCancelledAppointments', component: AllCancelledAppointmentsComponent },
  { path: 'MyTeamDashboard', component: MyTeamDashboardComponent },
  { path: 'MyTeam', component: MyTeamComponent },
  { path: 'MyTeam/:id', component: MyTeamComponent },
  { path: 'ReceptionistLoginDashboard', component: ReceptionistLoginDashboardComponent },
  { path: 'ReceptionistLogin', component: ReceptionistLoginComponent },
  { path: 'ReceptionistLogin/:id', component: ReceptionistLoginComponent },
  { path: 'DiagnosticAppointmentDash', component: DiagnosticAppointmentDashboardComponent },
  { path: 'NewAppointment', component: NewAppointmentComponent },
  { path: 'NewBilling', component: NewBillingComponent },
  { path: 'SentInvoices', component: SentInvoicesComponent },
  { path: 'PaidInvoices', component: PaidInvoicesComponent },
  { path: 'DiagfnosticCalender', component: DiagfnosticCalenderComponent },
  { path: 'BillingDashboard', component: BillingDashboardComponent },
  { path: 'NewPaymentLink', component: NewPaymentLinkComponent },
  { path: 'PaymentLinkDash', component: PaymentLinkDashboardComponent },
  { path: 'NewPaymentLink/:id', component: NewPaymentLinkComponent },
  { path: 'UserPlanning', component: UserPlanningComponent },
  { path: 'PharmacySupport', component: PharmacySupportComponent },
  { path: 'PharmacySupportDash', component: PharmacySupportDashComponent },
  { path: 'DiagnosticSupport', component: DiagnosticSupportComponent },
  { path: 'DiagnosticSupportDash', component: DiagnosticSupportDashComponent },
  { path: 'RefundSupport', component: RefundSupportComponent },
  { path: 'RefundCompletedTickets', component: RefundCompletedTicketsComponent },
  { path: 'AllDiagnosticCalender', component: AllDiagnosticCalenderComponent },
  { path: 'MeridionalSupport', component: MeridionalSupportComponent },
  { path: 'DiagnosticPatients', component: DiagnosticPatientsComponent },
  { path: 'Faq', component: FaqComponent },
  { path: 'FaqDash', component: FaqDashComponent },
  { path: 'Faq/:id', component: FaqComponent },
  { path: 'FAQuestions', component: FAQuestionsComponent },
  { path: 'AddQuickGuide', component: AddQuickGuideComponent },
  { path: 'QuickGuideDash', component: QuickGuideDashComponent },
  { path: 'EditQuickGuide/:id', component: EditQuickGuideComponent },
  { path: 'TopicMaster', component: TopicMasterComponent },
  { path: 'TopicMasterDash', component: TopicMasterDashComponent },
  { path: 'TopicMaster/:id', component: TopicMasterComponent },
  { path: 'EnableLocalDoctor', component: EnableLocalDoctorComponent },
  { path: 'Quickguide', component: QuickguideComponent },
  { path: 'DocChangePwd', component:     DocChangePwdComponent},
  { path: 'NurseChangePwd', component:  NurseChangePwdComponent},
  { path: 'ChangeMidPwd', component:  ChangeMidPwdComponent},
  { path: 'ChangePhysiopwd', component:  ChangePhysiopwdComponent},
  { path: 'ChangePhaPwd', component:  ChangePhaPwdComponent},
  { path: 'ChangediaPwd', component:  ChangediaPwdComponent},
  { path: 'HosrecpChangepwd', component:  HosrecpChangepwdComponent},
  { path: 'ChangeDeliveryPwd', component:  ChangeDeliveryPwdComponent},
  { path: 'ChangeDiaRecpPwd', component:  ChangeDiaRecpPwdComponent},
  { path: 'IndRecp', component:  IndRecpComponent},
  { path: 'IndRecpdash', component:  IndRecpdashComponent},
  { path: 'DocRecpAppointments', component:  DocRecpAppointmentsComponent},
  { path: 'IndBookAppointment', component:  IndBookAppointmentComponent},
  { path: 'IndDocPayments', component:  IndDocPaymentsComponent},
  { path: 'Datecheck', component:  DatecheckComponent},
  { path: 'Pharmacyoffers/:id', component: PharmacyoffersComponent },
  { path: 'PatientInvitesDash', component:  PatientInvitesDashComponent},
  { path: 'InvitationMaster', component:  InvitationMasterComponent},
  { path: 'InvitationDash', component:  InvitationDashComponent},
  { path: 'Providerpay', component:  ProviderpayComponent},
  { path: 'ForgotPassword', component:  ForgotPasswordComponent},
  { path: 'HomedeliveryFees', component:  HomedeliveryFeesComponent},
  { path: 'PharmacyReport', component:  PharmacyReportComponent},
  { path: 'DiagnosticHomeReport', component:  DiagnosticHomeReportComponent},
  { path: 'PharmacyChargesReport', component:  PharmacyChargesReportComponent},
  { path: 'DiaChargesReport', component:  DiaChargesReportComponent},
  { path: 'DiaPharmaPay', component:  DiaPharmaPayComponent},
  { path: 'NpmEmr', component:  NpmEmrComponent},
  { path: 'NurseEmr/:patientID', component:  NurseEmrComponent},
  { path: 'PatientPdfs', component:  PatientPdfsComponent},
  { path: 'PatientPdf', component:  PatientPdfComponent},
  { path: 'DeliveryRevenue', component:  DeliveryRevenueComponent},
  { path: 'DeliveryPatnerReports', component:  DeliveryPatnerReportsComponent},
  { path: 'Patientsreg', component:  PatientsregComponent},
  { path: 'NoshowAppointments', component:  NoshowAppointmentsComponent},
  { path: 'AllAdminReports/:id', component:  AllAdminReportsComponent},
  { path: 'PatientInviteReport', component:  PatientInviteReportComponent},
  { path: 'PatientRecords', component:  PatientRecordsComponent},
  { path: 'AdminReports', component:  AdminReportsComponent},
  { path: 'AllProviderPayments', component:  AllProviderPaymentsComponent},
  { path: 'ResolvedPatientTickets', component:  ResolvedPatientTicketsComponent},
  { path: 'PatientEscalatesTickets', component:  PatientEscalatesTicketsComponent},
  { path: 'PaidReports', component:  PaidReportsComponent},
  { path: 'NurseServices', component:  NurseServicesComponent},
  { path: 'NurseServicesDash', component:  NurseServicesDashComponent},
  { path: 'PhysioServices', component:  PhysioServicesComponent},
  { path: 'PhysioServices/:id', component:  PhysioServicesComponent},
  { path: 'PhysioServicesDash', component:  PhysioServicesDashComponent},
  { path: 'NurseServices/:id', component:  NurseServicesComponent},
  { path: 'Midwifeservices', component:  MidwifeservicesComponent},
  { path: 'Midwifeservices/:id', component:  MidwifeservicesComponent},
  { path: 'MidwifeservicesDash', component:  MidwifeservicesdashComponent},
  { path: 'HomedeliverMaster', component:  HomedeliverMasterComponent},
  { path: 'Loader', component:  LoaderComponent},
  { path: 'CreateFolders', component:  CreateFoldersComponent},
  { path: 'FoldersDash', component:  FoldersDashComponent},
  { path: 'MyFiles/:id/:Foldername', component:  MyFilesComponent},
  { path: 'SubFolderFiles/:folderid/:subfolderid/:Foldername/:SubFolderName', component:  SubFolderFilesComponent},
  { path: 'Mysubfolderfiles/:folderid/:subfolderid/:SubfoldersID/:Foldername/:SubFolderName/:SubFoldersName', component:  MysubfolderfilesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }