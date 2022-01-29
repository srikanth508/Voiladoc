import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxFullCalendarModule } from 'ngx-fullcalendar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChartsModule } from 'ng2-charts';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ArchwizardModule } from 'angular-archwizard';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { HospitalClinicregistrationComponent } from './pages/Registration/hospital-clinicregistration/hospital-clinicregistration.component';
import { DoctorregistrationComponent } from './pages/Registration/doctorregistration/doctorregistration.component';
import { DocworkingdetailsComponent } from './pages/Registration/docworkingdetails/docworkingdetails.component';
import { DiagnosticsregistrationComponent } from './pages/Registration/diagnosticsregistration/diagnosticsregistration.component';
import { DiagnosticcenterslotsComponent } from './pages/Registration/diagnosticcenterslots/diagnosticcenterslots.component';
import { PharmacyregistrationComponent } from './pages/Registration/pharmacyregistration/pharmacyregistration.component';
import { DiagnostictestComponent } from './pages/Map Services/diagnostictest/diagnostictest.component';
import { DiagnosticpackageComponent } from './pages/Map Services/diagnosticpackage/diagnosticpackage.component';
import { DiagnosticComponent } from '../app/pages/Register logins/diagnostic/diagnostic.component';
import { DoctorComponent } from './pages/Register logins/doctor/doctor.component';
import { PharmacyComponent } from '../app/pages/Register logins/pharmacy/pharmacy.component';
import { HospitalClinicComponent } from './pages/Register logins/hospital-clinic/hospital-clinic.component';
import { SponserhospitalclinicComponent } from './pages/Sponsered/sponserhospitalclinic/sponserhospitalclinic.component';
import { DiagnosticcenterComponent } from './pages/Sponsered/diagnosticcenter/diagnosticcenter.component';
import { SponserpharmacyComponent } from './pages/Sponsered/sponserpharmacy/sponserpharmacy.component';
import { DoctordashComponent } from './pages/Register logins/doctordash/doctordash.component';
import { HspdashComponent } from './pages/Register logins/hspdash/hspdash.component';
import { DiagnosticdashComponent } from './pages/Register logins/diagnosticdash/diagnosticdash.component';
import { PharmacydashComponent } from './pages/Register logins/pharmacydash/pharmacydash.component';
import { HspclidashComponent } from './pages/Sponsered/hspclidash/hspclidash.component';
import { DiagdashComponent } from './pages/Sponsered/diagdash/diagdash.component';
import { PharmdashComponent } from './pages/Sponsered/pharmdash/pharmdash.component';
import { PharmacydashboardComponent } from './pages/Registration/pharmacydashboard/pharmacydashboard.component';
import { HspClidashComponent } from './pages/Registration/hsp-clidash/hsp-clidash.component';
import { DocdashComponent } from './pages/Registration/docdash/docdash.component';
import { DiagnesticDashboardComponent } from './pages/Registration/diagnestic-dashboard/diagnestic-dashboard.component';
import { ProfileComponent } from './pages/Hospital/profile/profile.component';
import { AppointmentsComponent } from './pages/Hospital/appointments/appointments.component';
import { FeedbacksComponent } from './pages/Hospital/feedbacks/feedbacks.component';
import { DoctorsComponent } from './pages/Hospital/doctors/doctors.component';
import { MyprofileComponent } from './pages/Doctor/myprofile/myprofile.component';
import { MyappointmentsComponent } from './pages/Doctor/myappointments/myappointments.component';
import { AppointmentsreportComponent } from './pages/Doctor/appointmentsreport/appointmentsreport.component';
import { MyarticlesComponent } from './pages/Doctor/myarticles/myarticles.component';
import { MyfeedbacksComponent } from './pages/Doctor/myfeedbacks/myfeedbacks.component';
import { ProfilesComponent } from './pages/Diagnostic Center/profiles/profiles.component';
import { OrdersComponent } from './pages/Diagnostic Center/orders/orders.component';
import { OffersComponent } from './pages/Diagnostic Center/offers/offers.component';
import { PharmacyprofileComponent } from './pages/Pharmacy/pharmacyprofile/pharmacyprofile.component';
import { PharmacyoffersComponent } from './pages/Pharmacy/pharmacyoffers/pharmacyoffers.component';
import { WritearticleComponent } from './pages/Doctor/writearticle/writearticle.component';
import { OffersdashComponent } from './pages/Diagnostic Center/offersdash/offersdash.component';
import { OffersDashboardComponent } from './pages/Pharmacy/offers-dashboard/offers-dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditHospitalClinicComponent } from './pages/Registration/edit-hospital-clinic/edit-hospital-clinic.component';
import { EditDoctorRegistrationComponent } from './pages/Registration/edit-doctor-registration/edit-doctor-registration.component';
import { EditDiagnosticRegistrationComponent } from './pages/Registration/edit-diagnostic-registration/edit-diagnostic-registration.component';
import { EditPharmacyRegComponent } from './pages/Registration/edit-pharmacy-reg/edit-pharmacy-reg.component';
import { DiagnosticTestDashComponent } from './pages/Map Services/diagnostic-test-dash/diagnostic-test-dash.component';
import { DiagnosticPackageDashComponent } from './pages/Map Services/diagnostic-package-dash/diagnostic-package-dash.component';
import { VediocallComponent } from './pages/Doctor/vediocall/vediocall.component';
import { PublisherComponent } from './pages/Doctor/publisher/publisher.component';
import { SubscriberComponent } from './pages/Doctor/subscriber/subscriber.component';
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
import { NgDateRangePickerModule } from 'ng-daterangepicker';
import { DiagnosticReportsComponent } from './pages/Diagnostic Center/diagnostic-reports/diagnostic-reports.component';
import { NurseReportsComponent } from './pages/Nurse/nurse-reports/nurse-reports.component';
import { PhysiotherapistReportsComponent } from './pages/physiotherapist/physiotherapist-reports/physiotherapist-reports.component';
import { MideWifeReportsComponent } from './pages/Midewife/mide-wife-reports/mide-wife-reports.component';
import { NurseTimingsComponent } from './pages/Nurse/nurse-timings/nurse-timings.component';
import { PhysiotherapistTimingsComponent } from './pages/physiotherapist/physiotherapist-timings/physiotherapist-timings.component';
import { MidWifeTimingsComponent } from './pages/Midewife/mid-wife-timings/mid-wife-timings.component';
import { DoctorPrescriptionComponent } from './pages/Pharmacy/doctor-prescription/doctor-prescription.component';
import { PrescriptionReportsComponent } from './pages/Pharmacy/prescription-reports/prescription-reports.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PreviousVideosComponent } from './pages/Doctor/previous-videos/previous-videos.component';
import { DatePipe } from '@angular/common';
import { TranslatorModule } from 'angular-translator';
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
import { BookappointmentComponent } from './pages/Hospital/bookappointment/bookappointment.component';
import { DoctorslotsComponent } from './pages/Hospital/doctorslots/doctorslots.component';
import { BookappmentsComponent } from './pages/Hospital/bookappments/bookappments.component';
import { DoctorRevenueComponent } from './pages/Hospital/doctor-revenue/doctor-revenue.component';
import { CancelledAppointmentsComponent } from './pages/Hospital/cancelled-appointments/cancelled-appointments.component';
import { DoctorRevComponent } from './pages/Doctor/doctor-rev/doctor-rev.component';
import { SubCategoryComponent } from './pages/Ecommerce/sub-category/sub-category.component';
import { SubCategoryDashComponent } from './pages/Ecommerce/sub-category-dash/sub-category-dash.component';
import { InventoryComponent } from './pages/Ecommerce/inventory/inventory.component';
import { InventoryDashComponent } from './pages/Ecommerce/inventory-dash/inventory-dash.component';
import { ProductsComponent } from './pages/Ecommerce/products/products.component';
import { ProductsDashComponent } from './pages/Ecommerce/products-dash/products-dash.component';
import { CategoryComponent } from './pages/Ecommerce/category/category.component';
import { CategorydashboardComponent } from './pages/Ecommerce/categorydashboard/categorydashboard.component';
import { ItemsComponent } from './pages/Ecommerce/items/items.component';
import { ItemMasterComponent } from './pages/Ecommerce/item-master/item-master.component';
import { HomePageSponsrshipComponent } from './pages/Sponsered/home-page-sponsrship/home-page-sponsrship.component';
import { HomePageSponsrshipDashBoardComponent } from './pages/Sponsered/home-page-sponsrship-dash-board/home-page-sponsrship-dash-board.component';
import { OrdersDashboardComponent } from './pages/Sponsered/orders-dashboard/orders-dashboard.component';
import { AppPageSponsorshipComponent } from './pages/Sponsered/app-page-sponsorship/app-page-sponsorship.component';
import { AppPageSponsorshipDashboardComponent } from './pages/Sponsered/app-page-sponsorship-dashboard/app-page-sponsorship-dashboard.component';
import { CompletedOrdersComponent } from './pages/DeliveryPartner/completed-orders/completed-orders.component';
import { DoctorRevenueDashboardComponent } from './pages/Doctor/doctor-revenue-dashboard/doctor-revenue-dashboard.component';
import { InclinicRevenuComponent } from './pages/Hospital/inclinic-revenu/inclinic-revenu.component';
import { InclinicAppointementsComponent } from './pages/Hospital/inclinic-appointements/inclinic-appointements.component';
import { VideocallrevenueComponent } from './pages/Hospital/videocallrevenue/videocallrevenue.component';
import { VideocallappointementsComponent } from './pages/Hospital/videocallappointements/videocallappointements.component';
import { HomecareRevenueComponent } from './pages/Hospital/homecare-revenue/homecare-revenue.component';
import { HomecareAppointementsComponent } from './pages/Hospital/homecare-appointements/homecare-appointements.component';
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

import { NgxTagsInputModule } from 'ngx-tags-input';
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
import { MyTeamComponent } from './pages/Diagnostic Center/my-team/my-team.component';
import { MyTeamDashboardComponent } from './pages/Diagnostic Center/my-team-dashboard/my-team-dashboard.component';
import { ReceptionistLoginDashboardComponent } from './pages/Diagnostic Center/receptionist-login-dashboard/receptionist-login-dashboard.component';
import { ReceptionistLoginComponent } from './pages/Diagnostic Center/receptionist-login/receptionist-login.component';
import { NewAppointmentComponent } from './pages/Diagnostic Center/new-appointment/new-appointment.component';
import { DiagnosticAppointmentDashboardComponent } from './pages/Diagnostic Center/diagnostic-appointment-dashboard/diagnostic-appointment-dashboard.component';
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
 import { AppHttpInterceptor } from './app-http-interceptor';
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
import { ChangeDeliveryPwdComponent } from './pages/DeliveryPartner/change-delivery-pwd/change-delivery-pwd.component';
import { ChangeDiaRecpPwdComponent } from './pages/Diagnostic Center/change-dia-recp-pwd/change-dia-recp-pwd.component';
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
import { UserIdleModule } from 'angular-user-idle';
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
import { SidebarTestComponent } from './pages/sidebar-test/sidebar-test.component';


// const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {

//   url: 'https://maroc.voiladoc.org/RMSAPI/Master/UploadZIP/',
//   maxFilesize: 50,
// };

// const DEFAULT_VAMSI_DROPZONE_CONFIG: DropzoneConfigInterface = {
//   url: 'https://maroc.voiladoc.org/RMSAPI/Master/UploadZIP/',
//   maxFilesize: 50,
// };
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'https://httpbin.org/post',
    maxFilesize: 5000000000,
   timeout:600000,
   //acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    HospitalClinicregistrationComponent,
    DoctorregistrationComponent,
    DocworkingdetailsComponent,
    DiagnosticsregistrationComponent,
    DiagnosticcenterslotsComponent,
    PharmacyregistrationComponent,

    DiagnostictestComponent,
    DiagnosticpackageComponent,
    DiagnosticComponent,
    DoctorComponent,
    PharmacyComponent,
    HospitalClinicComponent,
    SponserhospitalclinicComponent,
    DiagnosticcenterComponent,
    SponserpharmacyComponent,
    DoctordashComponent,
    HspdashComponent,
    DiagnosticdashComponent,
    PharmacydashComponent,
    HspclidashComponent,
    DiagdashComponent,
    PharmdashComponent,
    PharmacydashboardComponent,
    HspClidashComponent,
    DocdashComponent,
    DiagnesticDashboardComponent,
    ProfileComponent,
    AppointmentsComponent,
    FeedbacksComponent,
    DoctorsComponent,
    MyprofileComponent,
    MyappointmentsComponent,
    AppointmentsreportComponent,
    MyarticlesComponent,
    MyfeedbacksComponent,
    ProfilesComponent,
    OrdersComponent,
    OffersComponent,
    PharmacyprofileComponent,
    PharmacyoffersComponent,
    WritearticleComponent,
    OffersdashComponent,
    OffersDashboardComponent,
    EditHospitalClinicComponent,
    EditDoctorRegistrationComponent,
    EditDiagnosticRegistrationComponent,
    EditPharmacyRegComponent,
    DiagnosticTestDashComponent,
    DiagnosticPackageDashComponent,
    VediocallComponent,
    PublisherComponent,
    SubscriberComponent,
    NurseComponent,
    NurseDashboardComponent,
    PhysiotherapistComponent,
    PhysiotherapistDashboardComponent,
    MidwifeComponent,
    MidwifeDashboardComponent,
    DeliveryPartnerComponent,
    DeliveryPartnerDashboardComponent,
    NurseProfileComponent,
    PhysiotherapistProfileComponent,
    MidwifeProfileComponent,
    DeliverPartnerProfileComponent,
    PhysiotherapistAppointmentsComponent,
    MidwifeAppointmentsComponent,
    DeliveryPartnerAppointmentsComponent,
    EditNurseComponent,
    NurseWorkingDetailsComponent,
    PhysiotherapistWorkingDetailsComponent,
    NurseLoginComponent,
    NurseLoginDashboardComponent,
    PhysiotherapistLoginComponent,
    PhysiotherapistLoginDashboardComponent,
    MidwifeLoginComponent,
    MidwifeLoginDashboardComponent,
    NurseAppointmentsComponent,
    DeliveryCompanyLoginComponent,
    DeliveryCompanyLoginDashboardComponent,
    PartnerRegistrationComponent,
    PartnersDashboardComponent,
    MidwifeWorkingDetailsComponent,
    EditphysiotherapistComponent,
    EditMidwifeComponent,
    EditDeliveryCompanyComponent,
    MedicalHistoryComponent,
    PatientHistoryComponent,
    NewPatientHistoryComponent,
    DiagnosticReportsComponent,
    NurseReportsComponent,
    PhysiotherapistReportsComponent,
    MideWifeReportsComponent,
    NurseTimingsComponent,
    PhysiotherapistTimingsComponent,
    MidWifeTimingsComponent,
    DoctorPrescriptionComponent,
    PrescriptionReportsComponent,
    PreviousVideosComponent,
    HospitalDashboardComponent,
    DocREportsComponent,
    CountrtMasterComponent,
    CountryDashComponent,
    ProvinceMasterComponent,
    ProvincedashComponent,
    CityMasterComponent,
    CityMasterDashComponent,
    DepartmentmasterComponent,
    DepartmentDashComponent,
    ComplaintMasterComponent,
    CompaintDashComponent,
    SpecilizationMasterComponent,
    SpecilizationDashComponent,
    ServiceMasterComponent,
    ServiceMasterDashComponent,
    FacilityMasterComponent,
    FacilityMasterDashComponent,
    MedicineTypeMasterComponent,
    MedicineTypeMasterDashComponent,
    DiagnosticTestTypeComponent,
    DiagnosticTestTypeDashComponent,
    DiagnosticTestMasterComponent,
    DiaTestDashComponent,
    BloodGroupMasterComponent,
    BloodGroupMasterDashComponent,
    WhenToConsumeComponent,
    WhenToConsumeMasterComponent,
    RelationshipTypeComponent,
    RelationshipTypeDashComponent,
    InsuranceMasterComponent,
    InsuranceMasterDashComponent,
    DegreeMasterComponent,
    DegreeMasterDashComponent,
    RegisterPatientsComponent,
    DoctorDashboardComponent,
    DocDashboardDetailsComponent,
    AdminDashComponent,
    AdminAllAppointmentsComponent,
    AdminRevenueComponent,
    NurseAdminDashComponent,
    NurseAdminDashboardComponent,
    PhysioAdminDashComponent,
    PhysioDashboardDetailsComponent,
    AdminMidWifeDashComponent,
    MidWifeAdminDashDetailsComponent,
    LocalDoctorRegistrationComponent,
    LocalDocDashComponent,
    MyPatientPrescriptionsComponent,
    MyProfilesComponent,
    AnnounsementsComponent,
    AnnounseDashComponent,
    NurseFeesComponent,
    NurseFeeDashComponent,
    PhysioFeesComponent,
    PhysiFeedashComponent,
    MidwifeFeesComponent,
    MidwifeFeesDashComponent,
    PatientWalletComponent,
    SupportDashComponent,
    MyRevenueComponent,
    NurserevenueComponent,
    MidwiferevenueComponent,
    PhysioRevenueComponent,
    SupportRegComponent,
    SupportRegDashComponent,
    SupportProfileComponent,
    DocAppReportsComponent,
    NurseAdminReportsComponent,
    MidWifeAdminReportsComponent,
    PhysioreportsComponent,
    ClinicDashComponent,
    DiagnosticSlotsDashComponent,
    ReferredPatientsComponent,
    PatientRegComponent,
    PtientregdashComponent,
    ArticleDashComponent,
    HospitalRevenueComponent,
    RevenueDetailsComponent,
    DocWorkingDashComponent,
    NurseworkingdashComponent,
    PhysioworkingDashComponent,
    MidwifeWorkingDashComponent,
    ReceptionstloginComponent,
    ReceptionstloginDashComponent,
    BookDoctorsComponent,
    BookappointmentComponent,
    DoctorslotsComponent,
    BookappmentsComponent,
    DoctorRevenueComponent,
    CancelledAppointmentsComponent,
    DoctorRevComponent,
    SubCategoryComponent,
    SubCategoryDashComponent,
    InventoryComponent,
    InventoryDashComponent,
    ProductsComponent,
    ProductsDashComponent,
    CategoryComponent,
    CategorydashboardComponent,
    ItemsComponent,
    ItemMasterComponent,
    HomePageSponsrshipComponent,
    HomePageSponsrshipDashBoardComponent,
    OrdersDashboardComponent,
    AppPageSponsorshipComponent,
    AppPageSponsorshipDashboardComponent,
    CompletedOrdersComponent,
    DoctorRevenueDashboardComponent,
    InclinicRevenuComponent,
    InclinicAppointementsComponent,
    VideocallrevenueComponent,
    VideocallappointementsComponent,
    HomecareRevenueComponent,
    HomecareAppointementsComponent,
    SentrefferalsComponent,
    DocCalenderComponent,
    DoctorsCalenderComponent,
    ReturnOrdersComponent,
    ReturnOrdersReportComponent,
    NurseMonthWiseScheduleComponent,
    PhysiomonthWiseScheduleComponent,
    MidwifeMonthWiseComponent,
    NurseScheduleComponent,
    MidWifeMonthWiseSchComponent,
    PhysioMonthWiseSchComponent,
    TotalHospitalApointmentsComponent,
    PharmacyOrdersComponent,
    PharmacyReturnordersComponent,
    HospitalDocCommissionComponent,
    HospitalDocDashComponent,
    DoctorSupportComponent,
    DoctorSupportDashComponent,
    NurseSupportComponent,
    NurseSupportDashComponent,
    PhyioSupportComponent,
    PhyioSupportDashComponent,
    MidwifsupportComponent,
    MidwifsupportDashComponent,
    HospitalSupportComponent,
    HospitalSupportDashComponent,
    RecpsupportComponent,
    RecpsupportDashComponent,
    SupportWebComponent,
    SupportCometedTicketsComponent,
    DoctorNotificationsComponent,
    NurseNotificationsComponent,
    MidwifenotificationsComponent,
    PhysioNotificationComponent,
    MergePatientdataComponent,
    EditDiagnosticTestComponent,
    SendemailsComponent,
    EmailDashComponent,
    SendSmsComponent,
    SmsDashComponent,
    RoleMenuMappingComponent,
    RolemenuDashComponent,
    UserrolemappingComponent,
    UserRoleMappingdashComponent,
    AdminSiderevenueComponent,
    LinkForregComponent,
    LinkforregdashComponent,
    VoiladocRegisteredUsersComponent,
    ApprovedUsersComponent,
    RejectedusersComponent,
    HomeCareAppointmentsComponent,
    HomecareAppdashComponent,
    IndependentSubscriptionsComponent,
    IndependentsubdashComponent,
    CancelationTimingsComponent,
    NurseCancelledAppComponent,
    CancelledmidwifeAppsComponent,
    CancelledPhysioappointmentsComponent,
    AllCancelledAppointmentsComponent,
    MyTeamComponent,
    MyTeamDashboardComponent,
    ReceptionistLoginDashboardComponent,
    ReceptionistLoginComponent,
    NewAppointmentComponent,
    DiagnosticAppointmentDashboardComponent,
    NewBillingComponent,
    SentInvoicesComponent,
    PaidInvoicesComponent,
    DiagfnosticCalenderComponent,
    BillingDashboardComponent,
    NewPaymentLinkComponent,
    PaymentLinkDashboardComponent,
    UserPlanningComponent,
    PharmacySupportComponent,
    PharmacySupportDashComponent,
    DiagnosticSupportComponent,
    DiagnosticSupportDashComponent,
    RefundSupportComponent,
    RefundCompletedTicketsComponent,
    AllDiagnosticCalenderComponent,
    MeridionalSupportComponent,
    DiagnosticPatientsComponent,
    FaqComponent,
    FaqDashComponent,
    FAQuestionsComponent,
    AddQuickGuideComponent,
    QuickGuideDashComponent,
    EditQuickGuideComponent,
    TopicMasterComponent,
    TopicMasterDashComponent,
    EnableLocalDoctorComponent,
    QuickguideComponent,
    DocChangePwdComponent,
    NurseChangePwdComponent,
    ChangeMidPwdComponent,
    ChangePhysiopwdComponent,
    ChangePhaPwdComponent,
    ChangediaPwdComponent,
    HosrecpChangepwdComponent,
    ChangeDeliveryPwdComponent,
    ChangeDiaRecpPwdComponent,
    IndRecpComponent,
    IndRecpdashComponent,
    DocRecpAppointmentsComponent,
    IndBookAppointmentComponent,
    IndDocPaymentsComponent,
    DatecheckComponent,
    PatientInvitesDashComponent,
    InvitationMasterComponent,
    InvitationDashComponent,
    ProviderpayComponent,
    ForgotPasswordComponent,
    HomedeliveryFeesComponent,
    PharmacyReportComponent,
    DiagnosticHomeReportComponent,
    PharmacyChargesReportComponent,
    DiaChargesReportComponent,
    DiaPharmaPayComponent,
    NpmEmrComponent,
    NurseEmrComponent,
    PatientPdfsComponent,
    PatientPdfComponent,
    DeliveryRevenueComponent,
    DeliveryPatnerReportsComponent,
    PatientsregComponent,
    NoshowAppointmentsComponent,
    AllAdminReportsComponent,
    PatientInviteReportComponent,
    PatientRecordsComponent,
    AdminReportsComponent,
    AllProviderPaymentsComponent,
    ResolvedPatientTicketsComponent,
    PatientEscalatesTicketsComponent,
    PaidReportsComponent,
    NurseServicesComponent,
    NurseServicesDashComponent,
    PhysioServicesComponent,
    PhysioServicesDashComponent,
    MidwifeservicesComponent,
    MidwifeservicesdashComponent,
    HomedeliverMasterComponent,
    LoaderComponent,
    CreateFoldersComponent,
    FoldersDashComponent,
    MyFilesComponent,
    SubFolderFilesComponent,
    MysubfolderfilesComponent,
    SidebarTestComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DropzoneModule,
    FormsModule,
    NgxDropzoneModule,
    Ng2SearchPipeModule,
    NgbModule,
    NgxSpinnerModule,
    ChartsModule,
    NgDateRangePickerModule,
    ArchwizardModule,
    NgxFullCalendarModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    [BrowserModule, NgxPaginationModule],
    CKEditorModule,
    NgxTagsInputModule,
    // UserIdleModule.forRoot({idle: 60, timeout: 60, ping: 120}),
    // TranslatorModule.forRoot({
    //   providedLanguages: ['en', 'fr'],
    //   defaultLanguage: 'en'
    // })
  ],
//   providers: [{provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true}],
//   bootstrap: [AppComponent]
// })

  exports: [ChartsModule],
  providers: [DatePipe, {
    provide: DROPZONE_CONFIG,
    useValue: DEFAULT_DROPZONE_CONFIG,
  },{provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }