import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-doctorregistration',
  templateUrl: './doctorregistration.component.html',
  styleUrls: ['./doctorregistration.component.css']
})
export class DoctorregistrationComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public doctorname: any;
  public phoneno: any;
  public email: any;
  public gender: any;
  public address: any;
  public experience: any;
  public description: any;
  public prefer: any;
  public chat: any;
  public medical: any;
  public registrationno: any;
  public registrationcouncil: any;
  public registrationyear: any;
  public colleagename: any;
  public yearofpassing: any;
  public otherexperience: any;
  public memberdetails: any;
  public homevisit: any;
  public arealist: any;
  public pincode: any;
  public showicons: any;



  public citylist: any;
  public cityid: any;
  public departmentlist: any;
  public departmentid: any;
  public specilisationlist: any;
  public specilisatiodd = {};
  public specilisationid = [];
  public attachments = [];
  public attachmentsurl = [];
  public attachments1 = [];
  public attachmentsurl1 = [];
  public attachments2 = [];
  public attachmentsurl2 = [];
  public signatureurl = [];
  public doctorid: any;
  public degreelist: any;
  public degreeid: any;
  public validEmail: any;
  public areaid: any;
  public showdocphoto = [];
  public showdocicons: any;
  public showidentityproof = []
  public consulttype: any;

  public showidproof = [];
  public idproof = [];
  public idproofurl = [];

  photodetail = [];
  public countrylist: any;
  public countrydd = {};
  public countryid: any;
  public citydd = {}
  public areadd = {}
  public doctortyplist: any;
  public doctypeid: any;
  public doctypeee = {};

  public dcoverify: any;
  public mallprcise: any;
  public validtill: any;

  public tablecount: any;
  public degreename: any;
  public languageid: any;
  public labels: any;

  public qwert = [];
  public referbit: any;
  public hospitalclinicid: any;
  public hospitalcliniclist: any;
  public hospitadd = {};
  public dummid: any;
  public speaklanguages: any;
  dropzonelable: any;
  search: any;
  ngOnInit() {
    this.dummid = localStorage.getItem('hospitalid');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.tablecount = 0
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 800);
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.GetDoctorType();
    this.getspecilicationmaster();
    this.getdepartmentmaster();
    this.getdegreemaster();
    this.GetCountryMaster();

    this.gethosptilclinicforadmin()
    this.departmentid = 0;
    this.mallprcise = 1;
    this.chat = 1;

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }


  SelectLabel: any;
  public getlanguage() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search = this.labels[0].search

      }, error => {
      }
    )
  }

  public GetDoctorType() {
    this.docservice.GetDoctorTypeMasterByLanguageID(this.languageid).subscribe(data => {
      this.doctortyplist = data;
      this.doctypeee = {
        singleSelection: true,
        idField: 'id',
        textField: 'type',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        //  itemsShowLimit: 3,
        allowSearchFilter: true
      };
    }, error => {
    })
  }



  public gethosptilclinicforadmin() {
    debugger
    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        debugger
        this.hospitalcliniclist = data;
        this.hospitadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }

  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }

  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.countrylist = data;
        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          searchPlaceholderText: this.search,
          //  itemsShowLimit: 3,

          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }
  public GetCountryID(item: any) {
    debugger
    this.countryid = item.id;
    debugger
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
        debugger
        this.citylist = data;

        this.citydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }

  public GetHospitalID(item: any) {
    debugger
    this.hospitalclinicid = item.id;
  }

  public getdepartmentmaster() {
    debugger
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.departmentlist = data;
      }, error => {
      }
    )
  }

  public getdegreemaster() {
    debugger
    this.docservice.GetDegreeMasterBylanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.degreelist = data;
      }, error => {
      }
    )
  }

  public getspecilicationmaster() {
    debugger
    this.docservice.GetSpecilaizationMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.specilisationlist = data;

        this.specilisatiodd = {
          singleSelection: false,
          idField: 'id',
          textField: 'specilaizationName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };

      }, error => {
      }
    )
  }


  public GetCityID(item1: any) {
    debugger
    this.cityid = item1.id;
    this.getareamasterbyid();
  }
  public GetDepartmentID(even) {
    debugger
    this.departmentid = even.target.value;
  }
  public GetSpecilizationID(item: any) {
    debugger
    this.specilisationid.push(item);
    debugger
  }
  public GetDegreeID(even) {
    debugger
    this.degreeid = even.target.value;

    for (let i = 0; i < this.degreelist.length; i++) {
      if (this.degreelist[i].id == this.degreeid) {
        this.degreename = this.degreelist[i].short
      }
    }
  }
  public GetDoctypeID(item4: any) {
    debugger
    this.doctypeid = item4.id;
  }

  slotid: any;

  public GetSlotDurationID(even) {
    this.slotid = even.target.value;
  }

  public insertdoctorregistration() {
    debugger
    // if (this.attachmentsurl1.length == 0 || this.attachmentsurl.length == 0 || this.attachmentsurl2.length == 0) {
    //   Swal.fire("Please Upload Photo")
    // }
    if (this.countryid == undefined || this.countryid.length == 0) {
      debugger
      Swal.fire("Please Select Country");
    }
    else if (this.cityid == undefined || this.cityid.length == 0) {
      Swal.fire("Please Select Province")
    }
    else if (this.areaid == undefined || this.areaid.length == 0) {
      Swal.fire("Please Select City");
    }
    else if (this.departmentid == undefined || this.departmentid.length == 0) {
      Swal.fire("Please Select Department");
    }
    else if (this.slotid == undefined || this.slotid == 0) {
      Swal.fire("Please Select Slot Duration");
    }
    else {
      if (this.attachmentsurl1.length == 0) {
        this.attachmentsurl1[0] = 'C:\\VoilaDocWebAPI\\Images\\DocPhoto\\Doctor.jpg'
      }
      this.spinner.show();
      var entity = {
        'DoctorName': this.doctorname,
        'MobileNumber': this.phoneno,
        'EmailID': this.email,
        'Password': '123',
        'DepartmentID': this.departmentid,
        'Experience': this.experience,
        'Address': this.address,
        'PhotoURL': this.attachmentsurl1[0],
        'Description': this.description,
        'MedicalRegistration': this.medical,
        'Preffered': this.prefer,
        'GenderID': Number(this.gender),
        'CityID': this.cityid,
        'LanguageID': '1',
        'IsChatEnabled': Number(this.chat),
        'HomeVisit': Number(this.homevisit),
        'AreaID': this.areaid,
        'Pincode': this.pincode,
        'CountryID': this.countryid,
        'DoctorType': this.doctypeid,
        'DocumentsVerified': Number(this.dcoverify),
        'MallPractise': Number(this.mallprcise),
        'ReferealBit': this.referbit,
        'HospitalClinicID': this.hospitalclinicid,
        'SpokenLanguages': this.speaklanguages,
        'SignatureURL': this.signatureurl[0],
        'SlotDurationID': this.slotid
      }
      this.docservice.InsertDoctorRegistration(entity).subscribe(data => {
        debugger
        if (data != 0) {
          this.doctorid = data;
          this.insertdoctorspecilisation();
          this.insertidentityProof();
          this.InsertMedicalProof();
          this.insertdoctormedicalregistration();
          this.insertdoctoreducation();
          this.insertdoctorexperience();
          this.insertdoctormembership();
          Swal.fire('Registration Completed', 'Details saved successfully', 'success');
          this.clear();
          this.spinner.hide();
          location.href = "#/Docdash";
        }
        else {
          Swal.fire('Doctor Name', 'Already Exists');
          this.spinner.hide();
          location.href = "#/Docdash";
        }
      })

    }
  }

  public insertdoctorspecilisation() {
    for (let i = 0; i < this.specilisationid.length; i++) {
      var entity = {
        'SpecializationID': this.specilisationid[i].id,
        'DoctorID': this.doctorid
      }
      this.docservice.InsertDoctorSpecialization(entity).subscribe(data => {
        debugger
        if (data != 0) {
        }
      })
    }
  }
  public insertdoctormedicalregistration() {
    debugger
    var entity = {
      'DoctorID': this.doctorid,
      'RegistrationNo': this.registrationno,
      'RegistrationCouncil': this.registrationcouncil,
      'RegistrationYear': this.registrationyear,
      'LanguageID': '1',
      'ValidTill': this.validtill.toLocaleString()
    }
    this.docservice.InsertDoctorMedicalRegistration(entity).subscribe(data => {
      debugger
      if (data != 0) {
      }
    })
  }



  public onidUpload(abcd) {
    debugger
    // for (let i = 0; i < abcd.length; i++) {
    this.idproof.push(abcd.addedFiles[0]);
    this.uploadid();
    // }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadid() {
    this.docservice.pharmacyphoto(this.idproof).subscribe(res => {
      debugger
      this.idproofurl.push(res);
      let a = this.idproofurl[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;
      this.showidproof.push(b)
      this.idproof.length = 0;
      debugger
    })
    // this.sendattachment();
  }


  public InsertDocDetsils() {
    this.tablecount = 1;
    var entity = {
      'DegreeID': this.degreeid,
      'CollegeName': this.colleagename,
      'YearOfPassing': this.yearofpassing,
      'DegreeName': this.degreename
    }
    this.qwert.push(entity);
    this.colleagename = "";
    this.degreename = "";
    this.yearofpassing = "";
  }

  public insertdoctoreducation() {
    for (let i = 0; i < this.qwert.length; i++) {
      debugger
      var entity = {
        'DoctorID': this.doctorid,
        'CollegeName': this.qwert[i].CollegeName,
        'YearOfPassing': this.qwert[i].YearOfPassing,
        'DegreeID': this.qwert[i].DegreeID,
        'Experience': this.doctorid,
        'Resume': this.idproofurl[0]
      }
      this.docservice.InsertDoctorEducation(entity).subscribe(data => {
        debugger
        if (data != 0) {
        }

      })
    }

  }

  public insertdoctorexperience() {
    var entity = {
      'ExperienceDescription': this.otherexperience,
      'DoctorID': this.doctorid

    }
    this.docservice.InsertDoctorExperience(entity).subscribe(data => {
      debugger
      if (data != 0) {
      }
    })
  }

  public insertdoctormembership() {
    var entity = {
      'MembershipDescription': this.memberdetails,
      'DoctorID': this.doctorid,
      'LanguageID': '1'
    }
    this.docservice.InsertDoctorMembership(entity).subscribe(data => {
      debugger
      if (data != 0) {
      }
    })
  }

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
          debugger
          if (data != 0) {
          }
        })
      }
    }
    debugger

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
        debugger
        if (data != 0) {

        }
      })

    }
    debugger

  }


  //Signature Upload

  signatureattachmentssss = []
  showsignaturephoto = []
  dummshowsignatureurl = []

  public onSignaturUpload(abcd) {
    debugger
    // for (let i = 0; i < abcd.length; i++) {
    this.dummshowsignatureurl = []
    this.signatureattachmentssss.push(abcd.addedFiles[0]);
    this.DoctorSignatureUpload();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public DoctorSignatureUpload() {
    this.docservice.DoctorSignatureUpload(this.signatureattachmentssss).subscribe(res => {
      debugger
      this.signatureurl.push(res);

      this.dummshowsignatureurl.push(res);

      let a = this.dummshowsignatureurl[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;

      this.showsignaturephoto.push(b)
      this.signatureattachmentssss.length = 0;
      debugger
    })

  }



  //End Sifnature Upload
  identityattachmentsurlssss = []

  public onattachmentUpload(abcd) {
    debugger
    // for (let i = 0; i < abcd.length; i++) {
    this.identityattachmentsurlssss = []
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.DoctorIdentityProof(this.attachments).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);

      this.identityattachmentsurlssss.push(res);

      let a = this.identityattachmentsurlssss[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;
      this.showidentityproof.push(b)
      this.attachments.length = 0;
      debugger


    })
    // this.sendattachment();
  }

  dummsttchmentursl = []
  public onattachmentUpload1(abcd) {
    debugger
    // for (let i = 0; i < abcd.length; i++) {
    this.dummsttchmentursl = []
    this.attachments1.push(abcd.addedFiles[0]);
    this.uploadattachments1();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments1() {
    this.docservice.DoctorPhotoUpload(this.attachments1).subscribe(res => {
      debugger
      this.attachmentsurl1.push(res);
      this.dummsttchmentursl.push(res);
      let a = this.dummsttchmentursl[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;

      this.showdocphoto.push(b)
      debugger

      this.attachments1.length = 0;
      debugger
    })
    // this.sendattachment();
  }



  identityshowphoto = []

  public onattachmentUpload2(abcd) {
    debugger
    // for (let i = 0; i < abcd.length; i++) {
    this.identityshowphoto = []
    this.attachments2.push(abcd.addedFiles[0]);
    this.uploadattachments2();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }
  public uploadattachments2() {
    this.docservice.DoctorMedicalProof(this.attachments2).subscribe(res => {
      debugger
      this.attachmentsurl2.push(res);
      this.identityshowphoto.push(res);
      debugger
      let a = this.identityshowphoto[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;

      this.photodetail.push(b)
      debugger

      this.attachments2.length = 0;
      debugger
    })
    // this.sendattachment();
  }
  public clear() {
    this.doctorname = '';
    this.phoneno = '';
    this.email = '';
    this.experience = '';
    this.address = '';
    this.description = '';
    this.medical = '';
    this.prefer = '';
    this.gender = '';
    this.chat = '';
    this.colleagename = '';
    this.yearofpassing = '';
    this.registrationyear = '';
    this.otherexperience = '';
    this.registrationcouncil = '';
  }
  public getareamasterbyid() {
    debugger
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {
        debugger
        this.arealist = data;
        this.areadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }
  public GetAreaID(item3: any) {
    debugger
    this.areaid = item3.id;
    for (let i = 0; i < this.arealist.length; i++) {
      debugger
      if (this.arealist[i].id == this.areaid) {
        debugger
        this.pincode = this.arealist[i].pincode
      }
    }
  }
  public GetGenderID(even) {
    debugger
    this.gender = even.target.value;
  }
}
