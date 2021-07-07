import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate, NgStyle } from "@angular/common";
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
    this.GetRegistreedVoiladocusers();
    this.GetAllRegisteredUsersCount()
    this.getlanguage()
    this.getlang()
    this.getlanguage1()
  }

  selectedDate(data) {
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.GetRegistreedVoiladocusers()
  }

  public dummreglist: any;

  countlist:any;

  public GetAllRegisteredUsersCount() {
    this.docservice.GetAllRegisteredUsersCount(this.startdate, this.enddate).subscribe(data => {
      // this.RegisteredList = data;
      this.countlist = data;
    

    })
  }



  public GetRegistreedVoiladocusers() {
    this.docservice.GetVoiladocRegistrationsUsers(this.startdate, this.enddate, this.typeid, this.languageid).subscribe(data => {
      // this.RegisteredList = data;
      this.dummreglist = data;
      this.RegisteredList = this.dummreglist.filter(x => x.approved == 0 && x.rejected == 0)
      this.count = this.RegisteredList.length;

    })
  }

  public typeid: any;

  public GetTypeID(even) {

    this.typeid = even.target.value;
    // this.RegisteredList = this.dummreglist.filter(x =>x.approved == 0 && x.rejected == 0)
    // this.count = this.RegisteredList.length;
    this.GetRegistreedVoiladocusers()
  }

  public GetApproveRegistratuions(list) {
    if (this.languageid == 1) {

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

              this.InsertHospitalDetails(list)
            }
            if (list.type == '2') {

              this.InsertHospitalDetails(list)
            }
            if (list.type == '3') {
              this.insertdoctorregistration(list)
            }
            if (list.type == '4') {

              this.insertnursedetails(list)
            }
            if (list.type == '5') {

              this.insertphysiodetails(list)
            }
            if (list.type == '6') {

              this.InsertMidWives(list)
            }
            if (list.type == '7') {

              this.InserPharmacyDetails(list)
            }
            if (list.type == '8') {

              this.InserDiagnostoicDetails(list)
            }

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
    else {

      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Approve This!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Approuver !',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
            let test = res;
            this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
            })
            if (list.type == '1') {

              this.InsertHospitalDetails(list)
            }
            if (list.type == '2') {

              this.InsertHospitalDetails(list)
            }
            if (list.type == '3') {
              this.insertdoctorregistration(list)
            }
            if (list.type == '4') {

              this.insertnursedetails(list)
            }
            if (list.type == '5') {

              this.insertphysiodetails(list)
            }
            if (list.type == '6') {

              this.InsertMidWives(list)
            }
            if (list.type == '7') {

              this.InserPharmacyDetails(list)
            }
            if (list.type == '8') {

              this.InserDiagnostoicDetails(list)
            }

          })
          Swal.fire(
            'Approuvé!',
            '',
            'success'
          )
        }
        else {

        }
      })
    }
  }



  //Hospital

  public hospitalclinicid: any;
  public attachmentsurl = [];

  public InsertHospitalDetails(list) {
    // if (this.attachmentsurl.length == 0) {
    //   this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\HospitalPhotos\\Hospital.jpg';
    // }
    this.spinner.show();
    // this.timings = this.tone + ' ' + ' TO ' + this.ttwo + ' ';
    // this.hspwebsite = 'http://' + '' + this.website
    var entity = {
      'Hospital_ClinicID': list.hospitalClinicID,
      'Hospital_ClinicName': list.username,
      'Address': list.address,
      'PhoneNo': list.phoneNo,
      'EmailID': list.email,
      'ZipCode': list.zipcode,
      'LanguageID': '1',
      'Timings': 0,
      'Description': 'none',
      'AvailabilityID': '1',
      'ContactPersonName': list.contactpersonName,
      'ContactPersonPhNo': list.contatcpersonPhoneNo,
      'Website': list.website,
      'YearEstablished': list.yearEstablished,
      'NoOfBeds': list.noOfBeds,
      'Emergency': list.isEmergencyServiceAvailable,
      'CityID': list.provinceID,
      'Preffered': 0,
      'HospitalLogoUrl': list.hospitalPhoto,
      'AreaID': list.cityID,
      'Pincode': list.zipcode,
      'CountryID': list.countryID,
      'MonthlySubscription': 0,
      'Hospitalfulltimebit': list.open24Hrs
    }
    this.docservice.InsertHospitalClinicDetailsMaster(entity).subscribe(data => {

      if (data != 0) {
        this.hospitalclinicid = data;
        // this.inserthspphotos();
        // this.insertdetails(list)
        // this.inserthspvideos();
        // this.insertfacility();
        // this.insertinsurance();
        // this.InsertSubscriptionRevenue()
        if (this.languageid == 1) {
          Swal.fire('Registration Completed', 'Thank you. We will be in touch soon', 'success');
        }
        else {
          Swal.fire("Inscription terminée", "Merci.Nous serons en contact bientot. ");
        }

        // this.clear();
        // location.href = "#/HspClidash"

        // this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
        //   let test = res;
        //   this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
        //   })
        // })
        this.spinner.hide();
        this.GetRegistreedVoiladocusers();
        this.GetAllRegisteredUsersCount()
      }
      else {
        Swal.fire('Hospital Clinic Name', 'Already Exists');
        // this.clear();
        this.docservice.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
          let test = res;
          this.docservice.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
          })
        })
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

  // public insertdetails(list) {
  //   var entity = {
  //     'Hospital_ClinicID': this.hospitalclinicid,
  //     'UserName': list.regysername,
  //     'Password': list.password
  //   }
  //   this.docservice.InsertHospitalClinicAdminRegistration(entity).subscribe(data => {

  //     if (data != 0) {
  //       Swal.fire('Registration Completed', 'Details saved successfully', 'success');


  //     }
  //     else {
  //       Swal.fire('Error', 'Hospital Login Already Exists', 'success');

  //     }
  //   })
  // }





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
      'PhotoURL': list.photo,
      'Description': 'none',
      'MedicalRegistration': 0,
      'Preffered': 0,
      'GenderID': list.genderID,
      'CityID': list.provinceID,
      'LanguageID': 1,
      'IsChatEnabled': 0,
      'HomeVisit': 0,
      'AreaID': list.cityID,
      'Pincode': list.pincode,
      'CountryID': list.countryID,
      'DoctorType': 1,
      'DocumentsVerified': 0,
      'MallPractise': list.mallPractise,
      'ReferealBit': list.referredDoctor,
      'HospitalClinicID': list.hospitalID,
      'SpokenLanguages': list.speakLanguages,
      'SignatureURL': list.signaturePhoto,
      'SlotDurationID': list.slotDurationID
    }
    this.docservice.InsertDoctorRegistration(entity).subscribe(data => {

      if (data != 0) {
        this.doctorid = data;

        // this.insertdoctorspecilisation();
        this.insertidentityProof(list);
        this.InsertMedicalProof(list);
        this.insertdoctormedicalregistration(list);
        // this.insertdoctoreducation();
        this.insertdoctorexperience(list);
        this.insertdoctormembership();
        // this.InsertDoctorLoginDetails(list)
        this.insertdoctoreducation(list);
        this.insertdoctorspecilisation(list);
        if (this.languageid == 1) {
          Swal.fire('Registration Completed', 'Thank you. We will be in touch soon', 'success');
        }
        else {
          Swal.fire("Inscription terminée", "Merci.Nous serons en contact bientot. ");
        }
        this.spinner.hide();
        // this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
        //   let test = res;
        //   this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
        //   })
        //     })
        // location.href = "#/Docdash";

        this.GetRegistreedVoiladocusers()
        this.GetAllRegisteredUsersCount()
      }
      else {
        if (this.languageid == 1) {
          Swal.fire('Doctor Name', 'Already Exists');
          this.docservice.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
            let test = res;
            this.docservice.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
            })
          })
          this.spinner.hide();
          // location.href = "#/Docdash";
          this.GetRegistreedVoiladocusers()


        }
        else {
          Swal.fire('Nom du docteur', 'Existe déjà.');
          this.docservice.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
            let test = res;
            this.docservice.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
            })
          })
          this.spinner.hide();
          // location.href = "#/Docdash";

          this.GetRegistreedVoiladocusers()

        }

      }
    })
  }


  public insertdoctoreducation(list) {

    var entity = {
      'DoctorID': this.doctorid,
      'CollegeName': list.colleage,
      'YearOfPassing': 0,
      'DegreeID': list.degreeID,
      'Experience': this.doctorid,
      'Resume': list.resume
    }
    this.docservice.InsertDoctorEducation(entity).subscribe(data => {

      if (data != 0) {
      }

    })


  }

  public insertdoctorspecilisation(list) {
    var entity = {
      'SpecializationID': list.specilizationID,
      'DoctorID': this.doctorid
    }
    this.docservice.InsertDoctorSpecialization(entity).subscribe(data => {

      if (data != 0) {
      }
    })

  }


  public insertdoctormedicalregistration(list) {

    var entity = {
      'DoctorID': this.doctorid,
      'RegistrationNo': list.registrationNumber,
      'RegistrationCouncil': list.registrationCouncil,
      'RegistrationYear': 0,
      'LanguageID': '1',
      'ValidTill': new Date()
    }
    this.docservice.InsertDoctorMedicalRegistration(entity).subscribe(data => {

      if (data != 0) {
      }
    })
  }

  public insertidentityProof(list) {
    // if (this.attachmentsurl.length == 0) {
    //   this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocIdentityProof\\identity.jpg'
    // }
    // for (let i = 0; i < this.attachmentsurl.length; i++) {
    var entity = {
      'DoctorID': this.doctorid,
      'PhotoURL': list.identityproof
    }
    this.docservice.InsertDoctorIdentityProofs(entity).subscribe(data => {

      if (data != 0) {

      }
    })

    // }
  }
  public attachmentsurl2 = []
  public InsertMedicalProof(list) {
    // if (this.attachmentsurl2.length == 0) {
    //   this.attachmentsurl2[0] = 'C:\\VoilaDocWebAPI\\Images\\DocMedicalProofProof\\medical.jpg'
    // }
    // else {
    // for (let i = 0; i < this.attachmentsurl2.length; i++) {
    var entity = {
      'DoctorID': this.doctorid,
      'PhotoURL': list.medicalRegProof
    }
    this.docservice.InsertDoctorMedicalProofs(entity).subscribe(data => {

      if (data != 0) {
      }
    })
    //   }
    // }

  }

  public insertdoctorexperience(list) {
    var entity = {
      'ExperienceDescription': list.otherExperiences,
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


  // public InsertDoctorLoginDetails(list) {
  //   var entity = {
  //     'DoctorID': this.doctorid,
  //     'UserName': list.regysername,
  //     'Password': list.password
  //   }
  //   this.docservice.InsertDoctorLogin(entity).subscribe(data => {

  //     if (data != 0) {
  //       // Swal.fire('Added Successfully.');
  //       Swal.fire('Completed', 'Doctor saved successfully', 'success');
  //       this.GetRegistreedVoiladocusers()
  //     }
  //     else {
  //       Swal.fire("Doctor Login Already Exists");
  //       this.GetRegistreedVoiladocusers()
  //     }
  //   })
  // }







  // Nurse Registration

  public idproofurl = []

  public insertnursedetails(list) {
    this.spinner.show();
    // this.idproofurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocMedicalProofProof\\medical.jpg'
    // this.attachmentsurl1[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
    var entity = {
      'NurseName': list.username,
      'PhoneNo': list.phoneNo,
      'Email': list.email,
      'GenderID': list.genderID,
      'Address': list.address,
      'CityID': list.provinceID,
      'AreaID': list.cityID,
      'DepartementID': list.departmentID,
      'Experience': list.experience,
      'Description': 'none',
      'HomeVisit': list.homeCare,
      'IDProof': list.identityProof,
      'PhotoUrl': list.photo,
      'Pincode': list.zipcode,
      'CountryID': list.countryID,
      'HospitalClinicID': 612,
      'Education': list.education,
      'SpokenLanguages': list.speakLanguages
    }
    this.docservice.InsertNurseRegistration(entity).subscribe(data => {

      this.nurseid = data;
      if (this.nurseid != 0) {
        // this.InserNurseLoginDetails(list);
        this.InsertNurseSpecilization(list);
        if (this.languageid == 1) {
          Swal.fire('Registration Completed', 'Thank you. We will be in touch soon', 'success');
        }
        else {
          Swal.fire("Inscription terminée", "Merci.Nous serons en contact bientot. ");
        }

        this.spinner.hide();
        // location.href = '#/NurseDashboard';
        this.GetRegistreedVoiladocusers();
        this.GetAllRegisteredUsersCount()
        // this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
        //   let test = res;
        //   this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
        //   })
        //     })
      }
      else {
        Swal.fire('Error', 'Details Already Exists', 'success');
        this.docservice.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
          let test = res;
          this.docservice.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
          })
        })
        this.spinner.hide();
        // location.href = '#/NurseDashboard';
        this.GetRegistreedVoiladocusers()
      }
    })
  }

  public nurseid: any;

  // public InserNurseLoginDetails(list) {
  //   var entity = {
  //     'NurseID': this.nurseid,
  //     'UserName': list.regysername,
  //     'Password': list.password
  //   }
  //   this.docservice.InsertNurseLogin(entity).subscribe(data => {

  //     if (data != 0) {
  //       Swal.fire('Registration Completed', 'Details saved successfully', 'success');
  //       this.GetRegistreedVoiladocusers()
  //     }
  //     else {
  //       Swal.fire("Nurse Login Already Exists");
  //       this.GetRegistreedVoiladocusers()
  //     }
  //   })

  // }
  public InsertNurseSpecilization(list) {
    var specentity = {
      'NurseID': this.nurseid,
      'SpecializationID': list.specializationID,
      'LanguageID': 1
    }
    this.docservice.InsertNurseSpecialization(specentity).subscribe(data => {
    })
  }



  //phsyio registaration

  public insertphysiodetails(list) {

    // this.idproofurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocMedicalProofProof\\medical.jpg'
    // this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
    this.spinner.show();
    var entity = {
      'Name': list.username,
      'PhoneNo': list.phoneNo,
      'Email': list.email,
      'GenderID': list.genderID,
      'Address': list.address,
      'CityID': list.provinceID,
      'AreaID': list.cityID,
      'DepartementID': list.departmentID,
      'Experience': list.experience,
      'Description': 'none',
      'HomeVisit': list.homeCare,
      'IDProof': list.identityProof,
      'PhotoUrl': list.photo,
      'Pincode': list.zipcode,
      'CountryID': list.countryID,
      'HospitalClinicID': 613,
      'Education': list.education,
      'SpokenLanguages': list.speakLanguages
    }
    this.docservice.InsertphysiotherapyRegistrationAdmin(entity).subscribe(data => {
      this.physioid = data;

      if (data != 0) {
        // this.InsertPhysiologindetails(list);
        this.insertPhysioSpecilization(list);
        if (this.languageid == 1) {
          Swal.fire('Registration Completed', 'Thank you. We will be in touch soon', 'success');
        }
        else {
          Swal.fire("Inscription terminée", "Merci.Nous serons en contact bientot. ");
        }
        this.spinner.hide();
        this.GetRegistreedVoiladocusers();
        this.GetAllRegisteredUsersCount()

        // this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
        //   let test = res;
        //   this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
        //   })
        //     })
        // location.href = '#/PhysiotherapistDashboard';
      }
      else {
        Swal.fire('Error', 'Details Already Exists', 'success');
        this.docservice.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
          let test = res;
          this.docservice.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
          })
        })
        this.spinner.hide();
        // location.href = '#/PhysiotherapistDashboard';
        this.GetRegistreedVoiladocusers()
      }
    })
  }


  public insertPhysioSpecilization(list) {
    var specentity = {
      'PhysiotherapyID': this.physioid,
      'SpecializationID': list.specializationID,
      'LanguageID': 1
    }
    this.docservice.InsertPhysiotherapySpecialization(specentity).subscribe(datas => {

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
        if (this.languageid == 1) {
          Swal.fire('Registration Completed', 'Thank you. We will be in touch soon', 'success');
        }
        else {
          Swal.fire("Inscription terminée", "Merci.Nous serons en contact bientot. ");
        }
      }
      else {
        Swal.fire("Physiotherapist Login Already Exists");
      }
    })
  }

  //midiwfe Registaration



  public InsertMidWives(list) {
    // this.idproofurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocMedicalProofProof\\medical.jpg'
    // this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
    this.spinner.show();
    var entity = {
      'Name': list.username,
      'PhoneNo': list.phoneNo,
      'Email': list.email,
      'GenderID': list.genderID,
      'Address': list.address,
      'CityID': list.provinceID,
      'AreaID': list.cityID,
      'DepartementID': list.departmentID,
      'Experience': list.experience,
      'Description': 'none',
      'HomeVisit': list.homeCare,
      'IDProof': list.dentityProof,
      'PhotoUrl': list.photo,
      'Pincode': list.zipcode,
      'CountryID': list.countryID,
      'HospitalClinicID': 614,
      'Education': list.education,
      'SpokenLanguages': list.speakLanguages
    }
    this.docservice.InsertMidWivesRegistration(entity).subscribe(data => {
      this.midewifeid = data;
      if (data != 0) {
        // this.InsertMidwifeLoginDetails(list)
        if (this.languageid == 1) {
          Swal.fire('Registration Completed', 'Thank you. We will be in touch soon', 'success');
        }
        else {
          Swal.fire("Inscription terminée", "Merci.Nous serons en contact bientot. ");
        }


        this.spinner.hide();
        this.GetAllRegisteredUsersCount()
        this.GetRegistreedVoiladocusers()
        // this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
        //   let test = res;
        //   this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
        //   })
        //     })
        // location.href = '#/MidwifeDashboard';
      }
      else {
        Swal.fire('Error', 'User details already exists', 'success');
        this.docservice.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
          let test = res;
          this.docservice.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
          })
        })
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
        if (this.languageid == 1) {
          Swal.fire('Registration Completed', 'Thank you. We will be in touch soon', 'success');
          this.GetAllRegisteredUsersCount()
        }
        else {
          Swal.fire("Inscription terminée", "Merci.Nous serons en contact bientot. ");
          this.GetAllRegisteredUsersCount()
        }
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
      'Zipcode': list.pincode,
      'Timings': 0,
      'LanguageID': '1',
      'LicenseNo': list.licenceNumber,
      'LicenseValidTill': list.licencevalidTill,
      'HomeDelivery': list.homeDelivery,
      'Website': list.website,
      'NightPharmacy': list.nightPharmacy,
      'TeleOrdering': list.telephoneOrdering,
      'Preffered': list.preferred,
      'CityID': list.provinceID,
      'Description': list.description,
      'AreaID': list.cityID,
      'Pincode': list.pincode,
      'CountryID': list.countryID,
      'MonthlySubscription': 0,
      'HospitalClinicID': 0,
      'Hospitalfulltimebit': 1,
      'ContartStartDate': new Date(),
      'ContractEndDate': new Date()
    }
    this.docservice.InsertPharmacyRegistration(entity).subscribe(data => {

      if (data != 0) {
        this.pharmacyid = data;
        this.insertphoto(list);
        // this.InserPharmacyLogins(list)
        // this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
        //   let test = res;
        //   this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
        //   })
        //     })
        if (this.languageid == 1) {
          Swal.fire('Registration Completed', 'Thank you. We will be in touch soon', 'success');
        }
        else {
          Swal.fire("Inscription terminée", "Merci.Nous serons en contact bientot. ");
        }

        this.GetAllRegisteredUsersCount()
        this.spinner.hide();
        // location.href = "#/Pharmacydashboard"
      }
      else {
        this.docservice.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
          let test = res;
          this.docservice.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
          })
        })
        Swal.fire("Pharmacy already Exists");
        this.spinner.hide();
        this.GetRegistreedVoiladocusers()
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


  public insertphoto(list) {
    // if (this.attachmentsurl.length == 0) {
    //   this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\PharmacyPhotos\\Pharmacy.jpg'
    // }
    // for (let i = 0; i < this.attachmentsurl.length; i++) {

    var entity = {
      'PharmacyID': this.pharmacyid,
      'PhotoURL': list.photos
    }
    this.docservice.InsertPharmacyPhotos(entity).subscribe(data => {

      if (data != 0) {
      }
    })
    // }

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
      'Zipcode': list.pincode,
      'ContactPerson': list.contactpersonName,
      'ContactPersonPhNo': list.contactPersonPhNo,
      'LicenseNo': list.businessLicenceNumber,
      'LicenseValidTill': new Date(),
      'HomeSample': list.homeSamplePickup,
      'Preffered': list.preferred,
      'Website': list.website,
      'Awards': 'none',
      'CityID': list.provinceID,
      'AreaID': list.cityID,
      'Pincode': list.pincode,
      'CountryID': list.countryID,
      'MonthlySubscription': 0,
      'HospitalClinicID': 0,
      'Hospitalfulltimebit': 1,
      'ContractStartDate': new Date(),
      'ContractEndDate': new Date(),
      'DiagnosticAppointmentPerSlot': 0,
      'HomeSampleOrdersPerSlot': 0
    }
    this.docservice.InsertDiagnosticCenterRegistration(entity).subscribe(data => {

      if (data != 0) {
        this.diagnosticid = data;
        this.inserthspphotosDiagnosticPhotos(list);
        // this.InsertDiagnosticLogins(list)
        this.GetAllRegisteredUsersCount()

        if (this.languageid == 1) {
          Swal.fire('Registration Completed', 'Thank you. We will be in touch soon', 'success');
        }
        else {
          Swal.fire("Inscription terminée", "Merci.Nous serons en contact bientot. ");
        }
        // this.docservice.UpdateApprovedVoiladocRegisteredUsers(list.id, list.type).subscribe(res => {
        //   let test = res;
        //   this.docservice.UpdateVoiladocRegistrationEmailsStatus(list.regID).subscribe(data => {
        //   })
        //     })
        this.GetRegistreedVoiladocusers()
        this.spinner.hide();


      }
      else {
        this.docservice.UpdateApprovedVoiladocRegisteredUsersAndUnApprove(list.id, list.type).subscribe(res => {
          let test = res;
          this.docservice.UpdateVoiladocRegistrationEmailsStatusBackNormal(list.regID).subscribe(data => {
          })
        })
        this.spinner.hide();
        Swal.fire('Diagnostic Center Name', 'Already Exists');

      }
    })


  }

  public inserthspphotosDiagnosticPhotos(list) {
    // if (this.attachmentsurl.length == 0) {
    //   this.attachmentsurl[0] = 'C:\\VoilaDocWebAPI\\Images\\DiagnosticCenterPhotos\\Diagnostics.jpg'
    // }

    // for (let i = 0; i < this.attachmentsurl.length; i++) {
    var entity = {
      'DiagnosticCenterID': this.diagnosticid,
      'PhotoURL': list.photo
    }
    this.docservice.InsertInsertDiagnosticCenterPhotos(entity).subscribe(data => {

      if (data != 0) {
      }
    })
    // }
  }


  public InsertDiagnosticLogins(list) {

    var entity = {
      'DiagnosticCenterID': this.diagnosticid,
      'UserName': list.regysername,
      'Password': list.password
    }
    this.docservice.InsertDiagnosticCenterAdminRegistration(entity).subscribe(data => {

      if (data != 0) {
        if (this.languageid == 1) {
          Swal.fire('Registration Completed', 'Thank you. We will be in touch soon', 'success');
        }
        else {
          Swal.fire("Inscription terminée", "Merci.Nous serons en contact bientot. ");
        }

      }
      else {
        Swal.fire('Success', 'Diagnostic Center Already Exists', 'success');

      }
    })

  }


  rejectelist: any;


  public GetRejectedregistrations(list) {

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
    //       
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
    this.docservice.UpdateRejectedVoiladocRegisteredUsers(this.rejectelist.id, this.rejectelist.type).subscribe(res => {
      let test = res;

      this.docservice.UpdateVoiladocRegistrationEmailsStatus(this.rejectelist.regID).subscribe(data => {
      })

      this.sendmails(this.rejectelist)
      Swal.fire('Rejected Successfully');
      this.GetRegistreedVoiladocusers()
    })
  }

  public reasonforcancel: any;

  public sendmails(listt) {

    var entity = {
      'emailto': listt.regemailid,
      'emailsubject': 'Voiladoc Registrations',
      'emailbody': 'Dear ' + listt.username + ',' + "<br><br>" + this.reasonforcancel + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team'
    }
    this.docservice.sendemailsForLinkRegistrations(entity).subscribe(data => {

    })
  }






  contactpersonname: any;
  contactpersonphno: any;
  experience: any;
  speaklanguages: any;
  website: any;
  description: any;
  yearEstablished: any;
  // view details
  public detailslist: any;
  photo: any;
  hospitalname: any;
  phoneno: any;
  address: any;
  email: any;
  typeids: any;
  slotduration: any;
  //doctor

  doctorname: any;
  regno: any;
  regcouncil: any;
  colleage: any;
  slotdurationid: any;
  otherexp: any;
  mediclproof: any;
  doctortype: any;
  professionalprofile: any;
  //nurse

  nursename: any;
  licenceno: any;
  pharmacyname: any;
  dianame: any;

  public GetViewdetails(list) {

    if (list.type == 1) {

      this.typeids = list.type;
      this.contactpersonname = list.contactpersonName;
      this.contactpersonphno = list.contatcpersonPhoneNo;
      this.experience = list.experience;
      this.website = list.website;
      this.yearEstablished = list.yearEstablished;
      this.description = list.description;
      this.photo = list.photo;
      this.hospitalname = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;

    }
    else if (list.type == 2) {

      this.typeids = list.type;
      this.contactpersonname = list.contactpersonName;
      this.contactpersonphno = list.contatcpersonPhoneNo;
      this.experience = list.experience;
      this.website = list.website;
      this.yearEstablished = list.yearEstablished;
      this.description = list.description;
      this.photo = list.photo;
      this.hospitalname = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;

    }
    else if (list.type == 3) {

      this.typeids = list.type;
      this.contactpersonname = list.contactpersonName;
      this.contactpersonphno = list.contatcpersonPhoneNo;
      this.experience = list.experience;

      this.description = list.description;
      this.photo = list.docphoto;
      this.doctorname = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;
      this.slotduration = list.slotDurationID,
        this.regno = list.registrationNumber,
        this.regcouncil = list.registrationCouncil,
        this.speaklanguages = list.speakLanguages,
        this.colleage = list.colleage,
        this.slotdurationid = list.slotDurationID,
        this.otherexp = list.otherExperiences,
        this.mediclproof = list.medicalproof,
        this.doctortype = list.doctorType


    }
    else if (list.type == 4) {
      this.typeids = list.type;
      this.nursename = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;
      this.experience = list.experience;
      this.speaklanguages = list.speakLanguages,
        this.professionalprofile = list.professionalProfile;
      this.email = list.email;
      this.photo = list.nursephoto;
      this.mediclproof = list.identityproof

    }
    else if (list.type == 5) {
      this.typeids = list.type;
      this.nursename = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;
      this.experience = list.experience;
      this.speaklanguages = list.speakLanguages,
        this.professionalprofile = list.professionalProfile;
      this.email = list.email;
      this.photo = list.nursephoto;
      this.mediclproof = list.identityproof

    }
    else if (list.type == 6) {
      this.typeids = list.type;
      this.nursename = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;
      this.experience = list.experience;
      this.speaklanguages = list.speakLanguages,
        this.professionalprofile = list.professionalProfile;
      this.email = list.email;
      this.photo = list.nursephoto;
      this.mediclproof = list.identityproof
    }
    else if (list.type == 7) {
      this.typeids = list.type;
      this.pharmacyname = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;
      this.contactpersonname = list.contactpersonName;
      this.contactpersonphno = list.contatcpersonPhoneNo;
      this.experience = list.experience;
      this.website = list.website;
      this.licenceno = list.licenceNumber;
      this.photo = list.pharmacyphoto;
    }
    else if (list.type == 8) {
      this.typeids = list.type;
      this.dianame = list.username;
      this.phoneno = list.phoneNo;
      this.address = list.address;
      this.email = list.email;
      this.contactpersonname = list.contactpersonName;
      this.contactpersonphno = list.contatcpersonPhoneNo;
      this.experience = list.experience;
      this.website = list.website;
      this.licenceno = list.businessLicenceNumber;
      this.photo = list.diaphoto;
      this.description = list.description;
    }
  }










  // pinno: any;


  // public hsopitalloginlist: any;
  // public gethospitalclinicfordash() {
  //   this.docservice.GetHospital_ClinicLoginForDash(this.languageid).subscribe(
  //     data => {

  //       this.hsopitalloginlist = data;
  //       var list = this.hsopitalloginlist.filter(x => x.hospital_ClinicID == this.hospitalclinicid)
  //       this.pinno = list[0].pinno,
  //         this.email = list[0].emailID,
  //         this.hospitalname = list[0].hospital_ClinicName
  //       // this.sendmail();
  //     }, error => {
  //     }
  //   )
  // }

  // emailattchementurl = [];

  // public sendmail() {
  //   
  //   var entity = {
  //     'emailto': this.email,
  //     'emailsubject': "Voiladoc",
  //     'emailbody': 'Dear ' + this.hospitalname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
  //     'attachmenturl': this.emailattchementurl,
  //     'cclist': 0,
  //     'bcclist': 0
  //   }
  //   this.docservice.sendemail(entity).subscribe(data => {
  //   })
  // }






  labels: any;
  labels2: any;
  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
  }

  labels1: any;
  labels3: any;
  public getlang() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      }, error => {
      }
    )
  }
  public getlanguage1() {
    this.docservice.GetAdmin_NurseRegistration_labelByLanguageID(this.languageid).subscribe(
      data => {

        this.labels2 = data;
      }, error => {
      }
    )

    this.docservice.GetAdmin_HospitalClinicRegistration_Lables(this.languageid).subscribe(
      data => {

        this.labels3 = data;
      }, error => {
      }
    )
  }

}
