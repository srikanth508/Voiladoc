import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxFullCalendarModule } from 'ngx-fullcalendar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
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
import { HospitalservicesComponent } from './pages/Map Services/hospitalservices/hospitalservices.component';
import { DoctorservicesComponent } from './pages/Map Services/doctorservices/doctorservices.component';
import { DiagnostictestComponent } from './pages/Map Services/diagnostictest/diagnostictest.component';
import { DiagnosticpackageComponent } from './pages/Map Services/diagnosticpackage/diagnosticpackage.component';
import { AddcampComponent } from './pages/Camp/addcamp/addcamp.component';
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
import { MychatsComponent } from './pages/Doctor/mychats/mychats.component';
import { MyfeedbacksComponent } from './pages/Doctor/myfeedbacks/myfeedbacks.component';
import { ProfilesComponent } from './pages/Diagnostic Center/profiles/profiles.component';
import { OrdersComponent } from './pages/Diagnostic Center/orders/orders.component';
import { OffersComponent } from './pages/Diagnostic Center/offers/offers.component';
import { PharmacyprofileComponent } from './pages/Pharmacy/pharmacyprofile/pharmacyprofile.component';
import { PharmacyordersComponent } from './pages/Pharmacy/pharmacyorders/pharmacyorders.component';
import { PharmacyoffersComponent } from './pages/Pharmacy/pharmacyoffers/pharmacyoffers.component';
import { WritearticleComponent } from './pages/Doctor/writearticle/writearticle.component';
import { OffersdashComponent } from './pages/Diagnostic Center/offersdash/offersdash.component';
import { OffersDashboardComponent } from './pages/Pharmacy/offers-dashboard/offers-dashboard.component';
import { CampDashComponent } from './pages/Camp/camp-dash/camp-dash.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditHospitalClinicComponent } from './pages/Registration/edit-hospital-clinic/edit-hospital-clinic.component';
import { EditDoctorRegistrationComponent } from './pages/Registration/edit-doctor-registration/edit-doctor-registration.component';
import { EditDiagnosticRegistrationComponent } from './pages/Registration/edit-diagnostic-registration/edit-diagnostic-registration.component';
import { EditPharmacyRegComponent } from './pages/Registration/edit-pharmacy-reg/edit-pharmacy-reg.component';
import { HospitalServicesDashComponent } from './pages/Map Services/hospital-services-dash/hospital-services-dash.component';
import { DoctorServicesDashComponent } from './pages/Map Services/doctor-services-dash/doctor-services-dash.component';
import { DiagnosticTestDashComponent } from './pages/Map Services/diagnostic-test-dash/diagnostic-test-dash.component';
import { DiagnosticPackageDashComponent } from './pages/Map Services/diagnostic-package-dash/diagnostic-package-dash.component';
import { EditCampComponent } from './pages/Camp/edit-camp/edit-camp.component';
import { VediocallComponent } from './pages/Doctor/vediocall/vediocall.component';
import { PublisherComponent } from './pages/Doctor/publisher/publisher.component';
import { SubscriberComponent } from './pages/Doctor/subscriber/subscriber.component';
import { PatientChatComponent } from './pages/Doctor/patient-chat/patient-chat.component';
import { SoapdashComponent } from './pages/Doctor/soapdash/soapdash.component';
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
import { MedicalPatientHistoryComponent } from './pages/Doctor/medical-patient-history/medical-patient-history.component';
import { NewPatientHistoryComponent } from './pages/Doctor/new-patient-history/new-patient-history.component';
import { OnDemandVideoComponent } from './pages/Doctor/on-demand-video/on-demand-video.component';
import { NgDateRangePickerModule } from 'ng-daterangepicker';
import { PharmacyReportsComponent } from './pages/Pharmacy/pharmacy-reports/pharmacy-reports.component';
import { DiagnosticReportsComponent } from './pages/Diagnostic Center/diagnostic-reports/diagnostic-reports.component';
import { NurseReportsComponent } from './pages/Nurse/nurse-reports/nurse-reports.component';
import { PhysiotherapistReportsComponent } from './pages/physiotherapist/physiotherapist-reports/physiotherapist-reports.component';
import { MideWifeReportsComponent } from './pages/Midewife/mide-wife-reports/mide-wife-reports.component';
import { NurseTimingsComponent } from './pages/Nurse/nurse-timings/nurse-timings.component';
import { PhysiotherapistTimingsComponent } from './pages/physiotherapist/physiotherapist-timings/physiotherapist-timings.component';
import { MidWifeTimingsComponent } from './pages/Midewife/mid-wife-timings/mid-wife-timings.component';
import { MyWorkingDetailsComponent } from './pages/Doctor/my-working-details/my-working-details.component';
import { SickSlipGeneratorComponent } from './pages/Doctor/sick-slip-generator/sick-slip-generator.component';
import { SickSlipDashboardComponent } from './pages/Doctor/sick-slip-dashboard/sick-slip-dashboard.component';
import { DoctorPrescriptionComponent } from './pages/Pharmacy/doctor-prescription/doctor-prescription.component';
import { PrescriptionReportsComponent } from './pages/Pharmacy/prescription-reports/prescription-reports.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PreviousVideosComponent } from './pages/Doctor/previous-videos/previous-videos.component';
import { DatePipe } from '@angular/common';
import { LanguageCheckComponent } from './pages/Hospital/language-check/language-check.component';
import { TranslatorModule } from 'angular-translator';
import { PharmacyChatComponent } from './pages/Pharmacy/pharmacy-chat/pharmacy-chat.component';
import { PhaPatientChatComponent } from './pages/Pharmacy/pha-patient-chat/pha-patient-chat.component';
import { NurseChatComponent } from './pages/Nurse/nurse-chat/nurse-chat.component';
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
import { DoctorFeesComponent } from './pages/DoctorFees/doctor-fees/doctor-fees.component';
import { DoctorFeeDashComponent } from './pages/DoctorFees/doctor-fee-dash/doctor-fee-dash.component';
import { LocalDoctorRegistrationComponent } from './pages/Registration/local-doctor-registration/local-doctor-registration.component';
import { LocalDocDashComponent } from './pages/Registration/local-doc-dash/local-doc-dash.component';
import { MyPatientPrescriptionsComponent } from './pages/LocalDoctor/my-patient-prescriptions/my-patient-prescriptions.component';
import { MyProfilesComponent } from './pages/LocalDoctor/my-profiles/my-profiles.component';
import { AnnounsementsComponent } from './pages/Announsements/announsements/announsements.component';
import { AnnounseDashComponent } from './pages/Announsements/announse-dash/announse-dash.component';
import { TreatmentMasterComponent } from './pages/Masters/treatment-master/treatment-master.component';
import { TreatmentDashComponent } from './pages/Masters/treatment-dash/treatment-dash.component';
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
import { SalesDashComponent } from './pages/Sales/sales-dash/sales-dash.component';
import { AddUserComponent } from './pages/Sales/add-user/add-user.component';
import { EnableLocalDoctorComponent } from './pages/Masters/enable-local-doctor/enable-local-doctor.component';
import { FaqComponent } from './pages/FAQ/faq/faq.component';
import { DocAppReportsComponent } from './pages/AdminDashboard/doc-app-reports/doc-app-reports.component';
import { NurseAdminReportsComponent } from './pages/AdminDashboard/nurse-admin-reports/nurse-admin-reports.component';
import { MidWifeAdminReportsComponent } from './pages/AdminDashboard/mid-wife-admin-reports/mid-wife-admin-reports.component';
import { PhysioreportsComponent } from './pages/AdminDashboard/physioreports/physioreports.component';
import { HowToUseComponent } from './pages/FAQ/how-to-use/how-to-use.component';
import { HowtousedashComponent } from './pages/FAQ/howtousedash/howtousedash.component';
import { FrequentlyaskedComponent } from './pages/FAQ/frequentlyasked/frequentlyasked.component';
import { FrequentlyDashComponent } from './pages/FAQ/frequently-dash/frequently-dash.component';
import { DoctorTipsComponent } from './pages/FAQ/doctor-tips/doctor-tips.component';
import { DocTipsDashComponent } from './pages/FAQ/doc-tips-dash/doc-tips-dash.component';
import { ClinicDashComponent } from './pages/Registration/clinic-dash/clinic-dash.component';
import { HowToUseVoilaDOcComponent } from './pages/FAQ/how-to-use-voila-doc/how-to-use-voila-doc.component';
import { DoctorTipsAndTricksComponent } from './pages/FAQ/doctor-tips-and-tricks/doctor-tips-and-tricks.component';
import { PatientChartsComponent } from './pages/patient-charts/patient-charts.component';
import { DiagnosticSlotsDashComponent } from './pages/Registration/diagnostic-slots-dash/diagnostic-slots-dash.component';
import { HowToUseDocDashComponent } from './pages/FAQ/how-to-use-doc-dash/how-to-use-doc-dash.component';
import { HowToUseDocComponent } from './pages/FAQ/how-to-use-doc/how-to-use-doc.component';
import { HowToUseDoctorsComponent } from './pages/FAQ/how-to-use-doctors/how-to-use-doctors.component';
import { FrequentlyAskedQuestionsComponent } from './pages/FAQ/frequently-asked-questions/frequently-asked-questions.component';
import { ReferredDoctorComponent } from './pages/Doctor/referred-doctor/referred-doctor.component';
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
import { MyFeesComponent } from './pages/Doctor/my-fees/my-fees.component';
import { EditMyfeesComponent } from './pages/Doctor/edit-myfees/edit-myfees.component';
import { AddMyFeesComponent } from './pages/Doctor/add-my-fees/add-my-fees.component';
import { DocCalenderComponent } from './pages/Doctor/doc-calender/doc-calender.component';
import { DoctorsCalenderComponent } from './pages/Hospital/doctors-calender/doctors-calender.component';
import { ReturnOrdersComponent } from './pages/DeliveryPartner/return-orders/return-orders.component';
import { ReturnOrdersReportComponent } from './pages/DeliveryPartner/return-orders-report/return-orders-report.component';
import { AddMyWorkingDetailsComponent } from './pages/Doctor/add-my-working-details/add-my-working-details.component';
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
import { DocResolvedTicketsComponent } from './pages/Doctor/doc-resolved-tickets/doc-resolved-tickets.component';
import { NurseResolvedTicketsComponent } from './pages/Nurse/nurse-resolved-tickets/nurse-resolved-tickets.component';
import { PhysioCompletedTicketsComponent } from './pages/physiotherapist/physio-completed-tickets/physio-completed-tickets.component';
import { MidwifeCompletedTicketsComponent } from './pages/Midewife/midwife-completed-tickets/midwife-completed-tickets.component';
import { HospitalCompletedTicketsComponent } from './pages/Hospital/hospital-completed-tickets/hospital-completed-tickets.component';
import { RecpSupportCompletedComponent } from './pages/Hospital/recp-support-completed/recp-support-completed.component';
import { SupportCometedTicketsComponent } from './pages/Support/support-cometed-tickets/support-cometed-tickets.component';
import { DoctorNotificationsComponent } from './pages/Doctor/doctor-notifications/doctor-notifications.component';
import { NurseNotificationsComponent } from './pages/Nurse/nurse-notifications/nurse-notifications.component';
import { MidwifenotificationsComponent } from './pages/Midewife/midwifenotifications/midwifenotifications.component';
import { PhysioNotificationComponent } from './pages/physiotherapist/physio-notification/physio-notification.component';



const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {

  url: 'http://14.192.17.225/RMSAPI/Master/UploadZIP/',
  maxFilesize: 50,
};

const DEFAULT_VAMSI_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'http://14.192.17.225/RMSAPI/Master/UploadZIP/',
  maxFilesize: 50,
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
    HospitalservicesComponent,
    DoctorservicesComponent,
    DiagnostictestComponent,
    DiagnosticpackageComponent,
    DiagnosticComponent,
    AddcampComponent,
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
    MychatsComponent,
    MyfeedbacksComponent,
    ProfilesComponent,
    OrdersComponent,
    OffersComponent,
    PharmacyprofileComponent,
    PharmacyordersComponent,
    PharmacyoffersComponent,
    WritearticleComponent,
    OffersdashComponent,
    OffersDashboardComponent,
    CampDashComponent,
    EditHospitalClinicComponent,
    EditDoctorRegistrationComponent,
    EditDiagnosticRegistrationComponent,
    EditPharmacyRegComponent,
    HospitalServicesDashComponent,
    DoctorServicesDashComponent,
    DiagnosticTestDashComponent,
    DiagnosticPackageDashComponent,
    EditCampComponent,
    VediocallComponent,
    PublisherComponent,
    SubscriberComponent,
    PatientChatComponent,
    SoapdashComponent,
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
    MedicalPatientHistoryComponent,
    NewPatientHistoryComponent,
    OnDemandVideoComponent,
    PharmacyReportsComponent,
    DiagnosticReportsComponent,
    NurseReportsComponent,
    PhysiotherapistReportsComponent,
    MideWifeReportsComponent,
    NurseTimingsComponent,
    PhysiotherapistTimingsComponent,
    MidWifeTimingsComponent,
    MyWorkingDetailsComponent,
    SickSlipGeneratorComponent,
    SickSlipDashboardComponent,
    DoctorPrescriptionComponent,
    PrescriptionReportsComponent,
    PreviousVideosComponent,
    LanguageCheckComponent,
    PharmacyChatComponent,
    PhaPatientChatComponent,
    NurseChatComponent,
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
    DoctorFeesComponent,
    DoctorFeeDashComponent,
    LocalDoctorRegistrationComponent,
    LocalDocDashComponent,
    MyPatientPrescriptionsComponent,
    MyProfilesComponent,
    AnnounsementsComponent,
    AnnounseDashComponent,
    TreatmentMasterComponent,
    TreatmentDashComponent,
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
    SalesDashComponent,
    AddUserComponent,
    EnableLocalDoctorComponent,
    FaqComponent,
    DocAppReportsComponent,
    NurseAdminReportsComponent,
    MidWifeAdminReportsComponent,
    PhysioreportsComponent,
    HowToUseComponent,
    HowtousedashComponent,
    FrequentlyaskedComponent,
    FrequentlyDashComponent,
    DoctorTipsComponent,
    DocTipsDashComponent,
    ClinicDashComponent,
    HowToUseVoilaDOcComponent,
    DoctorTipsAndTricksComponent,
    PatientChartsComponent,
    DiagnosticSlotsDashComponent,
    HowToUseDocDashComponent,
    HowToUseDocComponent,
    HowToUseDoctorsComponent,
    FrequentlyAskedQuestionsComponent,
    ReferredDoctorComponent,
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
    MyFeesComponent,
    EditMyfeesComponent,
    AddMyFeesComponent,
    DocCalenderComponent,
    DoctorsCalenderComponent,
    ReturnOrdersComponent,
    ReturnOrdersReportComponent,
    AddMyWorkingDetailsComponent,
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
    DocResolvedTicketsComponent,
    NurseResolvedTicketsComponent,
    PhysioCompletedTicketsComponent,
    MidwifeCompletedTicketsComponent,
    HospitalCompletedTicketsComponent,
    RecpSupportCompletedComponent,
    SupportCometedTicketsComponent,
    DoctorNotificationsComponent,
    NurseNotificationsComponent,
    MidwifenotificationsComponent,
    PhysioNotificationComponent
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

    TranslatorModule.forRoot({
      providedLanguages: ['en', 'fr'],
      defaultLanguage: 'en'
    })
  ],
  exports: [ChartsModule],
  providers: [DatePipe, {
    provide: DROPZONE_CONFIG,
    useValue: DEFAULT_DROPZONE_CONFIG,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }