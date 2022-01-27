import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipeDef } from '@angular/core/src/view';

@Injectable({
  providedIn: 'root'

})

export class HelloDoctorService {
  //live
  public host = "https://maroc.voiladoc.org/MarocAPI";

  private host1 = "https://maroc.voiladoc.org/MarocAPI";



  //test1

  //public host = "https://madagascar.voiladoc.org/MadagascarWebAPI";

  //private host1 = "https://madagascar.voiladoc.org/MadagascarWebAPI";


  private host2 = "https://voiladoc.org/VoiladocRegistrationsWebApi";



  private url: string = '';
  public showvid = 0;
  public videopage = 0;
  constructor(private http: HttpClient) { }

  // public SendMail(data) {
  //   this.
  //   this.url = 'http://14.192.17.225/QMSUATAPI/Master/sendemail/';
  //   // this.url = this.host + '/Doctor/sendemail/';
  //   return this.http.post(this.url, data)
  // }

  public SendMail(data) {
    let url = "14.192.17.225/AmazeIncAPI/Website/SendMail";
    return this.http.post(url, data)
  }
  public GetCountrySwitchByCountryID(cid) {

    return this.http.get<any[]>(
      this.host1 + "/Doctor/GetCountrySwitchByCountryID?CountryID=" + cid
    );
  }
  public GetPharmacyForAdmin() {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetPharmacyForAdmin');
  }
  public GetDiagnosticForAdmin() {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticForAdmin');
  }
  public GetDoctorForAdmin() {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorForAdmin');
  }
  public GetHospital_ClinicForAdmin() {

    return this.http.get<any[]>(this.host + '/Hospital/GetDiagnosticLoginForDash');
  }
  public GetDoctorLoginForDash(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorLoginForDash?LanguageID=' + lid);
  }

  public ProductsPage_Labels(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/ProductsPage_Labels?LanguageID=' + lid);
  }
  public GetHospital_ClinicLoginForDash(lid) {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospital_ClinicLoginForDash?LanguageID=' + lid);
  }
  public GetDiagnosticLoginForDash(lid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticLoginForDash?LanguageID=' + lid);
  }
  public GetPharmacyLoginForDash(lid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetPharmacyLoginForDash?LanguageID=' + lid);
  }
  public GetSponsoredHospitalsForAdmin() {

    return this.http.get<any[]>(this.host + '/Hospital/GetSponsoredHospitalsForAdmin');
  }
  public GetSponsoredDiagnosticCenterForAdmin() {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetSponsoredDiagnosticCenterForAdmin');
  }
  public GetSponsoredPharmacyForAdmin() {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetSponsoredPharmacyForAdmin');
  }
  public InsertPharmacyRegistration(data) {
    this.url = this.host + '/Pharmacy/InsertPharmacyRegistration';
    return this.http.post(this.url, data)
  }
  public GetCityMaster() {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetCityMaster');
  }
  public GetDoctorList() {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorList');
  }
  public InsertDoctorLogin(data) {
    this.url = this.host + '/Doctor/InsertDoctorLogin';
    return this.http.post(this.url, data)
  }
  public InsertHospitalClinicAdminRegistration(data) {
    this.url = this.host + '/Hospital/InsertHospitalClinicAdminRegistration';
    return this.http.post(this.url, data)
  }
  public GetDiagnosticCenterList() {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticCenterList');
  }
  public InsertDiagnosticCenterAdminRegistration(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterAdminRegistration';
    return this.http.post(this.url, data)
  }
  public InsertPharmacyAdminRegistration(data) {
    this.url = this.host + '/Pharmacy/InsertPharmacyAdminRegistration';
    return this.http.post(this.url, data)
  }
  public InsertSponsoredHospitals(data) {
    this.url = this.host + '/Hospital/InsertSponsoredHospitals';
    return this.http.post(this.url, data)
  }
  public InsertSponsoredDiagnosticCenter(data) {
    this.url = this.host + '/Diagnostic/InsertSponsoredDiagnosticCenter';
    return this.http.post(this.url, data)
  }
  public InsertSponsoredPharmacy(data) {
    this.url = this.host + '/Pharmacy/InsertSponsoredPharmacy';
    return this.http.post(this.url, data)
  }
  public InsertHospital_ClinicCamp(data) {
    this.url = this.host + '/Hospital/InsertHospital_ClinicCamp';
    return this.http.post(this.url, data)
  }
  public InsertHospitalClinicDetailsMaster(data) {
    this.url = this.host + '/Hospital/InsertHospitalClinicDetailsMaster';
    return this.http.post(this.url, data)
  }
  public InsertDiagnosticCenterRegistration(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterRegistration';
    return this.http.post(this.url, data)
  }
  public GetRoleTypesMaster() {

    return this.http.get<any[]>(this.host + '/Doctor/GetRoleTypesMaster');
  }
  public GetSalesRegistrationLogin(uname, pwd, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetSalesRegistrationLogin?UserName=' + uname + '&Password=' + pwd + '&LanguageID=' + lid);
  }
  public GetDoctorLogin(uname, pwd, lid, pinno) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDoctorLogin?UserName=' + uname + '&Password=' + pwd + '&LanguageID=' + lid + '&Pinno=' + pinno);
  }
  public GetHospitalAdminRegistrationLogin(uname, pwd, lid, pinno) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetHospitalAdminRegistrationLogin?UserName=' + uname + '&Password=' + pwd + '&LanguageID=' + lid + '&Pinno=' + pinno);
  }
  public GetDiagnosticCenterAdminRegistrationLogin(uname, pwd, lid, pinno) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDiagnosticCenterAdminRegistrationLogin?UserName=' + uname + '&Password=' + pwd + '&LanguageID=' + lid + '&Pinno=' + pinno);
  }
  public GetPharmacyAdminRegistrationLogin(uname, pwd, lid, pinno) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetPharmacyAdminRegistrationLogin?UserName=' + uname + '&Password=' + pwd + '&LanguageID=' + lid + '&Pinno=' + pinno);
  }

  public DeleteHospital_Clinic(id) {

    return this.http.get<any[]>(this.host + '/Hospital/DeleteHospital_Clinic?ID=' + id);
  }
  public DeleteDoctorRegistration(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteDoctorRegistration?ID=' + id);
  }
  public DeleteDiagnosticCenter(id) {

    return this.http.get<any[]>(this.host + '/Diagnostic/DeleteDiagnosticCenter?ID=' + id);
  }
  public DeletePharmacy(id) {

    return this.http.get<any[]>(this.host + '/Pharmacy/DeletePharmacy?ID=' + id);
  }
  public EnableDoctorLogin(docid) {

    return this.http.get<any[]>(this.host + '/Doctor/EnableDoctorLogin?DoctorID=' + docid);
  }
  public EnableHospital_ClinicLogin(hosid) {

    return this.http.get<any[]>(this.host + '/Hospital/EnableHospital_ClinicLogin?Hospital_ClinicID=' + hosid);
  }
  public DisableHospital_ClinicLogin(hosid) {

    return this.http.get<any[]>(this.host + '/Hospital/DisableHospital_ClinicLogin?Hospital_ClinicID=' + hosid);
  }
  public DisableSponsoredHospitals(hosid) {

    return this.http.get<any[]>(this.host + '/Hospital/DisableSponsoredHospitals?Hospital_ClinicID=' + hosid);
  }
  public EnableSponsoredHospitals(hosid) {

    return this.http.get<any[]>(this.host + '/Hospital/EnableSponsoredHospitals?Hospital_ClinicID=' + hosid);
  }
  public EnableSponsoredDiagnosticCenter(id) {

    return this.http.get<any[]>(this.host + '/Diagnostic/EnableSponsoredDiagnosticCenter?DiagnosticID=' + id);
  }
  public DisableSponsoredDiagnosticCenter(id) {

    return this.http.get<any[]>(this.host + '/Diagnostic/DisableSponsoredDiagnosticCenter?DiagnosticID=' + id);
  }
  public EnableSponsoredPharmacy(id) {

    return this.http.get<any[]>(this.host + '/Pharmacy/EnableSponsoredPharmacy?PharmacyID=' + id);
  }
  public DisableSponsoredPharmacy(id) {

    return this.http.get<any[]>(this.host + '/Pharmacy/DisableSponsoredPharmacy?PharmacyID=' + id);
  }
  public DisableDoctorLogin(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DisableDoctorLogin?DoctorID=' + id);
  }
  public EnablePharmacyLogin(id) {

    return this.http.get<any[]>(this.host + '/Pharmacy/EnablePharmacyLogin?PharmacyID=' + id);
  }
  public DisablePharmacyLogin(id) {

    return this.http.get<any[]>(this.host + '/Pharmacy/DisablePharmacyLogin?PharmacyID=' + id);
  }
  public DisableDiagnosticLogin(id) {

    return this.http.get<any[]>(this.host + '/Diagnostic/DisableDiagnosticLogin?DiagnosticCenterID=' + id);
  }
  public EnableDiagnosticLogin(id) {

    return this.http.get<any[]>(this.host + '/Diagnostic/EnableDiagnosticLogin?DiagnosticCenterID=' + id);
  }
  public GetDoctorDetailsForAdmin(doctorid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorDetailsForAdmin?DoctorID=' + doctorid);
  }
  public GetDepartmentMaster() {

    return this.http.get<any[]>(this.host + '/Doctor/GetDepartmentMaster');
  }
  public GetDepartmentMaster_French() {

    return this.http.get<any[]>(this.host + '/Doctor/GetDepartmentMaster_French');
  }

  public UpdateDoctorPersonelInfo(data) {
    this.url = this.host + '/Doctor/UpdateDoctorPersonelInfo';
    return this.http.post(this.url, data)
  }
  public UpdateDoctorMedicalRegistration(data) {
    this.url = this.host + '/Doctor/UpdateDoctorMedicalRegistration';
    return this.http.post(this.url, data)
  }
  public GetDegreeMaster() {

    return this.http.get<any[]>(this.host + '/Doctor/GetDegreeMaster');
  }
  public UpdateDoctorEducationAdmin(data) {
    this.url = this.host + '/Doctor/UpdateDoctorEducationAdmin';
    return this.http.post(this.url, data)
  }
  public GetBookAppointmentByDoctorID(doctorid, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointmentByDoctorID?DoctorID=' + doctorid + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }
  public GetHospital_ClinicDetailsForAdmin(id) {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospital_ClinicDetailsForAdmin?Hospital_ClinicID=' + id);
  }
  public UpdateHospitalClinicProfile(data) {
    this.url = this.host + '/Hospital/UpdateHospitalClinicProfile';
    return this.http.post(this.url, data)
  }
  public GetBookAppointmentByHospital_ClinicID(hospitalid, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetBookAppointmentByHospital_ClinicID?Hospital_ClinicID=' + hospitalid + '&Sdate=' + sdate + '&Edate=' + edate + '&LanguageID=' + lid);
  }
  public GetHospital_ClinicFeedback(hospitalid, sdate, edate) {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospital_ClinicFeedback?Hospital_ClinicID=' + hospitalid + '&Sdate=' + sdate + '&Edate=' + edate);
  }
  public GetHospitalDoctorsForAdmin(hospitalid, lid) {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospitalDoctorsForAdmin?Hospital_ClinicID=' + hospitalid + '&LanguageID=' + lid);
  }
  public GetPhamacyDetailsForAdmin(pharmacyid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetPhamacyDetailsForAdmin?PharmacyID=' + pharmacyid);
  }
  public UpdatePharmacyProfile(data) {
    this.url = this.host + '/Pharmacy/UpdatePharmacyProfile';
    return this.http.post(this.url, data)
  }
  public GetMedicineOrderDetailsByPharmacyID(pharmacyid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetMedicineOrderDetailsByPharmacyID?PharmacyID=' + pharmacyid);
  }
  public GetPharmacyOfferByPharmacyID(pharmacyid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetPharmacyOfferByPharmacyID?PharmacyID=' + pharmacyid);
  }
  public InsertPharmacyOffers(data) {
    this.url = this.host + '/Pharmacy/InsertPharmacyOffers';
    return this.http.post(this.url, data)
  }
  public InsertPharmacyOfferPhotos(data) {
    this.url = this.host + '/Pharmacy/InsertPharmacyOfferPhotos';
    return this.http.post(this.url, data)
  }
  public AttachmentsUpload(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Pharmacy/PharmacyOfferPhoto/', formdata);
  }
  public GetDiagnosticDetailsForAdmin(diagnosticid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticDetailsForAdmin?DiagnosticID=' + diagnosticid);
  }
  public UpdateDiagnosticCenterProfile(data) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticCenterProfile';
    return this.http.post(this.url, data)
  }
  public GetDiagnosticOfferByDiagnosticID(diagnosticid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticOfferByDiagnosticID?DiagnosticCenterID=' + diagnosticid);
  }
  public InsertDiagnosticCenterOffers(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterOffers';
    return this.http.post(this.url, data)
  }
  public InsertDiagnosticCenterOfferPhotos(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterOfferPhotos';
    return this.http.post(this.url, data)
  }
  public DiagnosticPhotosUpload(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Diagnostic/DiagnosticOfferPhoto/', formdata);
  }
  public GetDiagnosticTestMaster() {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticTestMaster');
  }
  public GetHospital_ClinicCamp() {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospital_ClinicCamp');
  }
  public InsertPharmacyPhotos(data) {
    this.url = this.host + '/Pharmacy/InsertPharmacyPhotos';
    return this.http.post(this.url, data)
  }


  public pharmacyphoto(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Pharmacy/PharmacyPhotoUpload/', formdata);
  }
  public InsertHospital_ClinicPhotos(data) {
    this.url = this.host + '/Hospital/InsertHospital_ClinicPhotos';
    return this.http.post(this.url, data)
  }
  public InsertHospital_ClinicVideos(data) {
    this.url = this.host + '/Hospital/InsertHospital_ClinicVideos';
    return this.http.post(this.url, data)
  }
  public HospitalClinicPhotos(files) {

    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);

    }
    return this.http.post(this.host + '/Hospital/HospitalPhotoUpload/', formdata);
  }


  public HospitalClinicVideos(files) {

    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Hospital/HospitalClinicVideos/', formdata);
  }
  public GetFacilitiesMaster() {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetFacilitiesMaster');
  }
  public InsertHospital_ClinicFacilities(data) {
    this.url = this.host + '/Hospital/InsertHospital_ClinicFacilities';
    return this.http.post(this.url, data)
  }
  public GetInsuranceMaster() {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetInsuranceMaster');
  }
  public InsertHospital_ClinicInsurance(data) {
    this.url = this.host + '/Hospital/InsertHospital_ClinicInsurance';
    return this.http.post(this.url, data)
  }
  public InsertDiagnosticCenterInsurances(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterInsurances';
    return this.http.post(this.url, data)
  }
  public InsertInsertDiagnosticCenterPhotos(data) {
    this.url = this.host + '/Diagnostic/InsertInsertDiagnosticCenterPhotos';
    return this.http.post(this.url, data)
  }
  public DiagnosticPhotos(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Diagnostic/DiagnosticPhotoUpload/', formdata);
  }
  public GetSpecializationMaster() {

    return this.http.get<any[]>(this.host + '/SpecializationMaster/GetSpecializationMaster');
  }
  public InsertDoctorIdentityProofs(data) {
    this.url = this.host + '/Doctor/InsertDoctorIdentityProofs';
    return this.http.post(this.url, data)
  }
  public DoctorIdentityProof(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Doctor/IdentityUpload/', formdata);
  }


  public DoctorsPersonalUploads(files, foldername) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      debugger
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Doctor/DoctorsPersonalUploads?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }

  public DoctorSignatureUpload(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Doctor/DoctorSignatureUpload/', formdata);
  }
  public DoctorPhotoUpload(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Doctor/PhotoUpload/', formdata);
  }
  public DoctorMedicalProof(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Doctor/MedicalProofUpload/', formdata);
  }
  public InsertDoctorMedicalProofs(data) {
    this.url = this.host + '/Doctor/InsertDoctorMedicalProofs';
    return this.http.post(this.url, data)
  }
  public InsertDoctorSpecialization(data) {
    this.url = this.host + '/Doctor/InsertDoctorSpecialization';
    return this.http.post(this.url, data)
  }
  public InsertDoctorRegistration(data) {
    this.url = this.host + '/Doctor/InsertDoctorRegistration';
    return this.http.post(this.url, data)
  }
  public InsertDoctorMedicalRegistration(data) {
    this.url = this.host + '/Doctor/InsertDoctorMedicalRegistration';
    return this.http.post(this.url, data)
  }
  public InsertDoctorEducation(data) {
    this.url = this.host + '/Doctor/InsertDoctorEducation';
    return this.http.post(this.url, data)
  }
  public InsertDoctorExperience(data) {
    this.url = this.host + '/Doctor/InsertDoctorExperience';
    return this.http.post(this.url, data)
  }
  public InsertDoctorMembership(data) {
    this.url = this.host + '/Doctor/InsertDoctorMembership';
    return this.http.post(this.url, data)
  }
  public GetHospital() {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetHospital');
  }
  public GetServiceMaster() {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetServiceMaster');
  }
  public InsertHospitalClinicServices(data) {
    this.url = this.host + '/Hospital/InsertHospitalClinicServices';
    return this.http.post(this.url, data)
  }
  public InsertDoctorServices(data) {
    this.url = this.host + '/Doctor/InsertDoctorServices';
    return this.http.post(this.url, data)
  }
  public InsertDiagnosticCenterTests(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterTests';
    return this.http.post(this.url, data)
  }
  public GetDiagnosticCenterDetailsByID(id) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticCenterDetailsByID?ID=' + id);
  }
  public InsertDiagnosticCenterPackages(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterPackages';
    return this.http.post(this.url, data)
  }
  public InsertDiagnosticPackageRelatedTests(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticPackageRelatedTests';
    return this.http.post(this.url, data)
  }
  public DeleteDiagnosticOffer(id) {

    return this.http.get<any[]>(this.host + '/Diagnostic/DeleteDiagnosticOffer?OfferID=' + id);
  }
  public DeletePharmacyOffer(id) {

    return this.http.get<any[]>(this.host + '/Pharmacy/DeletePharmacyOffer?OfferID=' + id);
  }
  public GetDoctorFeedById(docid, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorFeedById?DoctorID=' + docid + '&LanguageID=' + lid);
  }
  public GetArticleCategory(lid) {

    return this.http.get<any[]>(this.host + '/Articles/GetArticleCategory?LanguageID=' + lid);
  }
  public ArticlePhoto(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Articles/ArticlePhotoUpload/', formdata);
  }
  public InsertArticle(data) {
    this.url = this.host + '/Articles/InsertArticle';
    return this.http.post(this.url, data)
  }

  public UpdateArticle(data) {
    this.url = this.host + '/Articles/UpdateArticle';
    return this.http.post(this.url, data)
  }


  public GetArticleForAdminByDocID(lid) {

    return this.http.get<any[]>(this.host + '/Articles/GetArticleForAdminByDocID?DoctorID=' + lid);
  }
  public DeleteDoctorHospitalDetails(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteDoctorHospitalDetails?ID=' + id);
  }
  public GetDiagnosticCenterTests(lid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticCenterTests?DiagnosticCenterID=' + lid);
  }
  public GetAvailabilityMaster(lid) {

    return this.http.get<any[]>(this.host + '/Hospital/GetAvailabilityMaster?Hospital_ClinicMasterID=' + lid);
  }
  public GetDaysMasterDetails() {

    return this.http.get<any[]>(this.host + '/Doctor/GetDaysMasterDetails');
  }
  public GetAllHospital_ClinicListByID(hosiptalid) {

    return this.http.get<any[]>(this.host + '/Hospital/GetAllHospital_ClinicListByID?Hospital_ClinicID=' + hosiptalid);
  }
  public GetSlotsMasterByID(timedivisonid, slottypeid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSlotsMasterByID?TimeDivisionID=' + timedivisonid + '&SlotTypeID=' + slottypeid);
  }
  public InsertDoctorHospitalDetails(data) {
    this.url = this.host + '/Doctor/InsertDoctorHospitalDetails';
    return this.http.post(this.url, data)
  }
  public InsertDoctorSessionDetails(data) {
    this.url = this.host + '/Doctor/InsertDoctorSessionDetails';
    return this.http.post(this.url, data)
  }

  public InsertDoctorSlotByID(data) {

    this.url = this.host + '/Doctor/InsertDoctorSlotByID';

    return this.http.post(this.url, data)
  }
  public GetDiagnosticSlotMasterByTimeID(timeid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticSlotMasterByTimeID?TimeID=' + timeid);
  }
  public InsertDiagnosticRelatedSlots(data) {

    this.url = this.host + '/Diagnostic/InsertDiagnosticRelatedSlots';
    return this.http.post(this.url, data)
  }
  public DeleteHospital_ClinicCamp(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteHospital_ClinicCamp?ID=' + id);
  }
  public GetHospital_ClinicCampByID(id) {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospital_ClinicCampByID?ID=' + id);
  }
  public UpdateHospital_ClinicCamps(data) {
    this.url = this.host + '/Hospital/UpdateHospital_ClinicCamps';
    return this.http.post(this.url, data)
  }
  public GetHospital_ClinicServices(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetHospital_ClinicServices?LanguageID=' + lid);
  }
  public DeleteHospital_ClinicServices(id) {

    return this.http.get<any[]>(this.host + '/Hospital/DeleteHospital_ClinicServices?ID=' + id);
  }
  public GetDoctorServices(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorServices?LanguageID=' + lid);
  }
  public GetDiagnosticCenterTestsForDash(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticCenterTestsForDash?LanguageID=' + lid);
  }
  public DeleteDoctorServices(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteDoctorServices?ID=' + id);
  }
  public DeleteDiagnosticCenterTestsForDash(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteDiagnosticCenterTestsForDash?ID=' + id);
  }
  public GetDiagnosticCenterPackages(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticCenterPackages?LanguageID=' + lid);
  }
  public DeleteDiagnosticCenterPackages(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteDiagnosticCenterPackages?ID=' + id);
  }
  public GetDiagnosticAppointmentsByDiagnosticID(id, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticAppointmentsByDiagnosticID?DiagnosticCenterID=' + id + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }
  public DeleteBookAppointmentByDoctor(id) {

    return this.http.get<any[]>(this.host + '/BookAppointment/DeleteBookAppointmentByDoctor?AppointmentID=' + id);
  }
  public BookAppointmentvisitedstatus(appointmentID) {

    return this.http.get<any[]>(this.host + '/BookAppointment/BookAppointmentvisitedstatus?BID=' + appointmentID);
  }
  public GetCancelledAppointmentReportsForDoctor(docid, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetCancelledAppointmentReportsForDoctor?DoctorID=' + docid + '&StartDate=' + sdate + '&EndDate=' + edate + '&LanguageID=' + lid);
  }
  public GetCompletedAppointmentReportsForDoctor(docid, date) {

    return this.http.get<any[]>(this.host + '/Doctor/GetCompletedAppointmentReportsForDoctor?DoctorID=' + docid + '&Date=' + date);
  }
  public DeleteDiagnosticAppointments(id) {

    return this.http.get<any[]>(this.host + '/Diagnostic/DeleteDiagnosticAppointments?AppointmentID=' + id);
  }
  public UpdateDiagnosticAppointments(id) {

    return this.http.get<any[]>(this.host + '/Diagnostic/UpdateDiagnosticAppointments?AppointmentID=' + id);
  }
  public GetReOrderMedicinesByPhrmacyID(phrmacyid, sdate, edate) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetReOrderMedicinesByPhrmacyID?PharmacyID=' + phrmacyid + '&SDate=' + sdate + '&EDate=' + edate);
  }
  public UpdateReOrderMedicinesDelivery(mid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/UpdateReOrderMedicinesDelivery?MedicalOrderID=' + mid);
  }
  public CancelledReOrderMedicines(mid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/CancelledReOrderMedicines?MedicalOrderID=' + mid);
  }
  public UpdateReOrderMedicinesReasonForCancel(data) {
    this.url = this.host + '/Pharmacy/UpdateReOrderMedicinesReasonForCancel';
    return this.http.post(this.url, data)
  }
  public UpdateBookAppointmentReasonForCancel(data) {

    this.url = this.host + '/Pharmacy/UpdateBookAppointmentReasonForCancel';
    return this.http.post(this.url, data)
  }
  public UpdateDiagnosticAppointmentsReasonForCancel(data) {

    this.url = this.host + '/Pharmacy/UpdateDiagnosticAppointmentsReasonForCancel';
    return this.http.post(this.url, data)
  }
  public UpdateAcceptedBitByDoctor(id) {

    return this.http.get<any[]>(this.host + '/BookAppointment/UpdateAcceptedBitByDoctor?AppointmentID=' + id);
  }
  public UpdateVisitedBitByDoctor(id) {

    return this.http.get<any[]>(this.host + '/BookAppointment/UpdateVisitedBitByDoctor?AppointmentID=' + id);
  }
  public GetMedicineTypeMaster() {

    return this.http.get<any[]>(this.host + '/Doctor/GetMedicineTypeMaster');
  }
  public GetWhenToConsumeMasterMedicals() {

    return this.http.get<any[]>(this.host + '/Doctor/GetWhenToConsumeMasterMedicals');
  }
  public InsertDoctor_PatientPrescription(data) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientPrescription';
    return this.http.post(this.url, data)
  }
  public GetDoctor_PatientPrescriptionByDoctorIDandPatientID(patientid, lid, doctorid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctor_PatientPrescriptionByDoctorIDandPatientID?PateintID=' + patientid + '&LanguageID=' + lid + '&DoctorID=' + doctorid);
  }
  public GetDiagnosticTestTypeMaster() {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticTestTypeMaster');
  }
  public InsertDoctor_PatientDiagnostics(data) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientDiagnostics';
    return this.http.post(this.url, data)
  }
  public DeleteDoctor_PatientPrescription(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteDoctor_PatientPrescription?ID=' + id);
  }
  public GetAreaMasterByCityID(cityid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetAreaMasterByCityID?CityID=' + cityid);
  }
  public GetPatientDetails(id, lid) {

    return this.http.get<any[]>(this.host + '/PatientRegistration/GetPatientDetails?ID=' + id + '&LanguageID=' + lid);
  }
  public OpenTok() {
    return this.http.get<any[]>("http://amazintchtokbox.herokuapp.com/session");
  }

  public startArchive(sessionId) {
    let data = JSON.stringify({ 'sessionId': sessionId })
    return this.http.post('http://amazintchtokbox.herokuapp.com/archive/start', data)
  }
  public stopArchive(archiveID) {
    let data = JSON.stringify({})
    return this.http.post('http://amazintchtokbox.herokuapp.com/archive/' + archiveID + '/stop', data)
  }
  public GetBookAppointmentByPatientID(patientid, appid, lid) {
    return this.http.get<any[]>(this.host + '/PatientRegistration/GetBookAppointmentByPatientID?PatientID=' + patientid + '&AppointmentID=' + appid + '&LanguageID=' + lid);
  }
  public GetDoctor_PatientDiagnosticsByDoctorIDandPatientID(docid, patientid) {

    return this.http.get<any[]>(this.host + '/PatientRegistration/GetDoctor_PatientDiagnosticsByDoctorIDandPatientID?DoctorID=' + docid + '&PateintID=' + patientid);
  }
  public InsertDoctor_PatientSoapNotes1(data) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientSoapNotes1';
    return this.http.post(this.url, data)
  }
  public InsertDoctor_PatientSoapNotes2(data) {

    this.url = this.host + '/Doctor/InsertDoctor_PatientSoapNotes2';
    return this.http.post(this.url, data)
  }
  public InsertDoctor_PatientSoapNotes3(data) {

    this.url = this.host + '/Doctor/InsertDoctor_PatientSoapNotes3';
    return this.http.post(this.url, data)
  }
  public InsertDoctor_PatientSoapNotes4(data) {

    this.url = this.host + '/Doctor/InsertDoctor_PatientSoapNotes4';
    return this.http.post(this.url, data)
  }
  public GetVedioConferenceByDateAndTime(docid, patientID, appointmentID, appdatetime, slots) {

    return this.http.get<any[]>(this.host + '/Doctor/GetVedioConferenceByDateAndTime?DoctorID=' + docid + '&PatientID=' + patientID +
      '&AppointmentID=' + appointmentID + '&ApptDateTime=' + appdatetime + '&Slots=' + slots);
  }
  public GetBookappointmentByDoctorIDandPatientID(docid, patientid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBookappointmentByDoctorIDandPatientID?DoctorID=' + docid + '&PatientID=' + patientid);
  }
  public GetSoapNotesBydoctorIDandPatientID(docid, patientid, appid, appdate) {


    return this.http.get<any[]>(this.host + '/Doctor/GetSoapNotesBydoctorIDandPatientID?DoctorID=' + docid + '&PatientID=' + patientid + '&AppointmentID=' + appid + '&AppointmentDate=' + appdate);
  }
  public GetServerDateAndTime() {

    return this.http.get<any[]>(this.host + '/Doctor/GetServerDateAndTime');
  }
  public InsertDoctor_PatientChat(data) {

    this.url = this.host + '/Doctor/InsertDoctor_PatientChat';
    return this.http.post(this.url, data)
  }
  public UpdateDoctor_PatientChat(data) {

    this.url = this.host + '/Doctor/UpdateDoctor_PatientChat';
    return this.http.post(this.url, data)
  }
  public getChat(docid, patientid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctor_PatientChat?DoctorID=' + docid + '&PatientID=' + patientid);
  }
  public UpdateIsTyping(appid, istyping) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateIsTyping?AppointmentID=' + appid + '&istyping=' + istyping);
  }
  public GetBookAppointmentDetailsByID(appid, docid, patientid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointmentDetailsByID?ID=' + appid + '&DoctorID=' + docid + '&PatientID=' + patientid);
  }
  public GetSoapNotesByPatientID(PatientID, lid, doctorid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSoapNotesByPatientID?PatientID=' + PatientID + '&LanguageID=' + lid + '&DoctorID=' + doctorid);
  }
  public GetSoapNotesByID(id, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSoapNotesByID?ID=' + id + '&LanguageID=' + lid);
  }
  public DeleteSoapNotes(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteSoapNotes?ID=' + id);
  }
  public GetHospital_ClinicPhotosByHospitalclinicID(id) {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospital_ClinicPhotosByHospitalclinicID?Hospital_ClinicID=' + id);
  }
  public UpdateDoctorRegistrationPhoto(data) {

    this.url = this.host + '/Doctor/UpdateDoctorRegistrationPhoto';
    return this.http.post(this.url, data)
  }
  public GetDoctorMedicalProofs(docid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorMedicalProofs?DoctorID=' + docid);
  }
  public UpdateDoctorMedicalProofs(data) {

    this.url = this.host + '/Doctor/UpdateDoctorMedicalProofs';
    return this.http.post(this.url, data)
  }
  public UpdateDoctorIdentityProofs(data) {

    this.url = this.host + '/Doctor/UpdateDoctorIdentityProofs';
    return this.http.post(this.url, data)
  }
  public GetDoctorIdentityProofs(docid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorIdentityProofs?DoctorID=' + docid);
  }
  public GetDiagnosticCenterPhotosByID(diaid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticCenterPhotosByID?ID=' + diaid);
  }
  public UpdateDiagnosticCenterPhotos(data) {

    this.url = this.host + '/Diagnostic/UpdateDiagnosticCenterPhotos';
    return this.http.post(this.url, data)
  }
  public GetPharmacyPhotos(pid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetPharmacyPhotos?PharmacyID=' + pid);
  }
  public UpdatePharmacyPhotos(data) {

    this.url = this.host + '/Pharmacy/UpdatePharmacyPhotos';
    return this.http.post(this.url, data)
  }
  public UpdateHospital_ClinicPhotos(data) {

    this.url = this.host + '/Hospital/UpdateHospital_ClinicPhotos';
    return this.http.post(this.url, data)
  }
  public UpdateHospital_ClinicDetailsMasterPhoto(data) {

    this.url = this.host + '/Hospital/UpdateHospital_ClinicDetailsMasterPhoto';
    return this.http.post(this.url, data)
  }

  public InsertNotifications(data) {
    this.url = this.host + '/Doctor/InsertNotifications';
    return this.http.post(this.url, data)
  }

  public PostGCMNotifications(data) {

    this.url = this.host + '/Doctor/PostGCMNotifications';
    return this.http.post(this.url, data)
  }

  //srikanth
  public GetCountryMaster() {

    return this.http.get<any[]>(this.host + '/Admin/GetCountryMaster');
  }
  public GetCityMasterBYID(countryid) {

    return this.http.get<any[]>(this.host + '/Admin/GetCityMasterBYID?CountryID=' + countryid);
  }
  public GetPatient_Illnessphotos(appid) {

    return this.http.get<any[]>(this.host + '/Admin/GetPatient_Illnessphotos?AppoitmentID=' + appid);
  }
  public GetDoctorTypeMaster() {

    return this.http.get<any[]>(this.host + '/Admin/GetDoctorTypeMaster');
  }
  public GetBookingTypeMaster() {

    return this.http.get<any[]>(this.host + '/Admin/GetBookingTypeMaster');
  }
  public GetBookAppointmentTypeMaster() {

    return this.http.get<any[]>(this.host + '/Admin/GetBookAppointmentTypeMaster');
  }


  public InsertBookingType(data) {

    this.url = this.host + '/Admin/InsertBookingType';
    return this.http.post(this.url, data)
  }
  public InsertBookAppointmentType(data) {

    this.url = this.host + '/Admin/InsertBookAppointmentType';
    return this.http.post(this.url, data)
  }
  public GetNurseRegistrationByID(id) {

    return this.http.get<any[]>(this.host + '/Admin/GetNurseRegistrationByID?ID=' + id);
  }
  public GePhysiotherapyRegistrationByID(id) {

    return this.http.get<any[]>(this.host + '/Admin/GePhysiotherapyRegistrationByID?ID=' + id);
  }
  public UpdatephysiotherapyRegistration(data) {

    this.url = this.host + '/Admin/UpdatephysiotherapyRegistration';
    return this.http.post(this.url, data)
  }
  public GetMidWivesRegistrationByID(id) {

    return this.http.get<any[]>(this.host + '/Admin/GetMidWivesRegistrationByID?ID=' + id);
  }
  public UpdateMidWivesRegistration(data) {

    this.url = this.host + '/Admin/UpdateMidWivesRegistration';
    return this.http.post(this.url, data)
  }
  public GetDeliveryCompanyByID(id) {

    return this.http.get<any[]>(this.host + '/Admin/GetDeliveryCompanyByID?ID=' + id);
  }
  public UpdateDeliveryCompany(data) {

    this.url = this.host + '/Admin/UpdateDeliveryCompany';
    return this.http.post(this.url, data)
  }
  public UpdateNurseRegistration(data) {

    this.url = this.host + '/Admin/UpdateNurseRegistration';
    return this.http.post(this.url, data)
  }
  public GetBookAppointmentByDistinictDoctorID(doctorid) {

    return this.http.get<any[]>(this.host + '/Admin/GetBookAppointmentByDistinictDoctorID?DoctorID=' + doctorid);
  }
  /////sanath


  public InsertNurseRegistration(data) {

    this.url = this.host + '/Admin/InsertNurseRegistration';
    return this.http.post(this.url, data)
  }
  public GetNurseRegistrationAdmin() {

    return this.http.get<any[]>(this.host + '/Admin/GetNurseRegistrationAdmin');
  }
  public DeleteNurseRegistration(id) {

    return this.http.get<any[]>(this.host + '/Admin/DeleteNurseRegistration?ID=' + id);
  }
  public GetNurseRegistrationByIDAdmin(id) {

    return this.http.get<any[]>(this.host + '/Admin/GetNurseRegistrationByIDAdmin?ID=' + id);
  }
  public UpdateNurseRegistrationAdmin(data) {

    this.url = this.host + '/Admin/UpdateNurseRegistrationAdmin';
    return this.http.post(this.url, data)
  }
  public InsertNurseHospitalDetailsAdmin(data) {

    this.url = this.host + '/Admin/InsertNurseHospitalDetailsAdmin';
    return this.http.post(this.url, data)
  }
  public InsertphysiotherapyRegistrationAdmin(data) {

    this.url = this.host + '/Admin/InsertphysiotherapyRegistrationAdmin';
    return this.http.post(this.url, data)
  }
  public GetPhysiotherapyRegistrationAdmin() {

    return this.http.get<any[]>(this.host + '/Admin/GetPhysiotherapyRegistrationAdmin');
  }
  public DeletePhysiotherapyRegistrationAdmin(id) {

    return this.http.get<any[]>(this.host + '/Admin/DeletePhysiotherapyRegistrationAdmin?ID=' + id);
  }
  public InsertPhysiotherapyHospitalDetailsAdmin(data) {

    this.url = this.host + '/Admin/InsertPhysiotherapyHospitalDetailsAdmin';
    return this.http.post(this.url, data)
  }
  public InsertNurseLogin(data) {

    this.url = this.host + '/Admin/InsertNurseLogin';
    return this.http.post(this.url, data)
  }
  public InsertPhysiotherapistLogin(data) {

    this.url = this.host + '/Admin/InsertPhysiotherapistLogin';
    return this.http.post(this.url, data)
  }
  public GetPhysiotherapistLoginAdmin(lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetPhysiotherapistLoginAdmin?LanguageID=' + lid);
  }
  public GetNurseLoginAdmin(lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetNurseLoginAdmin?LanguageID=' + lid);
  }
  public EnableNurseLogin(id) {

    return this.http.get<any[]>(this.host + '/Admin/EnableNurseLogin?NurseID=' + id);
  }
  public DisableNurseLogin(id) {

    return this.http.get<any[]>(this.host + '/Admin/DisableNurseLogin?NurseID=' + id);
  }
  public EnablePhysiotherapistLogin(id) {

    return this.http.get<any[]>(this.host + '/Admin/EnablePhysiotherapistLogin?PhysiotherapistID=' + id);
  }
  public DisablePhysiotherapistLogin(id) {

    return this.http.get<any[]>(this.host + '/Admin/DisablePhysiotherapistLogin?PhysiotherapistID=' + id);
  }
  public GetNurseLogin(uname, pwd, lid, pinno) {

    return this.http.get<any[]>(this.host + '/Admin/GetNurseLogin?UserName=' + uname + '&Password=' + pwd + '&LanguageID=' + lid + '&Pinno=' + pinno);
  }
  public GetPhysiotherapistLogin(uname, pwd, lid, pinno) {

    return this.http.get<any[]>(this.host + '/Admin/GetPhysiotherapistLogin?UserName=' + uname + '&Password=' + pwd + '&LanguageID=' + lid + '&Pinno=' + pinno);
  }
  public InsertMidWivesRegistration(data) {

    this.url = this.host + '/Admin/InsertMidWivesRegistration';
    return this.http.post(this.url, data)
  }
  public GetMidWivesRegistration() {

    return this.http.get<any[]>(this.host + '/Admin/GetMidWivesRegistration');
  }
  public DeleteMidWivesRegistration(id) {

    return this.http.get<any[]>(this.host + '/Admin/DeleteMidWivesRegistration?ID=' + id);
  }
  public InsertMidWivesLogin(data) {

    this.url = this.host + '/Admin/InsertMidWivesLogin';
    return this.http.post(this.url, data)
  }
  public GetMidWivesLoginAdmin(lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetMidWivesLoginAdmin?LanguageID=' + lid);
  }
  public EnableMidWivesLogin(id) {

    return this.http.get<any[]>(this.host + '/Admin/EnableMidWivesLogin?MidWiveID=' + id);
  }
  public DisableMidWivesLogin(id) {

    return this.http.get<any[]>(this.host + '/Admin/DisableMidWivesLogin?MidWiveID=' + id);
  }
  public GetMidWivesLogin(uname, pwd, lid, pinno) {

    return this.http.get<any[]>(this.host + '/Admin/GetMidWivesLogin?UserName=' + uname + '&Password=' + pwd + '&LanguageID=' + lid + '&Pinno=' + pinno);
  }
  public GetDeliveryCompanyLogin(uname, pwd, lid, pinno) {

    return this.http.get<any[]>(this.host + '/Admin/GetDeliveryCompanyLogin?UserName=' + uname + '&Password=' + pwd + '&LanguageID=' + lid + '&Pinno=' + pinno);
  }
  public InsertNurseServices(data) {

    this.url = this.host + '/Admin/InsertNurseServices';
    return this.http.post(this.url, data)
  }
  public InsertNurseSpecialization(data) {

    this.url = this.host + '/Admin/InsertNurseSpecialization';
    return this.http.post(this.url, data)
  }
  public InsertPhysiotherapyServices(data) {

    this.url = this.host + '/Admin/InsertPhysiotherapyServices';
    return this.http.post(this.url, data)
  }
  public InsertPhysiotherapySpecialization(data) {

    this.url = this.host + '/Admin/InsertPhysiotherapySpecialization';
    return this.http.post(this.url, data)
  }
  public InsertNurseWorkingDetails(data) {
    debugger
    this.url = this.host + '/Admin/InsertNurseWorkingDetails';
    return this.http.post(this.url, data)
  }
  public InsertPhysiotherapistWorkingDetails(data) {

    this.url = this.host + '/Admin/InsertPhysiotherapistWorkingDetails';
    return this.http.post(this.url, data)
  }
  public GetBook_Nurse_Appointment(id, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Nurse_Appointment?NurseID=' + id + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }
  public GetBook_Physio_Appointment(id, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Physio_Appointment?PhysioID=' + id + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }
  public InsertDeliveryCompany(data) {

    this.url = this.host + '/Admin/InsertDeliveryCompany';
    return this.http.post(this.url, data)
  }
  public GetDeliveryCompanyAdmin() {

    return this.http.get<any[]>(this.host + '/Admin/GetDeliveryCompanyAdmin');
  }
  public DeleteDeliveryCompany(id) {

    return this.http.get<any[]>(this.host + '/Admin/DeleteDeliveryCompany?ID=' + id);
  }
  public InsertDeliveryCompanyLogin(data) {

    this.url = this.host + '/Admin/InsertDeliveryCompanyLogin';
    return this.http.post(this.url, data)
  }
  public GetDeliveryCompanyLoginAdmin(lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetDeliveryCompanyLoginAdmin?LanguageID=' + lid);
  }
  public DisableDeliveryCompanyLogin(id) {

    return this.http.get<any[]>(this.host + '/Admin/DisableDeliveryCompanyLogin?DeliveryCompanyID=' + id);
  }
  public EnableDeliveryCompanyLogin(id) {

    return this.http.get<any[]>(this.host + '/Admin/EnableDeliveryCompanyLogin?DeliveryCompanyID=' + id);
  }
  public InsertDeliveryPartners(data) {

    this.url = this.host + '/Admin/InsertDeliveryPartners';
    return this.http.post(this.url, data)
  }
  public GetDeliveryPartnersByID(id) {

    return this.http.get<any[]>(this.host + '/Admin/GetDeliveryPartnersByID?DeliveryCompanyID=' + id);
  }
  public InsertMidWifeHospitalDetails(data) {

    this.url = this.host + '/Admin/InsertMidWifeHospitalDetails';
    return this.http.post(this.url, data)
  }
  public InsertMidWifeWorkingDetails(data) {

    this.url = this.host + '/Admin/InsertMidWifeWorkingDetails';
    return this.http.post(this.url, data)
  }

  //srikanth

  public GetBookappointmentByPatientDetails(patientid) {

    return this.http.get<any[]>(this.host + '/Admin/GetBookappointmentByPatientDetails?PatientID=' + patientid);
  }

  public GetDoctor_PatientPrescriptionbyPatientDeatails(patientid, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetDoctor_PatientPrescriptionbyPatientDeatails?PateintID=' + patientid + '&LanguageID=' + lid);
  }
  public GetDoctor_PatientDiagnosticsbypatientdeatils(patientid, lid, doctorid) {

    return this.http.get<any[]>(this.host + '/Admin/GetDoctor_PatientDiagnosticsbypatientdeatils?PateintID=' + patientid + '&LanguageID=' + lid + '&DoctorID=' + doctorid);
  }

  public InsertBook_DoctorPatientBookedVideoConference(data) {

    this.url = this.host + '/Admin/InsertBook_DoctorPatientBookedVideoConference';
    return this.http.post(this.url, data)
  }
  public UpdateBook_DoctorPatientBookedVideoConference(data) {
    this.url = this.host + '/Admin/UpdateBook_DoctorPatientBookedVideoConference';
    return this.http.post(this.url, data)
  }
  public GetDoctor_PatientPrescriptionByID(id, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetDoctor_PatientPrescriptionByID?ID=' + id + '&LanguageID=' + lid);
  }
  public GetDoctor_PatientPrescriptionByAppointmentID(id) {

    return this.http.get<any[]>(this.host + '/Admin/GetDoctor_PatientPrescriptionByAppointmentID?AppointmentID=' + id);
  }
  public GetDoctor_PatientDiagnosticsbyAppointmentID(id) {

    return this.http.get<any[]>(this.host + '/Admin/GetDoctor_PatientDiagnosticsbyAppointmentID?AppointmentID=' + id);
  }
  public GetSoapNotesByAppointmentID(id) {

    return this.http.get<any[]>(this.host + '/Admin/GetSoapNotesByAppointmentID?AppointmentID=' + id);
  }
  public GetOrdersForDeliveryCompany(sdate, edate) {

    return this.http.get<any[]>(this.host + '/Admin/GetOrdersForDeliveryCompany?SDate=' + sdate + '&EDate=' + edate);
  }
  public AccpetMedicineDeliveryByDeliveryCompany(dcid, ar, id) {

    return this.http.get<any[]>(this.host + '/Admin/AccpetMedicineDeliveryByDeliveryCompany?DeliveryCompanyID=' + dcid + '&Acceptreject=' + ar + '&ID=' + id);
  }
  public AccpetShoppingDeliveryByDeliveryCompany(ar, id) {

    return this.http.get<any[]>(this.host + '/Doctor/AccpetShoppingDeliveryByDeliveryCompany?Acceptreject=' + ar + '&ID=' + id);
  }

  public GetChatForNotificationForDoctor(did) {

    return this.http.get<any[]>(this.host + '/Admin/GetChatForNotificationForDoctor?DoctorID=' + did);
  }
  public InsertDeliveryPartnerAssignedOrders(data) {
    this.url = this.host + '/Admin/InsertDeliveryPartnerAssignedOrders';
    return this.http.post(this.url, data)
  }
  public InsertDeliveryPartnerAssignedShoppingOrders(data) {
    this.url = this.host + '/Doctor/InsertDeliveryPartnerAssignedShoppingOrders';
    return this.http.post(this.url, data)
  }
  public GetNotifications_DoctorByDoctorID(did) {

    return this.http.get<any[]>(this.host + '/Doctor/GetNotifications_DoctorByDoctorID?DoctorID=' + did);
  }
  public Update_AppointmentForOnDemandVideoConferenceForDoctor(dhd, did, aid, nid) {

    return this.http.get<any[]>(this.host + '/Doctor/Update_AppointmentForOnDemandVideoConferenceForDoctor?DoctorHospitalDetailsID=' + dhd + '&DoctorID=' + did + '&AppointmentID=' + aid + '&NotificationID=' + nid);
  }
  public GetMyAppointments_OnDemandVideoConferenceByDoctorID(did) {

    return this.http.get<any[]>(this.host + '/Doctor/GetMyAppointments_OnDemandVideoConferenceByDoctorID?DoctorID=' + did);
  }
  public GetBookAppointmentByPatientID_ForVideoConference(pid, appid) {

    return this.http.get<any[]>(this.host + '/Admin/GetBookAppointmentByPatientID_ForVideoConference?PatientID=' + pid + '&AppointmentID=' + appid);
  }

  public UpdateBookAppointmentNoShow(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBookAppointmentNoShow?ID=' + id);
  }

  public GetMyAppointments_OnDemandVideoConferenceByDoctorIDWeb(did, sdate, edate) {

    return this.http.get<any[]>(this.host + '/Doctor/GetMyAppointments_OnDemandVideoConferenceByDoctorIDWeb?DoctorID=' + did + '&SDate=' + sdate + '&EDate=' + edate);
  }

  public UpdateAcceptedBitReOrderMedicines(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateAcceptedBitReOrderMedicines?ID=' + id);
  }
  public GetMedicineOrderDetailsPhoto(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetMedicineOrderDetailsPhoto?ID=' + id);
  }
  public UpdateReOrderMedicinesNotVisitedBit(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateReOrderMedicinesNotVisitedBit?ID=' + id);
  }
  public GetReOrderMedicinesDeliveryReports(pharmacyid, sdate, enddate) {

    return this.http.get<any[]>(this.host + '/Doctor/GetReOrderMedicinesDeliveryReports?PharmacyID=' + pharmacyid + '&StartDate=' + sdate + '&EndDate=' + enddate);
  }



  public UpdateDiagnosticAppointmentsNotVisitedBit(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateDiagnosticAppointmentsNotVisitedBit?ID=' + id);
  }
  public UpdateDiagnosticAppointmentsApproveBit(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateDiagnosticAppointmentsApproveBit?ID=' + id);
  }

  public GetDiagnosticAppointmentsByApprovedReports(diaid, sdate, enddate, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticAppointmentsByApprovedReports?DiagnosticCenterID=' + diaid + '&StartDate=' + sdate + '&EndDate=' + enddate + '&LanguageID=' + lid);
  }
  public strongpassword(input) {

    var passworddetails = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,15})$/;
    return passworddetails.test(input);

  }

  public GetServiceMasterByDepartmentID(depid) {

    return this.http.get<any[]>(this.host + '/Admin/GetServiceMasterByDepartmentID?DepartmentID=' + depid);
  }

  public UpdateDoctorFeedbackRejectedBit(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateDoctorFeedbackRejectedBit?ID=' + id);
  }
  public UpdateDoctorFeedbackAcceptedBit(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateDoctorFeedbackAcceptedBit?ID=' + id);
  }
  public UpdateDoctorFeedbackSwitchEnable(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateDoctorFeedbackSwitchEnable?ID=' + id);
  }
  public UpdateDoctorFeedbackSwitchDisable(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateDoctorFeedbackSwitchDisable?ID=' + id);
  }


  public UpdateBook_Nurse_AppointmentVisitedBit(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBook_Nurse_AppointmentVisitedBit?ID=' + id);
  }

  public UpdateBook_Nurse_AppointmentCancelledBit(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBook_Nurse_AppointmentCancelledBit?ID=' + id);
  }

  public UpdateBook_Nurse_AppointmentAcceptedBit(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBook_Nurse_AppointmentAcceptedBit?ID=' + id);
  }

  public UpdateBook_Nurse_AppointmentReasonForCancelBit(data) {
    this.url = this.host + '/Doctor/UpdateBook_Nurse_AppointmentReasonForCancelBit';
    return this.http.post(this.url, data)
  }

  public InsertNurse_AvailabilitySlots(data) {

    this.url = this.host + '/Admin/InsertNurse_AvailabilitySlots';
    return this.http.post(this.url, data)
  }

  public GetBook_Nurse_AppointmentReports(nurseid, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Nurse_AppointmentReports?NurseID=' + nurseid + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }




  public UpdateBook_Physio_AppointmentIsVisitedBit(id) {

    return this.http.get<any[]>(this.host + '/Admin/UpdateBook_Physio_AppointmentIsVisitedBit?ID=' + id);
  }

  public UpdateBook_Physio_AppointmentcancelledBit(id) {

    return this.http.get<any[]>(this.host + '/Admin/UpdateBook_Physio_AppointmentcancelledBit?ID=' + id);
  }

  public UpdateBook_Physio_AppointmentAcceptedBit(id) {

    return this.http.get<any[]>(this.host + '/Admin/UpdateBook_Physio_AppointmentAcceptedBit?ID=' + id);
  }

  public UpdateBook_Physio_AppointmentReasonForCancel(data) {
    this.url = this.host + '/Admin/UpdateBook_Physio_AppointmentReasonForCancel';
    return this.http.post(this.url, data)
  }

  public InsertPhysiotherapist_AvailabilitySlots(data) {

    this.url = this.host + '/Admin/InsertPhysiotherapist_AvailabilitySlots';
    return this.http.post(this.url, data)
  }

  public GetBook_Physio_AppointmentReports(physioid, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Physio_AppointmentReports?PhysioID=' + physioid + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }

  public GetBook_Book_Midwives_Appointment(midwiveid, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Book_Midwives_Appointment?MidWivesID=' + midwiveid + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }

  public UpdateBook_Midwives_AppointmentIsVisitedBit(id) {

    return this.http.get<any[]>(this.host + '/Admin/UpdateBook_Midwives_AppointmentIsVisitedBit?ID=' + id);
  }
  public UpdateBook_Midwives_AppointmentCancelledBit(id) {

    return this.http.get<any[]>(this.host + '/Admin/UpdateBook_Midwives_AppointmentCancelledBit?ID=' + id);
  }
  public UpdateBook_Midwives_AppointmentAcceptedBit(id) {

    return this.http.get<any[]>(this.host + '/Admin/UpdateBook_Midwives_AppointmentAcceptedBit?ID=' + id);
  }
  public UpdateBook_Midwives_AppointmentReasonForCancel(data) {
    this.url = this.host + '/Admin/UpdateBook_Midwives_AppointmentReasonForCancel';
    return this.http.post(this.url, data)
  }

  public InsertBook_MidWifeAvailabilitySlots(data) {

    this.url = this.host + '/Admin/InsertBook_MidWifeAvailabilitySlots';
    return this.http.post(this.url, data)
  }

  public GetBook_Book_Midwives_AppointmentReports(midwiveid, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Book_Midwives_AppointmentReports?MidWivesID=' + midwiveid + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }

  public InsertPatient_DiagnosticUploads(data) {

    this.url = this.host + '/Admin/InsertPatient_DiagnosticUploads';
    return this.http.post(this.url, data)
  }


  public DiagnosticRecordUploads(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Diagnostic/DiagnosticRecordUploads/', formdata);
  }


  public GetNurseHospitalDetailsWeb(nurseid, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetNurseHospitalDetailsWeb?NurseID=' + nurseid + '&LanguageID=' + lid);
  }

  public UpdateNurseWorkingDetails(data) {
    this.url = this.host + '/Admin/UpdateNurseWorkingDetails';
    return this.http.post(this.url, data)
  }

  public DeleteNurseWorkingDetails(nsid, dayid) {

    return this.http.get<any[]>(this.host + '/Admin/DeleteNurseWorkingDetails?NurseHospitalDetailsID=' + nsid + '&DayID=' + dayid);
  }
  public GetPhysiotherapyHospitalDetailsWeb(pid, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetPhysiotherapyHospitalDetailsWeb?PhysiotherapyID=' + pid + '&LanguageID=' + lid);
  }
  public UpdatePhysiotherapistWorkingDetails(data) {
    this.url = this.host + '/Admin/UpdatePhysiotherapistWorkingDetails';
    return this.http.post(this.url, data)
  }
  public DeletePhysiotherapistWorkingDetails(id) {

    return this.http.get<any[]>(this.host + '/Admin/DeletePhysiotherapistWorkingDetails?ID=' + id);
  }

  public GetMidWifeHospitalDetailsWeb(mid, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetMidWifeHospitalDetailsWeb?MidWifeID=' + mid + '&LanguageID=' + lid);
  }
  public UpdateMidWifeWorkingDetails(data) {
    this.url = this.host + '/Admin/UpdateMidWifeWorkingDetails';
    return this.http.post(this.url, data)
  }
  public DeleteMidWifeWorkingDetails(id) {

    return this.http.get<any[]>(this.host + '/Admin/DeleteMidWifeWorkingDetails?ID=' + id);
  }

  public GetServicesDDforDoctorAdmin(mid) {

    return this.http.get<any[]>(this.host + '/Admin/GetServicesDDforDoctorAdmin?DoctorID=' + mid);
  }

  public GetDoctorServicesAdmin(mid) {

    return this.http.get<any[]>(this.host + '/Admin/GetDoctorServicesAdmin?DoctorID=' + mid);
  }

  public GetDoctorHospitalDetailsWeb(mid, LanguageID) {

    return this.http.get<any[]>(this.host + '/Admin/GetDoctorHospitalDetailsWeb?DoctorID=' + mid + '&LanguageID=' + LanguageID);
  }
  public DeleteDoctorSlots(id) {

    return this.http.get<any[]>(this.host + '/Admin/DeleteDoctorSlots?ID=' + id);
  }
  public GetPatient_IllnessVedioes(mid) {

    return this.http.get<any[]>(this.host + '/Admin/GetPatient_IllnessVedioes?AppointmentID=' + mid);
  }
  public GetNurseListForRegisteringLogin(lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetNurseListForRegisteringLogin?LanguageID=' + lid);
  }
  public GetPhysiotherapyRegistringLogins(lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetPhysiotherapyRegistringLogins?LanguageID=' + lid);
  }
  public GetMidWivesRegistratingLogins(lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetMidWivesRegistratingLogins?LanguageID=' + lid);
  }
  public GetDoctorRegistratingLogins(lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetDoctorRegistratingLogins?LanguageID=' + lid);
  }



  public InsertDoctor_PatientSoapNotes1_OnDemand(data) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientSoapNotes1_OnDemand';
    return this.http.post(this.url, data)
  }
  public InsertDoctor_PatientSoapNotes2_OnDemand(data) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientSoapNotes2_OnDemand';
    return this.http.post(this.url, data)
  }
  public InsertDoctor_PatientSoapNotes3_OnDemand(data) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientSoapNotes3_OnDemand';
    return this.http.post(this.url, data)
  }
  public InsertDoctor_PatientSoapNotes4_OnDemand(data) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientSoapNotes4_OnDemand';
    return this.http.post(this.url, data)
  }

  public GetSoapNotesByPatientIDForMob_OnDemand(PatientID) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSoapNotesByPatientIDForMob_OnDemand?PatientID=' + PatientID);
  }
  public GetSoapNotesBySoapIDForMob_OnDemand(soapid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSoapNotesBySoapIDForMob_OnDemand?SoapID=' + soapid);
  }


  public InsertDoctor_PatientDiagnostics_OnDemand(data) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientDiagnostics_OnDemand';
    return this.http.post(this.url, data)
  }
  public InsertDoctor_PatientPrescription_OnDemand(data) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientPrescription_OnDemand';
    return this.http.post(this.url, data)
  }

  public GetDoctor_PatientPrescription_OnDemandByDoctorIDandPatientID(docid, patientid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctor_PatientPrescription_OnDemandByDoctorIDandPatientID?DoctorID=' + docid + '&PateintID=' + patientid);
  }
  public GetDoctor_PatientDiagnostics_OnDemandByDoctorIDandPatientID(docid, patientid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctor_PatientDiagnostics_OnDemandByDoctorIDandPatientID?DoctorID=' + docid + '&PateintID=' + patientid);
  }

  public InsertSickSlipGenarator(data) {
    this.url = this.host + '/Doctor/InsertSickSlipGenarator';
    return this.http.post(this.url, data)
  }

  public GetPatient_IllnessPhotos_OnDemand(appid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_IllnessPhotos_OnDemand?AppointmentID=' + appid);
  }

  public GetPatient_IllnessVedioes_OnDemand(appid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_IllnessVedioes_OnDemand?AppointmentID=' + appid);
  }


  public InsertDoctorSlotStartAndEndTime(data) {
    this.url = this.host + '/Doctor/InsertDoctorSlotStartAndEndTime';
    return this.http.post(this.url, data)
  }

  public DeleteDoctorSlotsByDoctor(did, dochspid, dayid, timeid) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteDoctorSlotsByDoctor?DoctorID=' + did + '&DoctorHospitalDetailsID=' + dochspid + '&DayID=' + dayid + '&TimeDivisionID=' + timeid);
  }

  public DeleteDoctorSlotsByDocHspDetailsID(dochspid, dayid) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteDoctorSlotsByDocHspDetailsID?DoctorHospitalDetailsID=' + dochspid + '&DayID=' + dayid);
  }

  public UpdateDoctorSlotStartAndEndTime(data) {
    this.url = this.host + '/Doctor/UpdateDoctorSlotStartAndEndTime';
    return this.http.post(this.url, data)
  }

  public GetDoctorPatients(appid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorPatients?DoctorID=' + appid);
  }

  public GetSickSlipGenaratorByDoctorID(appid, sdate, edate) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSickSlipGenaratorByDoctorID?DoctorID=' + appid + '&Sdate=' + sdate + '&Edate=' + edate);
  }






  public UpdatePatient_DiagnosticUploads(data) {

    this.url = this.host + '/Doctor/UpdatePatient_DiagnosticUploads';
    return this.http.post(this.url, data)
  }

  public GetDiagnosticPackagesByAppointmentIDWeb(languageid, diaid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticPackagesByAppointmentIDWeb?LanguageID=' + languageid + '&DiagnosticAppointmentsID=' + diaid);
  }
  public GetDiagnosticTestsByAppointmentIDWeb(languageid, diaid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticTestsByAppointmentIDWeb?LanguageID=' + languageid + '&DiagnosticAppointmentsID=' + diaid);
  }



  public GetPatient_TextMedicineDetails(phaid, sdate, enddate, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_TextMedicineDetails?PharmacyID=' + phaid + '&SDate=' + sdate + '&EDate=' + enddate + '&LanguageID=' + lid);
  }
  public ApprovedPatientMedicineDetails(id) {

    return this.http.get<any[]>(this.host + '/Doctor/ApprovedPatientMedicineDetails?ID=' + id);
  }
  public PharCancelledPatientMedicineDetails(id) {

    return this.http.get<any[]>(this.host + '/Doctor/PharCancelledPatientMedicineDetails?ID=' + id);
  }
  public DeliveredPatientMedicineDetails(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DeliveredPatientMedicineDetails?ID=' + id);
  }
  public GetDiagnosticTestMasterByTestID(testid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticTestMasterByTestID?TestTypeID=' + testid);
  }


  public GetPatient_TextMedicineDetailsReportsWeb(pid, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_TextMedicineDetailsReportsWeb?PharmacyID=' + pid + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }
  public UpdateNotifications_DoctorRejectedBit(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateNotifications_DoctorRejectedBit?DoctorID=' + id);
  }


  public GetPatientDiagnosticsReportsByAppointmentID(aid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatientDiagnosticsReportsByAppointmentID?AppointmentID=' + aid);
  }
  public GetBook_DoctorPatientBookedVideoConferenceByPatientID(patientid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBook_DoctorPatientBookedVideoConferenceByPatientID?PatientID=' + patientid);
  }





  public GetDoctorEducationWeb(docid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorEducationWeb?DoctorID=' + docid);
  }
  public DeleteDoctorEducation(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteDoctorEducation?ID=' + id);
  }
  public GetNewDoctorFeedBackByDoctorID(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetNewDoctorFeedBackByDoctorID?DoctorID=' + id);
  }
  public GetDoctorHospitalDetailsWebHospital(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorHospitalDetailsWebHospital?DoctorID=' + id);
  }





  public UpdateBook_MidWifeAvailabilitySlotsTime(data) {

    this.url = this.host + '/Doctor/UpdateBook_MidWifeAvailabilitySlotsTime';
    return this.http.post(this.url, data)
  }
  public UpdateNurse_AvailabilitySlotsTime(data) {

    this.url = this.host + '/Doctor/UpdateNurse_AvailabilitySlotsTime';
    return this.http.post(this.url, data)
  }
  public UpdatePhysiotherapist_AvailabilitySlotsTime(data) {

    this.url = this.host + '/Doctor/UpdatePhysiotherapist_AvailabilitySlotsTime';
    return this.http.post(this.url, data)
  }



  //language

  public GetLanguageMaster() {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetLanguageMaster');
  }
  public GetRoleTypesMasterBYID(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetRoleTypesMasterBYID?LanguageID=' + lid);
  }

  public GetAdmin_Doctorregistration_LabelsByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_Doctorregistration_LabelsByLanguageID?LanguageID=' + lid);
  }
  public GetAdmin_DiagnosticRegistration_LabelBYLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_DiagnosticRegistration_LabelBYLanguageID?LanguageID=' + lid);
  }
  public GetAdmin_HospitalClinicRegistration_Lables(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_HospitalClinicRegistration_Lables?LanguageID=' + lid);
  }
  public GetAdmin_PharmacyRegistration_LabelByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_PharmacyRegistration_LabelByLanguageID?LanguageID=' + lid);
  }
  public GetAdmin_NurseRegistration_labelByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_NurseRegistration_labelByLanguageID?LanguageID=' + lid);
  }
  public GetAdmin_MidWifeRegistration_LabelByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_MidWifeRegistration_LabelByLanguageID?LanguageID=' + lid);
  }
  public GetAdmin_PhysiotherapistRegistration_Label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_PhysiotherapistRegistration_Label?LanguageID=' + lid);
  }

  public GetAdmin_WorkingDetails_label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_WorkingDetails_label?LanguageID=' + lid);
  }
  public GetAdmin_CompanyDetails_Label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_CompanyDetails_Label?LanguageID=' + lid);
  }
  public GetAdmin_MapServices_Label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_MapServices_Label?LanguageID=' + lid);
  }
  public GetAdmin_MapServiceDiagnostic_Label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_MapServiceDiagnostic_Label?LanguageID=' + lid);
  }
  public GetAdmin_RegisterLogins_Label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_RegisterLogins_Label?LanguageID=' + lid);
  }
  public Getloginlabel(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_RegisterLogins_Label?LanguageID=' + lid);
  }
  public GetAdmin_Sponsored_Label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_Sponsored_Label?LanguageID=' + lid);
  }
  public GetAdmin_DoctorMyAppointments_Label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_DoctorMyAppointments_Label?LanguageID=' + lid);
  }
  public GetAdmin_DoctorLoginPMR_Label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_DoctorLoginPMR_Label?LanguageID=' + lid);
  }
  public GetAdmin_DoctorLoginArticleAppointmentReport_Lable(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_DoctorLoginArticleAppointmentReport_Lable?LanguageID=' + lid);
  }

  public GetAdmin_DoctorLoginFeedbackWorkingDetails_Label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_DoctorLoginFeedbackWorkingDetails_Label?LanguageID=' + lid);
  }
  public GetAdmin_DoctorLoginSickSlipGenerator_label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_DoctorLoginSickSlipGenerator_label?LanguageID=' + lid);
  }
  public GetAdmin_PharmacyLoginDoctorPrescriptionReports_label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_PharmacyLoginDoctorPrescriptionReports_label?LanguageID=' + lid);
  }
  public GetAdmin_PharmacyLoginOffers_Lable(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_PharmacyLoginOffers_Lable?LanguageID=' + lid);
  }
  public GetAdmin_DiagnosticLoginOrdersAndOrderReport_Label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_DiagnosticLoginOrdersAndOrderReport_Label?LanguageID=' + lid);
  }
  public GetAdmin_NurseLoginAppointmentReportWorkingDetails_Lable(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_NurseLoginAppointmentReportWorkingDetails_Lable?LanguageID=' + lid);
  }
  public GetAdmin_PhysiotherapistLoginsAppointmentsReportworkingDetails_Label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_PhysiotherapistLoginsAppointmentsReportworkingDetails_Label?LanguageID=' + lid);
  }
  public Getadmin_DeliveryLoginsOrdersEmployee_Label(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/Getadmin_DeliveryLoginsOrdersEmployee_Label?LanguageID=' + lid);
  }
  public GetAdmin_LoginPage_Labels(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_LoginPage_Labels?LanguageID=' + lid);
  }


  //language finish

  public UpdateDiagnosticAppointmentsByDiaCanceeled(aid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/UpdateDiagnosticAppointmentsByDiaCanceeled?AppointmentID=' + aid);
  }
  public UpdateBookAppointmentByDocCancel(aid) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBookAppointmentByDocCancel?AppointmentID=' + aid);
  }
  public UpdateBook_Physio_AppointmentNotVisitedBit(aid) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBook_Physio_AppointmentNotVisitedBit?AppointmentID=' + aid);
  }
  public UpdateBook_Midwives_AppointmentNotVisitedBit(aid) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBook_Midwives_AppointmentNotVisitedBit?AppointmentID=' + aid);
  }
  public UpdateBook_Nurse_AppointmentNotVisitedBit(aid) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBook_Nurse_AppointmentNotVisitedBit?AppointmentID=' + aid);
  }

  //service master

  public GetDepartmentMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDepartmentMasterByLanguageID?LanguageID=' + lid);
  }
  public GetDoctorTypeMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDoctorTypeMasterByLanguageID?LanguageID=' + lid);
  }
  public GetFacilitiesMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetFacilitiesMasterByLanguageID?LanguageID=' + lid);
  }
  public GetInsuranceMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetInsuranceMasterByLanguageID?LanguageID=' + lid);
  }
  public GetDegreeMasterBylanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDegreeMasterBylanguageID?LanguageID=' + lid);
  }
  public GetSpecilaizationMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetSpecilaizationMasterByLanguageID?LanguageID=' + lid);
  }
  public GetServiceMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetServiceMasterByLanguageID?LanguageID=' + lid);
  }
  public GetMedicineTypeMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetMedicineTypeMasterByLanguageID?LanguageID=' + lid);
  }
  public GetWhenToConsumeMasterMedicalsByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetWhenToConsumeMasterMedicalsByLanguageID?LanguageID=' + lid);
  }
  public GetDiagnosticTestTypeMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDiagnosticTestTypeMasterByLanguageID?LanguageID=' + lid);
  }
  public GetDiagnosticTestMasterByTestIDByLanguageID(tid, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDiagnosticTestMasterByTestIDByLanguageID?TestTypeID=' + tid + '&LanguageID=' + lid);
  }
  public GetBookingTypeMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetBookingTypeMasterByLanguageID?LanguageID=' + lid);
  }
  public GetBookAppointmentTypeMasterWebByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetBookAppointmentTypeMasterWebByLanguageID?LanguageID=' + lid);
  }
  public GetDaysMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDaysMasterByLanguageID?LanguageID=' + lid);
  }
  public GetServiceMasterByDepartmentIDAndLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetServiceMasterByDepartmentIDAndLanguageID?DepartmentID=' + did + '&LanguageID=' + lid);
  }
  public GetCountryMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetCountryMasterByLanguageID?LanguageID=' + lid);
  }
  public GetAreaMasterByCityIDAndLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetAreaMasterByCityIDAndLanguageID?CityID=' + did + '&LanguageID=' + lid);
  }
  public GetCityMasterBYIDandLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetCityMasterBYIDandLanguageID?CountryID=' + did + '&LanguageID=' + lid);
  }

  public GetHospital_ClinicForAdminByAdmin(did) {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospital_ClinicForAdminByAdmin?LanguageID=' + did);
  }
  public GetDoctorForAdminByLanguageID(did) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDoctorForAdminByLanguageID?LanguageID=' + did);
  }
  public GetDiagnosticForAdminByLanguageID(did) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDiagnosticForAdminByLanguageID?LanguageID=' + did);
  }
  public GetPharmacyForAdminByLanguageID(did) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetPharmacyForAdminByLanguageID?LanguageID=' + did);
  }
  public GetNurseRegistrationAdminByLanguageID(did) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetNurseRegistrationAdminByLanguageID?LanguageID=' + did);
  }
  public GetPhysiotherapyRegistrationAdminByLanguageID(did) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetPhysiotherapyRegistrationAdminByLanguageID?LanguageID=' + did);
  }
  public GetMidWivesRegistrationByLanguageID(did) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetMidWivesRegistrationByLanguageID?LanguageID=' + did);
  }
  public GetDeliveryCompanyAdminByLanguageID(did) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDeliveryCompanyAdminByLanguageID?LanguageID=' + did);
  }

  public GetHospital_ClinicDetailsForAdminByLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetHospital_ClinicDetailsForAdminByLanguageID?Hospital_ClinicID=' + did + '&LanguageID=' + lid);
  }
  public GetDoctorDetailsForAdminByLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDoctorDetailsForAdminByLanguageID?DoctorID=' + did + '&LanguageID=' + lid);
  }
  public GetDoctorEducationWebByLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDoctorEducationWebByLanguageID?DoctorID=' + did + '&LanguageID=' + lid);
  }
  public GetDoctorServicesAdminByLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDoctorServicesAdminByLanguageID?DoctorID=' + did + '&LanguageID=' + lid);
  }
  public GetDiagnosticDetailsForAdminByLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDiagnosticDetailsForAdminByLanguageID?DiagnosticID=' + did + '&LanguageID=' + lid);
  }
  public GetPhamacyDetailsForAdminByLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetPhamacyDetailsForAdminByLanguageID?PharmacyID=' + did + '&LanguageID=' + lid);
  }
  public GetNurseRegistrationByIDAndLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetNurseRegistrationByIDAndLanguageID?ID=' + did + '&LanguageID=' + lid);
  }
  public GePhysiotherapyRegistrationByIDandLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GePhysiotherapyRegistrationByIDandLanguageID?ID=' + did + '&LanguageID=' + lid);
  }
  public GetMidWivesRegistrationByIDAndLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetMidWivesRegistrationByIDAndLanguageID?ID=' + did + '&LanguageID=' + lid);
  }
  public GetDeliveryCompanyByIDAndLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDeliveryCompanyByIDAndLanguageID?ID=' + did + '&LanguageID=' + lid);
  }
  public GetDoctorListByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDoctorListByLanguageID?LanguageID=' + lid);
  }
  public GetAllHospital_ClinicListByIDByLanguageID(hid, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetAllHospital_ClinicListByIDByLanguageID?Hospital_ClinicID=' + hid + '&LanguageID=' + lid);
  }
  public GetDiagnosticCenterListByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDiagnosticCenterListByLanguageID?LanguageID=' + lid);
  }
  public GetDiagnosticTestMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDiagnosticTestMasterByLanguageID?LanguageID=' + lid);
  }
  public GetDoctor_PatientDiagnosticsByPatient(patientid, lid, doctorid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctor_PatientDiagnosticsByPatient?PateintID=' + patientid + '&LanguageID=' + lid + '&DoctorID=' + doctorid);
  }




  public InsertNurse_ChatMaster(data) {
    this.url = this.host + '/Admin/InsertNurse_ChatMaster';
    return this.http.post(this.url, data)
  }
  public InsertPharmacy_ChatDetails(data) {
    this.url = this.host + '/Admin/InsertPharmacy_ChatDetails';
    return this.http.post(this.url, data)
  }
  public GetNurseChatID(nid, pid) {

    return this.http.get<any[]>(this.host + '/Admin/GetNurseChatID?NurseID=' + nid + '&PatientID=' + pid);
  }
  public InserPharmacy_ChatMaster(data) {
    this.url = this.host + '/Admin/InserPharmacy_ChatMaster';
    return this.http.post(this.url, data)
  }
  public GetPharmacyChatID(nid, pid, appid) {

    return this.http.get<any[]>(this.host + '/Admin/GetPharmacyChatID?PharmacyID=' + nid + '&PatientID=' + pid + '&AppointmentID=' + appid);
  }
  public GetPharmacy_ChatDetails(cid) {

    return this.http.get<any[]>(this.host + '/Admin/GetPharmacy_ChatDetails?ChatID=' + cid);
  }
  public GetChatForNotificationForPharmacy(cid) {

    return this.http.get<any[]>(this.host + '/Admin/GetChatForNotificationForPharmacy?PharmacyID=' + cid);
  }
  public InsertNurse_ChatDetails(data) {
    this.url = this.host + '/Admin/InsertNurse_ChatDetails';
    return this.http.post(this.url, data)
  }
  public UpdateNotifications_DoctorSeenBit(lid) {

    return this.http.get<any[]>(this.host + '/Admin/UpdateNotifications_DoctorSeenBit?ID=' + lid);
  }

  public GetDoctorsByHospitalClicniID(hid, lid, sdate, edate) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorsByHospitalClicniID?HospitalID=' + hid + '&LanguageID=' + lid + '&Sdate=' + sdate + '&Edate=' + edate);
  }

  public GetAdmin_Mastersss_Labels(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_Mastersss_Labels?LanguageID=' + lid);
  }
  public GetAdmin_Masters_labels(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_Masters_labels?LanguageID=' + lid);
  }


  public GetCategorydashboard_Labels(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetCategorydashboard_Labels?LanguageID=' + lid);
  }
  public InsertCountryMaster(data) {
    this.url = this.host + '/Master/InsertCountryMaster';
    return this.http.post(this.url, data)
  }

  public DeleteCountryMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteCountryMaster?ID=' + lid);
  }
  public UpdateCountryMaster_Web(data) {
    this.url = this.host + '/Master/UpdateCountryMaster_Web';
    return this.http.post(this.url, data)
  }
  public InsertCityMaster(data) {
    this.url = this.host + '/Master/InsertCityMaster';
    return this.http.post(this.url, data)
  }
  public GetCityMasterByLangID(lid) {

    return this.http.get<any[]>(this.host + '/Master/GetCityMasterByLangID?LanguageID=' + lid);
  }
  public DeleteCityMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteCityMaster?ID=' + lid);
  }
  public UpdateCityMaster_Web(data) {
    this.url = this.host + '/Master/UpdateCityMaster_Web';
    return this.http.post(this.url, data)
  }
  public InsertAreaMaster(data) {
    this.url = this.host + '/Master/InsertAreaMaster';
    return this.http.post(this.url, data)
  }
  public GetAreaMasterByLangID(lid) {

    return this.http.get<any[]>(this.host + '/Master/GetAreaMasterByLangID?LanguageID=' + lid);
  }
  public DeleteAreaMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteAreaMaster?ID=' + lid);
  }
  public UpdateAreaMaster_Web(data) {
    this.url = this.host + '/Master/UpdateAreaMaster_Web';
    return this.http.post(this.url, data)
  }
  public InsertComplaintMaster(data) {
    this.url = this.host + '/Master/InsertComplaintMaster';
    return this.http.post(this.url, data)
  }
  public GetCompalintMasterLangID(lid) {

    return this.http.get<any[]>(this.host + '/Master/GetCompalintMasterLangID?LanguageID=' + lid);
  }
  public DeleteComplaintMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteComplaintMaster?ID=' + lid);
  }
  public UpdateComplaintMaster(data) {
    this.url = this.host + '/Master/UpdateComplaintMaster';
    return this.http.post(this.url, data)
  }
  public InsertSpecilaizationMaster(data) {
    this.url = this.host + '/Master/InsertSpecilaizationMaster';
    return this.http.post(this.url, data)
  }
  public UpdateSpecilaizationMaster_Web(data) {
    this.url = this.host + '/Master/UpdateSpecilaizationMaster_Web';
    return this.http.post(this.url, data)
  }
  public DeleteSpecilaizationMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteSpecilaizationMaster?ID=' + lid);
  }
  public InsertFacilitiesMaster(data) {
    this.url = this.host + '/Master/InsertFacilitiesMaster';
    return this.http.post(this.url, data)
  }
  public UpdateFacilitiesMaster_Web(data) {
    this.url = this.host + '/Master/UpdateFacilitiesMaster_Web';
    return this.http.post(this.url, data)
  }
  public DeleteFacilitiesMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteFacilitiesMaster?ID=' + lid);
  }
  public InsertMedicineTypeMaster(data) {
    this.url = this.host + '/Master/InsertMedicineTypeMaster';
    return this.http.post(this.url, data)
  }
  public DeleteMedicineTypeMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteMedicineTypeMaster?ID=' + lid);
  }
  public UpdateMedicineTypeMaster(data) {
    this.url = this.host + '/Master/UpdateMedicineTypeMaster';
    return this.http.post(this.url, data)
  }
  public InsertInsuranceMaster(data) {
    this.url = this.host + '/Master/InsertInsuranceMaster';
    return this.http.post(this.url, data)
  }
  public UpdateInsuranceMaster_Web(data) {
    this.url = this.host + '/Master/UpdateInsuranceMaster_Web';
    return this.http.post(this.url, data)
  }
  public DeleteInsuranceMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteInsuranceMaster?ID=' + lid);
  }

  public DeleteDegreeMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteDegreeMaster?ID=' + lid);
  }
  public InsertDegreeMaster(data) {
    this.url = this.host + '/Master/InsertDegreeMaster';
    return this.http.post(this.url, data)
  }
  public UpdateDegreeMaster_Web(data) {
    this.url = this.host + '/Master/UpdateDegreeMaster_Web';
    return this.http.post(this.url, data)
  }
  public InsertWhenToConsumeMasterMedicals(data) {
    this.url = this.host + '/Master/InsertWhenToConsumeMasterMedicals';
    return this.http.post(this.url, data)
  }
  public UpdateWhenToConsumeMasterMedicals_Web(data) {
    this.url = this.host + '/Master/UpdateWhenToConsumeMasterMedicals_Web';
    return this.http.post(this.url, data)
  }

  public DeleteWhenToConsumeMasterMedicals(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteWhenToConsumeMasterMedicals?ID=' + lid);
  }
  public GetBloodGroupMasterWeb(lid) {

    return this.http.get<any[]>(this.host + '/Master/GetBloodGroupMasterWeb?LanguageID=' + lid);
  }
  public InsertBloodGroupMaster(data) {
    this.url = this.host + '/Master/InsertBloodGroupMaster';
    return this.http.post(this.url, data)
  }
  public UpdateBloodGroupMaster_French(data) {
    this.url = this.host + '/Master/UpdateBloodGroupMaster_French';
    return this.http.post(this.url, data)
  }

  public InsertDepartmentMasterWeb(data) {
    this.url = this.host + '/Master/InsertDepartmentMasterWeb';
    return this.http.post(this.url, data)
  }
  public DeleteDepartmentMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteDepartmentMaster?ID=' + lid);
  }
  public UpdateDepartmentMaster_Web(data) {
    this.url = this.host + '/Master/UpdateDepartmentMaster_Web';
    return this.http.post(this.url, data)
  }
  public InsertServiceMasterWeb(data) {
    this.url = this.host + '/Master/InsertServiceMasterWeb';
    return this.http.post(this.url, data)
  }

  public GetServiceMasterWeb(lid) {

    return this.http.get<any[]>(this.host + '/Master/GetServiceMasterWeb?LanguageID=' + lid);
  }
  public UpdateServiceMaster_Web(data) {
    this.url = this.host + '/Master/UpdateServiceMaster_Web';
    return this.http.post(this.url, data)
  }
  public DeleteServiceMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteServiceMaster?ID=' + lid);
  }
  public GetPatientRegistrationMisuseBit(lid) {

    return this.http.get<any[]>(this.host + '/Master/GetPatientRegistrationMisuseBit?ID=' + lid);
  }

  public GetPatientRegistrationMisuseEnablebit(lid) {

    return this.http.get<any[]>(this.host + '/Master/GetPatientRegistrationMisuseEnablebit?ID=' + lid);
  }
  public UpdatePatientRegistrationMisUseComments(data) {
    this.url = this.host + '/Master/UpdatePatientRegistrationMisUseComments';
    return this.http.post(this.url, data)
  }


  //chat
  public GetChatID(did, pid, appid) {

    // return this.http.get<any[]>('http://14.192.17.225/MongoAPI/Api/Employee/GetChatId?DoctorID=' + did + '&PatientID=' + pid);
    // return this.http.get<any[]>('http://localhost:44317/Api/Employee/GetChatId?DoctorID=' + did + '&PatientID=' + pid);
    return this.http.get<any[]>(this.host + '/Admin/GetChatID?DoctorID=' + did + '&PatientID=' + pid + '&AppointmentID=' + appid);
  }
  public InsertChatMaster(data) {
    // this.url = 'http://14.192.17.225/MongoAPI/Api/Employee/InsertChatMaster';
    // this.url = 'http://localhost:44317/Api/Employee/InsertChatMaster';
    this.url = this.host + '/Admin/InsertChatMaster';
    return this.http.post(this.url, data)
  }
  public InsertChatDetails(data) {
    // this.url = 'http://14.192.17.225/MongoAPI/Api/Employee/InsertChatDetails';
    // this.url = 'http://localhost:44317/Api/Employee/InsertChatMaster';
    this.url = this.host + '/Admin/InsertChatDetails';

    return this.http.post(this.url, data)
  }

  public GetChatDetails(did) {

    // return this.http.get<any[]>('http://14.192.17.225/MongoAPI/Api/Employee/GetChatDetailsById?ChatID=' + did);
    // return this.http.get<any[]>('http://localhost:44317/Api/Employee/GetChatDetailsById?ChatID=' + did);
    // return this.http.get<any[]>(this.host + '/Admin/GetChatDetails?ChatID=' + did);

    return this.http.get<any[]>(this.host + '/Admin/GetChatDetails?ChatID=' + did);
  }


  public DeleteDiagnosticTestTypeMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteDiagnosticTestTypeMaster?ID=' + lid);
  }

  public InsertDiagnosticTestTypeMaster(data) {
    this.url = this.host + '/Master/InsertDiagnosticTestTypeMaster';
    return this.http.post(this.url, data)
  }

  public UpdateDiagnosticTestTypeMaster(data) {
    this.url = this.host + '/Master/UpdateDiagnosticTestTypeMaster';
    return this.http.post(this.url, data)
  }
  public InsertDiagnosticTestMaster(data) {
    this.url = this.host + '/Master/InsertDiagnosticTestMaster';
    return this.http.post(this.url, data)
  }


  public GetDiagnosticTestMasterByLangID(lid) {

    return this.http.get<any[]>(this.host + '/Master/GetDiagnosticTestMasterByLangID?LanguageID=' + lid);
  }

  public DeleteDiagnosticTestMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteDiagnosticTestMaster?ID=' + lid);
  }

  public UpdateDiagnosticTestMaster(data) {
    this.url = this.host + '/Master/UpdateDiagnosticTestMaster';
    return this.http.post(this.url, data)
  }

  public DeleteBloodGroupMaster(lid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteBloodGroupMaster?ID=' + lid);
  }
  public GetPatientRegistration(sdate, edate) {

    return this.http.get<any[]>(this.host + "/Master/GetPatientRegistration?Sdate=" + sdate + '&Edate=' + edate);
  }
  public DeletePatientRegistration(id) {

    return this.http.get<any[]>(
      this.host + "/Master/DeletePatientRegistration?ID=" + id
    );
  }
  public EnablePatientRegistration(id) {

    return this.http.get<any[]>(
      this.host + "/Master/EnablePatientRegistration?ID=" + id
    );
  }


  public GetBookAppointmentByDocID(sdate, edate, docid, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetBookAppointmentByDocID?SDate=" + sdate +
      "&EDate=" + edate + "&DoctorID=" + docid + '&LanguageID=' + lid);
    return this.http.get(this.url);
  }


  public GetAdminDashboardCounts(lid, sdate, edate) {

    return this.http.get<any[]>(this.host + "/Master/GetAdminDashboardCounts?LanguageID=" + lid + "&Sdate=" + sdate +
      "&Edate=" + edate);
    return this.http.get(this.url);
  }
  public GetPatientCurrentMedicationByID(appid) {

    return this.http.get<any[]>(this.host + "/Master/GetPatientCurrentMedicationByID?AppointmentID=" + appid);
  }

  public GetHospital_ClinicDetailsMaster(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetHospital_ClinicDetailsMaster?SDate=" + sdate +
      "&EDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }

  public GetHospital_ClinicDetailsMasterForwebClinics(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetHospital_ClinicDetailsMasterForwebClinics?SDate=" + sdate +
      "&EDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }
  public GetPhamacyDetailsForWeb(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetPhamacyDetailsForWeb?SDate=" + sdate +
      "&EDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }



  public GetNurseRegistrationForWeb(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetNurseRegistrationForWeb?SDate=" + sdate +
      "&EDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }

  public GetPhysiotherapyRegistrationForWeb(lid, sdate, edate) {

    return this.http.get<any[]>(this.host + "/Master/GetPhysiotherapyRegistrationForWeb?LanguageID=" + lid + "&SDate=" + sdate +
      "&EDate=" + edate);
    return this.http.get(this.url);
  }
  public GetMidWivesRegistrationForWeb(lid, sdate, edate) {

    return this.http.get<any[]>(this.host + "/Master/GetMidWivesRegistrationForWeb?LanguageID=" + lid + "&SDate=" + sdate +
      "&EDate=" + edate);
    return this.http.get(this.url);
  }

  public GetDiagnosticDetailsForWeb(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetDiagnosticDetailsForWeb?SDate=" + sdate +
      "&EDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }

  public GetAllAppointmentsForHosp(sdate, edate) {

    return this.http.get<any[]>(this.host + "/Master/GetAllAppointmentsForHosp?SDate=" + sdate +
      "&EDate=" + edate);
    return this.http.get(this.url);
  }

  public GetBook_Book_Midwives_AppointmentForWeb(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetBook_Book_Midwives_AppointmentForWeb?SDate=" + sdate +
      "&EDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }
  public GetBook_Physio_AppointmentForWeb(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetBook_Physio_AppointmentForWeb?SDate=" + sdate +
      "&EDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }
  public GetBook_Nurse_AppointmentForWeb(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetBook_Nurse_AppointmentForWeb?SDate=" + sdate +
      "&EDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }

  public GetPatient_TextMedicineDetailsForWeb(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetPatient_TextMedicineDetailsForWeb?SDate=" + sdate +
      "&EDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }



  public GetDiagnosticAppointmentsByApprovedReportsWeb(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetDiagnosticAppointmentsByApprovedReportsWeb?StartDate=" + sdate +
      "&EndDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }

  public GetDoctorForAdminByLanguageIDWeb(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetDoctorForAdminByLanguageIDWeb?Sdate=" + sdate +
      "&Edate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }

  public GetCancelledAppointmentReportsForDoctorwEB(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetCancelledAppointmentReportsForDoctorwEB?StartDate=" + sdate +
      "&EndDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }
  public GetCancelledAppointmentReportsForVideoAppts(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + "/Master/GetCancelledAppointmentReportsForVideoAppts?StartDate=" + sdate +
      "&EndDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }
  public GetAllAppointmentsForClinics(sdate, edate) {

    return this.http.get<any[]>(this.host + "/Master/GetAllAppointmentsForClinics?SDate=" + sdate +
      "&EDate=" + edate);
    return this.http.get(this.url);
  }

  public GetDoctorHospitalDetailsDoctors(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorHospitalDetailsDoctors?LanguageID=" + lid
    );
  }

  public GetDoctorHospitalsByDoctorID(lid, docid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorHospitalsByDoctorID?LanguageID=" + lid + '&DoctorID=' + docid
    );
  }

  public GetTreatementPlanMaster(lid, depid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetTreatementPlanMaster?LanguageID=" + lid + '&DepartmentID=' + depid
    );
  }

  public InsertDoctorCommissionFees(data) {
    this.url = this.host + '/Doctor/InsertDoctorCommissionFees';
    return this.http.post(this.url, data)
  }


  public DoctorCommissionFees(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DoctorCommissionFees?LanguageID=" + lid
    );
  }

  public UpdateSalesRegistrationOTP(data) {
    this.url = this.host + '/Doctor/UpdateSalesRegistrationOTP';
    return this.http.post(this.url, data)
  }

  public GetSalesRegistrationOTP(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetSalesRegistrationOTP?ID=" + id
    );
  }

  public InsertLocalDoctorRegistration(data) {
    this.url = this.host + '/Doctor/InsertLocalDoctorRegistration';
    return this.http.post(this.url, data)
  }

  public GetLocalDoctorRegistration(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetLocalDoctorRegistration?LanguageID=" + id
    );
  }

  public DeleteLocalDoctorRegistration(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteLocalDoctorRegistration?ID=" + id
    );
  }

  public GetLocalDoctorRegistrationUnameAndPwd(uname, pwd, pinno) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetLocalDoctorRegistrationUnameAndPwd?UserName=" + uname + '&Password=' + pwd + '&Pinno=' + pinno
    );
  }

  public GetAdmin_LocalDoctor_Labels(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetAdmin_LocalDoctor_Labels?LanguageID=" + id
    );
  }
  public GetLocalDoctorRegistrationByDoctorID(ID, lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetLocalDoctorRegistrationByDoctorID?ID=" + ID + '&LanguageID=' + lid
    );
  }
  public UpdateLocalDoctorRegistration(data) {
    this.url = this.host + '/Doctor/UpdateLocalDoctorRegistration';
    return this.http.post(this.url, data)
  }
  public InsertAnnouncements(data) {
    this.url = this.host + '/Doctor/InsertAnnouncements';
    return this.http.post(this.url, data)
  }


  public UpdateAnnouncements(data) {
    this.url = this.host + '/Doctor/UpdateAnnouncements';
    return this.http.post(this.url, data)
  }

  public GetAnnouncements(sdate, edate, lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetAnnouncements?Sdate=" + sdate + '&Edate=' + edate + '&LanguageID=' + lid
    );
  }
  public DeleteAnnouncements(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteAnnouncements?ID=" + id
    );
  }

  public DeleteDoctorCommissionFees(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteDoctorCommissionFees?ID=" + id
    );
  }
  public InsertTreatmentPlanMaster(data) {
    this.url = this.host + '/Doctor/InsertTreatmentPlanMaster';
    return this.http.post(this.url, data)
  }
  public GetTreatmentPlanMaster(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetTreatmentPlanMaster?LanguageID=" + lid
    );
  }
  public DeleteTreatmentPlanMaster(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteTreatmentPlanMaster?ID=" + id
    );
  }
  public UpdateTreatmentPlanMaster(data) {
    this.url = this.host + '/Doctor/UpdateTreatmentPlanMaster';
    return this.http.post(this.url, data)
  }

  public GetNurseHospitalDetailsNurses(lid) {

    return this.http.get<any[]>(
      this.host + "/Admin/GetNurseHospitalDetailsNurses?LanguageID=" + lid
    );
  }


  public GetNurseHospitalDetailsByHospitals(nid, lid) {

    return this.http.get<any[]>(
      this.host + "/Admin/GetNurseHospitalDetailsByHospitals?NurseID=" + nid + '&LanguageID=' + lid
    );
  }
  public InsertNurseCommissionDeatails(data) {
    this.url = this.host + '/Doctor/InsertNurseCommissionDeatails';
    return this.http.post(this.url, data)
  }
  public GetNurseCommissionDeatails(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetNurseCommissionDeatails?LanguageID=" + lid
    );
  }
  public DeleteNurseCommissionDeatails(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteNurseCommissionDeatails?ID=" + id
    );
  }

  public GetPhysiotherapyHospitalDetails(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPhysiotherapyHospitalDetails?LanguageID=" + lid
    );
  }
  public GetPhysiotherapyHospitalDetailsByHospitals(pid, lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPhysiotherapyHospitalDetailsByHospitals?PhysiotherapyID=" + pid + '&LanguageID=' + lid
    );
  }
  public InsertPhsyioTherapistCommissionDeatails(data) {
    this.url = this.host + '/Doctor/InsertPhsyioTherapistCommissionDeatails';
    return this.http.post(this.url, data)
  }
  public GetPhsyioTherapistCommissionDeatails(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPhsyioTherapistCommissionDeatails?LanguageID=" + lid
    );
  }

  public DeletePhsyioTherapistCommissionDeatails(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DeletePhsyioTherapistCommissionDeatails?ID=" + id
    );
  }
  public GetMidWifeHospitalDetails(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetMidWifeHospitalDetails?LanguageID=" + lid
    );
  }
  public GetMidWifeHospitalDetailsByHospitals(MidWifeID, lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetMidWifeHospitalDetailsByHospitals?MidWifeID=" + MidWifeID + '&LanguageID=' + lid
    );
  }

  public InsertMidWifeCommissionDeatails(data) {
    this.url = this.host + '/Doctor/InsertMidWifeCommissionDeatails';
    return this.http.post(this.url, data)
  }

  public GetMidWifeCommissionDeatails(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetMidWifeCommissionDeatails?LanguageID=" + lid
    );
  }

  public GetLocalDoctorRegistrationByCityID(cid, CityID, areaid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetLocalDoctorRegistrationByCityID?CountryID=" + cid + '&CityID=' + CityID + '&AreaID=' + areaid
    );
  }


  public GetDoctor_PatientPrescriptionbyLocalDOcID(cid, sdate, edate, lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctor_PatientPrescriptionbyLocalDOcID?LocalDoctorID=" + cid + '&Sdate=' + sdate + '&Edate=' + edate + '&LanguageID=' + lid
    );
  }

  public UpdateDoctor_PatientPrescription(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/UpdateDoctor_PatientPrescription?AppointmentID=" + id
    );
  }



  public UpdateDoctor_PatientPrescriptionNewPrescription(data) {
    this.url = this.host + '/Doctor/UpdateDoctor_PatientPrescriptionNewPrescription';
    return this.http.post(this.url, data)
  }

  public GetPatientWalletDetails(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPatientWalletDetails?LanguageID=" + lid
    );
  }

  public InsertPatient_WalletLog(data) {
    this.url = this.host + '/Doctor/InsertPatient_WalletLog';
    return this.http.post(this.url, data)
  }

  public UpdatePatientWalletDetails(data) {
    this.url = this.host + '/Doctor/UpdatePatientWalletDetails';
    return this.http.post(this.url, data)
  }

  public GetDoctorCommissionFeesByAdminRevenue(sdate, edate, hospitalid, cityid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorCommissionFeesByAdminRevenue?Sdate=" + sdate + '&Edate=' + edate + '&HospitalID=' + hospitalid + '&CityID=' + cityid
    );
  }

  public GetNurseCommissionDeatailsAdminRevenue(sdate, edate, hospitalid, cityid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetNurseCommissionDeatailsAdminRevenue?Sdate=" + sdate + '&Edate=' + edate + '&HospitalID=' + hospitalid + '&CityID=' + cityid
    );
  }


  //nurse revenue


  public GetNurseAllRevenueByAdmin(sdate, edate, hospitalid, cityid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetNurseAllRevenueByAdmin?Sdate=" + sdate + '&Edate=' + edate + '&HospitalID=' + hospitalid + '&CityID=' + cityid
    );
  }


  public GetMidWifeCommissionDeatailsAdminRevenue(sdate, edate, hospitalid, cityid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetMidWifeCommissionDeatailsAdminRevenue?Sdate=" + sdate + '&Edate=' + edate + '&HospitalID=' + hospitalid + '&CityID=' + cityid
    );
  }

  public GetPhsyioTherapistCommissionDeatailsAdminRevenue(sdate, edate, HospitalID, cityid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPhsyioTherapistCommissionDeatailsAdminRevenue?Sdate=" + sdate + '&Edate=' + edate + '&HospitalID=' + HospitalID + '&CityID=' + cityid
    );
  }

  public GetPatientPaymentDetailsAdminDoctorsCommission(sdate, edate) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPatientPaymentDetailsAdminDoctorsCommission?Sdate=" + sdate + '&Edate=' + edate
    );
  }

  public GetNurse_PatientPaymentDetailsNurseRevenue(sdate, edate) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetNurse_PatientPaymentDetailsNurseRevenue?Sdate=" + sdate + '&Edate=' + edate
    );
  }

  public GetMidWife_PatientPaymentDetailsAdminRevenue(sdate, edate) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetMidWife_PatientPaymentDetailsAdminRevenue?Sdate=" + sdate + '&Edate=' + edate
    );
  }

  public GetPhysiotherapist_PatientPaymentDetailsAdminRevenue(sdate, edate) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPhysiotherapist_PatientPaymentDetailsAdminRevenue?Sdate=" + sdate + '&Edate=' + edate
    );
  }


  public GetDoctorCommissionFeesByAdminRevenueByInclinRevenueByDocID(sdate, edate, docid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorCommissionFeesByAdminRevenueByInclinRevenueByDocID?Sdate=" + sdate + '&Edate=' + edate + '&DoctorID=' + docid
    );
  }
  public GetDoctorCommissionFeesByAdminRevenueByVedoevenueByDocID(sdate, edate, docid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorCommissionFeesByAdminRevenueByVedoevenueByDocID?Sdate=" + sdate + '&Edate=' + edate + '&DoctorID=' + docid
    );
  }


  public GetPatientPaymentDetailsDoctorsCommissionByDoctorIDVedioappts(sdate, edate, docid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPatientPaymentDetailsDoctorsCommissionByDoctorIDVedioappts?Sdate=" + sdate + '&Edate=' + edate + '&DoctorID=' + docid
    );
  }
  public GetPatientPaymentDetailsDoctorsCommissionByDoctorID(sdate, edate, docid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPatientPaymentDetailsDoctorsCommissionByDoctorID?Sdate=" + sdate + '&Edate=' + edate + '&DoctorID=' + docid
    );
  }

  public GetNurseCommissionDeatailsAdminRevenueByNurseID(sdate, edate, docid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetNurseCommissionDeatailsAdminRevenueByNurseID?Sdate=" + sdate + '&Edate=' + edate + '&NurseID=' + docid
    );
  }
  public GetNurse_PatientPaymentDetailsNurseRevenueByNurseID(sdate, edate, docid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetNurse_PatientPaymentDetailsNurseRevenueByNurseID?Sdate=" + sdate + '&Edate=' + edate + '&NurseID=' + docid
    );
  }

  public GetPhsyioTherapistCommissionDeatailsByPhysioID(sdate, edate, docid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPhsyioTherapistCommissionDeatailsByPhysioID?Sdate=" + sdate + '&Edate=' + edate + '&PhysiotherepistID=' + docid
    );
  }
  public GetPhysiotherapist_PatientPaymentDetailsComnmissionByPhysioID(sdate, edate, docid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPhysiotherapist_PatientPaymentDetailsComnmissionByPhysioID?Sdate=" + sdate + '&Edate=' + edate + '&PhysiotherepistID=' + docid
    );
  }



  public GetMidWifeCommissionDeatailsByMidWifeID(sdate, edate, docid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetMidWifeCommissionDeatailsByMidWifeID?Sdate=" + sdate + '&Edate=' + edate + '&MidwifeID=' + docid
    );
  }
  public GetMidWife_PatientPaymentCommissionByMidwifeID(sdate, edate, docid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetMidWife_PatientPaymentCommissionByMidwifeID?Sdate=" + sdate + '&Edate=' + edate + '&MidwifeID=' + docid
    );
  }

  public GetMeridionalAdmin_LoginUnameAndPwd(uname, pwd, pinno) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetMeridionalAdmin_LoginUnameAndPwd?UserName=" + uname + '&Password=' + pwd + '&Pinno=' + pinno
    );
  }

  public InsertSupportRegistration(data) {
    this.url = this.host + '/Doctor/InsertSupportRegistration';
    return this.http.post(this.url, data)
  }
  public GetSupportRegistrationUnameAndPwd(uname, pwd, pinno) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetSupportRegistrationUnameAndPwd?UserName=" + uname + '&Password=' + pwd + '&Pinno=' + pinno
    );
  }
  public UpdateSupportRegistration(data) {
    this.url = this.host + '/Doctor/UpdateSupportRegistration';
    return this.http.post(this.url, data)
  }
  public GetSupportRegistration(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetSupportRegistration?LanguageID=" + lid
    );
  }
  public DeleteSupportRegistration(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteSupportRegistration?ID=" + lid
    );
  }
  public GetSupportRegistrationByID(lid, id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetSupportRegistrationByID?LanguageID=" + lid + '&ID=' + id
    );
  }

  public GetSalesRegistration() {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetSalesRegistration"
    );
  }

  public DisableSalesRegistration(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DisableSalesRegistration?ID=" + lid
    );
  }

  public EnableSalesRegistration(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/EnableSalesRegistration?ID=" + lid
    );
  }

  public InsertSalesRegistration(data) {
    this.url = this.host + '/Doctor/InsertSalesRegistration';
    return this.http.post(this.url, data)
  }


  public getdoctorsbycityforexcel() {

    return this.http.get<any[]>(
      this.host + "/Doctor/getdoctorsbycityforexcel"
    );
  }
  public GetSupport(lid, id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetSupport?Sdate=" + lid + '&Edate=' + id
    );
  }

  public GetSupportResolvedBit(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetSupportResolvedBit?ID=" + lid
    );
  }

  public GetLocalDoctorRegistrationEnable() {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetLocalDoctorRegistrationEnable"
    );
  }
  public GetLocalDoctorRegistrationDisable() {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetLocalDoctorRegistrationDisable"
    );
  }
  public GetFrequentlyAskedQuestions(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetFrequentlyAskedQuestions?LanguageID=" + lid
    );
  }

  public GetAppointmentReportsForAdmin(sdate, enddate, lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetAppointmentReportsForAdmin?StartDate=" + sdate + '&EndDate=' + enddate + '&LanguageID=' + lid
    );
  }

  public GetBook_Nurse_AppointmentForWebAdmin(sdate, enddate, lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetBook_Nurse_AppointmentForWebAdmin?SDate=" + sdate + '&EDate=' + enddate + '&LanguageID=' + lid
    );
  }
  public GetBook_Book_Midwives_AppointmentForWebAdminReports(sdate, enddate, lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetBook_Book_Midwives_AppointmentForWebAdminReports?SDate=" + sdate + '&EDate=' + enddate + '&LanguageID=' + lid
    );
  }
  public GetBook_Physio_AppointmentForWebAdminReport(sdate, enddate, lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetBook_Physio_AppointmentForWebAdminReport?SDate=" + sdate + '&EDate=' + enddate + '&LanguageID=' + lid
    );
  }


  public InsertHowToUseVoilaDoc(data) {
    this.url = this.host + '/Doctor/InsertHowToUseVoilaDoc';
    return this.http.post(this.url, data)
  }

  public HowToUsePhoto(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Doctor/HowToUsePhoto/', formdata);
  }


  public GetHowToUseVoilaDoc(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetHowToUseVoilaDoc?LanguageID=" + lid
    );
  }

  public DeleteHowToUseVoilaDoc(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteHowToUseVoilaDoc?ID=" + id
    );
  }

  public InsertFrequentlyAskedQuestions(data) {
    this.url = this.host + '/Doctor/InsertFrequentlyAskedQuestions';
    return this.http.post(this.url, data)
  }
  public InsertDoctorTipsAndTricks(data) {
    this.url = this.host + '/Doctor/InsertDoctorTipsAndTricks';
    return this.http.post(this.url, data)
  }
  public UpdateFrequentlyAskedQuestions(data) {
    this.url = this.host + '/Doctor/UpdateFrequentlyAskedQuestions';
    return this.http.post(this.url, data)
  }
  public UpdateDoctorTipsAndTricks(data) {
    this.url = this.host + '/Doctor/UpdateDoctorTipsAndTricks';
    return this.http.post(this.url, data)
  }

  public DeleteDoctorTipsAndTricks(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteDoctorTipsAndTricks?ID=" + id
    );
  }

  public DeleteFrequentlyAskedQuestions(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteFrequentlyAskedQuestions?ID=" + id
    );
  }
  public GetDoctorTipsAndTricks(lid) {

    return this.http.get<any[]>(
      this.host1 + "/Doctor/GetDoctorTipsAndTricks?LanguageID=" + lid
    );
  }

  public GetHospital_ClinicForAdminByClinic(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetHospital_ClinicForAdminByClinic?LanguageID=" + id
    );
  }

  public DisableDoctorTipsAndTricks(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DisableDoctorTipsAndTricks?ID=" + id
    );
  }

  public DisableFrequentlyAskedQuestions(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DisableFrequentlyAskedQuestions?ID=" + id
    );
  }
  public DisableHowToUseVoilaDoc(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DisableHowToUseVoilaDoc?ID=" + id
    );
  }
  public EnableDoctorTipsAndTricks(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/EnableDoctorTipsAndTricks?ID=" + id
    );
  }

  public EnableHowToUseVoilaDoc(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/EnableHowToUseVoilaDoc?ID=" + id
    );
  }
  public EnableFrequentlyAskedQuestions(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/EnableFrequentlyAskedQuestions?ID=" + id
    );
  }

  public GetPatientWalletDetailsBySdateAndDate(sdate, edate, lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPatientWalletDetailsBySdateAndDate?Sdate=" + sdate + '&Edate=' + edate + '&LanguageID=' + lid
    );
  }
  public EnableAnnouncements(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/EnableAnnouncements?ID=" + id
    );
  }
  public DisableAnnouncements(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DisableAnnouncements?ID=" + id
    );
  }

  public Get12MonthsPatientRegistrationDetails(year) {

    return this.http.get<any[]>(
      this.host + "/Doctor/Get12MonthsPatientRegistrationDetails?Year=" + year
    );
  }

  public GetAdmin_FrequntlyAskedQuestions(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetAdmin_FrequntlyAskedQuestions?LanguageID=" + lid
    );
  }
  public InsertHowToUseDoctorsWeb(data) {
    this.url = this.host + '/Doctor/InsertHowToUseDoctorsWeb';
    return this.http.post(this.url, data)
  }

  public GetHowToUseDoctorsWeb(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetHowToUseDoctorsWeb?LanguageID=" + lid
    );
  }

  public DisableHowToUseDoctorsWeb(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DisableHowToUseDoctorsWeb?ID=" + lid
    );
  }
  public DeleteHowToUseDoctorsWeb(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteHowToUseDoctorsWeb?ID=" + lid
    );
  }

  public EnableHowToUseDoctorsWeb(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/EnableHowToUseDoctorsWeb?ID=" + lid
    );
  }

  public UpdateHowToUseDoctorsWeb(data) {
    this.url = this.host + '/Doctor/UpdateHowToUseDoctorsWeb';
    return this.http.post(this.url, data)
  }

  public GetCountrySwitch() {

    return this.http.get<any[]>(
      this.host1 + "/Doctor/GetCountrySwitch"
    );
  }

  //today

  public InsertDoctorReferals(data) {
    this.url = this.host + '/Doctor/InsertDoctorReferals';
    return this.http.post(this.url, data)
  }

  public InsertDoctorReferalAttachments(data) {
    this.url = this.host + '/Doctor/InsertDoctorReferalAttachments';
    return this.http.post(this.url, data)
  }

  public GetDoctorReferals(lid, TypeID, sdate, edate) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorReferals?DoctorID=" + lid + '&TypeID=' + TypeID + '&Sdate=' + sdate + '&Edate=' + edate
    );
  }

  public GetDoctorReferalAttachments(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorReferalAttachments?AppointmentID=" + lid
    );
  }
  public UpdateDoctorReferalsCompletedBit(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/UpdateDoctorReferalsCompletedBit?ID=" + lid
    );
  }
  public GetDoctorReferalsCount(lid, sdate, edate, langid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorReferalsCount?AssignDoctorID=" + lid + '&Sdate=' + sdate + '&Edate=' + edate + '&LanguageID=' + langid
    );
  }


  public GetSoapNotesByPatientRefereal(id, lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetSoapNotesByPatientRefereal?ID=" + id + '&LanguageID=' + lid
    );
  }

  public InsertPatientRegistrationForWeb(data) {
    this.url = this.host + '/Doctor/InsertPatientRegistrationForWeb';
    return this.http.post(this.url, data)
  }

  public GetArticleForAdminForWeb() {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetArticleForAdminForWeb"
    );
  }

  public GetEnableArticle(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetEnableArticle?ID=" + id
    );
  }
  public GetDisableArticle(id) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDisableArticle?ID=" + id
    );
  }

  public GetHospitalRevenueandCounts(hsid, sdate, edate) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetHospitalRevenueandCounts?HospitalID=" + hsid + '&Sdate=' + sdate + '&Edate=' + edate
    );
  }

  public GetHospitalAppointmentDetails(hsid, sdate, edate) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetHospitalAppointmentDetails?HospitalID=" + hsid + '&Sdate=' + sdate + '&Edate=' + edate
    );
  }
  public GetDoctorWorkingDetails(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorWorkingDetails?LanguageID=" + lid
    );
  }
  public GetMidWifeWorkingDetails(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetMidWifeWorkingDetails?LanguageID=" + lid
    );
  }
  public GetPhysiotherapyWorkingDetails(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPhysiotherapyWorkingDetails?LanguageID=" + lid
    );
  }
  public GetNurseWorkingDetils(lid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetNurseWorkingDetils?LanguageID=" + lid
    );
  }

  public InsertReceiptionistLogin(data) {
    this.url = this.host + '/Doctor/InsertReceiptionistLogin';
    return this.http.post(this.url, data)
  }

  public GetReceiptionistLoginDash(hosid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetReceiptionistLoginDash?HospitalID=" + hosid
    );
  }
  public GetReceiptionistLogin(uname, pwd, pinno) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetReceiptionistLogin?UserName=" + uname + '&Password=' + pwd + '&Pinno=' + pinno
    );
  }

  public InsertPatientRegistration(data) {
    this.url = this.host + '/PatientRegistration/InsertPatientRegistration';
    return this.http.post(this.url, data)
  }

  public InsertPatientWalletDetails(data) {
    this.url = this.host + '/Doctor/InsertPatientWalletDetails';
    return this.http.post(this.url, data)
  }




  //Mamata

  public GetAreaMasterWeb() {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetAreaMasterWeb"
    );
  }

  public GetDoctorDetails_ForVideoConferenceForWeb(did, doctype, daid, aidd, lid, hospitalid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorDetails_ForVideoConferenceForWeb?DepartmentID=" + did + '&DoctorType=' + doctype + '&AppointmentTypeID=' + daid + '&BookingTypeID=' + aidd + '&LanguageID=' + lid + '&HospitalID=' + hospitalid
    );
  }


  public GetDoctorSlotsForWeb(docid, dayid, hospitalid, timeid, appdatetime, dhid, slottypeid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorSlotsForWebLatestt?DoctorID=" + docid + '&DayID=' + dayid + '&Hospital_ClinicID=' + hospitalid + '&TimeID=' + timeid + '&ApptDatetime=' + appdatetime + '&DoctorHospitalDetailsID=' + dhid + '&SlotTypeID=' + slottypeid
    );
  }

  public GetPatientRegistrationBook() {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPatientRegistration"
    );
  }

  public InsertBookAppointmentForWeb(data) {
    this.url = this.host + '/BookAppointment/InsertBookAppointmentForWeb';
    return this.http.post(this.url, data)
  }

  // public CancelBookAppointmentWeb(Entity) {
  //  
  //   return this.http.get<any[]>(
  //     this.host + "/BookAppointment/CancelBookAppointmentWeb"
  //   );
  // }

  public CancelBookAppointmentWeb(data) {
    this.url = this.host + '/BookAppointment/CancelBookAppointmentWeb';
    return this.http.post(this.url, data)
  }


  public GetPatient_Nurse_Illnessphotos(appid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetPatient_Nurse_Illnessphotos?ID=' + appid);
  }

  //Prashant

  public DisableNurseWorking(id) {

    return this.http.get<any[]>(this.host + '/BookAppointment/DisableNurseWorkingDetails?id=' + id);
  }
  public EnableNurseWorking(id) {

    return this.http.get<any[]>(this.host + '/BookAppointment/EnableNurseWorkingDetails?id=' + id);
  }
  public DisableDoctorWorking(id) {

    return this.http.get<any[]>(this.host + '/BookAppointment/DisableDoctorWorkingDetails?id=' + id);
  }
  public EnableDoctorWorking(id) {

    return this.http.get<any[]>(this.host + '/BookAppointment/EnableDoctorWorkingDetails?id=' + id);
  }
  public DisableMidWifeWorkingDetails(id) {

    return this.http.get<any[]>(this.host + '/BookAppointment/DisableMidWifeWorkingDetails?id=' + id);
  }
  public EnableMidWifeWorkingDetails(id) {

    return this.http.get<any[]>(this.host + '/BookAppointment/EnableMidWifeWorkingDetails?id=' + id);
  }
  public DisablePhysiotherapistWorkingDetails(id) {

    return this.http.get<any[]>(this.host + '/BookAppointment/DisablePhysiotherapistWorkingDetails?id=' + id);
  }
  public EnablePhysiotherapistWorkingDetails(id) {

    return this.http.get<any[]>(this.host + '/BookAppointment/EnablePhysiotherapistWorkingDetails?id=' + id);
  }



  //Mamata

  public GetCancelledAppointmentByHospital_ClinicID(hospitalid, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetCancelledAppointmentByHospital_ClinicID?Hospital_ClinicID=' + hospitalid + '&Sdate=' + sdate + '&Edate=' + edate + '&LanguageID=' + lid);
  }


  public CancelBookAppointmentWebRefund(id, Refundamount) {

    return this.http.get<any[]>(
      this.host + "/Doctor/CancelBookAppointmentWebRefund?ID=" + id + '&Refundamount=' + Refundamount
    );
  }



  public GetNurse_PatientPaymentDetails(HospitalID) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetNurse_PatientPaymentDetails?HospitalID=' + HospitalID);
  }

  public GetNurse_AppointmentCounts(HospitalID) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetNurse_AppointmentCounts?HospitalID=' + HospitalID);
  }



  public GetPhysio_AppointmentCounts(HospitalID) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetPhysio_AppointmentCounts?HospitalID=' + HospitalID);
  }

  public GetPhysiotherapist_PatientPaymentDetails(HospitalID) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetPhysiotherapist_PatientPaymentDetails?HospitalID=' + HospitalID);
  }


  //Mamata


  public GetItemCategory() {

    return this.http.get<any[]>(
      this.host + "/Admin/GetItemCategory"
    );
  }

  public InsertSubcategory(data) {
    this.url = this.host + '/Admin/InsertSubcategory';
    return this.http.post(this.url, data)
  }


  public GetSubcategory() {

    return this.http.get<any[]>(
      this.host + "/Admin/GetSubcategory"
    );
  }


  public DeleteSubcategory(id) {

    return this.http.get<any[]>(
      this.host + "/Admin/DeleteSubcategory?ID=" + id
    );
  }


  public InsertItems(data) {
    this.url = this.host + '/Admin/InsertItems';
    return this.http.post(this.url, data)
  }



  public GetInventoryByID(CategoryID, SubCategoryID) {

    return this.http.get<any[]>(this.host + '/Admin/GetInventoryByID?CategoryID=' + CategoryID + '&SubCategoryID=' + SubCategoryID);
  }


  public InsertInventory(data) {
    this.url = this.host + '/Admin/InsertInventory';
    return this.http.post(this.url, data)
  }

  public GetInventory() {

    return this.http.get<any[]>(
      this.host + "/Admin/GetInventory"
    );
  }


  //Bhavana
  public InsertCategoryItem(data) {

    this.url = this.host + '/BookAppointment/InsertItemCategory';
    return this.http.post(this.url, data)
  }

  public Insertsubcategory(data) {

    this.url = this.host + '/BookAppointment/InsertSubcategory';
    return this.http.post(this.url, data)
  }
  public Getcategoryfordashboard() {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetItemCategory');
  }
  public DeleteCategory(id) {

    return this.http.get<any[]>(
      this.host + "/BookAppointment/DeleteItemCategory?ID=" + id
    );
  }
  public GetSubcategoryfordashboard() {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetSubcategory');
  }

  //Abishek

  // public GetItemCategory()
  // {
  //  
  //   this.url = this.host + '/BookAppointment/GetItemCategory';
  //   return this.http.get(this.url)
  // }

  public GetsubcategoryByCategoryID(ID) {

    this.url = this.host + '/BookAppointment/GetsubcategoryByCategoryID?ItemCategoryID=' + ID;
    return this.http.get(this.url)
  }

  public GetProductsImagesByID(ID) {

    this.url = this.host + '/BookAppointment/GetProductsImagesByID?ID=' + ID;
    return this.http.get(this.url)
  }



  public insertItems(entity) {

    this.url = this.host + '/BookAppointment/InsertProduct';
    return this.http.post(this.url, entity)
  }

  public getItems() {

    this.url = this.host + '/BookAppointment/GetProduct';
    return this.http.get(this.url)
  }

  public GetItems() {

    this.url = this.host + '/BookAppointment/GetItems';
    return this.http.get(this.url)
  }

  public deleteItems(ID) {

    this.url = this.host + '/BookAppointment/DeleteProduct?ID=' + ID;
    return this.http.get(this.url)
  }

  public GetProducts_cartByDate(sdate, edate) {

    return this.http.get<any[]>(this.host + "/BookAppointment/GetProducts_cartByDate?Sdate=" + sdate +
      "&Edate=" + edate);
    return this.http.get(this.url);
  }
  public GetSponcered_AddsMobileByDate(sdate, edate, LanguageID) {

    return this.http.get<any[]>(this.host + "/BookAppointment/GetSponcered_AddsMobileByDate?Sdate=" + sdate +
      "&Edate=" + edate + "&LanguageID=" + LanguageID);
    return this.http.get(this.url);
  }
  public GetSponsoredPharmacyForAdminByDate(sdate, edate) {

    return this.http.get<any[]>(this.host + "/BookAppointment/GetSponsoredPharmacyForAdminByDate?Sdate=" + sdate +
      "&Edate=" + edate);
    return this.http.get(this.url);
  }
  public GetSponsoredHospitalsForAdminByDate(sdate, edate) {

    return this.http.get<any[]>(this.host + "/BookAppointment/GetSponsoredHospitalsForAdminByDate?Sdate=" + sdate +
      "&Edate=" + edate);
    return this.http.get(this.url);
  }
  public GetSponsoredDiagnosticCenterForAdminByDate(sdate, edate) {

    return this.http.get<any[]>(this.host + "/BookAppointment/GetSponsoredDiagnosticCenterForAdminByDate?Sdate=" + sdate +
      "&Edate=" + edate);
    return this.http.get(this.url);
  }


  //Prasanth

  public InsertSponcered_Adds(data) {

    this.url = this.host + '/BookAppointment/InsertSponcered_Adds';
    return this.http.post(this.url, data)
  }
  public GetSponcered_AddsMobile(LanguageID) {

    return this.http.get<any[]>(
      this.host + "/BookAppointment/GetSponcered_AddsMobile?LanguageID=" + LanguageID
    );
  }

  public DeleteSponcered_Adds(lid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/DeleteSponcered_Adds?ID=' + lid);
  }
  public GetProducts_cart() {

    return this.http.get<any[]>(
      this.host + "/BookAppointment/GetProducts_cart"
    );
  }
  // public ItemsPhotosUpload(files) {
  //  
  //   let testData: FormData = new FormData();
  //  
  //   for (let i = 0; i < files.length; i++) {
  //     testData.append('file_upload', files[i], files[i].name);
  //   }
  //  
  //    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/EquipmentPhotoUpload/', testData);

  //   return this.http.post<any[]>(this.host + '/BookAppointment/ItemsPhotosUpload/', testData);
  // }



  public ItemsPhotosUpload(files) {

    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.host + '/BookAppointment/ItemsPhotosUpload/', formdata);
  }
  public Insert_ItemPhotos(data) {

    this.url = this.host + '/BookAppointment/Insert_ItemPhotos';
    return this.http.post(this.url, data)
  }


  public UpdateProductImages(data) {
    this.url = this.host + '/BookAppointment/UpdateProductImages';
    return this.http.post(this.url, data)
  }

  public UpdateCategory(data) {
    return this.http.post<any>(this.host + '/BookAppointment/UpdateItemCategory', data);
  }


  public GetCategoryById(CategoryId) {
    return this.http.get(this.host + '/BookAppointment/GetItemCategoryByID?ID=' + CategoryId);
  }

  public UpdateSponcered_Adds(data) {

    this.url = this.host + '/BookAppointment/UpdateSponcered_Adds';
    return this.http.post(this.url, data)
  }
  public InsertAppPageSponsorship(data) {

    this.url = this.host + '/BookAppointment/InsertAppPageSponsorship';
    return this.http.post(this.url, data)
  }
  public GetAppPageSponsorship() {

    return this.http.get<any[]>(
      this.host + "/BookAppointment/GetAppPageSponsorship"
    );
  }

  public DeleteAppPageSponsorship(lid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/DeleteAppPageSponsorship?ID=' + lid);
  }
  public UpdateAppPageSponsorship(data) {

    this.url = this.host + '/BookAppointment/UpdateAppPageSponsorship';
    return this.http.post(this.url, data)
  }

  public GetAppPageSponsorshipByDate(sdate, edate) {

    return this.http.get<any[]>(this.host + "/BookAppointment/GetAppPageSponsorshipByDate?Sdate=" + sdate +
      "&Edate=" + edate);
    return this.http.get(this.url);
  }



  public GetInvByID(CategoryId) {
    return this.http.get(this.host + '/BookAppointment/GetInvByID?ID=' + CategoryId);
  }


  public UpdateInventory(data) {
    this.url = this.host + '/BookAppointment/UpdateInventory';
    return this.http.post(this.url, data)
  }

  public UpdateSubcategory(data) {

    this.url = this.host + '/BookAppointment/UpdateSubcategory';
    return this.http.post(this.url, data)
  }
  public UpdateProducts(data) {

    this.url = this.host + '/Doctor/UpdateProducts';
    return this.http.post(this.url, data)
  }
  public GetHomecareRevenue(hsid, sdate, edate) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetHomecareRevenue?HospitalID=" + hsid + '&Sdate=' + sdate + '&Edate=' + edate
    );
  }

  public GetSlotMasterTimings(SlotTypeID) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSlotMasterTimings?SlotTypeID=' + SlotTypeID);
  }

  public UpdateSickSlipGenarator(data) {

    this.url = this.host + '/BookAppointment/UpdateSickSlipGenarator';
    return this.http.post(this.url, data)
  }
  public UpdateDoctorReferals(data) {

    this.url = this.host + '/BookAppointment/UpdateDoctorReferals';
    return this.http.post(this.url, data)
  }
  public Update_DoctorReferalAttachmentsphotos(data) {

    this.url = this.host + '/BookAppointment/Update_DoctorReferalAttachmentsphotos';
    return this.http.post(this.url, data)
  }
  public Delete_DoctorReferalAttachments(lid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/Delete_DoctorReferalAttachments?ID=' + lid);
  }

  public GetBookAppointmentCompletedSession(id) {
    return this.http.get(this.host + '/Doctor/GetBookAppointmentCompletedSession?ID=' + id);
  }
  public GetVideoStatus(id) {
    return this.http.get(this.host + '/Doctor/GetVideoStatus?AppID=' + id);
  }
  public UpdateDoctorCommissionFees(data) {

    this.url = this.host + '/Doctor/UpdateDoctorCommissionFees';
    return this.http.post(this.url, data)
  }

  public InsertDoctorDisabledSlots(data) {

    this.url = this.host + '/Doctor/InsertDoctorDisabledSlots';
    return this.http.post(this.url, data)
  }

  public GetDoctorDisabledSlots() {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorDisabledSlots');
  }

  public DeleteDisableSlots(DoctorHospitalID, docid, timeid, date) {
    return this.http.get(this.host + '/Doctor/DeleteDisableSlots?DoctorHospitalID=' + DoctorHospitalID + '&DoctorID=' + docid + '&TimeID=' + timeid + '&Date=' + date);
  }


  public UpdateReturnAssignedShoppingOrders(data) {

    this.url = this.host + '/Doctor/UpdateReturnAssignedShoppingOrders';
    return this.http.post(this.url, data)
  }


  public UpdateRefundAMountOrders(data) {

    this.url = this.host + '/Doctor/UpdateRefundAMountOrders';
    return this.http.post(this.url, data)
  }
  public UpdateCollectedItems(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateCollectedItems?OrderID=' + lid);
  }


  public InsertDoctorSoapNotesTemplates(data) {
    this.url = this.host + '/Doctor/InsertDoctorSoapNotesTemplates';
    return this.http.post(this.url, data)
  }

  public GetDoctorSoapNotesTemplates() {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorSoapNotesTemplates');
  }

  public InsertDoctorPrescrptionTemplates(data) {
    this.url = this.host + '/Doctor/InsertDoctorPrescrptionTemplates';
    return this.http.post(this.url, data)
  }

  public GetDoctorPrescrptionTemplates() {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorPrescrptionTemplates');
  }
  public InsertNotificationsWebLatest(data) {
    this.url = this.host + '/Doctor/InsertNotificationsWebLatest';
    return this.http.post(this.url, data)
  }

  public UpdateDoctorSlotStartAndEndTimeAppointmentType(data) {
    this.url = this.host + '/Doctor/UpdateDoctorSlotStartAndEndTimeAppointmentType';
    return this.http.post(this.url, data)
  }

  public GetDoctorHospitalDetailsWebByDoctorID(mid, LanguageID) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorHospitalDetailsWebByDoctorID?DoctorID=' + mid + '&LanguageID=' + LanguageID);
  }

  public InsertNurseDisabledSlots(data) {
    this.url = this.host + '/Doctor/InsertNurseDisabledSlots';
    return this.http.post(this.url, data)
  }

  public GetNurseDisabledSlots() {

    return this.http.get<any[]>(this.host + '/Doctor/GetNurseDisabledSlots');
  }

  public DeleteNurseDisabledSlots(nid, date) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteNurseDisabledSlots?NurseID=' + nid + '&Date=' + date);
  }

  public InsertPhysiotherapistDisabledSlots(data) {
    this.url = this.host + '/Doctor/InsertPhysiotherapistDisabledSlots';
    return this.http.post(this.url, data)
  }
  public InsertMidWifeDisabledSlots(data) {
    this.url = this.host + '/Doctor/InsertMidWifeDisabledSlots';
    return this.http.post(this.url, data)
  }


  public GetPhysiotherapistDisabledSlots() {

    return this.http.get<any[]>(this.host + '/Doctor/GetPhysiotherapistDisabledSlots');
  }

  public GetMidWifeDisabledSlots() {

    return this.http.get<any[]>(this.host + '/Doctor/GetMidWifeDisabledSlots');
  }

  public DeletePhysiotherapistDisabledSlots(pid, date) {

    return this.http.get<any[]>(this.host + '/Doctor/DeletePhysiotherapistDisabledSlots?PhysioID=' + pid + '&Date=' + date);
  }

  public DeleteMidWifeDisabledSlots(pid, date) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteMidWifeDisabledSlots?MidWifeID=' + pid + '&Date=' + date);
  }

  public InsertICDCodeMaster(data) {
    this.url = this.host + '/Doctor/InsertICDCodeMaster';
    return this.http.post(this.url, data)
  }


  public GetICDCodeMaster(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetICDCodeMaster?LanguageID=' + lid);
  }


  public UpdateBookAppointmentFollowupVisit(appointmentid) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBookAppointmentFollowupVisit?AppointmentID=' + appointmentid);
  }

  public GetDayID(day) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDayID?Day=' + day);
  }


  public InsertPatientPaymentDetailsWeb(data) {
    this.url = this.host + '/Doctor/InsertPatientPaymentDetailsWeb';
    return this.http.post(this.url, data)
  }


  public InsertDoctor_PatientPrescriptionPhotoUrl(data) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientPrescriptionPhotoUrl';
    return this.http.post(this.url, data)
  }


  public GetDoctorDetails_ForVideoConferenceForWeb1(did, doctype, daid, aidd, lid, hospitalid, dayid, appdate) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorDetails_ForVideoConferenceForWeb1?DepartmentID=" + did + '&DoctorType=' + doctype + '&AppointmentTypeID=' + daid + '&BookingTypeID=' + aidd + '&LanguageID=' + lid + '&HospitalID=' + hospitalid + '&DayID=' + dayid + '&AppointmentDate=' + appdate
    );
  }

  public GetSlotsMasterSlots() {

    return this.http.get<any[]>(this.host + '/Doctor/GetSlotsMasterSlots');
  }

  public GetDoctorDetails_ForVideoConferenceForWeb2(did, doctype, daid, aidd, lid, hospitalid, dayid, slotid, appdate) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorDetails_ForVideoConferenceForWeb2?DepartmentID=" + did + '&DoctorType=' + doctype + '&AppointmentTypeID=' + daid + '&BookingTypeID=' + aidd + '&LanguageID=' + lid + '&HospitalID=' + hospitalid + '&DayID=' + dayid + '&SlotID=' + slotid + '&AppDate=' + appdate
    );
  }

  public UpdatePatient_TextMedicineDetailsPartialBit(data) {
    this.url = this.host + '/Doctor/UpdatePatient_TextMedicineDetailsPartialBit';
    return this.http.post(this.url, data)
  }

  public UpdatePatient_TextMedicineDetailsFullyAvailableBit(data) {
    this.url = this.host + '/Doctor/UpdatePatient_TextMedicineDetailsFullyAvailableBit';
    return this.http.post(this.url, data)
  }



  public GetDeliveryPartnersWeb() {

    return this.http.get<any[]>(this.host + '/Doctor/GetDeliveryPartnersWeb');
  }

  public GetDeliveredPatnerAssignReadyForAvailable(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDeliveredPatnerAssignReadyForAvailable?ID=' + id);
  }

  public GetPatient_TextMedicineDetailsForDeliverCompany(sdate, edate, lid, pincodes) {
    debugger
    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_TextMedicineDetailsForDeliverCompany?SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid + '&Pincode=' + pincodes);
  }

  public GetPrescriptionReturnedPhotos(OrderID) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPrescriptionReturnedPhotos?OrderID=' + OrderID);
  }

  public UpdateDeliveryPartnerrReturnAssignOrdersAssignedOrders(data) {

    this.url = this.host + '/Doctor/UpdateDeliveryPartnerrReturnAssignOrdersAssignedOrders';
    return this.http.post(this.url, data)
  }

  public UpdateCollectBit(OrderID) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateCollectBit?MedicineOrderID=' + OrderID);
  }

  public UpdateRefundAmount(data) {

    this.url = this.host + '/Doctor/UpdateRefundAmount';
    return this.http.post(this.url, data)
  }


  public GetDoctor_ChatDetailsMobileWeb(chatid) {

    return this.http.get<any[]>(this.host + '/Admin/GetDoctor_ChatDetailsMobileWeb?ChatID=' + chatid);
  }

  public GetDrugNameMaster(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDrugNameMaster?LanguageID=' + lid);
  }

  public InsertHospitalCommissions(data) {
    this.url = this.host + '/Doctor/InsertHospitalCommissions';
    return this.http.post(this.url, data)
  }

  public GetHospitalCommissions(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetHospitalCommissions?LanguageID=' + lid);
  }

  public UpdateHospitalCommissions(data) {
    this.url = this.host + '/Doctor/UpdateHospitalCommissions';
    return this.http.post(this.url, data)
  }


  public UpdateBookAppointmentKnownAllergies(data) {
    this.url = this.host + '/Doctor/UpdateBookAppointmentKnownAllergies';
    return this.http.post(this.url, data)
  }
  public InsertSupportForWeb(data) {
    this.url = this.host + '/Doctor/InsertSupportForWeb';
    return this.http.post(this.url, data)
  }


  public GetSupportForWeb(lid, userid, typeid, sdate, edate) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSupportForWeb?LanguageID=' + lid + '&UserID=' + userid + '&TypeID=' + typeid + '&Sdate=' + sdate + '&Edate=' + edate);
  }

  public GetAdmin_SupportForWeb_Labels(lid) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_SupportForWeb_Labels?LanguageID=' + lid);
  }

  public GetSupportForWebForSupportLogin(lid, sdate, edate) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSupportForWebForSupportLogin?LanguageID=' + lid + '&Sdate=' + sdate + '&Edate=' + edate);
  }
  public UpdateAlertbit(aid) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateAlertbit?AppointmentID=' + aid);
  }


  public UpdateSupportForWebResolvedbit(data) {
    this.url = this.host + '/Doctor/UpdateSupportForWebResolvedbit';
    return this.http.post(this.url, data)
  }

  public InsertDrugNameMaster(data) {
    this.url = this.host + '/Doctor/InsertDrugNameMaster';
    return this.http.post(this.url, data)
  }

  public UpdateSupportForWebAcceptedbit(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateSupportForWebAcceptedbit?ID=' + id);
  }

  public GetNotifications_DoctorByDoctorIDWeb(doctorid, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetNotifications_DoctorByDoctorIDWeb?DoctorID=' + doctorid + '&Sdate=' + sdate + '&Edate=' + edate + '&LanguageID=' + lid);
  }

  public GetNotifications_NPMWeb(userid, sdate, edate, typeid, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetNotifications_NPMWeb?UserID=' + userid + '&Sdate=' + sdate + '&Edate=' + edate + '&TypeID=' + typeid + '&LanguageID=' + lid);
  }


  public InsertNotificationsNotifications_NPMWeb(data) {
    this.url = this.host + '/Doctor/InsertNotificationsNotifications_NPMWeb';
    return this.http.post(this.url, data)
  }

  public GetNotifications_NPMWebCOunt(userid, typeid, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetNotifications_NPMWebCOunt?UserID=' + userid + '&TypeID=' + typeid + '&LanguageID=' + lid);
  }

  public UpdateNotifications_NPMSeenBit(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateNotifications_NPMSeenBit?ID=' + id);
  }

  public InsertSupportForWebNotifications(data) {
    this.url = this.host + '/Doctor/InsertSupportForWebNotifications';
    return this.http.post(this.url, data)
  }

  public GetSupportForWebNotifications(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSupportForWebNotifications?LanguageID=' + id);
  }


  public UpdateSupportForWebNotificationsSeenBit(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateSupportForWebNotificationsSeenBit?ID=' + id);
  }

  public DoctorPostGCMNotifications(data) {

    this.url = this.host + '/Doctor/DoctorPostGCMNotifications';
    return this.http.post(this.url, data)
  }

  public GetPatientRegistrationDetails() {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatientRegistrationDetails');
  }

  public UpdatePatientRegistrationMobileNumber(data) {
    this.url = this.host + '/Doctor/UpdatePatientRegistrationMobileNumber';
    return this.http.post(this.url, data)
  }


  public GetSoapNotesByApointmentID(patientid, lid, doctorid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSoapNotesByApointmentID?ID=' + patientid + '&LanguageID=' + lid + '&DoctorID=' + doctorid);
  }


  public GetBooked_DoctorPatientBookedVideoConferencebyppointmentID(appointmentid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBooked_DoctorPatientBookedVideoConferencebyppointmentID?AppointmentID=' + appointmentid);
  }

  public InsertDiagnosticRelatedSlotsStartTimeEndTime(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticRelatedSlotsStartTimeEndTime';
    return this.http.post(this.url, data)
  }

  public GetDiagnosticRelatedSlotsStartTimeEndTime(lid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticRelatedSlotsStartTimeEndTime?LanguageID=' + lid);
  }


  public UpdateDiagnosticRelatedSlotsStartTimeEndTime(data) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticRelatedSlotsStartTimeEndTime';
    return this.http.post(this.url, data)
  }
  public DeleteDiagnosticRelatedSlotsStartTimeEndTime(diaid, dayid, timeid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/DeleteDiagnosticRelatedSlotsStartTimeEndTime?DiagnosticCenterID=' + diaid + '&DayID=' + dayid + '&TimeID=' + timeid);
  }
  public DeleteADiagnosticRelatedSlotsStartTimeEndTimeDay(diaid, dayid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/DeleteADiagnosticRelatedSlotsStartTimeEndTimeDay?DiagnosticCenterID=' + diaid + '&DayID=' + dayid);
  }

  public UpdateDiagnosticCenterTests(data) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticCenterTests';
    return this.http.post(this.url, data)
  }

  public GetBookAppointmentEarlyCallbit(appointmentid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetBookAppointmentEarlyCallbit?ID=' + appointmentid);
  }

  public GetNotifications_DoctorByDoctorIDTop1(did) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetNotifications_DoctorByDoctorIDTop1?DoctorID=' + did);
  }

  public GetPatientRegistrationForSendEmails(did) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetPatientRegistrationForSendEmails?LanguageID=' + did);
  }


  public EmailAttachments(files) {

    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);

    }
    return this.http.post(this.host + '/Doctor/EmailAttachments/', formdata);
  }

  public sendemail(data) {

    this.url = this.host + '/Doctor/sendemail';
    return this.http.post(this.url, data)
  }

  public InsertPatientEmails(data) {
    this.url = this.host + '/Doctor/InsertPatientEmails';
    return this.http.post(this.url, data)
  }

  public InsertEmail_Attachments(data) {
    this.url = this.host + '/Doctor/InsertEmail_Attachments';
    return this.http.post(this.url, data)
  }


  public GetPatientEmails(lid, sdate, edate) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatientEmails?LanguageID=' + lid + '&Sdate=' + sdate + '&Edate=' + edate);
  }


  public GetEmail_Attachments(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetEmail_Attachments?ID=' + lid);
  }

  public SendSMS(data) {
    ;
    this.url = this.host + '/Doctor/SendSMS';
    return this.http.post(this.url, data)
  }

  public insertPatient_Sms(data) {
    this.url = this.host + '/Doctor/insertPatient_Sms';
    return this.http.post(this.url, data)
  }
  public GetPatient_Sms(lid, sdate, edate) {
    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_Sms?LanguageID=' + lid + '&Sdate=' + sdate + '&Edate=' + edate);
  }

  public GetPatientRegistrationForSendEmailsWeb(lid) {
    return this.http.get<any[]>(this.host + '/Doctor/GetPatientRegistrationForSendEmailsWeb?LanguageID=' + lid);
  }

  public GetRoleTypesMasterByAdminLogins(lid) {
    return this.http.get<any[]>(this.host + '/Doctor/GetRoleTypesMasterByAdminLogins?LanguageID=' + lid);
  }

  public GetSubMenuMaster(lid, menuid) {
    return this.http.get<any[]>(this.host + '/Doctor/GetSubMenuMaster?LanguageID=' + lid + '&MenuID=' + menuid);
  }

  public GetMenuMaster(lid) {
    return this.http.get<any[]>(this.host + '/Doctor/GetMenuMaster?LanguageID=' + lid);
  }

  public InsertMenuRoleMappingTable(data) {
    this.url = this.host + '/Doctor/InsertMenuRoleMappingTable';
    return this.http.post(this.url, data)
  }

  public GetMenuRoleMappingTable(lid) {
    return this.http.get<any[]>(this.host + '/Doctor/GetMenuRoleMappingTable?LanguageID=' + lid);
  }

  public DeleteMenuRoleMappingTable(roleid, menuid) {
    return this.http.get<any[]>(this.host + '/Doctor/DeleteMenuRoleMappingTable?RoleID=' + roleid + '&MenuID=' + menuid);
  }

  public DeleteMenuRoleMappingTableRow(id) {
    return this.http.get<any[]>(this.host + '/Doctor/DeleteMenuRoleMappingTableRow?ID=' + id);
  }

  public InsertUsers_RoleMapping(data) {
    this.url = this.host + '/Doctor/InsertUsers_RoleMapping';
    return this.http.post(this.url, data)
  }

  public GetUsers_RoleMapping(lid) {
    return this.http.get<any[]>(this.host + '/Doctor/GetUsers_RoleMapping?LanguageID=' + lid);
  }

  public UpdateUsers_RoleMapping(data) {
    this.url = this.host + '/Doctor/UpdateUsers_RoleMapping';
    return this.http.post(this.url, data)
  }

  public DeleteUsers_RoleMapping(id) {
    return this.http.get<any[]>(this.host + '/Doctor/DeleteUsers_RoleMapping?ID=' + id);
  }

  public GetUsers_RoleMappingByUnameAndPwd(uname, pwd, roleid, pinno) {
    return this.http.get<any[]>(this.host + '/Doctor/GetUsers_RoleMappingByUnameAndPwd?UserName=' + uname + '&Password=' + pwd + '&RoleID=' + roleid + '&Pinno=' + pinno);
  }

  public GetMenuRoleMappingTableByRoleID(lid, roleid) {
    return this.http.get<any[]>(this.host + '/Doctor/GetMenuRoleMappingTableByRoleID?LanguageID=' + lid + '&RoleID=' + roleid);
  }

  public GetPatientInsuranceDetailsWeb(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatientInsuranceDetailsWeb?PatientID=' + lid);
  }

  public UpdateDoctor_PatientDiagnostics(data) {
    this.url = this.host + '/Doctor/UpdateDoctor_PatientDiagnostics';
    return this.http.post(this.url, data)
  }
  public UpdateDoctor_PatientSoapNotes(data) {
    this.url = this.host + '/Doctor/UpdateDoctor_PatientSoapNotes';
    return this.http.post(this.url, data)
  }
  public UpdateDoctor_PatientPrescriptionWeb(data) {
    this.url = this.host + '/Doctor/UpdateDoctor_PatientPrescriptionWeb';
    return this.http.post(this.url, data)
  }

  public GetNotifications_DoctorByDoctorIDWebSide(did) {

    return this.http.get<any[]>(this.host + '/Doctor/GetNotifications_DoctorByDoctorIDWebSide?DoctorID=' + did);
  }

  public GetDoctorCommissionFeesByAdminRevenueForIndependentDoctor(sdate, edate, hospitalid, cityid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorCommissionFeesByAdminRevenueForIndependentDoctor?Sdate=" + sdate + '&Edate=' + edate + '&HospitalID=' + hospitalid + '&CityID=' + cityid
    );
  }



  //independent providers

  public GeIndependentnurserevenueByNurseID(sdate, edate, nurseid, cityid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GeIndependentnurserevenueByNurseID?Sdate=" + sdate + '&Edate=' + edate + '&NurseID=' + nurseid + '&CityID=' + cityid
    );
  }

  public GetIndependentMidWifeRevenueByMidwifeID(sdate, edate, midwifeid, cityid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetIndependentMidWifeRevenueByMidwifeID?Sdate=" + sdate + '&Edate=' + edate + '&MidWifeID=' + midwifeid + '&CityID=' + cityid
    );
  }

  public GetPhsyioTherapistindependentRevenueByphysioID(sdate, edate, physioid, cityid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPhsyioTherapistindependentRevenueByphysioID?Sdate=" + sdate + '&Edate=' + edate + '&PhysioID=' + physioid + '&CityID=' + cityid
    );
  }




  public GetHospitalRevenue(sdate, edate, hospitalid, cityid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetHospitalRevenue?Sdate=" + sdate + '&Edate=' + edate + '&HospitalID=' + hospitalid + '&CityID=' + cityid
    );
  }

  public GetDoctorForAdminByLanguageIDIndependentDoctors(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorForAdminByLanguageIDIndependentDoctors?LanguageID=' + lid);
  }

  public GetAreaMasterByhospitals(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetAreaMasterByhospitals?LanguageID=' + lid);
  }

  public GetDoctorReferalsByPatientIDForWeb(pid, lid, doctorid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorReferalsByPatientIDForWeb?PatientID=' + pid + '&LanguageID=' + lid + '&DoctorID=' + doctorid);
  }


  public UpdateDoctorReferalsWeb(data) {
    this.url = this.host + '/Doctor/UpdateDoctorReferalsWeb';
    return this.http.post(this.url, data)
  }

  public GetSickSlipGenaratorByPatientIDWeb(pid, lid, doctorid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSickSlipGenaratorByPatientIDWeb?PatientID=' + pid + '&LanguageID=' + lid + '&DoctorID=' + doctorid);
  }

  public UpdateNotifications_DoctorSeenBitAll(did) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateNotifications_DoctorSeenBitAll?DoctorID=' + did);
  }

  public UpdateMidWifeCommissionDeatails(data) {
    this.url = this.host + '/Doctor/UpdateMidWifeCommissionDeatails';
    return this.http.post(this.url, data)
  }
  public UpdateNurseCommissionDeatails(data) {
    this.url = this.host + '/Doctor/UpdateNurseCommissionDeatails';
    return this.http.post(this.url, data)
  }

  public UpdatePhsyioTherapistCommissionDeatailsweb(data) {
    this.url = this.host + '/Doctor/UpdatePhsyioTherapistCommissionDeatailsweb';
    return this.http.post(this.url, data)
  }


  public DeleteMidWifeCommissionDeatails(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteMidWifeCommissionDeatails?ID=' + id);
  }


  public UpdateSponsoredDiagnosticCenter(data) {
    this.url = this.host + '/Diagnostic/UpdateSponsoredDiagnosticCenter';
    return this.http.post(this.url, data)
  }

  public UpdateSponsoredHospitals(data) {
    this.url = this.host + '/Hospital/UpdateSponsoredHospitals';
    return this.http.post(this.url, data)
  }

  public UpdateSponsoredPharmacy(data) {
    this.url = this.host + '/Pharmacy/UpdateSponsoredPharmacy';
    return this.http.post(this.url, data)
  }

  public InsertHospitalClinic_RevenueSubscriptions(data) {
    this.url = this.host + '/Hospital/InsertHospitalClinic_RevenueSubscriptions';
    return this.http.post(this.url, data)
  }


  public GetHospitalClinic_RevenueSubscriptions(hosid) {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospitalClinic_RevenueSubscriptions?HospitalClinicID=' + hosid);
  }

  public InsertDiagnosticCentersSubscriptions_Revenue(data) {
    this.url = this.host + '/Hospital/InsertDiagnosticCentersSubscriptions_Revenue';
    return this.http.post(this.url, data)
  }

  public InsertPharmacySubscriptions_Revenue(data) {
    this.url = this.host + '/Hospital/InsertPharmacySubscriptions_Revenue';
    return this.http.post(this.url, data)
  }

  public GetPharmacySubscriptions_Revenue(pharmacyid) {

    return this.http.get<any[]>(this.host + '/Hospital/GetPharmacySubscriptions_Revenue?PharmacyID=' + pharmacyid);
  }

  public GetDiagnosticCentersSubscriptions_Revenue(diagnosticid) {

    return this.http.get<any[]>(this.host + '/Hospital/GetDiagnosticCentersSubscriptions_Revenue?DiagnosticID=' + diagnosticid);
  }


  public UpdateDiagnosticCentersSubscriptions_Revenue(data) {
    this.url = this.host + '/Hospital/UpdateDiagnosticCentersSubscriptions_Revenue';
    return this.http.post(this.url, data)
  }
  public UpdatePharmacySubscriptions_Revenue(data) {
    this.url = this.host + '/Hospital/UpdatePharmacySubscriptions_Revenue';
    return this.http.post(this.url, data)
  }

  public InsertIndependentDoctors_Revenue(data) {
    this.url = this.host + '/Hospital/InsertIndependentDoctors_Revenue';
    return this.http.post(this.url, data)
  }

  public InsertIndependentMidwife_Revenue(data) {
    this.url = this.host + '/Hospital/InsertIndependentMidwife_Revenue';
    return this.http.post(this.url, data)
  }

  public InsertIndependentNurse_Revene(data) {
    this.url = this.host + '/Hospital/InsertIndependentNurse_Revene';
    return this.http.post(this.url, data)
  }

  public InsertIndependentPhysiotherapist_Revenue(data) {
    this.url = this.host + '/Hospital/InsertIndependentPhysiotherapist_Revenue';
    return this.http.post(this.url, data)
  }


  public GetChatMasterByDoctorID(doctorid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetChatMasterByDoctorID?DoctorID=' + doctorid);
  }

  public GetDoctor_ChatDetailsByDoctor(chatid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctor_ChatDetailsByDoctor?ChatID=' + chatid);
  }

  //link for registrations

  public sendemailsForLinkRegistrations(data) {
    this.url = this.host + '/Doctor/sendemailsForLinkRegistrations';
    return this.http.post(this.url, data)
  }

  public InsertLinkForRegistrations(data) {


    this.url = this.host2 + '/Master/insertVoiladocRegistrationEmails';
    return this.http.post(this.url, data)
  }

  public GetLinkForRegistrations(sdate, edate, lid) {

    return this.http.get<any[]>(this.host2 + '/Master/GetVoiladocRegistrationEmails?Sdate=' + sdate + '&Edate=' + edate + '&LanguageID=' + lid);
  }

  public GetVoiladocRegistrationsUsers(sdate, edate, typeid, langugeid) {

    return this.http.get<any[]>(this.host2 + '/Master/GetVoiladocRegistrationsUsers?Sdate=' + sdate + '&Edate=' + edate + '&TypeID=' + typeid + '&LanguageID=' + langugeid);
  }

  public UpdateRejectedVoiladocRegisteredUsers(id, typeid) {

    return this.http.get<any[]>(this.host2 + '/Master/UpdateRejectedVoiladocRegisteredUsers?ID=' + id + '&TypeID=' + typeid);
  }
  public UpdateApprovedVoiladocRegisteredUsers(id, typeid) {

    return this.http.get<any[]>(this.host2 + '/Master/UpdateApprovedVoiladocRegisteredUsers?ID=' + id + '&TypeID=' + typeid);
  }

  public UpdateVoiladocRegistrationEmailsStatus(id) {

    return this.http.get<any[]>(this.host2 + '/Master/UpdateVoiladocRegistrationEmailsStatus?ID=' + id);
  }

  public UpdateVoiladocRegistrationEmailsStatusBackNormal(id) {

    return this.http.get<any[]>(this.host2 + '/Master/UpdateVoiladocRegistrationEmailsStatusBackNormal?ID=' + id);
  }

  public UpdateApprovedVoiladocRegisteredUsersAndUnApprove(id, typeid) {

    return this.http.get<any[]>(this.host2 + '/Master/UpdateApprovedVoiladocRegisteredUsersAndUnApprove?ID=' + id + '&TypeID=' + typeid);
  }

  public UpdateVoiladocRegistrationEmailsStatusReject(id) {

    return this.http.get<any[]>(this.host2 + '/Master/UpdateVoiladocRegistrationEmailsStatusReject?ID=' + id);
  }


  public GetNotifications(cid, lid) {

    return this.http.get<any[]>(this.host2 + '/Master/GetNotifications?countrymangerID=' + cid + '&LanguageID=' + lid);
  }

  public UpdateNotificationSeen(id) {

    return this.http.get<any[]>(this.host2 + '/Master/UpdateNotificationSeen?ID=' + id);
  }




  public GetAllRegisteredUsersCount(sdate, edate) {

    return this.http.get<any[]>(this.host2 + '/Master/GetAllRegisteredUsersCount?StartDate=' + sdate + '&Enddate=' + edate);
  }

  //end

  public UpdateDoctorLogins(data) {
    this.url = this.host + '/Doctor/UpdateDoctorLogins';
    return this.http.post(this.url, data)
  }

  public UpdatePhysiotherapistLogin(data) {
    this.url = this.host + '/Admin/UpdatePhysiotherapistLogin';
    return this.http.post(this.url, data)
  }

  public UpdateMidWivesLogin(data) {
    this.url = this.host + '/Admin/UpdateMidWivesLogin';
    return this.http.post(this.url, data)
  }

  public UpdateNurseLogin(data) {
    this.url = this.host + '/Admin/UpdateNurseLogin';
    return this.http.post(this.url, data)
  }

  public UpdatePharmacyAdminRegistration(data) {
    this.url = this.host + '/Pharmacy/UpdatePharmacyAdminRegistration';
    return this.http.post(this.url, data)
  }

  public UpdateHospitalClinicAdminRegistration(data) {
    this.url = this.host + '/Hospital/UpdateHospitalClinicAdminRegistration';
    return this.http.post(this.url, data)
  }

  public UpdateDiagnosticCenterAdminRegistrationWeb(data) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticCenterAdminRegistrationWeb';
    return this.http.post(this.url, data)
  }

  public UpdateDeliveryCompanyLogin(data) {
    this.url = this.host + '/Admin/UpdateDeliveryCompanyLogin';
    return this.http.post(this.url, data)
  }

  public UpdateReceiptionistLogin(data) {
    this.url = this.host + '/Admin/UpdateReceiptionistLogin';
    return this.http.post(this.url, data)
  }


  public GetAllNurseDetailsWeb(dayid, departmentid, languageid, bookingtime, hospitalid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetAllNurseDetailsWeb?DayID=' + dayid + '&DepartmentID=' + departmentid + '&LanguageID=' + languageid + '&BookingTime=' + bookingtime + '&HospitalID=' + hospitalid);
  }

  public GetDaysHomecare(date) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetDaysHomecare?Date=' + date);
  }

  public GetAllMidWivesDetailsWeb(dayid, departmentid, languageid, bookingtime, hospitalid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetAllMidWivesDetailsWeb?DayID=' + dayid + '&DepartmentID=' + departmentid + '&LanguageID=' + languageid + '&BookingTime=' + bookingtime + '&HospitalID=' + hospitalid);
  }

  public GetAllPhysioDetailsWeb(dayid, departmentid, languageid, bookingtime, hospitalid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetAllPhysioDetailsWeb?DayID=' + dayid + '&DepartmentID=' + departmentid + '&LanguageID=' + languageid + '&BookingTime=' + bookingtime + '&HospitalID=' + hospitalid);
  }

  public InsertBook_Nurse_AppointmentWeb(data) {
    this.url = this.host + '/BookAppointment/InsertBook_Nurse_AppointmentWeb';
    return this.http.post(this.url, data)
  }


  public InsertBook_Physio_AppointmentWeb(data) {
    this.url = this.host + '/BookAppointment/InsertBook_Physio_AppointmentWeb';
    return this.http.post(this.url, data)
  }


  public InsertBook_Midwives_AppointmentWeb(data) {
    this.url = this.host + '/BookAppointment/InsertBook_Midwives_AppointmentWeb';
    return this.http.post(this.url, data)
  }


  public InsertMidWife_PatientPaymentDetailsWeb(data) {
    this.url = this.host + '/BookAppointment/InsertMidWife_PatientPaymentDetailsWeb';
    return this.http.post(this.url, data)
  }


  public InsertNurse_PatientPaymentDetailsWeb(data) {
    this.url = this.host + '/BookAppointment/InsertNurse_PatientPaymentDetailsWeb';
    return this.http.post(this.url, data)
  }

  public InsertPhysiotherapist_PatientPaymentDetailsWeb(data) {
    this.url = this.host + '/BookAppointment/InsertPhysiotherapist_PatientPaymentDetailsWeb';
    return this.http.post(this.url, data)
  }

  public GetDoctorForHomeSampleWeb(deptid, dayid, languageid, docavailabilityid, hospitalid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetDoctorForHomeSampleWeb?DepartmentID=' + deptid + '&DayID=' + dayid + '&LanguageID=' + languageid + '&DoctorAvailabilityID=' + docavailabilityid + '&HospitalID=' + hospitalid);
  }

  public GetCanacelledHomecareAppointmentsByRecp(appointmentsid, typeid, reason) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetCanacelledHomecareAppointmentsByRecp?AppointmentID=' + appointmentsid + '&TypeID=' + typeid + '&ReasonForcancel=' + reason);
  }


  public GetAllHomecareAppointmentCounts(languageid, sdate, edate, hospitalid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetAllHomecareAppointmentCounts?LanguageID=' + languageid + '&Sdate=' + sdate + '&Edate=' + edate + '&HospitalID=' + hospitalid);
  }

  public GetAllHospitalSubscriptionRevenue(sdate, edate, hospitalid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetAllHospitalSubscriptionRevenue?Sdate=' + sdate + '&Edate=' + edate + '&HospitalID=' + hospitalid);
  }

  public GetAllIndepenedentSubscriptionRevenueByTypeID(sdate, edate, hospitalid, typeid, homecareid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetAllIndepenedentSubscriptionRevenueByTypeID?Sdate=' + sdate + '&Edate=' + edate + '&HospitalID=' + hospitalid + '&TypeID=' + typeid + '&HomeCarePersonID=' + homecareid);
  }

  public GetAllIndepenedentSubscriptionRevenue(sdate, edate, hospitalid) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetAllIndepenedentSubscriptionRevenue?Sdate=' + sdate + '&Edate=' + edate + '&HospitalID=' + hospitalid);
  }


  public GetMonthStartDateAndEndDate() {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetMonthStartDateAndEndDate');
  }

  public GetHomecareRevenueByHospitalID(hospitalid, sdate, edate) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetHomecareRevenueByHospitalID?HospitalID=' + hospitalid + '&Sdate=' + sdate + '&Edate=' + edate);
  }

  public GetAllIndependentSubscriptionsContractDatesdash(typeid, lid) {

    return this.http.get<any[]>(this.host + '/Hospital/GetAllIndependentSubscriptionsContractDatesdash?TypeID=' + typeid + '&LanguageID=' + lid);
  }

  public GetHospitalClinic_RevenueSubscriptionsByHospitalID(hospitalid) {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospitalClinic_RevenueSubscriptionsByHospitalID?HospitalID=' + hospitalid);
  }

  public UpdateCancellationTimings(data) {
    this.url = this.host + '/Hospital/UpdateCancellationTimings';
    return this.http.post(this.url, data)
  }

  public GetCancellationTimings(lid) {

    return this.http.get<any[]>(this.host + '/Hospital/GetCancellationTimings?LanguageID=' + lid);
  }

  public UpdateDiagnosticCenterPackages(data) {
    this.url = this.host + '/Hospital/UpdateDiagnosticCenterPackages';
    return this.http.post(this.url, data)
  }

  // public InsertDoctorSlotsNew(list1,list2,did) {
  //   
  //   this.url = this.host + '/Doctor/InsertDoctorSlotsNew?DoctorID='+did;
  //   return this.http.post(this.url, list1,list2)
  // }

  public GetAllCancelledAppoentmentReport(typeid, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Hospital/GetAllCancelledAppoentmentReport?TypeID=' + typeid + '&Sdate=' + sdate + '&Edate=' + edate + '&LanguageID=' + lid);
  }


  public InsertDoctorSlotsNew(list1, list2, did) {

    return this.http.get<any[]>(this.host + '/Hospital/InsertDoctorSlotsNew?dayslist=' + list1 + '&slotslist=' + list2 + '&DoctorID=' + did);
  }

  public GetDoctorSlotsByDoctorID(doctorid, slottypeid, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorSlotsByDoctorID?DoctorID=' + doctorid + '&SlotTypeID=' + slottypeid + '&LanguageID=' + lid);
  }

  public GetDoctorcalenderSlotsByDoctorID(doctorid, slottypeid, startdate, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorcalenderSlotsByDoctorID?DoctorID=' + doctorid + '&SlotTypeID=' + slottypeid + '&StartDate=' + startdate + '&LanguageID=' + lid);
  }


  public InsertMyTeam(data) {
    this.url = this.host + '/Master/InsertMyTeam';
    return this.http.post(this.url, data)
  }
  public UpdateMyTeam(data) {
    this.url = this.host + '/Master/UpdateMyTeam';
    return this.http.post(this.url, data)
  }
  public GetMyTeam(did) {

    return this.http.get<any[]>(this.host + '/Master/GetMyTeam?DiagnosticID=' + did);
  }

  public DeleteMyTeam(id, typeid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteMyTeam?ID=' + id + '&TypeID=' + typeid);
  }

  public InsertDoctorSlots_DateWiseAvailable(data) {
    this.url = this.host + '/Doctor/InsertDoctorSlots_DateWiseAvailable';
    return this.http.post(this.url, data)
  }


  public DeleteDoctorSlots_DateWiseAvailable(data) {
    this.url = this.host + '/Doctor/DeleteDoctorSlots_DateWiseAvailable';
    return this.http.post(this.url, data)
  }


  public GetDoctorCancelledAppointmentByDateWise(doctorid, slotid, appdate) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorCancelledAppointmentByDateWise?DoctorID=' + doctorid + '&DoctorSlotID=' + slotid + '&ApptDatetime=' + appdate);
  }

  public GetDoctorAppointmentByDateBySlot(doctorid, slotid, appdate) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorAppointmentByDateBySlot?DoctorID=' + doctorid + '&DoctorSlotID=' + slotid + '&ApptDatetime=' + appdate);
  }

  //pharmacy changes

  public GetNotification_Pharmacy(pharmacyid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetNotification_Pharmacy?PharmacyID=' + pharmacyid);
  }

  public GetPatientOrderedMedicines(orderid, lid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetPatientOrderedMedicines?OrderID=' + orderid + '&LanguageID=' + lid);
  }

  public UpdateNotification_PharmacyAccepted(pharmacyid, orderid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/UpdateNotification_PharmacyAccepted?PharmacyID=' + pharmacyid + '&OrderID=' + orderid);
  }

  public UpdateNotification_PharmacyRejected(pharmacyid, orderid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/UpdateNotification_PharmacyRejected?PharmacyID=' + pharmacyid + '&OrderID=' + orderid);
  }


  public UpdatePatientOrderedMedicinesAvailableMedicines(data) {
    this.url = this.host + '/Pharmacy/UpdatePatientOrderedMedicinesAvailableMedicines';
    return this.http.post(this.url, data)
  }

  public UpdatePatientOrderedMedicinesUnAvailableMedicines(id) {

    return this.http.get<any[]>(this.host + '/Pharmacy/UpdatePatientOrderedMedicinesUnAvailableMedicines?ID=' + id);
  }

  //rajaneesh


  public InsertDiagnosticReceptionistLogin(data) {
    this.url = this.host + '/Master/InsertDiagnosticReceptionistLogin';
    return this.http.post(this.url, data)
  }
  public UpdateDiagnosticReceptionistLogin(data) {
    this.url = this.host + '/Master/UpdateDiagnosticReceptionistLogin';
    return this.http.post(this.url, data)
  }
  public GetDiagnosticReceptionistLoginByUserNameAndPassword(uname, password, pinno) {
    ;
    return this.http.get<any[]>(this.host + '/Master/GetDiagnosticReceptionistLoginByUserNameAndPassword?UserName=' + uname + '&Password=' + password + '&Pinno=' + pinno);
  }
  public GetDiagnosticReceptionistLogin(did) {

    return this.http.get<any[]>(this.host + '/Master/GetDiagnosticReceptionistLogin?DiagnosticID=' + did);
  }
  public DeleteDiagnosticReceptionistLogin(id, typeid) {

    return this.http.get<any[]>(this.host + '/Master/DeleteDiagnosticReceptionistLogin?ID=' + id + '&TypeID=' + typeid);
  }
  public GetDiagnosticCenterTestsByID(did, lid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetDiagnosticCenterTestsByID?ID=' + did + '&LanguageID=' + lid);
  }
  public GetDiagnosticPackagesByIDMob(did, lid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetDiagnosticPackagesByIDMob?DiagnosticCenterID=' + did + '&LanguageID=' + lid);
  }
  public GetDiagnosticSlotsWeb(did, date, timeid, dayid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticSlotsWeb?DiagnosticCenterID=' + did + '&Date=' + date + '&TimeID=' + timeid + '&DayID=' + dayid);
  }
  public InsertDiagnosticAppointments(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticAppointments';
    return this.http.post(this.url, data)
  }
  public InsertDiagnosticBookedTests(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticBookedTests';
    return this.http.post(this.url, data)
  }

  public UpdateDoctor_PatientPrescriptionreorderBit(did) {

    return this.http.get<any[]>(this.host + '/Pharmacy/UpdateDoctor_PatientPrescriptionreorderBit?ID=' + did);
  }
  public DeletePatient_TextMedicineDetailsByID(id) {

    return this.http.get<any[]>(this.host + '/Diagnostic/DeletePatient_TextMedicineDetailsByID?ID=' + id);
  }

  public GetDiagnosticSlots(did, lid, typeid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticSlots?DiagnosticCenterID=' + did + '&LanguageID=' + lid + '&TypeIDs=' + typeid);
  }

  public GetMyTeamAssainOrders(id) {
    return this.http.get<any[]>(this.host + '/Diagnostic/GetMyTeamAssainOrders?DiagnosticID=' + id);
  }

  public InsertDiagnostic_HomeSampleOrders(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnostic_HomeSampleOrders';
    return this.http.post(this.url, data)
  }

  public UpdateDiagnosticBookedTests(data) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticBookedTests';
    return this.http.post(this.url, data)
  }


  public DeleteDoctSlots(id) {
    return this.http.get<any[]>(this.host + '/Diagnostic/DeleteDoctorSlots?ID=' + id);
  }

  public UpdateDoctorSlotsWeb(data) {
    this.url = this.host + '/Diagnostic/UpdateDoctorSlotsWeb';
    return this.http.post(this.url, data)
  }


  public InsertDoctorSlotsWeb(data) {
    this.url = this.host + '/Doctor/InsertDoctorSlotsWeb';
    return this.http.post(this.url, data)
  }

  public GetBookAppointmentByDoctorIDAutoCancelled(doctorid, appdate) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointmentByDoctorIDAutoCancelled?DoctorID=' + doctorid + '&AppointmentDate=' + appdate);
  }


  public GetSlotsByIDPlanning(startid, endid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSlotsByIDPlanning?StartID=' + startid + '&EndID=' + endid);
  }



  public GetHospitalClinicBillingDetails(tid, sdate, edate) {

    return this.http.get<any[]>(this.host + '/Master/GetHospitalClinicBillingDetails?Type=' + tid + '&SDate=' + sdate + '&EDate=' + edate);
  }
  public InsertSentInvoice(data) {
    this.url = this.host + '/Master/InsertSentInvoice';
    return this.http.post(this.url, data)
  }

  public UploadInvoicePDF(files) {
    ;
    let formdata: FormData = new FormData();
    formdata.append('file_upload', files, files.name);
    return this.http.post(this.host + '/Master/UploadInvoicePDF/', formdata);
  }
  public GetSentInvoice(type) {
    return this.http.get<any[]>(this.host + '/Master/GetSentInvoice?Type=' + type);
  }

  public MakePaymentPaid(id, paiddate) {

    return this.http.get<any[]>(this.host + '/Master/MakePaymentPaid?ID=' + id + '&PaidDate=' + paiddate);
  }

  public GetDiaGnosticSlotsByCalender(did, lid, appdate, typeids) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiaGnosticSlotsByCalender?DiagnosticCenterID=' + did + '&LanguageID=' + lid + '&AppointmentDate=' + appdate + '&TypeIDs=' + typeids);
  }
  public GetCountsForDashboard(type, month, year) {
    return this.http.get<any[]>(this.host + '/Master/GetCountsForDashboard?Type=' + type + '&Month=' + month + '&Year=' + year);
  }

  public UpdateNurseRegistrationPhoto(data) {
    this.url = this.host + '/Master/UpdateNurseRegistrationPhoto';
    return this.http.post(this.url, data)
  }
  public UpdateMidWivesRegistrationPhoto(data) {
    this.url = this.host + '/Master/UpdateMidWivesRegistrationPhoto';
    return this.http.post(this.url, data)
  }
  public UpdatePhysiotherapyRegistrationPhoto(data) {
    this.url = this.host + '/Master/UpdatePhysiotherapyRegistrationPhoto';
    return this.http.post(this.url, data)
  }

  public UpdateDiagnosticRelatedSlotsWeb(data) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticRelatedSlotsWeb';
    return this.http.post(this.url, data)
  }

  public DeleteDiagnosticRelatedSlots(id) {
    return this.http.get<any[]>(this.host + '/Diagnostic/DeleteDiagnosticRelatedSlots?ID=' + id);
  }

  public InsertDiagnosticRelatedSlotsWeb(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticRelatedSlotsWeb';
    return this.http.post(this.url, data)
  }

  public InsertDiagnosticRelatedSlotsByDateWise(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticRelatedSlotsByDateWise';
    return this.http.post(this.url, data)
  }


  public GetDiagnosticCancelledAppointmentByDateWise(diagnosticid, slotid, appdate) {
    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticCancelledAppointmentByDateWise?DiagnosticID=' + diagnosticid + '&DiagnosticSlotID=' + slotid + '&ApptDatetime=' + appdate);
  }

  public GetDiagnosticPaymentLinkMaster(DID) {
    return this.http.get<any[]>(this.host + '/Master/GetDiagnosticPaymentLinkMaster?DiagnosticID=' + DID);
  }
  public DeleteDiagnosticPaymentLinkMaster(id) {

    return this.http.get<any[]>(this.host + '/Master/DeleteDiagnosticPaymentLinkMaster?ID=' + id);
  }
  public UpdateDiagnosticPaymentLinkMaster(data) {
    this.url = this.host + '/Master/UpdateDiagnosticPaymentLinkMaster';
    return this.http.post(this.url, data)
  }

  public InsertDiagnosticPaymentLinkMaster(data) {
    this.url = this.host + '/Master/InsertDiagnosticPaymentLinkMaster';
    return this.http.post(this.url, data)
  }

  public GetDiagnosticAppointmentsByUsersReport(id, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticAppointmentsByUsersReport?DiagnosticCenterID=' + id + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }

  public GetDiagnosticSlotsByIDPlanning(startid, endid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticSlotsByIDPlanning?StartID=' + startid + '&EndID=' + endid);
  }


  public UpdatePatient_TextMedicineDetails(id) {

    return this.http.get<any[]>(this.host + '/Pharmacy/UpdatePatient_TextMedicineDetails?ID=' + id);
  }


  public InsertSupportForWeb1(data) {
    this.url = this.host + '/Doctor/InsertSupportForWeb1';
    return this.http.post(this.url, data)
  }

  public GetDoctorCommissionFeesByDoctorID(doctorid, appointmentypeid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorCommissionFeesByDoctorID?DoctorID=' + doctorid + '&AppointmentTypeID=' + appointmentypeid);
  }

  public GetPatientRefundStatusWeb(lid, sdate, edate) {
    return this.http.get<any[]>(this.host + '/Doctor/GetPatientRefundStatusWeb?LanguageID=' + lid + '&StartDate=' + sdate + '&EndDate=' + edate);
  }

  public UpdatePatientRefundStatus(data) {
    this.url = this.host + '/Doctor/UpdatePatientRefundStatus';
    return this.http.post(this.url, data)
  }

  public UpdatePatientRefundStatusByBankDetails(data) {
    this.url = this.host + '/Doctor/UpdatePatientRefundStatusByBankDetails';
    return this.http.post(this.url, data)
  }

  public GetBookAppointmentByDateWiseAppointmentCount(appdate, doctorid) {
    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointmentByDateWiseAppointmentCount?AppointmentDate=' + appdate + '&DoctorID=' + doctorid);
  }

  public GetBookAppointmentByDateWiseAndSlotWiseAppointmentCount(appdate, doctorid, slotid) {
    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointmentByDateWiseAndSlotWiseAppointmentCount?AppointmentDate=' + appdate + '&DoctorID=' + doctorid + '&SlotID=' + slotid);
  }


  public GetNursePriceDetails(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetNursePriceDetails?NurseID=' + id);
  }

  public GetPhysioPriceDetailsWeb(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPhysioPriceDetailsWeb?PhysioID=' + id);
  }

  public GetMidwifePriceDetails(MidwifeID) {

    return this.http.get<any[]>(this.host + '/Doctor/GetMidwifePriceDetails?MidwifeID=' + MidwifeID);
  }


  public InserDiagnostic_ChatMaster(data) {
    this.url = this.host + '/Diagnostic/InserDiagnostic_ChatMaster';
    return this.http.post(this.url, data)
  }


  public InsertDiagnostic_ChatDetails(data) {
    this.url = this.host + '/Diagnostic/InsertDiagnostic_ChatDetails';
    return this.http.post(this.url, data)
  }

  public GetDiagnosticChatDetailsWeb(chatid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticChatDetailsWeb?ChatID=' + chatid);
  }


  public UpdateChatDetailsSeen(chatid) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateChatDetailsSeen?ChatID=' + chatid);
  }

  public GetDiagnosticAppointmentPhotos(diappid) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticAppointmentPhotos?DiagAppID=' + diappid);
  }


  public UpdateDiagnosticAppointmentsByType(diappid, amount) {

    return this.http.get<any[]>(this.host + '/Diagnostic/UpdateDiagnosticAppointmentsByType?AppointmentID=' + diappid + '&Amount=' + amount);
  }


  public InsertSupportForWebNotificationsDiaPha(data) {
    this.url = this.host + '/Doctor/InsertSupportForWebNotificationsDiaPha';
    return this.http.post(this.url, data)
  }

  public UpdateSupport(data) {
    this.url = this.host + '/Doctor/UpdateSupport';
    return this.http.post(this.url, data)
  }

  public UpdateSupportForWebForAssignMeridional(id) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateSupportForWebForAssignMeridional?ID=' + id);
  }

  public UpdateSupportForWebMeridionalCommetnts(data) {
    this.url = this.host + '/Doctor/UpdateSupportForWebMeridionalCommetnts';
    return this.http.post(this.url, data)
  }


  public GetDiagnosticpatients(diacenterid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticpatients?DiagnosticCenterID=' + diacenterid);
  }


  public GetBookAppointmentByHospitalPatients(hospitalid, startdtae, endate) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointmentByHospitalPatients?HospitalID=' + hospitalid + '&Startdate=' + startdtae + '&Enddate=' + endate);
  }


  public Authenicate(data) {
    this.url = this.host + '/Doctor/Authenicate';
    return this.http.post(this.url, data)
  }


  public GetHomecareRevenueByHospitalIDByNurse(hospitalid, sdate, edate) {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetHomecareRevenueByHospitalIDByNurse?HospitalID=' + hospitalid + '&Sdate=' + sdate + '&Edate=' + edate);
  }

  //home care appointments

  public GetNurse_AvailabilitySlotsByTimeWeb(NurseID, Time, Date) {

    return this.http.get<any[]>(this.host + '/Doctor/GetNurse_AvailabilitySlotsByTimeWeb?NurseID=' + NurseID + '&Time=' + Time + '&Date=' + Date);
  }

  public GetBook_MidWifeAvailabilitySlotsasweb(MidWifeID, Time, Date) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBook_MidWifeAvailabilitySlotsasweb?MidWifeID=' + MidWifeID + '&Time=' + Time + '&Date=' + Date);
  }

  public GetPhysiotherapist_AvailabilitySlotsWeb(PhysiotherapyID, Time, Date) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPhysiotherapist_AvailabilitySlotsWeb?PhysiotherapyID=' + PhysiotherapyID + '&Time=' + Time + '&Date=' + Date);
  }


  public InsertPhysiotherapist_AvailabilitySlotsWeb(data) {
    this.url = this.host + '/Doctor/InsertPhysiotherapist_AvailabilitySlotsWeb';
    return this.http.post(this.url, data)
  }


  public InsertNurse_AvailabilitySlotsWeb(data) {
    this.url = this.host + '/Doctor/InsertNurse_AvailabilitySlotsWeb';
    return this.http.post(this.url, data)
  }

  public InsertBook_MidWifeAvailabilitySlotsWeb(data) {
    this.url = this.host + '/Doctor/InsertBook_MidWifeAvailabilitySlotsWeb';
    return this.http.post(this.url, data)
  }


  public DeleteInventory(diacenterid) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteInventory?ID=' + diacenterid);
  }


  public UpdateBookVideoCallRejoinbit(appid) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBookVideoCallRejoinbit?ID=' + appid);
  }


  public InsertFAQ_Attachments(data) {
    this.url = this.host + '/Doctor/InsertFAQ_Attachments';
    return this.http.post(this.url, data)
  }

  public GetFAQ_Attachments(faqid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetFAQ_Attachments?FaqID=' + faqid);
  }

  public GetTopicMaster() {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetTopicMaster"
    );
  }

  public InsertChapterMaster(data) {
    this.url = this.host + '/Doctor/InsertChapterMaster';
    return this.http.post(this.url, data)
  }


  public InsertQuickGuide(data) {

    this.url = this.host + '/Doctor/InsertQuickGuide';
    return this.http.post(this.url, data)
  }


  public GetQuickGuide(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetQuickGuide?LanguageID=' + lid);
  }

  public DeleteQuickGuide(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteQuickGuide?ID=' + id);
  }


  public UpdateQuickGuide(data) {

    this.url = this.host + '/Doctor/UpdateQuickGuide';
    return this.http.post(this.url, data)
  }


  public InsertTopicMaster(data) {

    this.url = this.host + '/Doctor/InsertTopicMaster';
    return this.http.post(this.url, data)
  }
  public UpdateTopicMaster(data) {

    this.url = this.host + '/Doctor/UpdateTopicMaster';
    return this.http.post(this.url, data)
  }


  public DeleteTopicMaster(id) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteTopicMaster?ID=' + id);
  }



  public ReceiptUpload(files) {

    let formdata: FormData = new FormData();
    formdata.append('file_upload', files, files.name);

    return this.http.post(this.host + '/Doctor/ReceiptUpload/', formdata);
  }


  public UpdateBookAppoinmentReceiptUrl(data) {

    this.url = this.host + '/Doctor/UpdateBookAppoinmentReceiptUrl';
    return this.http.post(this.url, data)
  }


  public UpdateBook_Nurse_AppointmentPdfUrl(data) {

    this.url = this.host + '/Doctor/UpdateBook_Nurse_AppointmentPdfUrl';
    return this.http.post(this.url, data)
  }


  public UpdateBook_Midwives_Appointment(data) {

    this.url = this.host + '/Doctor/UpdateBook_Midwives_Appointment';
    return this.http.post(this.url, data)
  }

  public UpdateBook_Physio_AppointmentPdfUrl(data) {

    this.url = this.host + '/Doctor/UpdateBook_Physio_AppointmentPdfUrl';
    return this.http.post(this.url, data)
  }


  public UpdateBookAppointment(data) {

    this.url = this.host + '/Doctor/UpdateBookAppointment';
    return this.http.post(this.url, data)
  }



  public UpdateBookAppointmentRefund(data) {

    this.url = this.host + '/Doctor/UpdateBookAppointmentRefund';
    return this.http.post(this.url, data)
  }

  public UpdatePatientWalletAmountDetailsLoadWallet(data) {

    this.url = this.host + '/Diagnostic/UpdatePatientWalletAmountDetailsLoadWallet';
    return this.http.post(this.url, data)
  }


  public GetChapterMaster(lid, typeid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetChapterMaster?LanguageID=' + lid + '&Typeid=' + typeid);
  }

  public GetQuickGuideByWeb(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetQuickGuideByWeb?LanguageID=' + lid);
  }

  public InsertIndependentDoctors_Receptionist(data) {

    this.url = this.host + '/Doctor/InsertIndependentDoctors_Receptionist';
    return this.http.post(this.url, data)
  }

  public UpdateIndependentDoctors_Receptionist(data) {

    this.url = this.host + '/Doctor/UpdateIndependentDoctors_Receptionist';
    return this.http.post(this.url, data)
  }

  public GetIndependentDoctors_Receptionist(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetIndependentDoctors_Receptionist?LanguageID=' + lid);
  }

  public UpdateSickSlipGenaratorSickSlipUrl(data) {

    this.url = this.host + '/Doctor/UpdateSickSlipGenaratorSickSlipUrl';
    return this.http.post(this.url, data)
  }
  public GetIndependentDoctors_ReceptionistByUserNameAndPwd(pinno, uname, pwd) {

    return this.http.get<any[]>(this.host + '/Doctor/GetIndependentDoctors_ReceptionistByUserNameAndPwd?Pinno=' + pinno + '&UserName=' + uname + '&Password=' + pwd);
  }

  public InsertBingoPayments(data) {
    this.url = "https://preprod.binga.ma/bingaApi/api/orders/json/prepay";
    return this.http.post(this.url, data)
  }



  // public SendTwillioSMS(data) {
  //   ;
  //   this.url = this.host + '/Doctor/SendTwillioSMS';
  //   return this.http.post(this.url, data)
  // }


  public SendTwillioSMS(phoneno, msg) {

    return this.http.get<any[]>(this.host + '/Doctor/SendTwillioSMS?PhoneNumber=' + phoneno + '&Message=' + msg);
  }


  public GetDoctorForAdminByLanguageIDForWorking(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorForAdminByLanguageIDForWorking?LanguageID=' + lid);
  }



  public InsertPatientRelation_FamilyTree_Web(data) {

    this.url = this.host + '/PatientRegistration/InsertPatientRelation_FamilyTree_Web';
    return this.http.post(this.url, data)
  }

  public GetDates(newDate) {
    var d = new Date(newDate),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    var date = month + "-" + day + "-" + year;
    return date = month + "-" + day + "-" + year;

  }

  public Getyearmonthformat(newDate) {
    var d = new Date(newDate),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    var date = month + "-" + day + "-" + year;
    return date = year + "-" + month + "-" + day;

  }


  public UpdatePharmacyOffers(data) {

    this.url = this.host + '/Pharmacy/UpdatePharmacyOffers';
    return this.http.post(this.url, data)
  }

  public UpdatePharmacyOffersPhotos(data) {

    this.url = this.host + '/Pharmacy/UpdatePharmacyOffersPhotos';
    return this.http.post(this.url, data)
  }

  public GetPharmacyOffersPhotos(id) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetPharmacyOffersPhotos?ID=' + id);
  }

  public GetPatient_Referal_InvitationsWeb(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_Referal_InvitationsWeb?LanguageID=' + id);
  }
  public InsertPatient_Invites_Master(data) {

    this.url = this.host + '/Doctor/InsertPatient_Invites_Master';
    return this.http.post(this.url, data)
  }
  public GetPatient_Invites_Master(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_Invites_Master?LanguageID=' + id);
  }


  public InsertPatient_WalletLogWeb(data) {
    this.url = this.host + '/Doctor/InsertPatient_WalletLogWeb';
    return this.http.post(this.url, data)
  }


  public InsertNotifications_DoctorWeb(data) {
    this.url = this.host + '/Doctor/InsertNotifications_DoctorWeb';
    return this.http.post(this.url, data)
  }



  public DisableIndependentDoctors_Receptionist(id) {
    return this.http.get(this.host + '/Doctor/DisableIndependentDoctors_Receptionist?ID=' + id);
  }


  public EnableIndependentDoctors_Receptionist(id) {
    return this.http.get(this.host + '/Doctor/EnableIndependentDoctors_Receptionist?ID=' + id);
  }
  public DisableReceiptionistLogin(id) {
    return this.http.get(this.host + '/Doctor/DisableReceiptionistLogin?ID=' + id);
  }
  public EnableReceiptionistLogin(id) {
    return this.http.get(this.host + '/Doctor/EnableReceiptionistLogin?ID=' + id);
  }


  public UpdateDepartmentMasterEnable(typeid, id) {
    return this.http.get(this.host + '/Hospital/UpdateDepartmentMasterEnable?TypeID=' + typeid + '&ID=' + id);
  }


  public GetProvidersPay(sdate, edate, typeid, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetProvidersPay?Sdate=' + sdate + '&Edate=' + edate + '&TypeID=' + typeid + '&LanguageID=' + lid);
  }


  public InsertDiagnostic_SoapNotesAttachments(data) {
    this.url = this.host + '/Doctor/InsertDiagnostic_SoapNotesAttachments';
    return this.http.post(this.url, data)
  }



  //home visit slots



  public GetDoctorSlotsss(docid, dayid, hospitalid, timeid, appdatetime, dhid, slottypeid) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetDoctorSlotsss?DoctorID=" + docid + '&DayID=' + dayid + '&Hospital_ClinicID=' + hospitalid + '&TimeID=' + timeid + '&ApptDatetime=' + appdatetime + '&DoctorHospitalDetailsID=' + dhid + '&SlotTypeID=' + slottypeid
    );
  }


  public GetDiagnostic_SoapNotesAttachmentsWeb(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnostic_SoapNotesAttachmentsWeb?PatientID=' + id);
  }

  public GetDiagnosticTest_DoctorTemplate(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticTest_DoctorTemplate?DoctorID=' + id);
  }


  public InsertDiagnosticTest_DoctorTemplate(data) {
    this.url = this.host + '/Doctor/InsertDiagnosticTest_DoctorTemplate';
    return this.http.post(this.url, data)
  }


  public UpdateDiagnosticTest_DoctorTemplate(data) {
    this.url = this.host + '/Doctor/UpdateDiagnosticTest_DoctorTemplate';
    return this.http.post(this.url, data)
  }



  public SoapAttachments(files) {

    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);

    }
    return this.http.post(this.host + '/Doctor/SoapAttachments/', formdata);
  }


  public DeleteArticle(lid) {

    return this.http.get<any[]>(this.host + '/Articles/DeleteArticle?ID=' + lid);
  }

  public GetPatient_VitalDetailsWeb(appid, typeid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_VitalDetailsWeb?AppointmentID=' + appid + '&TypeID=' + typeid);
  }

  public GetPatient_VitalDetailsByPatientID(appid, typeid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_VitalDetailsByPatientID?PatientID=' + appid + '&TypeID=' + typeid);
  }

  public UpdateForgotPsswords(data) {
    this.url = this.host + '/Doctor/UpdateForgotPsswords';
    return this.http.post(this.url, data)
  }


  public UpdatePatientRegistrationForWeb(data) {
    this.url = this.host + '/PatientRegistration/UpdatePatientRegistrationForWeb';
    return this.http.post(this.url, data)
  }

  public GetRoleTypesMasterBYIDForgotpassword(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetRoleTypesMasterBYIDForgotpassword?LanguageID=' + lid);
  }

  public GetAllProvidersByPinAndUname(pino, uname, typeid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetAllProvidersByPinAndUname?Pinno=' + pino + '&UserName=' + uname + '&TypeID=' + typeid);
  }
  public UpdateRecpPsswords(data) {
    this.url = this.host + '/Doctor/UpdateRecpPsswords';
    return this.http.post(this.url, data)
  }


  public UpdateHomeVisitDeliveryChargesMaster(data) {
    this.url = this.host + '/Doctor/UpdateHomeVisitDeliveryChargesMaster';
    return this.http.post(this.url, data)
  }
  public GetHomeVisitDeliveryChargesMaster(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetHomeVisitDeliveryChargesMaster?LanguageID=' + lid);
  }

  public GetDianosticAppointments_PaymentsReport(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetDianosticAppointments_PaymentsReport?StartDate=' + sdate + '&EndDate=' + edate + '&LanguageID=' + lid);
  }

  public GetPharmcyOrders_PaymentsReport(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetPharmcyOrders_PaymentsReport?StartDate=' + sdate + '&EndDate=' + edate + '&LanguageID=' + lid);
  }

  public GetDiaPharmacCounts(sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetDiaPharmacCounts?StartDate=' + sdate + '&EndDate=' + edate + '&LanguageID=' + lid);
  }

  public GetDiaPharmaPaymenets(sdate, edate, typeid, lid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetDiaPharmaPaymenets?Sdate=' + sdate + '&Edate=' + edate + '&TypeID=' + typeid + '&LanguageID=' + lid);
  }


  public UpdateEnableDisableHomeVisitDeliveryChargesMaster(id, typeid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/UpdateEnableDisableHomeVisitDeliveryChargesMaster?ID=' + id + '&TypeID=' + typeid);
  }


  public UpdatePatient_TextMedicineDetailsPhotoAmount(data) {
    this.url = this.host + '/Pharmacy/UpdatePatient_TextMedicineDetailsPhotoAmount';
    return this.http.post(this.url, data)
  }

  public GetHomeCareDistinctPatientID(lid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetHomeCareDistinctPatientID?LanguageID=' + lid);
  }

  public GetHomeCaeeSoapNotesByID(id, lid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetHomeCaeeSoapNotesByID?ID=' + id + '&LanguageID=' + lid);
  }

  public GetAllHomeCareSoap(pid, lid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetAllHomeCareSoap?PatientID=' + pid + '&LanguageID=' + lid);
  }

  public InsertNPM_PatientSoapNotesWeb(data) {

    this.url = this.host + '/Doctor/InsertNPM_PatientSoapNotesWeb';
    return this.http.post(this.url, data)
  }

  public GetAllPreascriptionByPatientID(lid, pid, typeid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetAllPreascriptionByPatientID?LanguageID=' + lid + '&PatientID=' + pid + '&TypeID=' + typeid);
  }

  public GetBookAppointmentByDOctorss(lid, pid, typeid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointmentByDOctorss?LanguageID=' + lid + '&DoctorID=' + pid + '&TypeID=' + typeid);
  }


  public GetBookAppointmentByAppID(lid, pid, typeid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointmentByAppID?LanguageID=' + lid + '&AppointmentID=' + pid + '&TypeID=' + typeid);
  }



  public DoctorPdfreports(files) {

    let formdata: FormData = new FormData();
    formdata.append('file_upload', files, files.name);

    return this.http.post(this.host + '/Doctor/DoctorPdfreports/', formdata);
  }


  public UpdateBookAppointmentReportPdfsUrl(data) {
    this.url = this.host + '/Doctor/UpdateBookAppointmentReportPdfsUrl';
    return this.http.post(this.url, data)
  }

  public GetDoctorSlotsGap(slotid, appdate, appid, doctorid, dayid, typeid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorSlotsGap?SlotID=' + slotid + '&AppointmentDate=' + appdate + '&AppointmentID=' + appid + '&DoctorID=' + doctorid + '&DayID=' + dayid + '&TypeID=' + typeid);
  }

  public GetALlDeliveryChargesByCompany(lid, sdate, edate) {

    return this.http.get<any[]>(this.host + '/Doctor/GetALlDeliveryChargesByCompany?LanguageID=' + lid + '&StartDate=' + sdate + '&EndDate=' + edate);
  }

  public GetAllDeliveryPatnerDeliverReports(sdate, edate, deliveryid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetAllDeliveryPatnerDeliverReports?StartDate=' + sdate + '&EndDate=' + edate + '&DeliveryComapnayID=' + deliveryid);
  }

  public InsertpatientImportExcel(data) {
    this.url = this.host + '/PatientRegistration/InsertpatientImportExcel';
    return this.http.post(this.url, data)

  }

  public GetImportPatients_Exceptions() {

    return this.http.get<any[]>(this.host + '/PatientRegistration/GetImportPatients_Exceptions');
  }

  public GetAllProvidersRevenueReports(hosid, sdate, edate, typeid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetAllProvidersRevenueReports?HospitalID=' + hosid + '&Sdate=' + sdate + '&Edate=' + edate + '&TypeID=' + typeid);
  }


  public UpdateHospitalClinic_RevenueSubscriptions(data) {
    this.url = this.host + '/Hospital/UpdateHospitalClinic_RevenueSubscriptions';
    return this.http.post(this.url, data)
  }


  public GetPatient_Referal_InvitationsReports(lid) {

    return this.http.get<any[]>(this.host + '/Hospital/GetPatient_Referal_InvitationsReports?LanguageID=' + lid);
  }

  public GetBookAppointmentByReports(patientid, sdate, edate, lid) {

    return this.http.get<any[]>(this.host + '/Hospital/GetBookAppointmentByReports?PatientID=' + patientid + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }
  public GetHospitalRevenues(year, month, type) {
    return this.http.get<any[]>(this.host + '/Hospital/GetHospitalRevenue?Year=' + year + '&Month=' + month + '&TypeID=' + type);
  }

  public GetAllAdminPayments(year, month, type) {
    return this.http.get<any[]>(this.host + '/Hospital/GetAllAdminPayments?Year=' + year + '&Month=' + month + '&TypeID=' + type);
  }


  public UpdateMeridionalResolved(data) {
    this.url = this.host + '/Doctor/UpdateMeridionalResolved';
    return this.http.post(this.url, data)
  }

  public InsertProviderPaidPayments(data) {
    this.url = this.host + '/Doctor/InsertProviderPaidPayments';
    return this.http.post(this.url, data)
  }


  public GetProviderPaidPayments(type, year, month) {
    return this.http.get<any[]>(this.host + '/Doctor/GetProviderPaidPayments?Type=' + type + '&Year=' + year + '&Month=' + month);
  }

  public InsertVideoCall_Exceptions(data) {
    this.url = this.host + '/Doctor/InsertVideoCall_Exceptions';
    return this.http.post(this.url, data)
  }
  public GetNotificationssss(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetNotificationssss?DiagnosticID=' + id);
  }


  public UpdateOrderReadyBit(id) {
    return this.http.get<any[]>(this.host + '/Doctor/UpdateOrderReadyBit?ID=' + id);
  }



  public GetNurseServicesByIDWeb(lid, nurseid) {
    return this.http.get<any[]>(this.host + '/Doctor/GetNurseServicesByIDWeb?LanguageID=' + lid + "&NurseID=" + nurseid);
  }

  public GetPhysioServicesByIDWeb(lid, physioid) {
    return this.http.get<any[]>(this.host + '/Doctor/GetPhysioServicesByIDWeb?LanguageID=' + lid + "&PhysiotherapyID=" + physioid);
  }

  public InsertPhysioServicesMobileWeb(data) {
    this.url = this.host + '/Doctor/InsertPhysioServicesMobileWeb';
    return this.http.post(this.url, data)
  }

  public UpdatePhysioServicesMobileWeb(data) {
    this.url = this.host + '/Doctor/UpdatePhysioServicesMobileWeb';
    return this.http.post(this.url, data)
  }

  public InsertNurseServicesWeb(data) {
    this.url = this.host + '/Doctor/InsertNurseServicesWeb';
    return this.http.post(this.url, data)
  }


  public UpdateNurseServicesWeb(data) {
    this.url = this.host + '/Doctor/UpdateNurseServicesWeb';
    return this.http.post(this.url, data)
  }


  public GetBookAppointment_NurseServices(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointment_NurseServices?AppointmtntID=' + id);
  }

  public GetBookAppointment_PhysioServices(id) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointment_PhysioServices?AppointmtntID=' + id);
  }



  public DisableNurseService(lid) {

    return this.http.get<any[]>(this.host + '/PatientRegistration/DisableNurseService?ID=' + lid);
  }

  public EnableNurseService(lid) {

    return this.http.get<any[]>(this.host + '/PatientRegistration/EnableNurseService?ID=' + lid);
  }

  public EnableMidWifeService(lid) {

    return this.http.get<any[]>(this.host + '/PatientRegistration/EnableMidWifeService?ID=' + lid);
  }

  public DisableMidWifeService(lid) {

    return this.http.get<any[]>(this.host + '/PatientRegistration/DisableMidWifeService?ID=' + lid);
  }



  public UpdateMidWifeServicesWeb(data) {
    this.url = this.host + '/Doctor/UpdateMidWifeServicesWeb';
    return this.http.post(this.url, data)
  }

  public GetMidWifeServicesWeb(MidWifeID, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetMidWifeServicesWeb?MidWifeID=' + lid + '&LanguageID=' + lid);
  }
  public InsertMidWifeServicesWeb(data) {
    this.url = this.host + '/Doctor/InsertMidWifeServicesWeb';
    return this.http.post(this.url, data)
  }

  public GetBookAppointment_MidwifeServices(lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointment_MidwifeServices?AppointmtntID=' + lid);
  }

  public InsertHomeVisitDeliveryChargesMaster(data) {
    this.url = this.host + '/Doctor/InsertHomeVisitDeliveryChargesMaster';
    return this.http.post(this.url, data)
  }
  public GetDiagnosticTestMasterTests(lid, DiagnosticID) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticTestMasterTests?LanguageID=' + lid + '&DiagnosticID=' + DiagnosticID);
  }

  public UpdateDiagnosticCenterOffers(data) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticCenterOffers';
    return this.http.post(this.url, data)
  }
  public UpdateDiagnosticCenterOfferPhotos(data) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticCenterOfferPhotos';
    return this.http.post(this.url, data)
  }

  public GetPharmacyAppointmentPhotos(orderid) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetPharmacyAppointmentPhotos?OrderID=' + orderid);
  }

  public GetNurseSlotsByNurseID(nurseid, slotypeid, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetNurseSlotsByNurseID?NurseID=' + nurseid + '&SlotTypeID=' + slotypeid + '&LanguageID=' + lid);
  }


  public DeleteNurseWorkingDetailsBySlot(id) {

    return this.http.get<any[]>(this.host + '/Admin/DeleteNurseWorkingDetailsBySlot?ID=' + id);
  }

  public InsertNurseWorkingDetailsSlots(data) {
    this.url = this.host + '/Admin/InsertNurseWorkingDetailsSlots';
    return this.http.post(this.url, data)
  }

  public GetNurseWorkingDetailsDyWise(nurseid, slotypeid, sdate, lid) {
    debugger
    return this.http.get<any[]>(this.host + '/Admin/GetNurseWorkingDetailsDyWise?NurseID=' + nurseid + '&SlotTypeID=' + slotypeid + '&StartDate=' + sdate + '&LanguageID=' + lid);
  }

  public GetNurseAppointmentdabySlot(nurseid, slot, appdtetime) {

    return this.http.get<any[]>(this.host + '/Admin/GetNurseAppointmentdabySlot?NurseID=' + nurseid + '&DoctorSlotID=' + slot + '&ApptDatetime=' + appdtetime);
  }
  public GetNurseCancelledAppointmentByDateWise(nurseid, slot, appdtetime) {
    debugger
    return this.http.get<any[]>(this.host + '/Admin/GetNurseCancelledAppointmentByDateWise?NurseID=' + nurseid + '&DoctorSlotID=' + slot + '&ApptDatetime=' + appdtetime);
  }

  public InsertNurseWorkingDetails_DateWise(data) {
    this.url = this.host + '/Admin/InsertNurseWorkingDetails_DateWise';
    return this.http.post(this.url, data)
  }


  public GetDoctor_PatientDiagosticApps(patientid, lid) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctor_PatientDiagosticApps?PateintID=' + patientid + '&LanguageID=' + lid);
  }

  //physio calender
  public GetPhysioYearwiseCalender(nurseid, slotypeid, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetPhysioYearwiseCalender?PhysioID=' + nurseid + '&SlotTypeID=' + slotypeid + '&LanguageID=' + lid);
  }

  public InsertPhysiotherapistWorkingDetailsByYearWise(data) {
    this.url = this.host + '/Admin/InsertPhysiotherapistWorkingDetailsByYearWise';
    return this.http.post(this.url, data)
  }



  //midwife

  public GetMidwifeYearwiseCalender(nurseid, slotypeid, lid) {

    return this.http.get<any[]>(this.host + '/Admin/GetMidwifeYearwiseCalender?MidwifeID=' + nurseid + '&SlotTypeID=' + slotypeid + '&LanguageID=' + lid);
  }

  public InsertMidWifeWorkingDetailsYearwise(data) {
    this.url = this.host + '/Admin/InsertMidWifeWorkingDetailsYearwise';
    return this.http.post(this.url, data)
  }

  public GetPhysioWorkingDetailsDyWise(PhysioID, slotypeid, sdate, lid) {
    debugger
    return this.http.get<any[]>(this.host + '/Admin/GetPhysioWorkingDetailsDyWise?PhysioID=' + PhysioID + '&SlotTypeID=' + slotypeid + '&StartDate=' + sdate + '&LanguageID=' + lid);
  }

  public InsertPhysioWorkingDetails_DateWise(data) {
    this.url = this.host + '/Admin/InsertPhysioWorkingDetails_DateWise';
    return this.http.post(this.url, data)
  }



  public GetPhysioAppointmentdabySlot(physioid, slotid, appdate) {

    return this.http.get<any[]>(this.host + '/Admin/GetPhysioAppointmentdabySlot?PhysioID=' + physioid + '&DoctorSlotID=' + slotid + '&ApptDatetime=' + appdate);
  }

  public GetPhysioCancelledAppointmentByDateWise(physioid, slotid, appdate) {

    return this.http.get<any[]>(this.host + '/Admin/GetPhysioCancelledAppointmentByDateWise?PhysioID=' + physioid + '&DoctorSlotID=' + slotid + '&ApptDatetime=' + appdate);
  }

  public GetBook_Physio_AppointmentCount(appdate, physioid) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Physio_AppointmentCount?AppointmentDate=' + appdate + '&PhysioID=' + physioid);
  }


  public GetMidwifeWorkingDetailsDyWise(nurseid, slotypeid, StartDate, lid) {
    return this.http.get<any[]>(this.host + '/Admin/GetMidwifeWorkingDetailsDyWise?MidwifeID=' + nurseid + '&SlotTypeID=' + slotypeid + '&StartDate=' + StartDate + '&LanguageID=' + lid);
  }


  public InsertMidwifeWorkingDetails_DateWise(data) {
    this.url = this.host + '/Admin/InsertMidwifeWorkingDetails_DateWise';
    return this.http.post(this.url, data)
  }


  public GetMidwifeAppointmentdabySlot(midwifeid, slotid, appdate) {

    return this.http.get<any[]>(this.host + '/Admin/GetMidwifeAppointmentdabySlot?MidWivesID=' + midwifeid + '&DoctorSlotID=' + slotid + '&ApptDatetime=' + appdate);
  }

  public GetMidwifeCancelledAppointmentByDateWise(midwifeid, slotid, appdate) {

    return this.http.get<any[]>(this.host + '/Admin/GetMidwifeCancelledAppointmentByDateWise?MidwifeID=' + midwifeid + '&DoctorSlotID=' + slotid + '&ApptDatetime=' + appdate);
  }
  public GetBook_Midwives_AppointmentCount(appdate, MidwifeID) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Midwives_AppointmentCount?AppointmentDate=' + appdate + '&MidwifeID=' + MidwifeID);
  }


  public UpdatePatientRegistrationVaccinationstatus(data) {
    this.url = this.host + '/Doctor/UpdatePatientRegistrationVaccinationstatus';
    return this.http.post(this.url, data)
  }


  public GetPatient_VaccinationDetails(PatientID) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_VaccinationDetails?PatientID=' + PatientID);
  }


  public InsertPatient_VaccinationDetails(data) {
    this.url = this.host + '/Doctor/InsertPatient_VaccinationDetails';
    return this.http.post(this.url, data)
  }

  public GetBookApptbyPatientID(id, lid) {
    debugger
    return this.http.get<any[]>(this.host + '/Doctor/GetBookApptbyPatientID?PatientID=' + id + '&LanguageID=' + lid);
  }

  public InsertDoctors_PersonalFolder(data) {
    this.url = this.host + '/Doctor/InsertDoctors_PersonalFolder';
    return this.http.post(this.url, data)
  }

  public GetDoctors_PersonalFolder(doctorid, lid) {
    debugger
    return this.http.get<any[]>(this.host + '/Doctor/GetDoctors_PersonalFolder?DoctorID=' + doctorid + '&LanguageID=' + lid);
  }

  public InsertFolders_Attchments(data) {
    this.url = this.host + '/Doctor/InsertFolders_Attchments';
    return this.http.post(this.url, data)
  }

  public GetFolders_Attchments(folderid, lid) {
    debugger
    return this.http.get<any[]>(this.host + '/Doctor/GetFolders_Attchments?FolderID=' + folderid + '&LanguageID=' + lid);
  }

  public GetSubFolder_Attachments(folderid, lid) {
    debugger
    return this.http.get<any[]>(this.host + '/Doctor/GetSubFolder_Attachments?SubfolderID=' + folderid + '&LanguageID=' + lid);
  }


  public InsertSubFolder_Attachments(data) {
    this.url = this.host + '/Doctor/InsertSubFolder_Attachments';
    return this.http.post(this.url, data)
  }



  public UploadPatientDocuments(files, foldername) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      debugger
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Doctor/UploadPatientDocuments?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }


  
  public DoctorReports(files,foldername) {

    let formdata: FormData = new FormData();
    formdata.append('file_upload', files, files.name);

    this.url = this.host + '/Doctor/UploadPatientDocuments?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }



  public GetSub_Folders_Attachemnts(folderid, lid) {
    debugger
    return this.http.get<any[]>(this.host + '/Doctor/GetSub_Folders_Attachemnts?SubFolders_ID=' + folderid + '&LanguageID=' + lid);
  }

  
  public InsertSub_Folders_Attachemnts(data) {
    this.url = this.host + '/Doctor/InsertSub_Folders_Attachemnts';
    return this.http.post(this.url, data)
  }
}
