import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
@Component({
  selector: 'app-voiladoc-registered-users',
  templateUrl: './voiladoc-registered-users.component.html',
  styleUrls: ['./voiladoc-registered-users.component.css']
})
export class VoiladocRegisteredUsersComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }


  value: any;
  SDate = new Date();
  EDate = new Date();

  public startdate: any;
  public enddate: any;
  public todaydate: any;
  public CurrentTime: any;
  public languageid: any;
  public linkslist: any;
  public search: any;
  public RegisteredList: any;
  public count: any;

  ngOnInit() {
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    var kkk = this.SDate.setDate(this.SDate.getDate() - 5);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);


    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    this.CurrentTime = hours + ':' + minutes + ' ' + newformat;
    this.languageid = localStorage.getItem("LanguageID");

    this.typeid = 1
    this.GetRegistreedVoiladocusers()

  }

  selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetRegistreedVoiladocusers()
  }

  public dummreglist: any;

  public GetRegistreedVoiladocusers() {
    this.docservice.GetVoiladocRegistrationsUsers(this.startdate, this.enddate, this.typeid).subscribe(data => {
      // this.RegisteredList = data;
      this.dummreglist = data;
      this.RegisteredList = this.dummreglist.filter(x => x.approved == 0 && x.rejected == 0)
      this.count = this.RegisteredList.length;

    })
  }

  public typeid: any;

  public GetTypeID(even) {
    debugger
    this.typeid = even.target.value;
    // this.RegisteredList = this.dummreglist.filter(x =>x.approved == 0 && x.rejected == 0)
    // this.count = this.RegisteredList.length;
    this.GetRegistreedVoiladocusers()
  }

  public GetApproveRegistratuions(list) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Approve This!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
          let test = res;
          this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
          })
          if (list.type == '1') {
            debugger
            this.InsertHospitalDetails(list)
          }
          if (list.type == '2') {
            debugger
            this.InsertHospitalDetails(list)
          }
          if (list.type == '3') {
            this.insertdoctorregistration(list)
          }
          if (list.type == '4') {
            debugger
            this.insertnursedetails(list)
          }
          if (list.type == '5') {
            debugger
            this.insertphysiodetails(list)
          }
          if (list.type == '6') {
            debugger
            this.InsertMidWives(list)
          }
          if (list.type == '7') {
            debugger
            this.InserPharmacyDetails(list)
          }
          if (list.type == '8') {
            debugger
            this.InserDiagnostoicDetails(list)
          }
          debugger
        })
        Swal.fire(
          'Approved!',
          'User has been Approved.',
          'success'
        )
      }
      else {

      }
    })
  }



  //Hospital

  public hospitalclinicid: any;
  public attachmentsurl = [];

  public InsertHospitalDetails(list) {
    if (this.attachmentsurl.length == 0) {
      this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\HospitalPhotos\\Hospital.jpg';
    }
    this.spinner.show();
    // this.timings = this.tone + ' ' + ' TO ' + this.ttwo + ' ';
    // this.hspwebsite = 'https://' + '' + this.website
    var entity = {
      'Hospital_ClinicID': list.hospitalClinicID,
      'Hospital_ClinicName': list.username,
      'Address': list.address,
      'PhoneNo': list.phoneNo,
      'EmailID': list.email,
      'ZipCode': 0,
      'LanguageID': '1',
      'Timings': 0,
      'Description': 'none',
      'AvailabilityID': '1',
      'ContactPersonName': list.contactpersonName,
      'ContactPersonPhNo': list.contatcpersonPhoneNo,
      'Website': list.website,
      'YearEstablished': 0,
      'NoOfBeds': 0,
      'Emergency': 0,
      'CityID': 0,
      'Preffered': 0,
      'HospitalLogoUrl': this.attachmentsurl[0],
      'AreaID': 0,
      'Pincode': 0,
      'CountryID': 0,
      'MonthlySubscription': 0,
      'Hospitalfulltimebit': 0
    }
    this.docservice.InsertHospitalClinicDetailsMaster(entity).subscribe(data => {

      if (data != 0) {
        this.hospitalclinicid = data;
        this.inserthspphotos();
        this.insertdetails(list)
        // this.inserthspvideos();
        // this.insertfacility();
        // this.insertinsurance();
        // this.InsertSubscriptionRevenue()
        Swal.fire('Registration Completed', 'Details saved successfully', 'success');
        // this.clear();
        // location.href = "#/HspClidash"
        this.spinner.hide();
        this.GetRegistreedVoiladocusers()
      }
      else {
        Swal.fire('Hospital Clinic Name', 'Already Exists');
        // this.clear();
        this.spinner.hide();
        // location.href = "#/HspClidash"
      }
    })

  }

  public inserthspphotos() {
    for (let i = 1; i < this.attachmentsurl.length; i++) {
      var entity = {
        'Hospital_ClinicID': this.hospitalclinicid,
        'PhotoURL': this.attachmentsurl[i]
      }
      this.docservice.InsertHospital_ClinicPhotos(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }

  public insertdetails(list) {
    var entity = {
      'Hospital_ClinicID': this.hospitalclinicid,
      'UserName': list.regysername,
      'Password': list.password
    }
    this.docservice.InsertHospitalClinicAdminRegistration(entity).subscribe(data => {

      if (data != 0) {
        Swal.fire('Registration Completed', 'Details saved successfully', 'success');


      }
      else {
        Swal.fire('Error', 'Hospital Login Already Exists', 'success');

      }
    })
  }





  //Doctor Registration

  public doctorid: any;

  public attachmentsurl1 = [];
  public signatureurl = []

  public insertdoctorregistration(list) {
    if (this.attachmentsurl1.length == 0) {
      this.attachmentsurl1[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
    }
    this.spinner.show();
    var entity = {
      'DoctorName': list.username,
      'MobileNumber': list.phoneNo,
      'EmailID': list.email,
      'Password': '123',
      'DepartmentID': list.departmentID,
      'Experience': list.experience,
      'Address': list.address,
      'PhotoURL': this.attachmentsurl1[0],
      'Description': 'none',
      'MedicalRegistration': 0,
      'Preffered': 0,
      'GenderID': list.genderID,
      'CityID': 0,
      'LanguageID': '1',
      'IsChatEnabled': 0,
      'HomeVisit': 0,
      'AreaID': 0,
      'Pincode': 0,
      'CountryID': 0,
      'DoctorType': 1,
      'DocumentsVerified': 0,
      'MallPractise': 0,
      'ReferealBit': 0,
      'HospitalClinicID': 590,
      'SpokenLanguages': list.speakLanguages,
      'SignatureURL': this.signatureurl[0],
      'SlotDurationID': 1
    }
    this.docservice.InsertDoctorRegistration(entity).subscribe(data => {

      if (data != 0) {
        this.doctorid = data;
        // this.insertdoctorspecilisation();
        this.insertidentityProof();
        this.InsertMedicalProof();
        this.insertdoctormedicalregistration();
        // this.insertdoctoreducation();
        this.insertdoctorexperience();
        this.insertdoctormembership();
        this.InsertDoctorLoginDetails(list)
        Swal.fire('Registration Completed', 'Details saved successfully', 'success');
        this.spinner.hide();
        // location.href = "#/Docdash";
        this.GetRegistreedVoiladocusers()
      }
      else {
        Swal.fire('Doctor Name', 'Already Exists');
        this.spinner.hide();
        // location.href = "#/Docdash";
        this.GetRegistreedVoiladocusers()
      }
    })
  }

  public insertdoctormedicalregistration() {

    var entity = {
      'DoctorID': this.doctorid,
      'RegistrationNo': 123,
      'RegistrationCouncil': 'none',
      'RegistrationYear': 'none',
      'LanguageID': '1',
      'ValidTill': new Date()
    }
    this.docservice.InsertDoctorMedicalRegistration(entity).subscribe(data => {

      if (data != 0) {
      }
    })
  }

  public insertidentityProof() {
    if (this.attachmentsurl.length == 0) {
      this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocIdentityProof\\identity.jpg'
    }
    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        'DoctorID': this.doctorid,
        'PhotoURL': this.attachmentsurl[i]
      }
      this.docservice.InsertDoctorIdentityProofs(entity).subscribe(data => {

        if (data != 0) {

        }
      })

    }
  }
  public attachmentsurl2 = []
  public InsertMedicalProof() {
    if (this.attachmentsurl2.length == 0) {
      this.attachmentsurl2[0] = 'C:\\VoilaDocWebAPI\\Images\\DocMedicalProofProof\\medical.jpg'
    }
    else {
      for (let i = 0; i < this.attachmentsurl2.length; i++) {
        var entity = {
          'DoctorID': this.doctorid,
          'PhotoURL': this.attachmentsurl2[i]
        }
        this.docservice.InsertDoctorMedicalProofs(entity).subscribe(data => {

          if (data != 0) {
          }
        })
      }
    }

  }

  public insertdoctorexperience() {
    var entity = {
      'ExperienceDescription': 'none',
      'DoctorID': this.doctorid

    }
    this.docservice.InsertDoctorExperience(entity).subscribe(data => {

      if (data != 0) {
      }
    })
  }
  // public insertdoctoreducation() {
  //   for (let i = 0; i < this.qwert.length; i++) {

  //     var entity = {
  //       'DoctorID': this.doctorid,
  //       'CollegeName': this.qwert[i].CollegeName,
  //       'YearOfPassing': this.qwert[i].YearOfPassing,
  //       'DegreeID': this.qwert[i].DegreeID,
  //       'Experience': this.doctorid,
  //       'Resume': this.idproofurl[0]
  //     }
  //     this.docservice.InsertDoctorEducation(entity).subscribe(data => {

  //       if (data != 0) {
  //       }

  //     })
  //   }

  // }

  public insertdoctormembership() {
    var entity = {
      'MembershipDescription': 'none',
      'DoctorID': this.doctorid,
      'LanguageID': '1'
    }
    this.docservice.InsertDoctorMembership(entity).subscribe(data => {

      if (data != 0) {
      }
    })
  }


  public InsertDoctorLoginDetails(list) {
    var entity = {
      'DoctorID': this.doctorid,
      'UserName': list.regysername,
      'Password': list.password
    }
    this.docservice.InsertDoctorLogin(entity).subscribe(data => {

      if (data != 0) {
        // Swal.fire('Added Successfully.');
        Swal.fire('Completed', 'Doctor saved successfully', 'success');
        this.GetRegistreedVoiladocusers()
      }
      else {
        Swal.fire("Doctor Login Already Exists");
        this.GetRegistreedVoiladocusers()
      }
    })
  }







  // Nurse Registration

  public idproofurl = []

  public insertnursedetails(list) {
    this.spinner.show();
    this.idproofurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocMedicalProofProof\\medical.jpg'
    this.attachmentsurl1[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
    var entity = {
      'NurseName': list.username,
      'PhoneNo': list.phoneNo,
      'Email': list.email,
      'GenderID': list.genderID,
      'Address': list.address,
      'CityID': 0,
      'AreaID': 0,
      'DepartementID': list.departmentID,
      'Experience': 0,
      'Description': 'none',
      'HomeVisit': 1,
      'IDProof': this.idproofurl[0],
      'PhotoUrl': this.attachmentsurl1[0],
      'Pincode': 0,
      'CountryID': 0,
      'HospitalClinicID': 612,
      'Education': list.education,
      'SpokenLanguages': list.speakLanguages
    }
    this.docservice.InsertNurseRegistration(entity).subscribe(data => {

      this.nurseid = data;
      if (this.nurseid != 0) {
        this.InserNurseLoginDetails(list)
        Swal.fire('Registration Completed', 'Details saved successfully', 'success');
        this.spinner.hide();
        // location.href = '#/NurseDashboard';
        this.GetRegistreedVoiladocusers();
      }
      else {
        Swal.fire('Error', 'Details Already Exists', 'success');
        this.spinner.hide();
        // location.href = '#/NurseDashboard';
        this.GetRegistreedVoiladocusers()
      }
    })
  }

  public nurseid: any;

  public InserNurseLoginDetails(list) {
    var entity = {
      'NurseID': this.nurseid,
      'UserName': list.regysername,
      'Password': list.password
    }
    this.docservice.InsertNurseLogin(entity).subscribe(data => {

      if (data != 0) {
        Swal.fire('Registration Completed', 'Details saved successfully', 'success');
        this.GetRegistreedVoiladocusers()
      }
      else {
        Swal.fire("Nurse Login Already Exists");
        this.GetRegistreedVoiladocusers()
      }
    })

  }



  //phsyio registaration

  public insertphysiodetails(list) {
    debugger
    this.idproofurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocMedicalProofProof\\medical.jpg'
    this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
    this.spinner.show();
    var entity = {
      'Name': list.username,
      'PhoneNo': list.phoneNo,
      'Email': list.email,
      'GenderID': list.genderID,
      'Address': list.address,
      'CityID': 0,
      'AreaID': 0,
      'DepartementID': list.departmentID,
      'Experience': list.experience,
      'Description': 'none',
      'HomeVisit': 1,
      'IDProof': this.idproofurl[0],
      'PhotoUrl': this.attachmentsurl[0],
      'Pincode': 0,
      'CountryID': 0,
      'HospitalClinicID': 613,
      'Education': list.education,
      'SpokenLanguages': list.speakLanguages
    }
    this.docservice.InsertphysiotherapyRegistrationAdmin(entity).subscribe(data => {
      this.physioid = data;
      debugger
      if (data != 0) {
        this.InsertPhysiologindetails(list)
        Swal.fire('Registration Completed', 'Details saved successfully', 'success');
        this.spinner.hide();
        this.GetRegistreedVoiladocusers()
        // location.href = '#/PhysiotherapistDashboard';
      }
      else {
        Swal.fire('Error', 'Details Already Exists', 'success');
        this.spinner.hide();
        // location.href = '#/PhysiotherapistDashboard';
        this.GetRegistreedVoiladocusers()
      }
    })

  }
  public physioid: any;

  public InsertPhysiologindetails(list) {
    var entity = {
      'PhysiotherapistID': this.physioid,
      'UserName': list.regysername,
      'Password': list.password
    }
    this.docservice.InsertPhysiotherapistLogin(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Registration Completed', 'Details saved successfully', 'success');
      }
      else {
        Swal.fire("Physiotherapist Login Already Exists");
      }
    })
  }

  //midiwfe Registaration



  public InsertMidWives(list) {
    this.idproofurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocMedicalProofProof\\medical.jpg'
    this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
    this.spinner.show();
    var entity = {
      'Name': list.username,
      'PhoneNo': list.phoneNo,
      'Email': list.email,
      'GenderID': list.genderID,
      'Address': list.address,
      'CityID': 0,
      'AreaID': 0,
      'DepartementID': list.departmentID,
      'Experience': list.experience,
      'Description': 'none',
      'HomeVisit': 1,
      'IDProof': this.idproofurl[0],
      'PhotoUrl': this.attachmentsurl[0],
      'Pincode': 123,
      'CountryID': 0,
      'HospitalClinicID': 614,
      'Education': list.education,
      'SpokenLanguages': list.speakLanguages
    }
    this.docservice.InsertMidWivesRegistration(entity).subscribe(data => {
      this.midewifeid = data;
      if (data != 0) {
        this.InsertMidwifeLoginDetails(list)
        Swal.fire('Registration Completed', 'Details saved successfully', 'success');
        this.spinner.hide();
        this.GetRegistreedVoiladocusers()
        // location.href = '#/MidwifeDashboard';
      }
      else {
        Swal.fire('Error', 'User details already exists', 'success');
        this.spinner.hide();
        this.GetRegistreedVoiladocusers()
        // location.href = '#/MidwifeDashboard';
      }
    })
  }

  public midewifeid: any;

  public InsertMidwifeLoginDetails(list) {

    var entity = {
      'MidWiveID': this.midewifeid,
      'UserName': list.regysername,
      'Password': list.password
    }
    this.docservice.InsertMidWivesLogin(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Registration Completed', 'Details saved successfully', 'success');
      }
      else {
        Swal.fire("Mid Wife Login Already Exists");
      }
    })

  }



  // midwife end



  //pharmacy

  public pharmacyid: any;

  public InserPharmacyDetails(list) {

    this.spinner.show();
    var entity = {
      'PharmacyName': list.username,
      'MobileNumber': list.phoneNo,
      'Email': list.email,
      'Password': '123',
      'ContactName': list.contactpersonName,
      'Address': list.address,
      'Zipcode': 0,
      'Timings': 0,
      'LanguageID': '1',
      'LicenseNo': list.licenceNumber,
      'LicenseValidTill': new Date(),
      'HomeDelivery': 0,
      'Website': list.website,
      'NightPharmacy': 0,
      'TeleOrdering': 0,
      'Preffered': 0,
      'CityID': 0,
      'Description': list.description,
      'AreaID': 0,
      'Pincode': 0,
      'CountryID': 0,
      'MonthlySubscription': 0,
      'HospitalClinicID': 0,
      'Hospitalfulltimebit': 1,
      'ContartStartDate': new Date(),
      'ContractEndDate': new Date()
    }
    this.docservice.InsertPharmacyRegistration(entity).subscribe(data => {

      if (data != 0) {
        this.pharmacyid = data;
        this.insertphoto();
        this.InserPharmacyLogins(list)
        Swal.fire('Registration Completed', 'Details saved successfully', 'success');
        this.GetRegistreedVoiladocusers()

        this.spinner.hide();
        // location.href = "#/Pharmacydashboard"
      }
    })
  }

  public InserPharmacyLogins(list) {
    var entity = {
      'PharmacyID': this.pharmacyid,
      'UserName': list.regysername,
      'Password': list.password
    }
    this.docservice.InsertPharmacyAdminRegistration(entity).subscribe(data => {


    })

  }


  public insertphoto() {
    if (this.attachmentsurl.length == 0) {
      this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\PharmacyPhotos\\Pharmacy.jpg'
    }
    for (let i = 0; i < this.attachmentsurl.length; i++) {

      var entity = {
        'PharmacyID': this.pharmacyid,
        'PhotoURL': this.attachmentsurl[i]
      }
      this.docservice.InsertPharmacyPhotos(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }

  }




  // Diagnostic Center

  public diagnosticid: any;


  public InserDiagnostoicDetails(list) {

    this.spinner.show();

    var entity = {
      'DiagnosticCenterName': list.username,
      'Description': list.description,
      'Address': list.address,
      'PhoneNo': list.phoneNo,
      'EmailID': list.email,
      'Timings': 0,
      'LanguageID': '1',
      'Zipcode': 0,
      'ContactPerson': list.contactpersonName,
      'ContactPersonPhNo': list.contactPersonPhNo,
      'LicenseNo': list.businessLicenceNumber,
      'LicenseValidTill': new Date(),
      'HomeSample': 1,
      'Preffered': 0,
      'Website': list.website,
      'Awards': 'none',
      'CityID': 0,
      'AreaID': 0,
      'Pincode': 0,
      'CountryID': 0,
      'MonthlySubscription': 0,
      'HospitalClinicID': 0,
      'Hospitalfulltimebit': 1,
      'ContractStartDate': new Date(),
      'ContractEndDate': new Date(),
      'DiagnosticAppointmentPerSlot':0,
      'HomeSampleOrdersPerSlot':0
    }
    this.docservice.InsertDiagnosticCenterRegistration(entity).subscribe(data => {

      if (data != 0) {
        this.diagnosticid = data;
        this.inserthspphotosDiagnosticPhotos();
        this.InsertDiagnosticLogins(list)

        Swal.fire('Registration Completed', 'Details saved successfully', 'success');
        this.GetRegistreedVoiladocusers()
        this.spinner.hide();


      }
      // else {
      //   Swal.fire('Diagnostic Center Name', 'Already Exists');

      // }
    })


  }

  public inserthspphotosDiagnosticPhotos() {
    if (this.attachmentsurl.length == 0) {
      this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DiagnosticCenterPhotos\\Diagnostics.jpg'
    }

    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        'DiagnosticCenterID': this.diagnosticid,
        'PhotoURL': this.attachmentsurl[i]
      }
      this.docservice.InsertInsertDiagnosticCenterPhotos(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
  }


  public InsertDiagnosticLogins(list) {

    var entity = {
      'DiagnosticCenterID': this.diagnosticid,
      'UserName': list.regysername,
      'Password': list.password
    }
    this.docservice.InsertDiagnosticCenterAdminRegistration(entity).subscribe(data => {

      if (data != 0) {
        Swal.fire('Registration Completed', 'Details saved successfully', 'success');

      }
      else {
        Swal.fire('Success', 'Diagnostic Center Already Exists', 'success');

      }
    })

  }


  rejectelist: any;


  public GetRejectedregistrations(list) {
    debugger
    this.rejectelist = list;
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You Want to Approve This!",
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, Approve it!'
    // }).then((result) => {
    //   if (result.value) {
    //     this.docservice.UpdateRejectedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
    //       let test = res;
    //       debugger
    //       this.sendmails(list)
    //     })
    //     Swal.fire(
    //       'Rejected!',
    //       'User has been Rejected.',
    //       'success'
    //     )
    //   }
    //   else {

    //   }
    // })
  }



  public Reject() {
    debugger
    this.docservice.UpdateRejectedVoiladocRegisteredUsers(this.rejectelist.id, this.rejectelist.type).subscribe(res => {
      let test = res;
      debugger
      this.docservice.UpdateVoiladocRegistrationEmailsStatus(this.rejectelist.regID).subscribe(data => {
      })

      this.sendmails(this.rejectelist)
      Swal.fire('Rejected Successfully');
      this.GetRegistreedVoiladocusers()
    })
  }

  public reasonforcancel: any;

  public sendmails(listt) {
    debugger
    var entity = {
      'emailto': listt.regemailid,
      'emailsubject': 'Voiladoc Registrations',
      'emailbody': 'Dear ' + listt.username + ',' + "<br><br>" + this.reasonforcancel + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team'
    }
    this.docservice.sendemailsForLinkRegistrations(entity).subscribe(data => {
      debugger
    })
  }



}
